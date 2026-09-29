import Link from "next/link";
import { ArrowUpRight } from "./icons";

export default function PageHero({
  eyebrow,
  title,
  lead,
  cta = true,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  cta?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-[68px] noise">
      <div className="aurora" aria-hidden="true" />
      <div className="grid-fade" aria-hidden="true" />
      <div className="container relative py-20 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h1 className="display" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            {title}
          </h1>
          {lead ? <p className="lead mt-6 max-w-2xl">{lead}</p> : null}
          {cta ? (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary">
                Book a free 30 minute call <ArrowUpRight width={16} height={16} />
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                How pricing works
              </Link>
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
