"use client";

import { motion } from "framer-motion";
import { Check, Globe, MessageSquareText, Sparkles, Clock3, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Get more customers",
    desc: "Clear messaging and stronger calls to action help more visitors enquire.",
    icon: Globe,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Look professional",
    desc: "A premium first impression makes the business feel credible fast.",
    icon: Sparkles,
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    title: "Accept payments",
    desc: "Simple payment flows make it easier to sell or take deposits online.",
    icon: MessageSquareText,
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Save time",
    desc: "Your site answers common questions so you spend less time repeating yourself.",
    icon: Clock3,
    accent: "from-indigo-500 to-blue-600",
  },
  {
    title: "Easy to manage",
    desc: "Updates stay simple, so you can keep the site current without friction.",
    icon: Settings2,
    accent: "from-cyan-500 to-indigo-500",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesSection() {
  return (
    <motion.section
      id="benefits"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Benefits</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            What your website should do.
          </h2>
          <p className="mt-4 max-w-[520px] text-[18px] leading-[1.65] text-slate-700">
            The website is there to help your business grow. These are the outcomes we
            design for.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.22 }}
              >
                <Card className="group relative h-full overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.1)]">
                  <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${benefit.accent}`} />
                  <CardHeader className="flex h-full flex-col px-7 pt-8 pb-4">
                    <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-[rgba(99,102,241,0.08)] bg-[rgba(99,102,241,0.08)] text-[24px] text-blue-700 shadow-none transition duration-300 group-hover:shadow-[0_10px_24px_rgba(99,102,241,0.08)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="mt-3 flex-1 text-[14px] leading-[1.65] text-slate-700">
                      {benefit.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Get more customers",
            "Look professional",
            "Accept payments",
            "Save time",
            "Easy to manage",
          ].map((itemText) => (
            <div
              key={itemText}
              className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Check className="h-3.5 w-3.5" />
              </span>
              {itemText}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
