import Link from "next/link";
import HelixFlow from "./helix-flow";
import LeadForm from "./lead-form";
import { SITE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]" id="top">
      {/* Signature: a vertical strand in the left margin, only on wide screens */}
      <span className="strand-v absolute left-6 top-24 bottom-24 hidden xl:block" aria-hidden="true" />
      <span className="spot-blue absolute -right-48 top-40 w-[420px] h-[420px] hidden lg:block" aria-hidden="true" />
      <span className="rungs absolute right-[14%] top-28 w-40 h-3 hidden lg:block" aria-hidden="true" />

      <div className="container relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center pt-14 md:pt-20 pb-12">
        <div>
          <p className="chapter mb-6">Helix Research Technologies · Fredericksburg, VA</p>
          <h1 className="display" style={{ fontSize: "clamp(2.5rem, 4.6vw, 4.2rem)" }}>
            The quote goes out before the buyer <span className="serif-em">finishes their coffee.</span>
          </h1>
          <p className="lead mt-7 max-w-xl">
            We build AI agents for lab, medical, and industrial supply companies. They read the request, price it from your catalog, send the quote, and chase the reply. Fixed price. Your accounts, your data, your code.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary">
              Book 30 minutes with a founder
            </Link>
            <Link href="/services/quote-desk-agent" className="btn btn-ghost">
              How the Quote Desk works
            </Link>
          </div>
          <dl className="mt-9 grid grid-cols-3 gap-4 max-w-md border-t border-gray-200 pt-5">
            {SITE.stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-mono uppercase tracking-wide text-gray-500">{s.label}</dt>
                <dd className="font-display font-bold text-navy text-xl mt-0.5">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal reveal-delay-1">
          <LeadForm variant="hero" />
        </div>
      </div>

      <div className="container relative pb-16 md:pb-24">
        <div className="heading-row mb-8">
          <h2 className="h3">What a Tuesday afternoon looks like with a Quote Desk Agent on the inbox.</h2>
          <p className="text-gray-600 text-sm lg:text-right">Real flow. Placeholder numbers until a client approves theirs.</p>
        </div>
        <HelixFlow />
      </div>
    </section>
  );
}
