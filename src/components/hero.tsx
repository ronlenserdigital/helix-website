import Link from "next/link";
import HelixCanvas from "./helix-canvas";
import LeadForm from "./lead-form";
import { Bolt, Sparkles, Arc, Dot, Doodle } from "./doodles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]" id="top">
      {/* Doodles */}
      <Doodle style={{ left: "7%", top: 110, transform: "rotate(-12deg)" }}>
        <Bolt />
      </Doodle>
      <Doodle style={{ right: "9%", top: 96, transform: "rotate(10deg)" }}>
        <Arc />
      </Doodle>
      <Doodle style={{ left: "4%", top: 420, transform: "scaleX(-1) rotate(-20deg)" }}>
        <Arc />
      </Doodle>
      <Doodle style={{ right: "6%", top: 380 }}>
        <Sparkles />
      </Doodle>
      <Doodle style={{ left: "14%", top: 80 }}>
        <Dot />
      </Doodle>
      <Doodle style={{ right: "18%", top: 460 }}>
        <Dot />
      </Doodle>
      <span className="halftone absolute hidden md:block" style={{ right: "22%", top: 150, width: 120, height: 120, opacity: 0.7 }} aria-hidden="true" />
      <span className="hatch-red absolute hidden md:block" style={{ left: "24%", top: 110, width: 96, height: 96 }} aria-hidden="true" />

      <div className="container relative pt-16 md:pt-24 pb-10 text-center">
        <p className="eyebrow mb-6">AI agents for lab, medical, and B2B supply companies</p>
        <h1 className="display mx-auto max-w-5xl">
          Quote requests answered
          <br />
          in minutes, <span className="serif-em">not days.</span>
        </h1>
        <p className="lead mt-6 mx-auto max-w-2xl">
          Helix builds AI agents that answer quotes, chase reorders, and pick up the phone. Connected to your catalog and CRM. Fixed price. You own all of it.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn btn-primary">
            Talk With Us
          </Link>
          <Link href="/services/quote-desk-agent" className="btn btn-ghost">
            See the Quote Desk Agent
          </Link>
        </div>
      </div>

      <div className="container relative grid gap-8 lg:grid-cols-[1fr_1fr] items-stretch pb-16 md:pb-24">
        <div className="frame relative overflow-hidden h-[420px] lg:h-auto lg:min-h-[520px] reveal">
          <div className="frame-bar">
            <i /> <i /> <i />
            <span className="ml-auto num">quote-desk-agent / live</span>
          </div>
          <div className="absolute inset-x-0 top-[42px] bottom-0">
            <HelixCanvas />
            <div className="absolute left-5 bottom-5 right-5 grid grid-cols-3 gap-3 text-left">
              {[
                ["4:47pm", "request in"],
                ["4:49pm", "quote sent"],
                ["+1 day", "follow-up"],
              ].map(([t, l]) => (
                <div key={t} className="card-cream p-3">
                  <div className="font-display font-bold text-navy text-lg leading-none">{t}</div>
                  <div className="text-xs text-gray-600 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-1">
          <LeadForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
