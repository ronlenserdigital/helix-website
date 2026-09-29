import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, CASES, FOUNDERS, BADGES, FAQ, PRICING, COMPARE, isTodo } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Check, Minus, X, ServiceIcon, Linkedin } from "./icons";
import { IconChat, IconClock, IconGears, IconBulb, IconTarget, IconPeople, IconTag, IconQuestion, Sparkles, CurlArrow, Doodle, Bolt, Arc } from "./doodles";

/* ---------- Shared bits ---------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  icon,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  icon?: React.ReactNode;
}) {
  return (
    <div className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className={`h2 ${icon ? "kicker-title" : ""} ${align === "center" ? "justify-center" : ""}`}>
        {icon}
        <span>{title}</span>
      </h2>
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
    <section aria-label="Tools we build with" className="relative py-10">
      <p className="eyebrow text-center mb-6">Built on tools your team already trusts</p>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((b, i) => (
            <div key={b.name + i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="font-display font-bold text-navy text-xl tracking-tight">{b.name}</span>
              <span className="text-gray-500 text-sm">{b.note}</span>
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
    <section className="container py-8">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SITE.stats.map((s, i) => (
          <div key={s.label} className={`card p-6 reveal reveal-delay-${i + 1} flex flex-col-reverse gap-2`}>
            <dt className="text-gray-600 text-sm">{s.label}</dt>
            <dd className="font-display font-bold text-4xl text-navy tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Problem ---------- */

