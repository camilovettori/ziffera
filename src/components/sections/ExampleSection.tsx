"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const projects = [
  {
    name: "Frequency Framed",
    badge: "E-commerce website",
    image: "/examples/homepage.png",
    imageAlt: "Frequency Framed homepage preview",
    liveHref: "https://www.frequencyframed.ie",
    liveLabel: "View live site",
    outcome: "Started selling online instantly",
    summary:
      "A premium storefront that makes the brand feel more established and helps customers buy with less friction.",
    bullets: [
      "Looks more established at first glance",
      "Makes online selling feel simple",
      "Gives visitors a clearer path to buy",
    ],
  },
  {
    name: "Rub & Scrub",
    badge: "Service website",
    image: "/examples/rub-and-scrub.png",
    imageAlt: "Rub and Scrub homepage preview",
    liveHref: "https://www.rubandscrub.ie",
    liveLabel: "View live site",
    outcome: "Increased bookings with a simple flow",
    summary:
      "A clean booking site that turns local traffic into enquiries faster and makes the business look more credible.",
    bullets: [
      "Helps visitors book faster",
      "Builds trust with before/after proof",
      "Makes the business look more professional",
    ],
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

export default function ExampleSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-20 lg:py-24">
      <div
        id="work"
        className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <Badge>Real client work</Badge>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Our Work
          </h2>

          <Card className="mt-5 border-none bg-transparent shadow-none">
            <CardContent className="px-0">
              <CardDescription className="max-w-xl text-lg leading-8 text-slate-600">
                Live projects that help businesses look credible, get enquiries
                faster, and make it easier for people to take the next step.
              </CardDescription>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/work">View all work</Link>
            </Button>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              "Real screenshots, not mockups",
              "Website outcomes, not tech jargon",
              "Each project links to the live site",
            ].map((point) => (
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
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="grid gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={item}>
              <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="secondary">{project.name}</Badge>
                  <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                    {project.badge}
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
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                  <div>
                    <CardTitle className="text-2xl tracking-[-0.05em] text-slate-950">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                      {project.summary}
                    </CardDescription>
                    <div className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                      Outcome: {project.outcome}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {project.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-slate-700"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    aria-label={`View live site for ${project.name}`}
                  >
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.liveLabel} <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
