"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "./icons";

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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Helix Research Technologies home">
          <Image src="/brand/helix-horizontal.svg" alt="Helix Research Technologies" width={148} height={58} priority className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[0.95rem] font-medium text-navy" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:text-blue transition-colors ${pathname.startsWith(n.href) ? "text-blue" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary btn-sm">
            Book 30 Minutes Free
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
        <div id="mobile-nav" className="lg:hidden border-t border-gray-200 bg-cream">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-3 text-lg font-medium text-navy border-b border-gray-200">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary mt-4">
              Book 30 Minutes Free
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
