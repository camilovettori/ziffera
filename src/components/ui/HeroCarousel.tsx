"use client";
import { useEffect, useState } from "react";
import { Check, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const slides = [
  { src: "/examples/homepage.png", alt: "Frequency Framed homepage" },
  { src: "/examples/checkout.png", alt: "Frequency Framed checkout" },
  { src: "/examples/gallery.png", alt: "Frequency Framed gallery" },
  { src: "/examples/admin.png", alt: "Frequency Framed admin panel" },
  { src: "/examples/cart.png", alt: "Frequency Framed cart" },
  { src: "/examples/mobileFF.jpg", alt: "Frequency Framed mobile view" },
];

const proofHighlights = [
  {
    title: "Live e-commerce",
    text: "Full storefront with gallery, artwork pages, and cart.",
  },
  {
    title: "Stripe checkout",
    text: "Direct payments with a clean embedded checkout flow.",
  },
  {
    title: "Admin panel",
    text: "Client manages products and orders without a developer.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[24px] border border-white/20 bg-[rgba(8,12,27,0.92)] shadow-[0_0_0_1px_rgba(99,102,241,0.16),0_50px_100px_rgba(0,0,0,0.62),0_0_80px_rgba(59,130,246,0.1)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>

          <div className="ml-4 flex min-w-0 flex-1 items-center gap-2 rounded-[8px] bg-white/[0.08] px-3 py-1 text-[11px] text-slate-300">
            <span className="truncate">frequencyframed.ie</span>
          </div>

          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold tracking-[1.5px] text-emerald-100">
            LIVE
          </div>
        </div>

        <div className="grid gap-5 p-4 sm:p-5">
          <div className="overflow-hidden rounded-[18px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  Real client project
                </div>
                <Badge className="border border-white/15 bg-white/[0.08] text-[10px] uppercase tracking-[0.22em] text-white/90">
                  Frequency Framed
                </Badge>
              </div>
            </div>

            <div className="relative aspect-[16/11] bg-slate-950">
              {slides.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className={`object-cover object-top transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                  priority={i === 0}
                />
              ))}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[16px] border border-white/20 bg-white/[0.10] px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="text-sm font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </div>
                <div className="mt-2 text-[13px] leading-6 text-slate-300">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-[linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] shadow-[0_18px_44px_rgba(37,99,235,0.28)]"
            >
              <Link href="/checkout/setup-deposit">Start your website</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.10]"
            >
              <a
                href="https://www.frequencyframed.ie"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live site
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
