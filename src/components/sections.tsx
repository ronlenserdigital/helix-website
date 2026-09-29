import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, CASES, FOUNDERS, BADGES, FAQ, PRICING, COMPARE, isTodo } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Check, Minus, X, ServiceIcon, Linkedin, Clock, Shield, Bolt } from "./icons";

/* ---------- Shared bits ---------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="h2">{title}</h2>
      {lead ? <p className="lead mt-5">{lead}</p> : null}
    </div>
  );
}

export function Em({ children }: { children: React.ReactNode }) {
  return <span className="serif-em">{children}</span>;
}

/* ---------- Trust strip ---------- */

export function TrustStrip() {
  const items = [...BADGES, ...BADGES];
  return (
    <section aria-label="Tools we build with" className="relative py-10 border-y border-line bg-bg-2/60">
      <div className="container mb-5 flex items-center justify-between gap-4">
        <p className="eyebrow">Built on tools you already trust</p>
        <p className="text-xs text-fg-3 hidden sm:block">Every account is opened in your name.</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((b, i) => (
            <div key={b.name + i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-teal/70" />
              <span className="font-semibold tracking-tight text-fg">{b.name}</span>
              <span className="text-fg-3 text-sm">{b.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

export function Stats() {
  return (
    <section className="container py-12">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SITE.stats.map((s, i) => (
          <div key={s.label} className={`glass p-6 reveal reveal-delay-${i + 1} flex flex-col-reverse gap-2`}>
            <dt className="text-fg-3 text-sm">{s.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Problem ---------- */

export function Problem() {
  const pains = [
    { t: "The 4:47pm quote", d: "A buyer sends a part number and a quantity. It sits in a shared inbox until tomorrow. By then they have three other prices.", icon: Clock },
    { t: "The quiet reorder", d: "A good account reorders every 6 weeks. Week 7 goes by. Nobody noticed, so they ordered from the rep who texted back.", icon: Bolt },
    { t: "The lunch-hour voicemail", d: "Peak call time is when your team is busiest. Voicemail is where orders go to die.", icon: Shield },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The leak"
          title={
            <>
              Supply companies do not lose deals on price.
              <br />
              They lose them on <Em>hours.</Em>
            </>
          }
          lead="Every one of these is a small delay that costs a real order. An agent closes the gap without adding headcount."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pains.map((p, i) => (
            <div key={p.t} className={`glass glass-hover p-7 reveal reveal-delay-${i + 1}`}>
              <div className="w-11 h-11 rounded-2xl grid place-items-center bg-teal/10 text-teal ring-1 ring-teal/30">
                <p.icon />
              </div>
              <h3 className="h3 mt-6">{p.t}</h3>
              <p className="mt-3 text-fg-2 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const [flagship, ...rest] = SERVICES;
  return (
    <section className="section" id="services">
      <div className="container">
        {!compact ? (
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Agents named by the job
                <br />
                they <Em>actually do.</Em>
              </>
            }
            lead="Not chatbots. Agents with access to your catalog, your CRM, and your calendar, doing one job end to end."
          />
        ) : null}
        <div className={`${compact ? "" : "mt-12"} grid gap-4 lg:grid-cols-3`}>
          <Link
            href={`/services/${flagship.slug}`}
            className="glass glass-hover p-8 lg:row-span-2 flex flex-col reveal ring-glow"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">{flagship.eyebrow}</span>
              <span className="num">{flagship.timeline}</span>
            </div>
            <div className="w-12 h-12 mt-8 rounded-2xl grid place-items-center bg-teal/10 text-teal ring-1 ring-teal/30">
              <ServiceIcon name={flagship.icon} width={22} height={22} />
            </div>
            <h3 className="h2 mt-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              {flagship.name}
            </h3>
            <p className="mt-4 text-fg-2 leading-relaxed text-lg">{flagship.short}</p>
            <ul className="mt-6 space-y-2.5 text-fg-2">
              {flagship.bullets.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="text-teal mt-0.5 flex-none" width={18} height={18} /> <span>{b}</span>
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-8 inline-flex items-center gap-2 text-teal font-medium">
              See how it works <ArrowUpRight width={16} height={16} />
            </span>
          </Link>
          {rest.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`glass glass-hover p-7 flex flex-col reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="flex items-center justify-between">
                <span className="eyebrow">{s.eyebrow}</span>
                <span className="num">{s.timeline}</span>
              </div>
              <div className="w-11 h-11 mt-6 rounded-2xl grid place-items-center bg-violet/10 text-violet ring-1 ring-violet/30">
                <ServiceIcon name={s.icon} width={20} height={20} />
              </div>
              <h3 className="h3 mt-5">{s.name}</h3>
              <p className="mt-3 text-fg-2 leading-relaxed">{s.short}</p>
              <span className="mt-auto pt-6 inline-flex items-center gap-2 text-fg-2 text-sm">
                Details <ArrowRight width={16} height={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

export function Process() {
  const steps = [
    { n: "01", t: "Audit", d: "One call, then we read how quotes, orders, and follow-ups actually move. You get a written plan with a fixed price and a date.", when: "Week 1" },
    { n: "02", t: "Build", d: "We connect the agent to your catalog, CRM, calendar, and inbox. You see it working on real requests before launch.", when: "Weeks 2 to 4" },
    { n: "03", t: "Launch", d: "It goes live on one channel first. Your team keeps every approval it wants. Nothing goes out that you did not sign off on.", when: "Launch day" },
    { n: "04", t: "Tune", d: "30 days of watching real conversations, fixing edge cases, and widening what the agent may handle on its own.", when: "Days 1 to 30" },
  ];
  return (
    <section className="section bg-bg-2/50 border-y border-line">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Four weeks from first call to an agent <Em>doing the work.</Em>
            </>
          }
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className={`glass p-7 reveal reveal-delay-${i + 1} relative overflow-hidden`}>
              <span className="absolute -right-3 -top-6 text-[7rem] font-semibold tracking-tighter text-white/[0.035] select-none">{s.n}</span>
              <span className="num">{s.when}</span>
              <h3 className="h3 mt-4">{s.t}</h3>
              <p className="mt-3 text-fg-2 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Proof ---------- */

export function Proof({ limit = 3 }: { limit?: number }) {
  const items = CASES.slice(0, limit);
  const hasPlaceholders = items.some((c) => c.status === "placeholder");
  return (
    <section className="section" id="results">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Results"
            title={
              <>
                Before and after, <Em>in numbers.</Em>
              </>
            }
            lead={hasPlaceholders ? "Target outcomes we build toward on every engagement. Named case studies are published as clients approve them." : undefined}
          />
          <Link href="/work" className="btn btn-ghost self-start lg:self-auto">
            All results <ArrowRight width={16} height={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className={`glass glass-hover p-7 flex flex-col reveal reveal-delay-${i + 1}`}>
              <span className="eyebrow">{c.client}</span>
              <span className="text-xs text-fg-3 mt-1">{c.profile}</span>
              <h3 className="h3 mt-5">{c.title}</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {c.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-line p-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-fg-3 line-through text-sm">{m.before}</span>
                      <ArrowRight width={12} height={12} className="text-fg-3" />
                      <span className="text-xl font-semibold text-teal">{m.after}</span>
                    </div>
                    <p className="text-[11px] text-fg-3 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Founders ---------- */

export function Founders({ full = false }: { full?: boolean }) {
  return (
    <section className="section" id="founders">
      <div className="container">
        {!full ? (
          <SectionHeading
            eyebrow="Who you will talk to"
            title={
              <>
                Three founders. <Em>No account managers.</Em>
              </>
            }
            lead="The person on your first call is the person who builds it and the person who answers when something breaks."
          />
        ) : null}
        <div className={`${full ? "" : "mt-12"} grid gap-4 md:grid-cols-3`}>
          {FOUNDERS.map((f, i) => {
            const todoName = isTodo(f.name);
            return (
              <div key={f.name + i} className={`glass p-7 reveal reveal-delay-${i + 1}`} id={todoName ? undefined : f.name.toLowerCase().replace(/\s+/g, "-")}>
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-3 to-bg-2 ring-1 ring-line">
                  {f.photo.endsWith(".svg") ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(127,216,240,0.25),transparent_60%)]" />
                      <span className="relative text-6xl font-semibold tracking-tight text-fg/80">
                        {todoName ? "?" : f.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span className="absolute bottom-4 text-xs text-fg-3">photo coming soon</span>
                    </div>
                  ) : (
                    <Image
                      src={f.photo}
                      alt={`${f.name}, ${f.role}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="h3 mt-6">{todoName ? "Founder" : f.name}</h3>
                <p className="text-fg-3 text-sm mt-1">{isTodo(f.role) ? "Co-founder" : f.role}</p>
                <ul className="mt-5 space-y-2 text-fg-2 text-sm">
                  {f.credentials.filter((c) => !isTodo(c)).map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <Check width={16} height={16} className="text-teal mt-0.5 flex-none" /> <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-4 text-sm">
                  {!isTodo(f.linkedin) ? (
                    <a href={f.linkedin} rel="noopener" className="inline-flex items-center gap-1.5 text-fg-2 hover:text-fg">
                      <Linkedin width={16} height={16} /> LinkedIn
                    </a>
                  ) : null}
                  {f.email ? (
                    <a href={`mailto:${f.email}`} className="text-fg-2 hover:text-fg underline-slide">
                      {f.email}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Compare table ---------- */

function Cell({ v }: { v: string }) {
  const s = v.toLowerCase();
  if (s === "yes") return <span className="inline-flex items-center gap-2 text-teal"><Check width={18} height={18} /> Yes</span>;
  if (s === "no") return <span className="inline-flex items-center gap-2 text-fg-3"><X width={18} height={18} /> No</span>;
  if (s === "partial" || s === "sometimes") return <span className="inline-flex items-center gap-2 text-amber"><Minus width={18} height={18} /> {v[0].toUpperCase() + v.slice(1)}</span>;
  return <span>{v}</span>;
}

export function CompareTable({
  title,
  columns,
  rows,
  highlightLast = true,
}: {
  title?: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
  highlightLast?: boolean;
}) {
  const last = columns.length - 1;
  return (
    <div className="glass p-2 sm:p-4 overflow-x-auto reveal">
      <table className="cmp min-w-[640px]">
        <caption className="sr-only">{title ?? "Comparison"}</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={highlightLast && i === last ? "hl" : ""}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="!normal-case !tracking-normal !text-fg font-medium">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={i} className={highlightLast && i === last ? "hl" : ""}>
                  <Cell v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HomeCompare() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Chatbot vs agent"
          title={
            <>
              {COMPARE.home.title.split(".")[0]}.<br />
              <Em>{COMPARE.home.title.split(".")[1]?.trim()}.</Em>
            </>
          }
          lead="Read only is a chatbot. Write access to your systems is an agent. That is the whole difference."
        />
        <div className="mt-12">
          <CompareTable columns={COMPARE.home.columns} rows={COMPARE.home.rows} />
        </div>
        <p className="mt-4 text-sm text-fg-3">
          Longer version: <Link href="/compare/chatbot-vs-ai-agent" className="underline-slide text-fg-2">chatbot vs AI agent</Link>.
        </p>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

export function PricingCards({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section bg-bg-2/50 border-y border-line" id="pricing">
      <div className="container">
        {withHeading ? (
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                A number in writing <Em>before we build.</Em>
              </>
            }
            lead={PRICING.intro}
          />
        ) : null}
        <div className={`${withHeading ? "mt-12" : ""} grid gap-4 md:grid-cols-3`}>
          {PRICING.tiers.map((t, i) => {
            const priceTodo = isTodo(t.price);
            return (
              <div key={t.name} className={`glass p-7 flex flex-col reveal reveal-delay-${i + 1} ${t.featured ? "ring-glow" : ""}`}>
                {t.featured ? <span className="eyebrow mb-3">Most start here</span> : <span className="eyebrow mb-3 opacity-0">.</span>}
                <h3 className="h3">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">{priceTodo ? "Priced" : t.price}</span>
                  <span className="text-fg-3 text-sm">{t.unit}</span>
                </div>
                <p className="mt-4 text-fg-2 leading-relaxed">{t.body}</p>
                <Link href={t.href} className={`btn ${t.featured ? "btn-primary" : "btn-ghost"} mt-auto justify-center`} style={{ marginTop: "1.75rem" }}>
                  {t.cta} <ArrowUpRight width={16} height={16} />
                </Link>
              </div>
            );
          })}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fg-2">
          {PRICING.principles.map((p) => (
            <li key={p} className="inline-flex items-center gap-2">
              <Check width={16} height={16} className="text-teal" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Guarantee ---------- */

export function Guarantee() {
  const g = SITE.guarantee;
  if (!g.enabled || isTodo(g.headline)) return null;
  return (
    <section className="container py-6">
      <div className="glass p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 ring-glow reveal">
        <div className="w-14 h-14 rounded-2xl grid place-items-center bg-teal/10 text-teal ring-1 ring-teal/30 flex-none">
          <Shield width={26} height={26} />
        </div>
        <div>
          <h3 className="h3">{g.headline}</h3>
          <p className="mt-2 text-fg-2 leading-relaxed">{g.body}</p>
          <p className="mt-2 text-xs text-fg-3">{g.fine}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function Faq({ items = FAQ, heading = true }: { items?: { q: string; a: string }[]; heading?: boolean }) {
  return (
    <section className="section" id="faq">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {heading ? (
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                The things people ask <Em>before they book.</Em>
              </>
            }
          />
        ) : (
          <div />
        )}
        <div className="divide-y divide-line reveal">
          {items.map((f) => (
            <details key={f.q} className="faq">
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand({ title, body }: { title?: React.ReactNode; body?: string }) {
  return (
    <section className="container pb-20">
      <div className="relative overflow-hidden rounded-[28px] border border-line p-10 md:p-16 text-center reveal">
        <div className="aurora" aria-hidden="true" />
        <div className="grid-fade" aria-hidden="true" />
        <div className="relative">
          <h2 className="h2 max-w-3xl mx-auto">
            {title ?? (
              <>
                Find out which agent pays for itself <Em>first.</Em>
              </>
            )}
          </h2>
          <p className="lead mt-5 max-w-2xl mx-auto">{body ?? SITE.calendarNote}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Book a free 30 minute call <ArrowUpRight width={16} height={16} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              How pricing works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
