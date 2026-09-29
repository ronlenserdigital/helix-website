import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/lead
 * Validates the lead, drops bots, rate limits by IP, then:
 *   1. Creates/updates a contact in GoHighLevel (if GHL_API_KEY + GHL_LOCATION_ID are set)
 *   2. Emails a copy via Resend (if RESEND_API_KEY + LEAD_NOTIFY_EMAIL are set)
 *   3. Always logs to the server console
 * Returns { ok: true } so the client can redirect to the calendar.
 */

type Lead = {
  name: string;
  email: string;
  company: string;
  website?: string;
  need?: string;
  budget?: string;
  source?: string;
  message?: string;
  hp?: string;
  page?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function clean(s: unknown, max = 500): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function validEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

async function pushToGhl(lead: Lead): Promise<{ ok: boolean; id?: string; error?: string }> {
  const key = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!key || !locationId) return { ok: false, error: "GHL not configured" };

  const { firstName, lastName } = splitName(lead.name);
  const tags = ["website-inbound", lead.need ? `need:${lead.need.toLowerCase().replace(/\s+/g, "-")}` : "", lead.budget ? `budget:${lead.budget.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""].filter(Boolean);

  const body = {
    locationId,
    firstName,
    lastName,
    name: lead.name,
    email: lead.email,
    companyName: lead.company,
    website: lead.website || undefined,
    source: `Website${lead.source ? ` (${lead.source})` : ""}`,
    tags,
    customFields: [] as { id: string; value: string }[],
  };

  // Optional custom field ids from env, so notes land in named fields instead of only tags.
  const fieldNeed = process.env.GHL_FIELD_NEED_ID;
  const fieldBudget = process.env.GHL_FIELD_BUDGET_ID;
  const fieldMessage = process.env.GHL_FIELD_MESSAGE_ID;
  if (fieldNeed && lead.need) body.customFields.push({ id: fieldNeed, value: lead.need });
  if (fieldBudget && lead.budget) body.customFields.push({ id: fieldBudget, value: lead.budget });
  if (fieldMessage && lead.message) body.customFields.push({ id: fieldMessage, value: lead.message });

  const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: `GHL ${res.status}: ${text.slice(0, 300)}` };
  }
  const data = (await res.json()) as { contact?: { id?: string } };
  const id = data.contact?.id;

  // Add the message as a note so it shows in the contact timeline.
  if (id && lead.message) {
    await fetch(`https://services.leadconnectorhq.com/contacts/${id}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: `Website lead\nNeed: ${lead.need}\nBudget: ${lead.budget}\nSource: ${lead.source}\nPage: ${lead.page}\n\n${lead.message}`,
      }),
    }).catch(() => undefined);
  }
  return { ok: true, id };
}

async function emailCopy(lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Helix Website <leads@helixresearchtech.com>";
  if (!key || !to) return;
  const text = [
    `New website lead`,
    ``,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Website: ${lead.website || "-"}`,
    `Need: ${lead.need || "-"}`,
    `Budget: ${lead.budget || "-"}`,
    `Source: ${lead.source || "-"}`,
    `Page: ${lead.page || "-"}`,
    ``,
    lead.message || "",
  ].join("\n");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to.split(","), reply_to: lead.email, subject: `Lead: ${lead.company} (${lead.need || "unspecified"})`, text }),
  }).catch(() => undefined);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Try again in a few minutes" }, { status: 429 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: bots fill it, humans never see it. Return ok so bots stop retrying.
  if (clean(raw.hp)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200).toLowerCase(),
    company: clean(raw.company, 160),
    website: clean(raw.website, 200),
    need: clean(raw.need, 80),
    budget: clean(raw.budget, 60),
    source: clean(raw.source, 60),
    message: clean(raw.message, 2000),
    page: clean(raw.page, 200),
  };

  if (!lead.name || !lead.company || !validEmail(lead.email)) {
    return NextResponse.json({ ok: false, error: "Name, work email, and company are required" }, { status: 400 });
  }

  const ghl = await pushToGhl(lead).catch((e: Error) => ({ ok: false, error: e.message }));
  await emailCopy(lead);

  console.log(JSON.stringify({ event: "lead", ip, ghl: ghl.ok ? "ok" : ghl.error, lead: { ...lead, message: lead.message?.slice(0, 200) } }));

  return NextResponse.json({ ok: true, crm: ghl.ok });
}
