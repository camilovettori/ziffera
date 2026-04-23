"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const WorkBackground3D = dynamic(
  () => import("@/components/ui/WorkBackground3D"),
  { ssr: false }
);

const projects = [
  {
    name: "Rub & Scrub",
    label: "Featured Build",
    description: "Service website with booking flow and clean, conversion-focused UX.",
    video: "/examples/rubandscrub.mp4",
  },
  {
    name: "Zconnect",
    label: "Featured Build",
    description: "Automation system that makes operations structured and efficient.",
    video: "/examples/zconnect.mp4",
  },
  {
    name: "Frequency Framed",
    label: "Featured Build",
    description: "E-commerce store with Stripe checkout and custom admin panel.",
    video: "/examples/homepage.mp4",
  },
];

export default function OurWorkSection() {
  return (
    <section
      id="work"
      style={{ position: "relative", overflow: "hidden" }}
      className="bg-[#07090D] py-24 lg:py-32"
    >
      {/* 3D background */}
      <WorkBackground3D />

      {/* Ambient glow — soft, not full-width */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-[120px]"
      />

      <div
        style={{ position: "relative", zIndex: 1 }}
        className="mx-auto max-w-6xl px-6 lg:px-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 lg:mb-18"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/30">
            Selected Work
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl">
            Our Work
          </h2>
          <p className="mt-3 max-w-sm text-[15px] leading-7 text-white/40">
            Live projects built for real businesses.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0C0F15] shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
            >
              {/* Video */}
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition-colors duration-400 group-hover:text-white/55">
                  {project.label}
                </span>
                <p className="text-lg font-semibold tracking-[-0.025em] text-white">
                  {project.name}
                </p>
                <p className="mt-1.5 max-w-[220px] text-[13px] leading-[1.6] text-white/50 transition-colors duration-400 group-hover:text-white/70">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
