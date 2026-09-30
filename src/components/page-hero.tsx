import Link from "next/link";

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
  align?: "center" | "left";
}) {
  return (
    <section className="section-dark relative overflow-hidden pt-[72px]">
      <span className="crosshair text-white left-8 top-28 hidden lg:block" aria-hidden="true" />
      <span className="crosshair text-white right-8 bottom-8 hidden lg:block" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="heading-row">
          <div>
            {eyebrow ? <p className="chapter mb-5">{eyebrow}</p> : null}
            <h1 className="display text-white" style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)" }}>
              {title}
            </h1>
          </div>
          <div>
            {lead ? <p className="lead">{lead}</p> : null}
            {cta ? (
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Book 30 minutes with a founder
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  How pricing works
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
