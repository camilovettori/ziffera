"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Aoife M.",
    role: "Independent Physiotherapy Clinic",
    quote:
      "The new site made us look much more established, and enquiries felt warmer almost immediately.",
  },
  {
    name: "Luca D.",
    role: "Local Consultancy",
    quote:
      "The process was straightforward, quick, and the finished website felt premium from the first screen.",
  },
  {
    name: "Niamh S.",
    role: "Boutique Service Business",
    quote:
      "We finally had a website that matched the quality of the service we already deliver to clients.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TestimonialsSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="bg-[#0a0a1a] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div variants={item} className="max-w-2xl">
          <Badge>Testimonials</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Trusted by real businesses.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.7)]">
            Irish businesses that needed a serious website - without the agency overhead.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={item}>
              <Card className="relative h-full overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] shadow-none">
                <div
                  className="pointer-events-none absolute right-5 top-4 text-7xl leading-none text-[rgba(124,58,237,0.15)]"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <CardContent className="flex h-full flex-col px-6 py-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex} aria-hidden="true">★</span>
                    ))}
                  </div>

                  <p className="mt-5 text-[17px] leading-[1.75] text-[rgba(255,255,255,0.7)]">
                    {testimonial.quote}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_55%,#06B6D4_100%)] text-[13px] font-bold tracking-[0.08em] text-white shadow-[0_14px_32px_rgba(124,58,237,0.3)]">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[rgba(255,255,255,0.5)]">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
