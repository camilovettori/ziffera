"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ZifferaLogo from "@/components/layout/ZifferaLogo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Products", href: "/#products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-line bg-surface/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 lg:h-[4.5rem] lg:px-10">
        <Link href="/" aria-label="Ziffera home" className="shrink-0">
          <ZifferaLogo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-3 h-10 px-4">
            <Link href="/contact">Start a project</Link>
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-line bg-surface px-5 pb-5 pt-2 md:hidden" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-line py-3.5 text-base font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-4 w-full">
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              Start a project
            </Link>
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
