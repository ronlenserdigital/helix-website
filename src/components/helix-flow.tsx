import Image from "next/image";

/**
 * The Helix flow: request -> agent -> quote, connected by an animated double strand.
 * Drawn like a figure on a blueprint sheet when `dark`, like a figure on paper otherwise.
 */
export default function HelixFlow({ dark = false }: { dark?: boolean }) {
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
  const ink = dark ? "#ffffff" : "#0b1533";
  const line = dark ? "#ffd24d" : "#2457f5";
  const card = dark ? "plate card-marks" : "card card-marks";

  return (
    <div className="relative reveal">

      <ol className="relative grid gap-5 md:grid-cols-3 md:pb-10">
      <svg
        className="absolute inset-x-0 top-full -translate-y-[88px] w-full h-24 hidden md:block pointer-events-none"
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 12C110 12 90 48 200 48C310 48 290 84 400 84C510 84 490 48 600 48C710 48 690 12 800 12C910 12 890 48 1000 48C1110 48 1090 84 1200 84" stroke={ink} strokeWidth="1.4" strokeOpacity="0.8" />
        <path d="M0 84C110 84 90 48 200 48C310 48 290 12 400 12C510 12 490 48 600 48C710 48 690 84 800 84C910 84 890 48 1000 48C1110 48 1090 12 1200 12" stroke={line} strokeWidth="1.6" className="flow-path" />
      </svg>

        {steps.map((s, i) => (
          <li key={s.k} className={`${card} p-5 sm:p-6 relative `}>
            <div className="flex items-center justify-between">
              <span className="chapter">{s.label}</span>
              <span className="num">{s.time}</span>
            </div>
            <div className="mt-4 flex items-start gap-3">
              {i === 1 ? (
                <span className={`relative flex-none w-10 h-10 rounded-full grid place-items-center ${dark ? "bg-white" : "bg-navy"}`}>
                  <span className="absolute -inset-1.5 rounded-full orbit animate-[spin_16s_linear_infinite]" aria-hidden="true" />
                  <Image src={dark ? "/brand/helix-symbol.svg" : "/brand/helix-symbol-reverse.svg"} alt="" width={18} height={18} />
                </span>
              ) : (
                <span className={`flex-none w-10 h-10 rounded-full grid place-items-center border ${dark ? "border-white/40" : "border-gray-200 bg-cream"}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-yellow" : "bg-orange"}`} />
                </span>
              )}
              <div>
                <p className={`font-display font-semibold leading-snug ${dark ? "text-white" : "text-navy"}`}>{s.title}</p>
                <p className={`mt-1.5 text-sm leading-relaxed ${dark ? "" : "text-gray-600"}`}>{s.body}</p>
              </div>
            </div>
            <p className="mt-4 fig">{s.meta}</p>
            <span
              className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full -bottom-[7px] ${
                dark ? `ring-4 ring-[#0f2e7a] ${i === 1 ? "bg-yellow node-pulse" : "bg-white"}` : `ring-4 ring-cream ${i === 1 ? "bg-blue node-pulse" : "bg-navy"}`
              }`}
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>

      <div className={`mt-4 flex flex-wrap gap-2 text-[12px] ${dark ? "" : "text-gray-600"}`}>
        {[
          ["bg-teal", "Every step logged in your CRM"],
          ["bg-yellow", "Human approval for anything off-catalog"],
          ["bg-orange", "Reply goes out under your name"],
        ].map(([c, t]) => (
          <span key={t} className={`inline-flex items-center gap-1.5 px-3 py-1 border ${dark ? "border-white/30 rounded-[6px]" : "border-gray-200 bg-white rounded-[6px]"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c}`} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
