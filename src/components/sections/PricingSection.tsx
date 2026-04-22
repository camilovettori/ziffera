"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const offerPoints = [
  "Fast delivery (5-14 days)",
  "No contracts",
  "Cancel anytime",
  "Ongoing support included",
];

const monthlyIncludes = [
  "Hosting and security updates",
  "Basic maintenance and support",
  "Small text or image changes",
  "A website that stays online and working properly",
];

const riskReversal = [
  "No contract. Cancel anytime.",
  "You only pay the rest when you\u2019re happy.",
  "Most projects delivered in under 2 weeks.",
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

export default function PricingSection() {
  return (
    <motion.section
      id="pricing"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Pricing</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Landing pages, business websites, and e-commerce websites all start with
            a clear entry price, then stay supported after launch.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            The website offer is the priority. Landing Page is the fastest entry
            point, Business Website is the main option for most service businesses,
            and E-commerce Store is for selling online with less friction.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={item}>
            <Card className="h-full overflow-hidden border-blue-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] shadow-[0_28px_72px_rgba(59,130,246,0.12)]">
              <CardHeader>
                <Badge className="w-fit border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-700">
                  Website offer
                </Badge>
                <CardTitle className="mt-4 text-4xl tracking-[-0.05em] text-slate-950">
                  €400 setup + €25/month
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-base leading-7 text-slate-700">
                  A simple setup fee gets the project moving. The monthly plan keeps the
                  site hosted, supported, and maintained after launch.
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

                <div className="grid gap-3">
                  {offerPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 rounded-[1.2rem] border border-blue-100 bg-blue-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
                  {riskReversal.map((line) => (
                    <div key={line} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-blue-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="w-full" aria-label="Get your website">
                  <Link href="/contact">Get your website</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full overflow-hidden border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <CardHeader>
                <Badge variant="secondary">What is included</Badge>
                <CardTitle className="mt-4 text-3xl tracking-[-0.05em] text-slate-950">
                  Support that keeps the site simple.
                </CardTitle>
                <CardDescription className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                  The monthly fee covers the essentials that keep a website running
                  properly after launch.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {monthlyIncludes.map((itemText) => (
                  <div
                    key={itemText}
                    className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {itemText}
                  </div>
                ))}

                <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
                  All projects start with a 50% deposit. Final payment before launch.
                  No lock-in contracts.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
