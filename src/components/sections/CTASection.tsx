"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function CTASection() {
  return (
    <motion.section
      id="contact"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item}>
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_72px_rgba(15,23,42,0.08)]">
            <CardContent className="px-6 py-14 text-center sm:px-10 sm:py-16">
              <Badge className="mx-auto">Contact</Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                Contact
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                Tell us what you need. We&apos;ll send a clear quote and the next
                step. No pitch, no pressure.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  aria-label="Get your website"
                >
                  <Link href="/contact">Get your website</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  aria-label="View Ziffera pricing"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
