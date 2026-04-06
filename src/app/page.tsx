"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Check,
  Gauge,
  Mail,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import ExampleSection from "@/components/sections/ExampleSection";
import HeroSection from "@/components/sections/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const trustItems = [
  "50% deposit to start",
  "Premium custom design",
  "7-day delivery target",
  "Clear launch support",
];

const includedItems = [
  {
    title: "Premium custom design",
    desc: "A polished visual direction that matches the business and feels trustworthy.",
    icon: Sparkles,
  },
  {
    title: "Mobile-optimized build",
    desc: "A fast responsive site that works cleanly on phones, tablets, and desktop.",
    icon: Smartphone,
  },
  {
    title: "Fast modern performance",
    desc: "A lean build focused on speed, clarity, and a smooth buying experience.",
    icon: Gauge,
  },
  {
    title: "Contact or booking setup",
    desc: "Clear lead capture, enquiry handling, or appointment flow where needed.",
    icon: Mail,
  },
  {
    title: "Admin access if needed",
    desc: "A simple handoff for updates, content changes, or practical admin tasks.",
    icon: ShieldCheck,
  },
  {
    title: "Professional launch support",
    desc: "A calm launch process so the site goes live with confidence.",
    icon: CalendarCheck,
  },
];

const reassuranceItems = [
  "You only pay 50% to begin.",
  "You review and approve the website before the final payment.",
  "The site goes live only when the work is ready.",
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

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_40%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <Header />
      <HeroSection />

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-3 rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustItems.map((entry) => (
            <motion.div key={entry} variants={item}>
              <Card className="overflow-hidden border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
                <CardContent className="px-4 py-3 text-center text-sm font-medium text-slate-700">
                  {entry}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        id="services"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div variants={item} className="max-w-2xl">
            <Badge>What&apos;s included</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              A premium website package with clear value.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Built to look sharp, move fast, and give your business a stronger
              first impression.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {includedItems.map((entry) => {
              const Icon = entry.icon;

              return (
                <motion.div
                  key={entry.title}
                  variants={item}
                  whileHover={{ y: -7, scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                >
                  <Card className="group relative overflow-hidden border-slate-200/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:border-blue-200 hover:shadow-[0_26px_60px_rgba(15,23,42,0.1)]">
                    <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.45),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-[0_12px_24px_rgba(59,130,246,0.08)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_32px_rgba(59,130,246,0.12)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="mt-5 text-xl">{entry.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription>{entry.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <ExampleSection />

      <motion.section
        id="pricing"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={item}>
            <Badge>Pricing</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              One clear package.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              A premium website package with a simple payment structure that
              keeps the decision easy.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  Website Package
                </CardContent>
              </Card>
              <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  €650 total
                </CardContent>
              </Card>
              <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  €325 to start
                </CardContent>
              </Card>
              <Card className="border-slate-200/80 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                  €325 before go-live
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_24px_72px_rgba(59,130,246,0.08)]">
              <CardHeader>
                <Badge>Start now</Badge>
                <CardTitle className="mt-4 text-4xl tracking-[-0.05em]">
                  €325 deposit
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-base leading-7">
                  Secure your build slot and get the project moving with the
                  existing embedded Stripe checkout flow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-[1.4rem] border border-blue-100 bg-white px-5 py-5 text-sm leading-7 text-slate-700">
                  Start with 50%. Pay the final 50% before delivery.
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout/setup-deposit">Start project</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div variants={item}>
              <Badge>Reassurance</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                No risk, no confusion.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                The process stays clear from the first click to the final handoff.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <div className="grid gap-3">
                {reassuranceItems.map((entry) => (
                  <Card
                    key={entry}
                    className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-center gap-3 px-4 py-4 text-sm text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {entry}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl px-6 pb-24 pt-4 lg:px-10 lg:pb-32"
      >
        <Card className="overflow-hidden border-slate-900/10 bg-[linear-gradient(135deg,#0f172a_0%,#172554_48%,#1d4ed8_100%)] shadow-[0_32px_90px_rgba(15,23,42,0.18)]">
          <div className="relative grid gap-10 px-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_24%)]" />

            <div className="relative">
              <Badge className="border-white/20 bg-white/10 text-white">
                Ready when you are
              </Badge>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
                Ready to launch something serious?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Start your project today and secure your build slot with a 50%
                deposit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100/90">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  Usually reply within 24 hours
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  Prefer to talk first? support@ziffera.ie
                </span>
              </div>
            </div>

            <div className="relative">
              <Card className="border-white/15 bg-white/10 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <CardContent className="space-y-4 p-0">
                  <Button
                    asChild
                    className="w-full bg-white text-slate-950 shadow-[0_18px_44px_rgba(255,255,255,0.18)] hover:bg-blue-50"
                    size="lg"
                  >
                    <Link href="/checkout/setup-deposit">Start your website</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
                    size="lg"
                  >
                    <Link href="/contact">Prefer to talk first?</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </motion.section>
    </main>
  );
}
