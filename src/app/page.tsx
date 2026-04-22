"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import ExampleSection from "@/components/sections/ExampleSection";
import HeroSection from "@/components/sections/HeroSection";
import PricingSection from "@/components/sections/PricingSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const productProof = [
  {
    title: "MarginFlow",
    desc: "A software product that proves Ziffera can ship real digital tools, not just brochure sites.",
    bullets: ["Product design", "Commercial thinking", "Subscription-ready"],
    href: "/products/marginflow",
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

const proofSpecs = [
  {
    title: "Live e-commerce",
    text: "Full storefront with gallery, artwork pages, and cart.",
  },
  {
    title: "Stripe checkout",
    text: "Direct payments with a clean, embedded checkout flow.",
  },
  {
    title: "Admin panel",
    text: "Client manages products and orders without a developer.",
  },
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
      <TestimonialsSection />
      <ServicesSection />

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

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="grid gap-4"
          >
            {proofSpecs.map((shot) => (
              <Card
                key={shot.title}
                className="overflow-hidden border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="outline">{shot.title}</Badge>
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl tracking-[-0.04em] text-slate-950">
                    Frequency Framed
                  </CardTitle>
                  <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    {shot.text}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="grid gap-4"
          >
            <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
              <div className="flex items-center justify-between gap-4">
                <Badge variant="secondary">Frequency Framed</Badge>
                <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                  Live client work
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="relative aspect-[16/11] bg-slate-200">
                  <Image
                    src="/examples/homepage.png"
                    alt="Frequency Framed homepage preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <PricingSection />

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

      <CTASection />

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
              {"Â©"} 2025 Ziffera. All rights reserved. | Built in Ireland{" "}
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
