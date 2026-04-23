"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    name: "Rub & Scrub",
    description: "Service Website",
    video: "/examples/rubandscrub.mp4",
  },
  {
    name: "Zconnect",
    description: "Automation System",
    video: "/examples/zconnect.mp4",
  },
];

export default function ExampleSection() {
  return (
    <section id="work" className="bg-[#080C10] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 border-white/10 bg-white/5 text-white/60 hover:bg-white/5">
            Real client work
          </Badge>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
            Our Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/50">
            Live projects that help businesses look credible, get enquiries
            faster, and make it easier for people to take the next step.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F14]"
            >
              <div className="overflow-hidden">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-4">
                <p className="text-base font-semibold text-white">
                  {project.name}
                </p>
                <p className="mt-0.5 text-sm text-white/45">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
