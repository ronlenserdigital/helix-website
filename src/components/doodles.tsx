import type { SVGProps, CSSProperties } from "react";

type P = SVGProps<SVGSVGElement>;
const line = (p: P) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

/** Hand-drawn lightning bolt */
export const Bolt = (p: P) => (
  <svg viewBox="0 0 48 64" width="40" {...line(p)}>
    <path d="M28 4 8 34h14l-6 26 24-34H26z" />
    <path d="M14 26 6 38" />
  </svg>
);

/** Four point sparkle */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 48 48" width="34" {...line(p)}>
    <path d="M24 4c1 10 6 16 20 20-14 4-19 10-20 20-1-10-6-16-20-20 14-4 19-10 20-20z" />
  </svg>
);

/** Small three-star cluster */
export const Sparkles = (p: P) => (
  <svg viewBox="0 0 64 48" width="44" {...line(p)}>
    <path d="M22 6c1 8 5 12 14 14-9 2-13 6-14 14-1-8-5-12-14-14 9-2 13-6 14-14z" />
    <path d="M48 24c.5 4 2.5 6 7 7-4.5 1-6.5 3-7 7-.5-4-2.5-6-7-7 4.5-1 6.5-3 7-7z" />
    <path d="M10 34c.4 3 2 4.5 5 5-3 .5-4.6 2-5 5-.4-3-2-4.5-5-5 3-.5 4.6-2 5-5z" />
  </svg>
);

/** Arc squiggle */
export const Arc = (p: P) => (
  <svg viewBox="0 0 64 64" width="52" {...line(p)}>
    <path d="M6 10c22 4 40 22 44 48" />
  </svg>
);

/** Curly arrow */
export const CurlArrow = (p: P) => (
  <svg viewBox="0 0 96 64" width="80" {...line(p)}>
    <path d="M6 44c14-30 40-34 54-14 8 12 0 26-10 24-9-2-8-16 4-18 14-2 26 8 34 20" />
    <path d="M80 44l8 12 4-14" />
  </svg>
);

/** Wavy underline strip */
export const Wave = (p: P) => (
  <svg viewBox="0 0 120 16" width="110" {...line(p)}>
    <path d="M2 10c10-8 18-8 28 0s18 8 28 0 18-8 28 0 18 8 30 0" />
  </svg>
);

/** Dot */
export const Dot = (p: P) => (
  <svg viewBox="0 0 8 8" width="7" fill="currentColor" aria-hidden {...p}>
    <circle cx="4" cy="4" r="3.5" />
  </svg>
);

/** Section kicker icons (line art) */
export const IconChat = (p: P) => (
  <svg viewBox="0 0 48 40" width="40" {...line(p)}>
    <path d="M6 8h26a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H16l-8 7v-7H6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" />
    <path d="M40 16h2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-2v6l-7-6h-9" />
    <path d="M10 15h16M10 21h10" />
  </svg>
);
export const IconClock = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <circle cx="24" cy="26" r="17" />
    <path d="M24 14v12l8 5M18 4h12M24 4v5M38 9l3-3" />
  </svg>
);
export const IconGears = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <circle cx="19" cy="20" r="7" />
    <path d="M19 6v4m0 20v4M5 20h4m20 0h4M9 10l3 3m14 14 3 3M9 30l3-3m14-14 3-3" />
    <circle cx="35" cy="35" r="5" />
    <path d="M35 26v3m0 12v3M26 35h3m12 0h3" />
  </svg>
);
export const IconBulb = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M17 32c-4-3-7-7-7-13a14 14 0 0 1 28 0c0 6-3 10-7 13v5H17z" />
    <path d="M18 43h12M20 20c0-3 2-5 4-5" />
    <path d="M6 6l4 4M42 6l-4 4M24 2v4" />
  </svg>
);
export const IconTarget = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <path d="M24 2v8M24 38v8M2 24h8M38 24h8" />
  </svg>
);
export const IconPeople = (p: P) => (
  <svg viewBox="0 0 56 48" width="44" {...line(p)}>
    <circle cx="20" cy="14" r="8" />
    <path d="M4 44c0-10 7-16 16-16s16 6 16 16" />
    <circle cx="40" cy="18" r="6" />
    <path d="M38 30c8 0 14 5 14 14" />
  </svg>
);
export const IconTag = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M6 6h18l18 18-18 18L6 24z" />
    <circle cx="15" cy="15" r="3" />
  </svg>
);
export const IconQuestion = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <circle cx="24" cy="24" r="19" />
    <path d="M17 18a7 7 0 1 1 10 6c-2 1-3 3-3 5" />
    <circle cx="24" cy="35" r="1.5" fill="currentColor" />
  </svg>
);

/** Absolutely positioned doodle wrapper */
export function Doodle({
  children,
  style,
  className = "",
}: {
  children: React.ReactNode;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <span className={`doodle hidden md:block ${className}`} style={style}>
      {children}
    </span>
  );
}