export function Problem() {
  const pains = [
    { t: "The 4:47pm quote", d: "A buyer sends a part number and a quantity. It sits in a shared inbox until tomorrow. By then they have three other prices.", icon: IconClock, spot: "hatch-red" },
    { t: "The quiet reorder", d: "A good account reorders every 6 weeks. Week 7 goes by. Nobody noticed, so they ordered from the rep who texted back.", icon: IconTag, spot: "hatch-yellow" },
    { t: "The lunch-hour voicemail", d: "Peak call time is when your team is busiest. Voicemail is where orders go to die.", icon: IconChat, spot: "blob-teal" },
  ];
  return (
    <section className="section">
      <Doodle style={{ right: "5%", top: 40 }}>
        <Sparkles />
      </Doodle>
      <div className="container">
        <SectionHeading
          icon={<IconTarget />}
          title={
            <>
              Supply companies do not lose deals on price. They lose them on <Em>hours.</Em>
            </>
          }
          lead="Every one of these is a small delay that costs a real order. An agent closes the gap without adding headcount."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pains.map((p, i) => (
            <div key={p.t} className={`card glass-hover p-7 reveal reveal-delay-${i + 1} relative overflow-hidden`}>
              <span className={`${p.spot} absolute -right-6 -top-6 w-24 h-24`} aria-hidden="true" />
              <div className="relative text-navy">
                <p.icon />
              </div>
              <h3 className="h3 mt-6">{p.t}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{p.d}</p>
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
            icon={<IconGears />}
            title={
              <>
                Agents named by the job they <Em>actually do.</Em>
              </>
            }
            lead="Not chatbots. Agents with access to your catalog, your CRM, and your calendar, doing one job end to end."
          />
        ) : null}
        <div className={`${compact ? "" : "mt-12"} grid gap-4 lg:grid-cols-3`}>
          <Link href={`/services/${flagship.slug}`} className="card-navy glass-hover p-8 lg:row-span-2 flex flex-col reveal relative overflow-hidden">
            <span className="halftone-light absolute -right-10 -bottom-10 w-44 h-44 opacity-50" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <span className="eyebrow !text-blue-300">{flagship.eyebrow}</span>
              <span className="num !text-gray-300">{flagship.timeline}</span>
            </div>
            <div className="w-12 h-12 mt-8 rounded-xl grid place-items-center bg-cream text-navy">
              <ServiceIcon name={flagship.icon} width={22} height={22} />
            </div>
            <h3 className="font-display font-bold text-cream mt-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              {flagship.name}
            </h3>
            <p className="mt-4 text-gray-300 leading-relaxed text-lg">{flagship.short}</p>
            <ul className="mt-6 space-y-2.5 text-gray-300">
              {flagship.bullets.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="text-yellow mt-0.5 flex-none" width={18} height={18} /> <span>{b}</span>
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-8 inline-flex items-center gap-2 text-cream font-display font-semibold">
              See how it works <ArrowUpRight width={16} height={16} />
            </span>
          </Link>
          {rest.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={`card glass-hover p-7 flex flex-col reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="flex items-center justify-between">
                <span className="eyebrow">{s.eyebrow}</span>
                <span className="num">{s.timeline}</span>
              </div>
              <div className="w-11 h-11 mt-6 rounded-xl grid place-items-center bg-blue-100 text-blue">
                <ServiceIcon name={s.icon} width={20} height={20} />
              </div>
              <h3 className="h3 mt-5">{s.name}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{s.short}</p>
              <span className="mt-auto pt-6 link-arrow text-sm">
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
    { n: "01", t: "Audit", d: "One call, then we read how quotes, orders, and follow-ups actually move. You get a written plan with a fixed price and a date.", when: "Week 1", icon: IconBulb },
    { n: "02", t: "Build", d: "We connect the agent to your catalog, CRM, calendar, and inbox. You see it working on real requests before launch.", when: "Weeks 2 to 4", icon: IconGears },
    { n: "03", t: "Launch", d: "It goes live on one channel first. Your team keeps every approval it wants. Nothing goes out that you did not sign off on.", when: "Launch day", icon: IconTarget },
    { n: "04", t: "Tune", d: "30 days of watching real conversations, fixing edge cases, and widening what the agent may handle on its own.", when: "Days 1 to 30", icon: IconClock },
  ];
  return (
    <section className="section">
      <Doodle style={{ left: "6%", top: 60, transform: "rotate(15deg)" }}>
        <Bolt />
      </Doodle>
      <div className="container">
        <SectionHeading
          icon={<Sparkles />}
          align="center"
          title={
            <>
              Four weeks from first call to an agent <Em>doing the work.</Em>
            </>
          }
        />
        <ol className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((s, i) => (
            <li key={s.n} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              {i < steps.length - 1 ? (
                <span className="hidden lg:block absolute -right-10 top-4 text-navy opacity-70" aria-hidden="true">
                  <CurlArrow width={64} style={{ transform: i % 2 ? "scaleY(-1)" : undefined }} />
                </span>
              ) : null}
              <div className="mx-auto w-24 h-24 rounded-full grid place-items-center text-navy relative">
                <span className={`absolute inset-0 rounded-full ${["hatch-yellow", "halftone", "hatch-red", "blob-teal"][i]} opacity-60`} aria-hidden="true" />
                <span className="relative">
                  <s.icon width={44} />
                </span>
              </div>
              <span className="num block mt-5">{s.when}</span>
              <h3 className="h3 mt-2">{s.t}:</h3>
              <p className="mt-3 text-gray-600 leading-relaxed text-[0.95rem] max-w-xs mx-auto">{s.d}</p>
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
            icon={<IconChat />}
            title={
              <>
                Before and after, <Em>in numbers.</Em>
              </>
            }
            lead={hasPlaceholders ? "Target outcomes we build toward on every engagement. Named case studies are published as clients approve them." : undefined}
          />
          <Link href="/work" className="btn btn-ghost self-start lg:self-auto">
            View All Results
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className={`card glass-hover p-7 flex flex-col reveal reveal-delay-${i + 1}`}>
              <span className="eyebrow">{c.client}</span>
              <span className="text-xs text-gray-500 mt-1">{c.profile}</span>
              <h3 className="h3 mt-5">{c.title}</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {c.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg bg-cream border border-gray-200 p-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-500 line-through text-sm">{m.before}</span>
                      <ArrowRight width={12} height={12} className="text-gray-500" />
                      <span className="font-display font-bold text-xl text-blue">{m.after}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
              <span className="mt-auto pt-6 link-arrow text-sm">
                Read <ArrowUpRight width={14} height={14} />
              </span>
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
            icon={<IconPeople />}
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
              <div key={f.name + i} className={`card p-6 reveal reveal-delay-${i + 1}`} id={todoName ? undefined : f.name.toLowerCase().replace(/\s+/g, "-")}>
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-cream border border-gray-200">
                  {f.photo.endsWith(".svg") ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className={`absolute right-4 top-4 w-16 h-16 ${["hatch-yellow", "halftone", "hatch-red"][i % 3]}`} aria-hidden="true" />
                      <span className="relative font-display font-bold text-6xl text-navy">
                        {todoName ? "?" : f.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span className="absolute bottom-4 text-xs text-gray-500">photo coming soon</span>
                    </div>
                  ) : (
                    <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  )}
                </div>
                <h3 className="h3 mt-6">{todoName ? "Founder" : f.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{isTodo(f.role) ? "Co-founder" : f.role}</p>
                <ul className="mt-5 space-y-2 text-gray-600 text-sm">
                  {f.credentials.filter((c) => !isTodo(c)).map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <Check width={16} height={16} className="text-blue mt-0.5 flex-none" /> <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-4 text-sm">
                  {!isTodo(f.linkedin) ? (
                    <a href={f.linkedin} rel="noopener" className="link-arrow">
                      <Linkedin width={16} height={16} /> LinkedIn
                    </a>
                  ) : null}
                  {f.email ? (
                    <a href={`mailto:${f.email}`} className="text-gray-600 hover:text-navy underline-slide">
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
  if (s === "yes") return <span className="inline-flex items-center gap-2 text-blue font-semibold"><Check width={18} height={18} /> Yes</span>;
  if (s === "no") return <span className="inline-flex items-center gap-2 text-gray-500"><X width={18} height={18} /> No</span>;
  if (s === "partial" || s === "sometimes") return <span className="inline-flex items-center gap-2 text-navy-3"><Minus width={18} height={18} /> {v[0].toUpperCase() + v.slice(1)}</span>;
  return <span className="text-navy">{v}</span>;
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
    <div className="card p-2 sm:p-4 overflow-x-auto reveal">
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
              <th scope="row" className="!normal-case !tracking-normal !text-navy !text-[0.95rem]">
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
      <Doodle style={{ right: "7%", top: 30, transform: "rotate(25deg)" }}>
        <Arc />
      </Doodle>
      <div className="container">
        <SectionHeading
          icon={<IconQuestion />}
          title={
            <>
              {COMPARE.home.title.split(".")[0]}. <Em>{COMPARE.home.title.split(".")[1]?.trim()}.</Em>
            </>
          }
          lead="Read only is a chatbot. Write access to your systems is an agent. That is the whole difference."
        />
        <div className="mt-12">
          <CompareTable columns={COMPARE.home.columns} rows={COMPARE.home.rows} />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Longer version: <Link href="/compare/chatbot-vs-ai-agent" className="link-arrow">chatbot vs AI agent</Link>.
        </p>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

export function PricingCards({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section section-dark" id="pricing">
      <div className="container">
        {withHeading ? (
          <div className="text-center max-w-2xl mx-auto reveal">
            <span className="inline-grid place-items-center w-14 h-14 rounded-full border-2 border-cream text-cream mb-6">
              <IconClock width={30} />
            </span>
            <h2 className="h2">Three ways in. One mission: your hours back.</h2>
            <p className="lead mt-4">{PRICING.intro}</p>
          </div>
        ) : null}
        <div className={`${withHeading ? "mt-12" : ""} grid gap-5 md:grid-cols-3`}>
          {PRICING.tiers.map((t, i) => {
            const priceTodo = isTodo(t.price);
            return (
              <div key={t.name} className={`glass p-8 flex flex-col reveal reveal-delay-${i + 1} ${t.featured ? "ring-glow" : ""}`}>
                <h3 className="font-display font-bold text-navy text-2xl text-center">
                  <span className="hand-underline">{t.name}</span>
                </h3>
                <p className="mt-7 text-gray-600 leading-relaxed text-center">{t.body}</p>
                <div className="pill-price mt-8">
                  {priceTodo ? "Priced" : t.price}
                  <small>/{t.unit}</small>
                </div>
                <Link href={t.href} className="btn btn-ghost mt-4 !bg-white !border-gray-200">
                  {t.cta}
                </Link>
              </div>
            );
          })}
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-300">
          {PRICING.principles.map((p) => (
            <li key={p} className="inline-flex items-center gap-2">
              <Check width={16} height={16} className="text-yellow" /> {p}
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
    <section className="container py-8">
      <div className="card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 ring-glow reveal">
        <div className="w-14 h-14 rounded-full grid place-items-center bg-yellow text-navy flex-none">
          <IconTarget width={30} />
        </div>
        <div>
          <h3 className="h3">{g.headline}</h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{g.body}</p>
          <p className="mt-2 text-xs text-gray-500">{g.fine}</p>
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
            icon={<IconQuestion />}
            title={
              <>
                The things people ask <Em>before they book.</Em>
              </>
            }
          />
        ) : (
          <div />
        )}
        <div className="divide-y divide-gray-200 reveal">
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
    <section className="container pb-24 pt-8 relative">
      <Doodle style={{ left: "10%", top: 20 }}>
        <Sparkles />
      </Doodle>
      <Doodle style={{ right: "12%", bottom: 40, transform: "rotate(-20deg)" }}>
        <Bolt />
      </Doodle>
      <div className="relative text-center max-w-3xl mx-auto reveal">
        <h2 className="h2">
          {title ?? (
            <>
              Find out which agent pays for itself <Em>first.</Em>
            </>
          )}
        </h2>
        <p className="lead mt-5 max-w-2xl mx-auto">{body ?? SITE.calendarNote}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn btn-primary">
            Book 30 Minutes Free
          </Link>
          <Link href="/pricing" className="btn btn-ghost">
            How pricing works
          </Link>
        </div>
      </div>
    </section>
  );
}
