import Image from "next/image";

/**
 * The Helix flow: request -> agent -> quote, connected by an animated double strand.
 * Our own illustration language: cards on a strand, nodes where the work happens.
 */
export default function HelixFlow() {
  const steps = [
    {
      k: "in",
      label: "Request in",
      time: "4:47pm",
      title: "RFQ: 500 x petri dishes, 90mm, sterile",
      body: "Need pricing and lead time by tomorrow. Ship to Raleigh.",
      meta: "email from a lab manager",
    },
    {
      k: "agent",
      label: "Helix reads",
      time: "4:48pm",
      title: "Catalog match: SKU PD-90-S, in stock",
      body: "Account pricing applied. Lead time from warehouse feed. Nothing off-catalog, no approval needed.",
      meta: "agent, 41 seconds",
    },
    {
      k: "out",
      label: "Quote out",
      time: "4:49pm",
      title: "Quote #4821 sent. $210.00, 2 days.",
      body: "Logged in GoHighLevel. Follow-up scheduled for tomorrow 9am if no reply.",
      meta: "sent from your inbox",
    },
  ];

  return (
    <div className="relative reveal">
      {/* strand behind the cards */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24 hidden md:block"
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 48c150-60 300-60 450 0s300 60 450 0 200-60 300 0" stroke="#0e1c2d" strokeWidth="1.6" strokeOpacity="0.9" />
        <path d="M0 48c150 60 300 60 450 0s300-60 450 0 200 60 300 0" stroke="#1566b9" strokeWidth="1.6" className="flow-path" />
      </svg>

      <ol className="relative grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.k} className={`card p-5 sm:p-6 relative ${i === 1 ? "md:-translate-y-6" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="chapter">{s.label}</span>
              <span className="num">{s.time}</span>
            </div>
            <div className="mt-4 flex items-start gap-3">
              {i === 1 ? (
                <span className="relative flex-none w-10 h-10 rounded-full bg-navy grid place-items-center">
                  <span className="absolute -inset-1.5 rounded-full orbit animate-[spin_16s_linear_infinite]" aria-hidden="true" />
                  <Image src="/brand/helix-symbol-reverse.svg" alt="" width={18} height={18} />
                </span>
              ) : (
                <span className="flex-none w-10 h-10 rounded-full bg-cream border border-gray-200 grid place-items-center">
                  <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-yellow" : "bg-blue"}`} />
                </span>
              )}
              <div>
                <p className="font-display font-semibold text-navy leading-snug">{s.title}</p>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] font-mono text-gray-500">{s.meta}</p>
            {/* node on the strand */}
            <span
              className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ring-4 ring-cream ${i === 1 ? "bg-blue node-pulse -bottom-[7px]" : "bg-navy -bottom-[7px]"}`}
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-gray-600">
        {[
          ["bg-teal", "Every step logged in your CRM"],
          ["bg-yellow", "Human approval for anything off-catalog"],
          ["bg-blue", "Reply goes out under your name"],
        ].map(([c, t]) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1">
            <span className={`w-1.5 h-1.5 rounded-full ${c}`} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
