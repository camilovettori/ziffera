"use client";

import { motion } from "framer-motion";
import {
  Check,
  Code2,
  Globe,
  Layers3,
  LifeBuoy,
  Link2,
  MessageSquare,
  ShoppingCart,
  Settings2,
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
import { Separator } from "@/components/ui/separator";

const trustItems = ["Websites", "E-commerce", "Systems", "Integrations"];

const services = [
  {
    title: "Websites",
    desc: "Polished sites that help people trust you faster.",
    icon: Globe,
  },
  {
    title: "E-commerce",
    desc: "Stripe-ready stores with clean checkout and admin tools.",
    icon: ShoppingCart,
  },
  {
    title: "Systems",
    desc: "Practical dashboards, workflows, and internal tools.",
    icon: Settings2,
  },
  {
    title: "Integrations",
    desc: "Connect the tools you already use and remove manual admin.",
    icon: Link2,
  },
];

const launchChecklist = [
  "Full website",
  "E-commerce ready",
  "Stripe integration",
  "Admin dashboard",
];

const products = [
  {
    badge: "Launching 01/05",
    title: "MarginFlow",
    desc: "Margin visibility software for small businesses that want clearer numbers.",
    bullets: ["Track margins in one place", "Spot weak products fast", "Make better decisions"],
    gradient: "from-blue-50 via-white to-sky-50",
    accent: "MF",
    cta: "Join the waitlist",
    note: "Built for practical product thinking.",
  },
  {
    badge: "Launching 01/05",
    title: "Zconnect",
    desc: "Unify Zoho Invoice and Zoho Books and remove repetitive admin work.",
    bullets: ["Automate invoices", "Sync business data", "Custom connections"],
    gradient: "from-slate-50 via-white to-blue-50",
    accent: "ZC",
    cta: "Talk about Zconnect",
    note: "Need another platform connection? Get in touch.",
  },
];

const whyItems = [
  {
    title: "Clear communication",
    desc: "Simple updates, direct feedback, and no unnecessary agency noise.",
    icon: MessageSquare,
  },
  {
    title: "Practical design",
    desc: "The work should look premium and still help the business move forward.",
    icon: Layers3,
  },
  {
    title: "Software thinking",
    desc: "We care about structure, maintainability, and how the system actually works.",
    icon: Code2,
  },
  {
    title: "Ongoing support",
    desc: "You are not left alone after launch. We stay focused on keeping things useful.",
    icon: LifeBuoy,
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
            <Badge>Services</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              What Ziffera builds.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Simple offers, clean design, and practical builds that help
              growing businesses look better and work smarter.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={item}
                  whileHover={{ y: -7, scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                >
                  <Card
                    className={[
                      "group relative overflow-hidden border-slate-200/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:border-blue-200 hover:shadow-[0_26px_60px_rgba(15,23,42,0.1)]",
                      index % 2 === 0
                        ? "bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]"
                        : "bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)]",
                    ].join(" ")}
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.45),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-[0_12px_24px_rgba(59,130,246,0.08)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_32px_rgba(59,130,246,0.12)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="mt-5 text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription>{service.desc}</CardDescription>
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
        id="offers"
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <Card className="overflow-hidden border-blue-100/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.1)]">
          <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
            <CardContent className="p-6 lg:p-10">
              <Badge>Limited</Badge>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 md:text-5xl">
                Launch offer - limited spots
              </h2>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-6xl">
                  EUR 650
                </div>
                <div className="pb-2 text-sm font-medium text-slate-500">
                  Normally EUR 2500+
                </div>
              </div>

              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                A serious launch offer for a clean, modern website that feels
                trustworthy from the first click.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Start your project</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#work">See the proof</Link>
                </Button>
              </div>
            </CardContent>

            <CardContent className="border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-6 lg:border-l lg:border-t-0 lg:p-10">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="space-y-3"
              >
                {launchChecklist.map((entry) => (
                  <motion.div key={entry} variants={item}>
                    <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                      <CardContent className="flex items-center gap-3 px-4 py-4 text-sm text-slate-700">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {entry}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <Separator className="my-6" />
              <div className="rounded-[1.6rem] border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-slate-700">
                Only 5 spots available
                <span className="mt-1 block text-slate-500">
                  Optional monthly support from EUR 25/month.
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.section>

      <motion.section
        id="products"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div variants={item} className="max-w-2xl">
            <Badge>Products</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              Practical products with clear value.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Small-business tools that reduce admin and make it easier to run
              the business day to day.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <motion.div
                key={product.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.22 }}
              >
                <Card
                  className={[
                    "group relative overflow-hidden border-slate-200/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:border-blue-200 hover:shadow-[0_28px_66px_rgba(15,23,42,0.1)]",
                    `bg-gradient-to-b ${product.gradient}`,
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(125,211,252,0.12),transparent_28%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <CardHeader className="relative pb-4">
                    <div className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700 backdrop-blur">
                      {product.badge}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-3xl tracking-[-0.05em]">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="mt-4 max-w-xl">
                          {product.desc}
                        </CardDescription>
                      </div>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/70 bg-white text-sm font-semibold text-blue-700 shadow-[0_16px_30px_rgba(59,130,246,0.12)]">
                        {product.accent}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-4">
                    <div className="grid gap-2">
                      {product.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {bullet}
                        </div>
                      ))}
                    </div>

                    {product.note ? (
                      <>
                        <Separator />
                        <div className="rounded-[1.4rem] border border-blue-100 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
                          {product.note}
                        </div>
                      </>
                    ) : null}
                  </CardContent>

                  <CardContent className="pt-0">
                    <Button asChild className="w-full">
                      <Link href="/contact">{product.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="why"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Why Ziffera</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Built to feel clear, capable, and easy to trust.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyItems.map((entry) => {
            const Icon = entry.icon;

            return (
              <motion.div
                key={entry.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.22 }}
              >
                <Card className="group relative overflow-hidden border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.05)] transition duration-300 hover:border-blue-200 hover:shadow-[0_28px_62px_rgba(15,23,42,0.1)]">
                  <div className="absolute right-4 top-4 h-14 w-14 rounded-full bg-blue-200/20 blur-2xl transition duration-300 group-hover:bg-blue-200/35" />
                  <CardHeader className="pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] text-blue-700 shadow-[0_12px_24px_rgba(59,130,246,0.08)]">
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
      </motion.section>

      <motion.section
        id="contact"
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
                Need a website, store, or custom system?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Let&apos;s build something clear, modern, and easy for customers to
                trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100/90">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  Usually reply within 24 hours
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  Clear next step
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
                    <Link href="/contact">Start your project</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
                    size="lg"
                  >
                    <Link href="/#work">View real work</Link>
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
