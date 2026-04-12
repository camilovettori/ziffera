"use client";

import { motion } from "framer-motion";
import { Check, Code2, Globe, Smartphone, Sparkles, Workflow } from "lucide-react";
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

const services = [
  {
    title: "Websites",
    desc: "Premium, mobile-first websites delivered in 7 days for Irish SMEs.",
    icon: Globe,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "SaaS Products",
    desc: "Subscription-ready product design with commercial thinking built in.",
    icon: Sparkles,
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android-ready app interfaces that feel polished and intuitive.",
    icon: Smartphone,
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Custom Software",
    desc: "Tailored digital tools built to solve real operational problems.",
    icon: Code2,
    accent: "from-indigo-500 to-blue-600",
  },
  {
    title: "Zconnect - Systems & Integrations",
    desc: "Automation, connected systems, and operational clarity for busy teams.",
    icon: Workflow,
    accent: "from-cyan-500 to-indigo-500",
  },
];

const productProof = [
  {
    title: "MarginFlow",
    desc: "A software product that proves Ziffera can ship real digital tools, not just brochure sites.",
    bullets: ["Product design", "Commercial thinking", "Subscription-ready"],
    href: "/marginflow",
    cta: "Explore MarginFlow",
  },
  {
    title: "Zconnect",
    desc: "Systems and integration work that removes admin and strengthens the technical side of the company.",
    bullets: ["Automation", "Connected systems", "Operational clarity"],
    href: "/contact",
    cta: "Talk about Zconnect",
  },
];

const monthlyPlanIncludes = [
  "Website hosting",
  "Security updates",
  "Basic maintenance",
  "Small text or image updates within reasonable limits",
  "Ongoing support",
  "Keeping the website online and running properly",
];

const monthlyPlanNotIncluded = [
  "Full redesigns",
  "New pages",
  "Advanced SEO",
  "Ads / marketing management",
  "Large feature upgrades",
  "Major booking system changes",
];

const reassuranceItems = [
  "You pay €200 to begin.",
  "You review and approve the website before the final payment.",
  "The site goes live only when the work is ready.",
];

const faqs = [
  {
    question: "How does payment work?",
    answer:
      "The setup is €400 total, paid as €200 to begin and €200 before go-live. The monthly plan is €25/month after launch.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Just your content (text and images), your preferences, and your goals. We handle the rest.",
  },
  {
    question: "Can I make changes after launch?",
    answer:
      "Yes. The monthly plan covers reasonable text and image updates, ongoing support, and keeping the site running properly.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "We work through a clear revision process to make sure you're satisfied before anything goes live.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ziffera",
  url: "https://www.ziffera.ie",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IE",
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F0F4FF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_40%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <Header />
      <HeroSection />

      <ExampleSection />

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
              Everything you need to launch with confidence.
            </h2>
            <p className="mt-4 max-w-[500px] text-[18px] leading-[1.65] text-slate-700">
              Built to look sharp, move fast, and give your business a stronger
              first impression.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.22 }}
                >
                  <Card className="group relative h-full overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.1)]">
                    <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${service.accent}`} />
                    <CardHeader className="flex h-full flex-col px-7 pt-8 pb-4">
                      <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-[rgba(99,102,241,0.08)] bg-[rgba(99,102,241,0.08)] text-[24px] text-blue-700 shadow-none transition duration-300 group-hover:shadow-[0_10px_24px_rgba(99,102,241,0.08)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0F172A]">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="mt-3 flex-1 text-[14px] leading-[1.65] text-slate-700">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="products"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Product and systems capability</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            MarginFlow and Zconnect.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Ziffera also designs and builds software products and systems. That
            keeps the website work grounded in real product thinking.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {productProof.map((product) => (
            <motion.div
              key={product.title}
              variants={item}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.22 }}
            >
              <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:border-blue-200 hover:shadow-[0_28px_66px_rgba(15,23,42,0.1)]">
                <CardHeader className="pb-4">
                  <div className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700 backdrop-blur">
                    {product.title}
                  </div>
                  <CardTitle className="mt-5 text-3xl tracking-[-0.05em]">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="mt-4 max-w-xl text-slate-700">
                    {product.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    {product.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full"
                    aria-label={`Explore ${product.title}`}
                  >
                    <Link href={product.href}>{product.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="pricing"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div variants={item}>
            <Badge>Pricing</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              One clear package.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              The website offer is simple: €400 setup plus €25/month after
              launch. No hidden fees, no bloated package names, just a clear
              offer for a serious business website.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden border-blue-100/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_24px_72px_rgba(59,130,246,0.08)]">
              <CardHeader>
                <Badge>Start now</Badge>
                <CardTitle className="mt-4 text-4xl tracking-[-0.05em]">
                  €400 setup + €25/month
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-base leading-7 text-slate-700">
                  Secure your build slot with a clear setup payment and an
                  ongoing monthly plan for hosting and support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                    <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                      €200 to begin
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                    <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                      €200 before go-live
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-[1.4rem] border border-blue-100 bg-white px-5 py-5 text-sm leading-7 text-slate-700">
                  The setup total is €400. The €25/month plan covers hosting,
                  security updates, basic maintenance, small text or image
                  changes within reasonable limits, ongoing support, and keeping
                  the website online and running properly.
                </div>

                <Button
                  asChild
                  className="w-full"
                  size="lg"
                  aria-label="Get started with the €400 setup and €25 per month offer"
                >
                  <Link href="/checkout/setup-deposit">
                    Get Started {"\u2014"} €400 setup + €25/month
                  </Link>
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
              <Badge>Monthly plan</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                What the €25/month plan includes
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                The monthly plan starts when the website goes live and keeps the
                site supported afterwards.
              </p>
            </motion.div>

            <motion.div variants={item} className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {monthlyPlanIncludes.map((entry) => (
                  <Card
                    key={entry}
                    className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                  >
                    <CardContent className="flex items-start gap-3 px-4 py-4 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {entry}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                <CardContent className="space-y-3 px-5 py-5 text-sm leading-7 text-slate-700">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    Not included
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {monthlyPlanNotIncluded.map((entry) => (
                      <span
                        key={entry}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                      >
                        {entry}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={item}>
            <Badge>Reassurance</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              No risk, no confusion.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
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
      </motion.section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-2xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              A few quick answers before you start.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
              Straight answers help people move faster. Here&apos;s what most
              Irish SME owners want to know first.
            </p>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium tracking-[-0.02em] text-slate-950">
                  <span>{faq.question}</span>
                  <span className="text-2xl font-light text-slate-400 transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="max-w-2xl">
            <Badge variant="secondary">Ziffera</Badge>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Websites. SaaS. Apps. Software. Systems. Built in Ireland.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <CardContent className="space-y-2 px-5 py-5 text-sm text-slate-800">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  Contact email
                </div>
                <a
                  href="mailto:hello@ziffera.ie"
                  className="font-medium text-slate-950 transition hover:text-blue-700"
                  aria-label="Email Ziffera at hello at ziffera dot ie"
                >
                  hello@ziffera.ie
                </a>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <CardContent className="space-y-2 px-5 py-5 text-sm text-slate-800">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  LinkedIn
                </div>
                <a
                  href="https://www.linkedin.com/company/ziffera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-950 transition hover:text-blue-700"
                  aria-label="Visit Ziffera on LinkedIn"
                >
                  LinkedIn profile
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t border-slate-200/80">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <span>
              {"\u00A9"} 2025 Ziffera. All rights reserved. | Built in Ireland{" "}
              {"\u{1F1EE}\u{1F1EA}"}
            </span>
            <span>Ready to launch a better first impression?</span>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
