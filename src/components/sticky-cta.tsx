"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./icons";

export default function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <div className="sticky-cta">
      <Link href="/contact" className="btn btn-primary w-full justify-center shadow-2xl">
        Book a free call <ArrowUpRight width={16} height={16} />
      </Link>
    </div>
  );
}
