import Link from "next/link";
import { Bolt, Arc, Sparkles, Dot, Doodle } from "./doodles";

export default function PageHero({
  eyebrow,
  title,
  lead,
  cta = true,
  children,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  cta?: boolean;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <Doodle style={{ left: "6%", top: 120, transform: "rotate(-12deg)" }}>
        <Bolt />
      </Doodle>
      <Doodle style={{ right: "8%", top: 110, transform: "rotate(10deg)" }}>
        <Arc />
      </Doodle>
      <Doodle style={{ right: "16%", top: 300 }}>
        <Sparkles />
      </Doodle>
      <Doodle style={{ left: "18%", top: 90 }}>
        <Dot />
      </Doodle>
      <span className="halftone absolute hidden md:block" style={{ right: "26%", top: 130, width: 110, height: 110, opacity: 0.6 }} aria-hidden="true" />
      <div className={`container relative py-16 lg:py-24 ${center ? "text-center" : ""}`}>
        <div className={`max-w-4xl ${center ? "mx-auto" : ""}`}>
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)" }}>
            {title}
          </h1>
          {lead ? <p className={`lead mt-6 max-w-2xl ${center ? "mx-auto" : ""}`}>{lead}</p> : null}
          {cta ? (
            <div className={`mt-8 flex flex-col sm:flex-row gap-3 ${center ? "justify-center" : ""}`}>
              <Link href="/contact" className="btn btn-primary">
                Book 30 Minutes Free
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                How pricing works
              </Link>
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
