"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Offers", href: "/#offers" },
  { label: "Products", href: "/#products" },
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
          ? "border-b border-slate-200/80 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex min-w-0 flex-col items-start">
          <Link href="/" className="group block shrink-0">
            <Image
              src="/logos/ziffera-logo.png"
              alt="Ziffera logo"
              width={260}
              height={90}
              priority
              className="h-12 w-auto object-contain transition duration-300 group-hover:opacity-90 lg:h-14"
            />
          </Link>

          <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.32em] text-slate-500 opacity-90">
            Websites / Systems / SaaS
          </div>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-7 text-sm text-slate-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative transition duration-300 hover:text-slate-950 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="rounded-2xl border border-blue-500/15 bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
          >
            Start your project
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition duration-300 hover:bg-slate-50 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-slate-700 transition duration-300",
                mobileOpen ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-slate-700 transition duration-300",
                mobileOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-5 rounded-full bg-slate-700 transition duration-300",
                mobileOpen ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </div>
        </button>
      </div>

      <div
        className={[
          "overflow-hidden transition-all duration-400 md:hidden",
          mobileOpen
            ? "max-h-[28rem] border-t border-slate-200 opacity-100"
            : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-white/95 px-6 py-5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <div className="pb-2">
              <Image
                src="/logos/ziffera-logo.png"
                alt="Ziffera logo"
                width={220}
                height={70}
                className="h-11 w-auto object-contain"
              />
              <div className="mt-2 pl-1 text-[10px] uppercase tracking-[0.28em] text-slate-500 opacity-90">
                Websites / Systems / SaaS
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition duration-300 hover:border-blue-200 hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.2)] transition duration-300 hover:bg-blue-400"
            >
              Start your project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
