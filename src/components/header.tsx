"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "./icons";

const NAV = [
  { href: "/services", label: "What we build" },
  { href: "/industries/lab-supply", label: "Who it is for" },
  { href: "/work", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Founders" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change without a setState-in-effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[rgba(5,8,15,0.72)] border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Helix Research Technologies home">
          <Image src="/brand/helix-horizontal-reverse.svg" alt="Helix Research Technologies" width={148} height={58} priority className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[0.92rem] text-fg-2" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`underline-slide hover:text-fg transition-colors ${
                pathname.startsWith(n.href) ? "text-fg" : ""
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary btn-sm">
            Book a call <ArrowUpRight width={16} height={16} />
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden btn btn-ghost btn-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X width={16} height={16} /> : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="lg:hidden border-t border-line bg-[rgba(5,8,15,0.96)] backdrop-blur-xl">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-3 text-lg text-fg-2 hover:text-fg border-b border-line">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary mt-4 justify-center">
              Book a call <ArrowUpRight width={16} height={16} />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
