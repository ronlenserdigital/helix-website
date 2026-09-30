import Link from "next/link";
import HelixFlow from "./helix-flow";
import LeadForm from "./lead-form";
import { SITE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="section-dark relative overflow-hidden pt-[72px]" id="top">
      {/* drafting marks */}
      <span className="crosshair text-white left-8 top-28 hidden lg:block" aria-hidden="true" />
      <span className="crosshair text-white right-8 bottom-10 hidden lg:block" aria-hidden="true" />
      <span className="fig absolute left-8 top-[92px] hidden lg:block">Sheet 01 · helixresearchtech.com · rev {SITE.foundingYear}.09</span>
      <span className="fig absolute right-8 top-[92px] hidden lg:block">Scale: one quote = one order</span>

      <div className="container relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center pt-16 md:pt-24 pb-12">
        <div>
          <p className="chapter mb-6">Fig. 0 · AI agents for supply companies</p>
          <h1 className="display text-white" style={{ fontSize: "clamp(2.5rem, 4.8vw, 4.4rem)" }}>
            The quote goes out before the buyer <span className="serif-em">finishes their coffee.</span>
          </h1>
          <p className="lead mt-7 max-w-xl">
            Helix builds AI agents for lab, medical, and industrial supply companies. They read the request, price it from your catalog, send the quote, and chase the reply. Fixed price. Your accounts, your data, your code.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary">
              Book 30 minutes with a founder
            </Link>
            <Link href="/services/quote-desk-agent" className="btn btn-ghost">
              How the Quote Desk works
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            {SITE.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="text-white">
                <span className="dim block mb-3 text-white" aria-hidden="true" />
                <dd className="font-display font-bold text-2xl">{s.value}</dd>
                <dt className="fig !text-[#9fb0e6] mt-1 normal-case tracking-normal">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal reveal-delay-1">
          <LeadForm variant="hero" />
        </div>
      </div>

      <div className="container relative pb-16 md:pb-24">
        <div className="heading-row mb-8 items-end">
          <div>
            <p className="fig mb-2">Fig. 1 · Quote Desk Agent, one request</p>
            <h2 className="h3 text-white">A Tuesday afternoon with an agent on the inbox.</h2>
          </div>
          <p className="text-sm lg:text-right" style={{ color: "#c9d3f2" }}>Real flow. Placeholder numbers until a client approves theirs.</p>
        </div>
        <HelixFlow dark />
      </div>
    </section>
  );
}
