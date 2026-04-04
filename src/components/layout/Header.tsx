"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-6">
      <div
        className={[
          "mx-auto max-w-7xl rounded-[1.9rem] border px-5 py-4 backdrop-blur-2xl transition-all duration-500",
          scrolled
            ? "border-slate-200/90 bg-white/88 shadow-[0_18px_50px_rgba(15,23,42,0.09)]"
            : "border-slate-200/70 bg-white/82 shadow-[0_12px_34px_rgba(15,23,42,0.05)]",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4">
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

            <Badge variant="secondary" className="mt-2 text-[9px] tracking-[0.3em]">
              Websites / Systems / SaaS
            </Badge>
          </div>

          <div className="hidden items-center gap-10 md:flex">
            <nav className="flex items-center gap-7 text-sm text-slate-700">
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

            <Button asChild>
              <Link href="/contact">Start your project</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
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
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white/96 p-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
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

            <Button asChild className="w-full">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Start your project
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
