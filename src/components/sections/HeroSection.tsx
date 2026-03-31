"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveCard from "../InteractiveCard";

export default function HeroSection() {
  const metrics = [
    { value: "Premium", label: "Design language" },
    { value: "Fast", label: "Performance-first builds" },
    { value: "Scalable", label: "Engineering mindset" },
    { value: "Trusted", label: "Business-focused delivery" },
  ];

  return (
    <section className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
      
      {/* LEFT */}
      <div className="relative z-10 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] text-blue-200"
        >
          Premium websites and software built for growth
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-white md:text-7xl xl:text-[5.4rem]"
        >
          Serious digital
          <br />
          products for
          <br />
          modern businesses.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-[1.35rem]"
        >
          Ziffera combines software engineering and premium design to build
          websites, systems, and SaaS products that look exceptional and perform
          with purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
  href="/start"
  className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.38)] transition hover:-translate-y-0.5"
>
  Start your project
</Link>

          <button className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm text-white hover:bg-white/[0.08] transition">
            See our work
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {metrics.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm hover:-translate-y-1 transition"
            >
              <div className="text-2xl font-semibold text-white">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-slate-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="relative flex items-center justify-center perspective-[1200px]"
      >
        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.25),transparent_30%)] blur-3xl opacity-90" />

        {/* floating + interactive */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="relative"
        >
          <InteractiveCard>
            <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl transition duration-500">

              {/* header */}
              <div className="text-sm uppercase text-slate-400 mb-2">
                Limited offer
              </div>

              <div className="text-2xl font-semibold text-white">
                Premium Website
              </div>

              {/* pricing */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-[#0B0F14] p-5 rounded-xl border border-white/10">
                  <div className="text-xs text-slate-500">Setup</div>
                  <div className="text-3xl font-semibold text-white mt-2">
                    €250
                  </div>
                </div>

                <div className="bg-[#0B0F14] p-5 rounded-xl border border-white/10">
                  <div className="text-xs text-slate-500">Monthly</div>
                  <div className="text-3xl font-semibold text-white mt-2">
                    €20/mo
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
  href="/start"
  className="mt-6 block w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-3 text-center font-semibold text-white shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition hover:from-blue-400 hover:to-blue-300"
>
  Claim your spot
</Link>

            </div>
          </InteractiveCard>
        </motion.div>
      </motion.div>
    </section>
  );
}