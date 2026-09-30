import type { SVGProps, CSSProperties } from "react";

/**
 * Helix motif system. Everything on the site that decorates comes from one idea:
 * two strands, rungs between them, nodes where work happens.
 */

type P = SVGProps<SVGSVGElement>;
const line = (p: P) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

/** A short piece of double strand with rungs */
export const Strand = ({ length = 160, ...p }: { length?: number } & P) => (
  <svg viewBox={`0 0 ${length} 28`} width={length} {...line(p)}>
    <path d={`M0 14c20-16 40-16 60 0s40 16 60 0${length > 120 ? " 40-16 60 0" : ""}`} />
    <path d={`M0 14c20 16 40 16 60 0s40-16 60 0${length > 120 ? " 40 16 60 0" : ""}`} stroke="var(--blue)" />
    <path d="M30 5v18M90 5v18" strokeOpacity="0.4" strokeWidth="1.2" />
    {length > 120 ? <path d="M150 5v18" strokeOpacity="0.4" strokeWidth="1.2" /> : null}
  </svg>
);

/** A node: solid dot with orbit ring */
export const Node = ({ size = 22, ...p }: { size?: number } & P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...line(p)}>
    <circle cx="12" cy="12" r="10" strokeDasharray="2.5 3.5" stroke="var(--blue-300)" />
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
  </svg>
);

/** Rung marks: three short parallel lines */
export const Rungs = (p: P) => (
  <svg viewBox="0 0 40 24" width="40" {...line(p)}>
    <path d="M4 4h32M4 12h22M4 20h30" strokeOpacity="0.7" />
  </svg>
);

/** A single arc segment of a strand */
export const Curve = (p: P) => (
  <svg viewBox="0 0 80 40" width="80" {...line(p)}>
    <path d="M2 30c20-32 40-32 76 0" />
    <path d="M2 10c20 32 40 32 76 0" stroke="var(--blue)" />
  </svg>
);

/** Section kicker icons: built from the same strokes */
export const IconLeak = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M10 8h28v10a14 14 0 0 1-28 0z" />
    <path d="M24 32v6" />
    <circle cx="24" cy="42" r="2.5" fill="currentColor" stroke="none" />
    <path d="M16 14h4M28 14h4" strokeOpacity="0.5" />
  </svg>
);
export const IconAgents = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <rect x="6" y="10" width="36" height="24" rx="6" />
    <path d="M18 34v6h12v-6" />
    <circle cx="17" cy="22" r="3" fill="currentColor" stroke="none" />
    <circle cx="31" cy="22" r="3" fill="currentColor" stroke="none" />
    <path d="M24 4v6" />
  </svg>
);
export const IconSteps = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M6 38h10V26h10V14h10V6h6" />
    <circle cx="11" cy="38" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="21" cy="26" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="31" cy="14" r="2.5" fill="currentColor" stroke="none" />
  </svg>
);
export const IconNumbers = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M6 40V8M6 40h36" />
    <path d="M12 32l8-10 8 6 10-14" stroke="var(--blue)" />
    <circle cx="38" cy="14" r="2.5" fill="var(--blue)" stroke="none" />
  </svg>
);
export const IconTeam = (p: P) => (
  <svg viewBox="0 0 56 48" width="44" {...line(p)}>
    <circle cx="18" cy="16" r="7" />
    <circle cx="38" cy="16" r="7" />
    <path d="M4 42c0-9 6-14 14-14s14 5 14 14M28 42c0-9 4-14 10-14s14 5 14 14" />
  </svg>
);
export const IconCompare = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M24 6v36M8 14h32" />
    <path d="M8 14l-4 12h8zM40 14l-4 12h8z" />
    <path d="M16 42h16" />
  </svg>
);
export const IconQuestion = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <path d="M8 8h32v24H22l-10 8v-8H8z" />
    <path d="M20 18a4 4 0 1 1 6 3.5c-1.5.9-2 1.7-2 3" />
    <circle cx="24" cy="27" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
export const IconPrice = (p: P) => (
  <svg viewBox="0 0 48 48" width="40" {...line(p)}>
    <rect x="8" y="6" width="32" height="36" rx="4" />
    <path d="M16 16h16M16 24h16M16 32h9" />
    <path d="M34 34l3 3 5-6" stroke="var(--blue)" />
  </svg>
);

/** Absolutely positioned decoration wrapper */
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

/** Kept for backwards compatibility with earlier imports. */
export const Bolt = Rungs;
export const Sparkle = Node;
export const Sparkles = Node;
export const Arc = Curve;
export const CurlArrow = Curve;
export const Wave = Strand;
export const Dot = ({ ...p }: P) => <Node size={10} {...p} />;
export const IconChat = IconQuestion;
export const IconClock = IconLeak;
export const IconGears = IconAgents;
export const IconBulb = IconSteps;
export const IconTarget = IconNumbers;
export const IconPeople = IconTeam;
export const IconTag = IconPrice;
