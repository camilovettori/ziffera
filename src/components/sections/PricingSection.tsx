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
  "You only pay the rest when you’re happy.",
  "Most projects delivered in under 2 weeks.",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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
      className="bg-[#0d0d24] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Pricing</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.7)]">
            Landing pages, business websites, and e-commerce websites all start with
            a clear entry price, then stay supported after launch.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[rgba(255,255,255,0.55)]">
            The website offer is the priority. Landing Page is the fastest entry
            point, Business Website is the main option for most service businesses,
            and E-commerce Store is for selling online with less friction.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={item}>
            <Card className="h-full overflow-hidden border-[rgba(59,130,246,0.25)] bg-[rgba(37,99,235,0.06)] shadow-[0_28px_72px_rgba(59,130,246,0.08)]">
              <CardHeader>
                <Badge className="w-fit border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.12)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#a78bfa]">
                  Website offer
                </Badge>
                <CardTitle className="mt-4 text-4xl tracking-[-0.05em] text-white">
                  €400 setup + €25/month
                </CardTitle>
                <CardDescription className="mt-3 max-w-xl text-base leading-7 text-[rgba(255,255,255,0.7)]">
                  A simple setup fee gets the project moving. The monthly plan keeps the
                  site hosted, supported, and maintained after launch.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)]">
                    <CardContent className="px-4 py-3 text-sm font-medium text-[rgba(255,255,255,0.8)]">
                      €200 to begin
                    </CardContent>
                  </Card>
                  <Card className="border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)]">
                    <CardContent className="px-4 py-3 text-sm font-medium text-[rgba(255,255,255,0.8)]">
                      €200 before go-live
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-3">
                  {offerPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm leading-6 text-[rgba(255,255,255,0.7)]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-[#a78bfa]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 rounded-[1.2rem] border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] px-4 py-4 text-sm leading-6 text-[rgba(255,255,255,0.7)]">
                  {riskReversal.map((line) => (
                    <div key={line} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(124,58,237,0.2)] text-[#a78bfa]">
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
            <Card className="h-full overflow-hidden border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] shadow-none">
              <CardHeader>
                <Badge variant="secondary">What is included</Badge>
                <CardTitle className="mt-4 text-3xl tracking-[-0.05em] text-white">
                  Support that keeps the site simple.
                </CardTitle>
                <CardDescription className="mt-3 max-w-2xl text-base leading-7 text-[rgba(255,255,255,0.7)]">
                  The monthly fee covers the essentials that keep a website running
                  properly after launch.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {monthlyIncludes.map((itemText) => (
                  <div
                    key={itemText}
                    className="flex items-center gap-3 rounded-[1.2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[rgba(255,255,255,0.7)]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-[#a78bfa]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {itemText}
                  </div>
                ))}

                <div className="mt-5 rounded-[1.4rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-4 text-sm leading-7 text-[rgba(255,255,255,0.55)]">
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
