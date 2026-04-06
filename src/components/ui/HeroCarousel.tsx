"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  client: string;
  type: string;
  url: string;
  accent: string;
  accentSoft: string;
  cta: string;
  ctaSecondary?: string;
  headline: string;
  subtitle: string;
  layout: "physio" | "consultancy" | "boutique";
};

const slides: Slide[] = [
  {
    client: "Aoife M. - Physio Clinic",
    type: "Physio Clinic",
    url: "aoife-physio.ie",
    accent: "#0EA5E9",
    accentSoft: "rgba(14,165,233,0.18)",
    cta: "Book Session",
    headline: "Expert Physiotherapy in Dublin",
    subtitle: "Book your first session today",
    layout: "physio",
  },
  {
    client: "Luca D. - Consultancy",
    type: "Consultancy",
    url: "luca-consulting.ie",
    accent: "#8B5CF6",
    accentSoft: "rgba(139,92,246,0.18)",
    cta: "Book a Call",
    ctaSecondary: "View Services",
    headline: "Strategic Clarity for Growing Businesses",
    subtitle: "Consulting tailored to Irish SMEs",
    layout: "consultancy",
  },
  {
    client: "Niamh S. - Boutique Service",
    type: "Boutique Service",
    url: "niamh-boutique.ie",
    accent: "#EC4899",
    accentSoft: "rgba(236,72,153,0.18)",
    cta: "Discover Our Services",
    headline: "Premium Service, Personal Touch",
    subtitle: "Boutique \u00b7 Dublin \u00b7 Est. 2019",
    layout: "boutique",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((value) => (value + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div
        className="overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,50,0.95)] shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_50px_100px_rgba(0,0,0,0.6),0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl transition-transform duration-[400ms] [transform:perspective(1000px)_rotateY(-6deg)_rotateX(2deg)] hover:[transform:perspective(1000px)_rotateY(-2deg)_rotateX(0deg)]"
      >
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>

          <div className="ml-4 flex min-w-0 flex-1 items-center gap-2 rounded-[6px] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[11px] text-[rgba(255,255,255,0.35)]">
            <span className="truncate">{slide.url}</span>
          </div>

          <div className="rounded-full border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.15)] px-2 py-1 text-[9px] font-bold tracking-[1.5px] text-[#34D399]">
            7-DAY DELIVERY
          </div>
        </div>

        <div className="relative overflow-hidden p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative min-h-[410px] overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] p-4"
            >
              {slide.layout === "physio" && (
                <PhysioSlide slide={slide} />
              )}
              {slide.layout === "consultancy" && (
                <ConsultancySlide slide={slide} />
              )}
              {slide.layout === "boutique" && (
                <BoutiqueSlide slide={slide} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 text-center text-[11px] tracking-[1px] text-[rgba(255,255,255,0.4)]">
        {slide.client}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.client}
            type="button"
            aria-label={`Show preview for ${item.client}`}
            onClick={() => setCurrentSlide(index)}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-5 bg-[linear-gradient(90deg,#6366F1,#8B5CF6)]"
                : "w-1.5 bg-white/25 hover:bg-white/40",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function BrowserNav({ slide }: { slide: Slide }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/6 bg-white/0 px-1 pb-3">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {slide.type}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[1.4px] text-white/55">
        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.75)]" />
        LIVE
      </div>
    </div>
  );
}

function PhysioSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col rounded-[16px] bg-[linear-gradient(180deg,rgba(237,247,255,0.98)_0%,rgba(228,244,255,0.92)_100%)] p-4 text-slate-900 shadow-inner">
      <BrowserNav slide={slide} />

      <div className="mt-5 flex items-center justify-between">
        <div className="text-lg font-black tracking-[-0.04em] text-slate-950">
          PhysioCare
        </div>
        <div className="hidden items-center gap-4 text-[11px] font-medium text-slate-500 sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="max-w-[16rem] text-[34px] font-black leading-[0.95] tracking-[-0.06em] text-slate-950">
            Expert Physiotherapy in Dublin
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Book your first session today
          </p>
          <button
            type="button"
            className="mt-5 rounded-full bg-[#0EA5E9] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(14,165,233,0.28)]"
          >
            Book Session
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(59,130,246,0.34))] p-4 shadow-[0_18px_34px_rgba(14,165,233,0.18)]">
          <div className="h-40 rounded-[16px] border border-white/30 bg-[linear-gradient(160deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))]" />
          <div className="absolute inset-x-4 bottom-4 h-8 rounded-full bg-white/35 backdrop-blur-sm" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["Sports injury", "Back pain", "Recovery"].map((item) => (
          <div
            key={item}
            className="rounded-[14px] border border-slate-200 bg-white px-3 py-3 text-[11px] font-semibold text-slate-700 shadow-[0_10px_18px_rgba(14,165,233,0.08)]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsultancySlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col rounded-[16px] bg-[linear-gradient(180deg,rgba(250,248,255,0.98)_0%,rgba(243,238,255,0.94)_100%)] p-4 text-slate-900 shadow-inner">
      <BrowserNav slide={slide} />

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-600">
            Strategy first
          </div>
          <h3 className="mt-3 max-w-[18rem] text-[31px] font-black leading-[0.98] tracking-[-0.06em] text-slate-950">
            Strategic Clarity for Growing Businesses
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Consulting tailored to Irish SMEs
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              className="rounded-full bg-[linear-gradient(135deg,#8B5CF6,#7C3AED)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(139,92,246,0.28)]"
            >
              Book a Call
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              View Services
            </button>
          </div>
        </div>

        <div className="relative min-h-44 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(236,72,153,0.1))] p-4">
          <div className="absolute left-4 top-4 h-20 w-20 rotate-12 rounded-[24px] border border-violet-200 bg-white/60" />
          <div className="absolute right-5 top-10 h-14 w-14 -rotate-12 rounded-full border border-violet-200 bg-white/50" />
          <div className="absolute bottom-5 left-10 h-16 w-24 rotate-6 rounded-[18px] border border-white/50 bg-white/50" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {["Growth", "Ops", "Systems"].map((item) => (
          <div
            key={item}
            className="rounded-[14px] border border-white/70 bg-white px-3 py-3 text-[11px] font-semibold text-slate-700 shadow-[0_10px_18px_rgba(139,92,246,0.08)]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function BoutiqueSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col rounded-[16px] bg-[linear-gradient(180deg,rgba(255,247,251,0.98)_0%,rgba(255,237,244,0.94)_100%)] p-4 text-slate-900 shadow-inner">
      <BrowserNav slide={slide} />

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="flex flex-col justify-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-500">
            Elegant by design
          </div>
          <h3 className="mt-3 max-w-[16rem] text-[30px] font-black leading-[1] tracking-[-0.06em] text-slate-950">
            Premium Service, Personal Touch
          </h3>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Boutique \u00b7 Dublin \u00b7 Est. 2019
          </p>

          <button
            type="button"
            className="mt-5 w-fit rounded-full bg-[linear-gradient(135deg,#EC4899,#DB2777)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(236,72,153,0.28)]"
          >
            Discover Our Services
          </button>
        </div>

        <div className="relative min-h-48 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,rgba(236,72,153,0.14),rgba(244,114,182,0.24))] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.42),transparent_36%)]" />
          <div className="absolute inset-4 rounded-[18px] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))]" />
          <div className="absolute inset-x-10 top-10 h-28 rounded-[22px] bg-[linear-gradient(135deg,rgba(236,72,153,0.22),rgba(255,255,255,0.3))] shadow-[0_18px_40px_rgba(236,72,153,0.18)]" />
          <div className="absolute bottom-6 right-6 rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 backdrop-blur-sm">
            New arrivals
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_10px_18px_rgba(236,72,153,0.08)]">
          Weddings
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_10px_18px_rgba(236,72,153,0.08)]">
          Events
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_10px_18px_rgba(236,72,153,0.08)]">
          Bookings
        </div>
      </div>
    </div>
  );
}
