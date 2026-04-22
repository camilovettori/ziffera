"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
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
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-6">
      {/* ZIFFERA_UPDATE: Increase header contrast and logo presence while preserving the existing logo asset. */}
      <div
        className={[
          "mx-auto max-w-7xl rounded-[2rem] border px-5 py-4 backdrop-blur-[20px] transition-all duration-500",
          scrolled
            ? "border-slate-200/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(244,248,255,0.96)_45%,rgba(233,241,255,0.92)_100%)] shadow-[0_18px_50px_rgba(15,23,42,0.09)]"
            : "border-white/10 bg-[rgba(10,15,40,0.85)] shadow-[0_18px_50px_rgba(10,15,44,0.34)]",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="group relative block shrink-0">
              <span
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute -inset-3 -z-10 rounded-[1.45rem] opacity-90 blur-xl transition duration-300",
                  scrolled
                    ? "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_70%)]"
                    : "bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.2),transparent_72%)]",
                ].join(" ")}
              />
              <Image
                src="/logos/ziffera-logo.png"
                alt="Ziffera logo"
                width={260}
                height={90}
                priority
                className={[
                  "logo-pulse h-12 w-auto object-contain transition duration-300 group-hover:scale-[1.02]",
                  scrolled
                    ? "drop-shadow-[0_0_12px_rgba(99,102,241,0.3)] lg:h-[4rem]"
                    : "drop-shadow-[0_0_12px_rgba(99,102,241,0.6)] lg:h-[4.25rem]",
                ].join(" ")}
              />
            </Link>

            <span
              className={[
                "text-[10px] font-medium uppercase tracking-[2px]",
                scrolled ? "text-slate-500" : "text-white/40",
              ].join(" ")}
            >
              Premium websites only
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <nav
              className={[
                "flex items-center gap-8 text-[0.95rem] font-medium",
                scrolled ? "text-slate-700" : "text-white/70",
              ].join(" ")}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "relative transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[linear-gradient(135deg,#2563eb,#7c3aed)] after:transition-all after:duration-300 hover:after:w-full",
                    scrolled ? "hover:text-slate-950" : "hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              asChild
              aria-label="Get your website"
              className="bg-[linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] px-6 shadow-[0_18px_44px_rgba(37,99,235,0.28)] hover:shadow-[0_24px_56px_rgba(124,58,237,0.36)]"
            >
              <Link href="/contact">Get your website</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={[
              "md:hidden shadow-[0_10px_26px_rgba(15,23,42,0.06)]",
              scrolled
                ? "border-slate-200/90 bg-white/80 text-slate-700"
                : "border-white/15 bg-white/10 text-white hover:bg-white/15 hover:border-white/25",
            ].join(" ")}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <div
          className={[
            "overflow-hidden transition-all duration-300 md:hidden",
            mobileOpen ? "max-h-[28rem] pt-4 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div
            className={[
              "flex flex-col gap-4 rounded-[1.5rem] border p-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)]",
              scrolled
                ? "border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.98)_100%)]"
                : "border-white/10 bg-[linear-gradient(135deg,rgba(10,15,44,0.96)_0%,rgba(17,24,60,0.96)_100%)]",
            ].join(" ")}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "rounded-2xl border px-4 py-3 text-sm font-medium shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition duration-300",
                  scrolled
                    ? "border-slate-200/80 bg-white/85 text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                    : "border-white/10 bg-white/[0.08] text-white/85 hover:border-white/25 hover:bg-white/[0.12]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}

            <Button
              asChild
              className="w-full"
              aria-label="Get your website"
            >
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Get your website
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
