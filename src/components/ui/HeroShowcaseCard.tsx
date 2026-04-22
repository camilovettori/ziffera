"use client";

import { useEffect, useRef } from "react";

type HeroShowcaseCardProps = {
  src: string;
  title: string;
  subtitle: string;
  label: string;
  accent?: "blue" | "violet";
  className?: string;
};

export default function HeroShowcaseCard({
  src,
  title,
  subtitle,
  label,
  accent = "blue",
  className = "",
}: HeroShowcaseCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      video.pause();
      return;
    }

    const play = video.play();
    if (play !== undefined) play.catch(() => {});
  }, []);

  const accentRing =
    accent === "blue"
      ? "bg-[radial-gradient(circle,rgba(96,165,250,0.16),transparent_62%)]"
      : "bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_62%)]";

  return (
    <div
      className={[
        "mx-auto w-full overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(7,10,24,0.84)] shadow-[0_0_0_1px_rgba(99,102,241,0.08),0_36px_100px_rgba(0,0,0,0.52)] backdrop-blur-2xl",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-5 py-3">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/38">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
          Client work
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold tracking-[1.6px] text-emerald-100">
          LIVE
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-slate-950 shadow-[0_20px_48px_rgba(0,0,0,0.38)]">
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
              {label}
            </div>
            <div className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
              {title}
            </div>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover object-top"
            />
            <div className={`pointer-events-none absolute inset-0 ${accentRing}`} />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,24,0.08),rgba(7,10,24,0.46))]" />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
              <div className="max-w-[80%] rounded-[16px] border border-white/[0.10] bg-[rgba(7,10,24,0.72)] px-4 py-3 backdrop-blur-md">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
                  Featured build
                </div>
                <div className="mt-1 text-[16px] font-semibold tracking-[-0.03em] text-white">
                  {title}
                </div>
                <div className="mt-1 text-[12px] leading-6 text-slate-300">
                  {subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
