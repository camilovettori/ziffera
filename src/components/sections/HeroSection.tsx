"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Plug,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
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

const heroPoints = [
  "50% deposit to start",
  "Premium design",
  "7-day delivery",
];

type HeroSlide = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  tone: "blue" | "slate";
  icon: ReactNode;
  image?: string;
  footnote?: string;
  cta: string;
  href: string;
};

const slides: HeroSlide[] = [
  {
    badge: "Website package",
    title: "€650 total",
    description: "Pay 50% to begin and 50% before the site goes live.",
    highlights: ["Custom design", "Mobile optimized"],
    tone: "blue",
    icon: <Globe className="h-5 w-5" />,
    footnote: "Premium website projects built to convert.",
    cta: "Start your website",
    href: "/checkout/setup-deposit",
  },
  {
    badge: "Fast delivery",
    title: "Launch in 7 days",
    description: "A focused process that gets your business online quickly.",
    highlights: ["Clear scope", "Direct communication"],
    tone: "slate",
    icon: <Sparkles className="h-5 w-5" />,
    footnote: "Built for real businesses, not template work.",
    cta: "Start your website",
    href: "/checkout/setup-deposit",
  },
  {
    badge: "Real client project",
    title: "Frequency Framed",
    description: "A real e-commerce build with a polished storefront.",
    highlights: ["Stripe checkout", "Admin tools"],
    tone: "blue",
    icon: <Sparkles className="h-5 w-5" />,
    image: "/examples/homepage.png",
    cta: "View our work",
    href: "/#work",
  },
  {
    badge: "Launch support",
    title: "Built for real businesses",
    description:
      "The handoff is clean, the site is polished, and the next step is obvious.",
    highlights: ["Admin access", "Contact or booking setup"],
    tone: "blue",
    icon: <Plug className="h-5 w-5" />,
    footnote: "No generic agency noise.",
    cta: "Start your website",
    href: "/checkout/setup-deposit",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused) {
      return;
    }

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3800);

    return () => window.clearInterval(interval);
  }, [emblaApi, paused]);

  return (
    <section className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden px-6 pb-16 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-blue-300/35 blur-3xl float-slow" />
        <div className="absolute right-[-4%] top-[8%] h-72 w-72 rounded-full bg-sky-300/28 blur-3xl float-slow [animation-delay:1.5s]" />
        <div className="absolute bottom-[-10%] left-[16%] h-64 w-64 rounded-full bg-indigo-300/24 blur-3xl float-slow [animation-delay:3s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_22%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        <Badge>Premium website projects</Badge>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]"
        >
          Get your business online
          <br />
          <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
            in 7 days.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9"
        >
          We design and build premium websites that help real businesses look
          professional, build trust, and get more customers.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-4 max-w-2xl text-sm leading-7 text-slate-500"
        >
          Pay only 50% to start.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Button asChild size="lg">
            <Link href="/checkout/setup-deposit">Start your website</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/#work">View our work</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {heroPoints.map((point) => (
            <Card
              key={point}
              className="overflow-hidden border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
            >
              <CardContent className="px-4 py-3 text-sm font-medium text-slate-700">
                {point}
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.16 }}
        className="relative mx-auto w-full max-w-[410px] lg:self-center"
      >
        <div className="pointer-events-none absolute -left-8 top-6 h-32 w-32 rounded-full bg-blue-200/75 blur-3xl" />
        <div className="pointer-events-none absolute -right-6 bottom-4 h-32 w-32 rounded-full bg-cyan-200/70 blur-3xl" />

        <Card className="overflow-hidden border-white/80 bg-white/95 p-2.5 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-3 shadow-[0_14px_28px_rgba(15,23,42,0.05)] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Featured offer</Badge>
                <span className="hidden text-[10px] uppercase tracking-[0.24em] text-slate-400 sm:inline">
                  compact preview
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full bg-white/90"
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full bg-white/90"
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div
              ref={emblaRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="overflow-hidden"
            >
              <div className="flex">
                {slides.map((slide) => (
                  <div key={slide.title} className="min-w-0 flex-[0_0_100%] pr-3">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <Card
                        className={[
                          "overflow-hidden border-slate-200 shadow-[0_18px_44px_rgba(15,23,42,0.08)]",
                          slide.tone === "blue"
                            ? "bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)]"
                            : "bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]",
                        ].join(" ")}
                      >
                        <CardHeader className="pb-2">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <Badge>{slide.badge}</Badge>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-[0_12px_24px_rgba(59,130,246,0.08)]">
                              {slide.icon}
                            </div>
                          </div>
                          <CardTitle className="text-xl tracking-[-0.05em]">
                            {slide.title}
                          </CardTitle>
                          <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                            {slide.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          {slide.image ? (
                            <div className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                              <div className="relative aspect-[16/11]">
                                <Image
                                  src={slide.image}
                                  alt={slide.title}
                                  fill
                                  sizes="(max-width: 1024px) 420px, 420px"
                                  className="object-cover object-top"
                                />
                              </div>
                            </div>
                          ) : null}

                          <div className="grid gap-2">
                            {slide.highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700"
                              >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                                {highlight}
                              </div>
                            ))}
                          </div>

                          {slide.footnote ? (
                            <>
                              <Separator />
                              <div className="rounded-[1.25rem] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
                                {slide.footnote}
                              </div>
                            </>
                          ) : null}
                        </CardContent>

                        <CardContent className="pt-0">
                          <Button asChild className="w-full">
                            <Link href={slide.href}>{slide.cta}</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={[
                      "h-2.5 rounded-full transition-all duration-300",
                      index === selectedIndex ? "w-8 bg-blue-500" : "w-2.5 bg-slate-300",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
