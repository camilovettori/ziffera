"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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
      className="bg-[#0d0d24] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item}>
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-[rgba(124,58,237,0.25)] bg-[rgba(124,58,237,0.06)] shadow-[0_24px_72px_rgba(124,58,237,0.1)]">
            <CardContent className="px-6 py-14 text-center sm:px-10 sm:py-16">
              <Badge className="mx-auto">Contact</Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Contact
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.7)]">
                Tell us what you need. We&apos;ll send a clear quote and the next
                step. No pitch, no pressure.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" aria-label="Get your website">
                  <Link href="/contact">Get your website</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  aria-label="View Ziffera pricing"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
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
