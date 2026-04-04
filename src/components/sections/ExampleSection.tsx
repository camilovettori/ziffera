"use client";

import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const proofPoints = ["Real client project", "Stripe integration", "Admin panel"];

const proofSlides = [
  {
    src: "/examples/homepage.png",
    alt: "Frequency Framed homepage",
    label: "Homepage",
    caption: "Clean storytelling and stronger conversion hierarchy.",
  },
  {
    src: "/examples/checkout.png",
    alt: "Frequency Framed checkout",
    label: "Checkout",
    caption: "Simple buying flow with Stripe.",
  },
  {
    src: "/examples/admin.png",
    alt: "Frequency Framed admin",
    label: "Admin",
    caption: "Practical back-office controls for the client.",
  },
  {
    src: "/examples/mobileFF.jpg",
    alt: "Frequency Framed mobile view",
    label: "Mobile",
    caption: "A polished responsive experience on smaller screens.",
  },
];

export default function ExampleSection() {
  const reduceMotion = useReducedMotion();
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
    if (!emblaApi || paused || reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4200);

    return () => window.clearInterval(interval);
  }, [emblaApi, paused, reduceMotion]);

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
          <Badge>Real client project</Badge>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Frequency Framed.
          </h2>

          <Card className="mt-5 border-none bg-transparent shadow-none">
            <CardContent className="px-0">
              <CardDescription className="max-w-xl text-lg leading-8 text-slate-600">
                A real e-commerce build with Stripe, an admin panel, and a
                polished storefront.
              </CardDescription>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-wrap gap-3">
            {proofPoints.map((point) => (
              <Card
                key={point}
                className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              >
                <CardContent className="px-4 py-3 text-sm font-medium text-slate-600">
                  {point}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Start your project</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href="https://www.frequencyframed.ie" target="_blank" rel="noopener noreferrer">
                Visit live website
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="rounded-[2rem] border border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <Badge variant="secondary">Curated gallery</Badge>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/90"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/90"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={emblaRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="overflow-hidden"
          >
            <div className="flex gap-4">
              {proofSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_74%] lg:flex-[0_0_66%]"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                      <CardContent className="p-4">
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white">
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            sizes="(max-width: 768px) 88vw, (max-width: 1024px) 72vw, 64vw"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <Badge variant="outline">{slide.label}</Badge>
                          <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            0{index + 1}
                          </span>
                        </div>
                        <CardHeader className="px-0 pb-0 pt-4">
                          <CardTitle className="text-xl tracking-[-0.04em] text-slate-950">
                            Frequency Framed
                          </CardTitle>
                          <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                            {slide.caption}
                          </CardDescription>
                        </CardHeader>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {proofSlides.map((slide, index) => (
                <button
                  key={slide.src}
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
              {String(proofSlides.length).padStart(2, "0")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
