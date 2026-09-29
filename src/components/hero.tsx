import Link from "next/link";
import HelixCanvas from "./helix-canvas";
import LeadForm from "./lead-form";
import { Em } from "./sections";
import { ArrowUpRight } from "./icons";
import { SITE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[68px] noise" id="top">
      <div className="aurora" aria-hidden="true" />
      <div className="grid-fade" aria-hidden="true" />

      {/* Helix stage: full-bleed on desktop, sits behind copy */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[72%] opacity-70 lg:opacity-90 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:from-bg lg:via-bg/30 lg:to-transparent" />
        <HelixCanvas />
      </div>

      <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center min-h-[calc(100svh-68px)] py-16 lg:py-20">
        <div className="relative">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse" />
            AI agents for lab, medical, and B2B supply companies
          </p>
          <h1 className="display">
            Quote requests answered
            <br />
            in minutes, <Em>not days.</Em>
          </h1>
          <p className="lead mt-7 max-w-xl">
            Helix builds AI agents that answer quotes, chase reorders, and pick up the phone for supply companies. Connected to your catalog and CRM. Fixed price. You own all of it.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary">
              Book a free 30 minute call <ArrowUpRight width={16} height={16} />
            </Link>
            <Link href="/services/quote-desk-agent" className="btn btn-ghost">
              See the Quote Desk Agent
            </Link>
          </div>
          <p className="mt-6 text-sm text-fg-3">
            Not ready to talk?{" "}
            <Link href="/pricing" className="underline-slide text-fg-2">
              See how pricing works
            </Link>{" "}
            or{" "}
            <a href={`mailto:${SITE.email}`} className="underline-slide text-fg-2">
              email a founder
            </a>
            .
          </p>
        </div>

        <div className="relative lg:justify-self-end w-full max-w-xl">
          <LeadForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
