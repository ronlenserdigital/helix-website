import Link from "next/link";
import { SITE, SERVICES, INDUSTRIES, COMPARE, isTodo } from "@/lib/data";
import { ArrowUpRight, Linkedin } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: "Company",
      links: [
        { href: "/about", label: "Founders" },
        { href: "/pricing", label: "Pricing" },
        { href: "/contact", label: "Book a call" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ],
    },
    { title: "What we build", links: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name })) },
    { title: "Who it is for", links: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })) },
    {
      title: "Compare",
      links: [...COMPARE.pages.map((p) => ({ href: `/compare/${p.slug}`, label: p.title.split(":")[0] })), { href: "/work", label: "Results" }],
    },
  ];

  return (
    <footer className="section-dark mt-10 relative overflow-hidden">
      <div className="container pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="relative">
            <h2 className="h2 !text-cream max-w-xs">
              Your quote desk,
              <br />
              but faster.
            </h2>
            <span className="halftone-light absolute -right-2 top-0 w-28 h-28 opacity-60 hidden lg:block" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="eyebrow mb-3 !text-gray-500">{c.title}</h3>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="foot-link">
                        <span>{l.label}</span>
                        <ArrowUpRight width={14} height={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-[2fr_1fr] border border-cream/30 rounded-xl overflow-hidden">
          <div className="p-7">
            <p className="font-display font-bold text-cream text-lg leading-snug">
              Talk to a founder, not a form. {SITE.responseTime}.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-300">
              <a href={`mailto:${SITE.email}`} className="hover:text-white underline-slide">
                {SITE.email}
              </a>
              {!isTodo(SITE.phone) ? (
                <a href={`tel:${SITE.phone}`} className="hover:text-white underline-slide">
                  {SITE.phoneDisplay}
                </a>
              ) : null}
              <span>{SITE.city}. {SITE.hours}.</span>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t md:border-t-0 md:border-l border-cream/30">
            <Link href="/contact" className="grid place-items-center p-6 text-cream hover:bg-cream/10 border-r border-cream/30 font-display font-bold">
              Book
            </Link>
            {!isTodo(SITE.socials.linkedin) ? (
              <a href={SITE.socials.linkedin} rel="noopener" aria-label="LinkedIn" className="grid place-items-center p-6 text-cream hover:bg-cream/10">
                <Linkedin width={28} height={28} />
              </a>
            ) : (
              <a href={`mailto:${SITE.email}`} className="grid place-items-center p-6 text-cream hover:bg-cream/10 font-display font-bold">
                Email
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 wordmark" aria-hidden="true">
          HELIX
        </div>

        <div className="mt-8 pt-6 border-t border-cream/20 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-300">
          <span>© {year} {SITE.name}. Established {SITE.foundingYear}.</span>
          <span>Built with AI. Owned by you.</span>
        </div>
      </div>
    </footer>
  );
}
