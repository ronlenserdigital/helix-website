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
    <section className="relative overflow-hidden pt-[72px]">
      <span className="strand-v absolute left-6 top-24 bottom-10 hidden xl:block" aria-hidden="true" />
      <span className="spot-blue absolute -right-40 -top-40 w-[480px] h-[480px] hidden lg:block" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="heading-row">
          <div>
            {eyebrow ? <p className="chapter mb-5">{eyebrow}</p> : null}
            <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)" }}>
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
