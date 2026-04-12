"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const proofPoints = [
  "Live website at frequencyframed.ie",
  "Stripe checkout and admin flow included",
  "A real client build, not a mock-up gallery",
];

const proofSpecs = [
  {
    title: "Homepage",
    text: "Clear structure that leads visitors toward action.",
  },
  {
    title: "Checkout",
    text: "Embedded Stripe flow with a simple payment path.",
  },
  {
    title: "Admin",
    text: "Practical controls for ongoing management.",
  },
];

export default function ExampleSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24">
      <div
        id="work"
        className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <Badge>Real client project</Badge>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Frequency Framed.
          </h2>

          <Card className="mt-5 border-none bg-transparent shadow-none">
            <CardContent className="px-0">
              <CardDescription className="max-w-xl text-lg leading-8 text-slate-600">
                The only real project featured on the homepage. A live e-commerce
                build with Stripe, an admin panel, and a polished storefront.
              </CardDescription>
            </CardContent>
          </Card>

          <div className="mt-6 rounded-[1.6rem] border border-blue-100 bg-white px-5 py-4 shadow-[0_16px_38px_rgba(59,130,246,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
              Live proof
            </div>
            <div className="mt-2 text-base font-semibold text-slate-900">
              Frequency Framed is live at frequencyframed.ie.
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {proofPoints.map((point) => (
              <Card
                key={point}
                className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              >
                <CardContent className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              aria-label="Get started with a website like Frequency Framed"
            >
              <Link href="/checkout/setup-deposit">
                Start a similar build <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              aria-label="View the live Frequency Framed website"
            >
              <a
                href="https://www.frequencyframed.ie"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live proof
              </a>
            </Button>
          </div>
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

          <div className="grid gap-4 sm:grid-cols-3">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
