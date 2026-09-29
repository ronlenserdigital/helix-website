import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES, INDUSTRIES, COMPARE, isTodo } from "@/lib/data";
import { Linkedin, Mail, Phone } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 border-t border-line bg-bg-2">
      <div className="container py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Image src="/brand/helix-horizontal-reverse.svg" alt={SITE.name} width={190} height={74} />
          <p className="mt-5 text-fg-2 leading-relaxed">{SITE.tagline}</p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-fg-2">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-fg">
              <Mail width={16} height={16} /> {SITE.email}
            </a>
            {!isTodo(SITE.phone) ? (
              <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 hover:text-fg">
                <Phone width={16} height={16} /> {SITE.phoneDisplay}
              </a>
            ) : null}
            <span>{SITE.city}. {SITE.region}.</span>
            <span>{SITE.hours}</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {!isTodo(SITE.socials.linkedin) ? (
              <a href={SITE.socials.linkedin} aria-label="LinkedIn" className="text-fg-3 hover:text-fg" rel="noopener">
                <Linkedin width={18} height={18} />
              </a>
            ) : null}
          </div>
        </div>

        <FooterCol title="What we build" links={SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
        <FooterCol
          title="Who it is for"
          links={[
            ...INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })),
            ...COMPARE.pages.map((p) => ({ href: `/compare/${p.slug}`, label: p.title.split(":")[0] })),
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "Founders" },
            { href: "/work", label: "Results" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Book a call" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]}
        />
      </div>
      <div className="container py-6 border-t border-line flex flex-col sm:flex-row gap-3 justify-between text-xs text-fg-3">
        <span>© {year} {SITE.name}. All rights reserved.</span>
        <span>Built with AI. Owned by you.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-fg-2 hover:text-fg underline-slide">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
