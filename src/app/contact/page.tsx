import type { Metadata } from "next";
import { SITE, isTodo } from "@/lib/data";
import PageHero from "@/components/page-hero";
import LeadForm from "@/components/lead-form";
import { Em } from "@/components/sections";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Check, Mail, Phone } from "@/components/icons";
import SentSwitch from "@/components/contact-sent";

export const metadata: Metadata = {
  title: "Book a free 30 minute call",
  description: "Tell us where quotes, reorders, or calls are leaking and we will tell you honestly whether an agent pays for itself. Reply within one business day.",
  alternates: { canonical: "/contact" },
};

const CAL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;

export default function ContactPage() {
  const heroSent = (
    <PageHero
      eyebrow="Book a call"
      title={
        <>
          Got it. <Em>Pick a time.</Em>
        </>
      }
      lead="Your details are in. Grab a slot below and we will come to the call with your site audit done."
      cta={false}
    />
  );
  const heroDefault = (
    <PageHero
      eyebrow="Book a call"
      title={
        <>
          Thirty minutes. <Em>No pitch deck.</Em>
        </>
      }
      lead={SITE.calendarNote}
      cta={false}
    />
  );

  return (
    <>
      <SentSwitch sent={heroSent} notSent={heroDefault} />

      <section className="section pt-0" id="book">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="glass p-3 sm:p-4 reveal min-h-[560px]">
            {CAL ? (
              <iframe
                src={CAL}
                title="Book a call with Helix"
                className="w-full h-[760px] rounded-2xl bg-transparent"
                loading="lazy"
              />
            ) : (
              <div className="h-full min-h-[520px] rounded-2xl border border-dashed border-gray-300 grid place-items-center text-center p-8">
                <div>
                  <p className="eyebrow mb-3">Calendar</p>
                  <p className="text-gray-600 max-w-sm">
                    Booking calendar loads here once <span className="mono text-navy">NEXT_PUBLIC_GHL_CALENDAR_URL</span> is set. Until then, use the form or email a founder.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <SentSwitch sent={null} notSent={<LeadForm variant="page" title="Or send the details first" />} />
            <div className="glass p-7 reveal">
              <p className="eyebrow mb-4">On the call</p>
              <ul className="space-y-2.5 text-gray-600">
                {[
                  "How quotes, orders, and follow-ups move through your business today",
                  "Which agent would pay for itself first, and roughly what it costs",
                  "A written scope and fixed price within two business days, if it fits",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check width={18} height={18} className="text-navy mt-0.5 flex-none" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="hairline my-6" />
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-navy">
                  <Mail width={16} height={16} /> {SITE.email}
                </a>
                {!isTodo(SITE.phone) ? (
                  <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 hover:text-navy">
                    <Phone width={16} height={16} /> {SITE.phoneDisplay}
                  </a>
                ) : null}
                <span className="text-gray-500">{SITE.hours}. {SITE.responseTime}.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Book a call", path: "/contact" }]} />
    </>
  );
}
