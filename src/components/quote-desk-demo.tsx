import Image from "next/image";

/**
 * Static illustration of the Quote Desk Agent flow, drawn as line-art UI cards
 * inside the hand-drawn browser frame. No canvas, no runtime cost.
 */
export default function QuoteDeskDemo() {
  return (
    <div className="frame relative overflow-hidden reveal">
      <div className="frame-bar">
        <i /> <i /> <i />
        <span className="ml-auto num">quote-desk-agent / live</span>
      </div>

      <div className="relative p-5 sm:p-6">
        {/* spot shapes */}
        <span className="halftone absolute -right-8 -top-8 w-32 h-32 opacity-60" aria-hidden="true" />
        <span className="hatch-yellow absolute -left-8 bottom-24 w-24 h-24" aria-hidden="true" />

        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
          {/* Request in */}
          <div className="card p-4 shadow-[3px_3px_0_0_var(--navy)] border-navy border-2">
            <div className="flex items-center justify-between">
              <span className="eyebrow !text-[0.6rem]">Inbox</span>
              <span className="text-[10px] font-mono text-gray-500">4:47pm</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-navy leading-snug">RFQ: 500 x petri dishes, 90mm, sterile</p>
            <p className="mt-1 text-[12px] text-gray-600 leading-snug">Need pricing and lead time by tomorrow. Ship to Raleigh.</p>
            <div className="mt-3 flex gap-1.5">
              <span className="h-1.5 w-10 rounded bg-gray-200" />
              <span className="h-1.5 w-6 rounded bg-gray-200" />
              <span className="h-1.5 w-8 rounded bg-gray-200" />
            </div>
          </div>

          {/* Agent */}
          <div className="flex flex-col items-center gap-2">
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-navy" aria-hidden="true">
              <path d="M2 9h26M22 3l7 6-7 6" />
            </svg>
            <div className="relative w-16 h-16 rounded-full border-2 border-navy bg-cream grid place-items-center">
              <span className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-300 animate-[spin_14s_linear_infinite]" aria-hidden="true" />
              <Image src="/brand/helix-symbol.svg" alt="" width={28} height={28} />
            </div>
            <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap">reading catalog</span>
            <svg width="34" height="18" viewBox="0 0 34 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-navy" aria-hidden="true">
              <path d="M2 9h26M22 3l7 6-7 6" />
            </svg>
          </div>

          {/* Quote out */}
          <div className="card p-4 shadow-[3px_3px_0_0_var(--navy)] border-navy border-2">
            <div className="flex items-center justify-between">
              <span className="eyebrow !text-[0.6rem]">Quote #4821</span>
              <span className="text-[10px] font-mono text-blue">sent 4:49pm</span>
            </div>
            <ul className="mt-2 space-y-1 text-[12px] text-gray-600">
              <li className="flex justify-between"><span>Petri dish 90mm, sterile</span><span className="text-navy font-semibold">500</span></li>
              <li className="flex justify-between"><span>Unit price</span><span className="text-navy font-semibold">$0.42</span></li>
              <li className="flex justify-between"><span>Lead time</span><span className="text-navy font-semibold">2 days</span></li>
            </ul>
            <div className="mt-3 flex items-center justify-between rounded bg-cream-2 px-2.5 py-1.5">
              <span className="text-[11px] text-gray-600">Total</span>
              <span className="font-display font-bold text-navy">$210.00</span>
            </div>
          </div>
        </div>

        {/* CRM + follow-up line */}
        <div className="relative mt-5 flex items-center gap-3 text-[12px] text-gray-600">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" /> Logged in GoHighLevel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow" /> Follow-up scheduled, +1 day
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red" /> Human loop: off-catalog items
          </span>
        </div>

        {/* Timeline */}
        <div className="relative mt-5 grid grid-cols-3 gap-3">
          {[
            ["4:47pm", "request in"],
            ["4:49pm", "quote sent"],
            ["+1 day", "follow-up"],
          ].map(([t, l], i) => (
            <div key={t} className="card-cream p-3 relative">
              <div className="font-display font-bold text-navy text-lg leading-none">{t}</div>
              <div className="text-xs text-gray-600 mt-1">{l}</div>
              {i < 2 ? (
                <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-px bg-navy hidden sm:block" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
