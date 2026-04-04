"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import InteractiveCard from "../InteractiveCard";

const heroPoints = [
  "Clear communication",
  "Fast, modern builds",
  "Built for real businesses",
];

export default function HeroSection() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-20">
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-700"
        >
          Modern websites, smart systems, and integrations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]"
        >
          Modern websites and smart systems
          <br />
          <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
            for growing businesses.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.24rem] md:leading-9"
        >
          Ziffera builds business websites, e-commerce stores, custom systems,
          and integrations that help you look more professional, save time, and
          win more work.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-4 max-w-2xl text-sm leading-7 text-slate-500"
        >
          A good fit for small businesses, local brands, artists, and growing
          teams that want something polished without the agency intimidation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Start your project
          </Link>

          <Link
            href="/#work"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition duration-300 hover:border-blue-200 hover:bg-blue-50"
          >
            View our work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {heroPoints.map((point) => (
            <div
              key={point}
              className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
            >
              {point}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.85, delay: 0.2 }}
        className="relative"
      >
        <div className="pointer-events-none absolute -left-8 top-10 h-36 w-36 rounded-full bg-blue-200/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-cyan-200/70 blur-3xl" />

        <InteractiveCard className="rounded-[2.4rem]">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white p-4 shadow-[0_30px_90px_rgba(15,23,42,0.08)] lg:p-5">
            <div className="rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] lg:p-7">
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-blue-700">
                Launch offer
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Professional website from EUR 650
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                Designed for small businesses, artists, and brands that want to
                look professional and get more customers.
              </p>

              <div className="mt-5 text-sm font-medium text-slate-500">
                Normally EUR 2500+
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  "Custom design",
                  "Mobile optimized",
                  "Stripe payments for e-commerce",
                  "Admin panel to manage content",
                  "Fast and modern performance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 text-blue-600">✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
                Optional support from EUR 25/month
                <span className="block text-slate-500">
                  Hosting, updates, and maintenance.
                </span>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Start your project
              </Link>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </section>
  );
}
