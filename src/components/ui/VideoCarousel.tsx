"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoSlide {
  type: "video";
  src: string;
  label: string;
  sublabel: string;
  badge?: string;
}

interface ImageSlide {
  type: "image";
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  badge?: string;
}

type Slide = VideoSlide | ImageSlide;

const slides: Slide[] = [
  {
    type: "video",
    src: "/examples/homepage.mp4",
    label: "Frequency Framed",
    sublabel: "E-commerce website",
    badge: "LIVE",
  },
  {
    type: "video",
    src: "/examples/rubandscrub.mp4",
    label: "Rub & Scrub",
    sublabel: "Service website",
  },
  {
    type: "image",
    src: "/examples/mobileFF.jpg",
    alt: "Frequency Framed mobile view",
    label: "Mobile-first view",
    sublabel: "Built for smaller screens",
  },
];

const INTERVAL = 5500;

export default function VideoCarousel() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-rotate — interval resets on any active change (including manual clicks)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active]);

  // Play the active video, pause all others
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        const promise = video.play();
        if (promise !== undefined) promise.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[22px] border border-white/[0.12] bg-[rgba(6,9,23,0.90)] shadow-[0_0_0_1px_rgba(99,102,241,0.10),0_40px_90px_rgba(0,0,0,0.70),0_0_60px_rgba(59,130,246,0.08)] backdrop-blur-2xl">

        {/* Slim top bar — project context, no fake browser chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-5 py-3">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
            Client work
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
            {active + 1} / {slides.length}
          </div>
        </div>

        {/* Media stage */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={i !== active}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  data-video={i}
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={(slide as ImageSlide).src}
                  alt={(slide as ImageSlide).alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-top"
                />
              )}

              {/* Bottom gradient — ensures label is always readable */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)",
                }}
              />

              {/* Project label */}
              <div className="pointer-events-none absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                    Real project
                  </span>
                  {slide.badge && (
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[8px] font-bold tracking-[1.5px] text-emerald-300">
                      {slide.badge}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-white">
                  {slide.label}
                </div>
                <div className="text-[12px] leading-snug text-white/50">
                  {slide.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — dot indicators */}
        <div className="flex items-center justify-end gap-2 border-t border-white/[0.07] bg-white/[0.025] px-5 py-3.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-5 h-[5px] bg-white/65"
                  : "w-[5px] h-[5px] bg-white/22 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
