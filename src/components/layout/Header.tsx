"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#0B0F14]/75 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between px-6 py-5 lg:px-10">
        {/* LEFT: BRAND */}
        <div className="flex min-w-0 flex-col items-start justify-start">
          <Link href="/" className="group block shrink-0">
            <Image
              src="/logos/ziffera-logo.png"
              alt="Ziffera logo"
              width={260}
              height={90}
              priority
              className="h-14 w-auto object-contain transition duration-300 group-hover:opacity-90 lg:h-16"
            />
          </Link>

          <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.32em] text-slate-400 opacity-85">
            Websites · Systems · SaaS
          </div>
        </div>

        {/* CENTER + RIGHT */}
        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8 text-sm text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative transition duration-300 hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/contact"
            className="rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-300"
          >
            Start your project
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition duration-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-white transition duration-300",
                mobileOpen ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-white transition duration-300",
                mobileOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-white transition duration-300",
                mobileOpen ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={[
          "overflow-hidden transition-all duration-400 md:hidden",
          mobileOpen
            ? "max-h-96 border-t border-white/10 opacity-100"
            : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-[#0B0F14]/95 px-6 py-5 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <div className="pb-2">
              <Image
                src="/logos/ziffera-logo.png"
                alt="Ziffera logo"
                width={220}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.28em] text-slate-400 opacity-80">
                Websites · Systems · SaaS
              </div>
            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition duration-300 hover:from-blue-400 hover:to-blue-300"
            >
              Start your project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
