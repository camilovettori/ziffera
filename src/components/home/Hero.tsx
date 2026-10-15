import Link from "next/link";
import { Button } from "@/components/ui/button";
import SystemMap from "@/components/home/SystemMap";

const stack = ["Next.js", "Stripe", "PostgreSQL", "FastAPI", "Zoho API"];

const facts = [
  ["4", "systems live in production"],
  ["5–14", "days for a typical website"],
  ["Fixed", "written quote before we start"],
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-paper"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1fr_1.02fr] lg:gap-10 lg:px-10 lg:pb-24 lg:pt-16">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-z-deep">Web and software studio, Dublin</p>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1] tracking-[-0.05em] text-ink sm:text-6xl xl:text-[4.25rem]">
            Websites, custom software and integrations.
          </h1>

          <p className="mt-6 max-w-[34rem] text-lg leading-8 text-ink-2">
            Ziffera designs and builds the digital side of growing companies: the website that
            brings customers in, the systems your team works in every day, and the
            integrations that make your tools talk to each other.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Book a call</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#work">See our work</Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {facts.map(([value, label]) => (
              <div key={label} className="bg-surface px-4 py-3">
                <dt className="sr-only">{label}</dt>
                <dd className="font-mono text-xl font-semibold tracking-tight text-ink">{value}</dd>
                <dd className="text-xs leading-4 text-ink-3">{label}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-3">
            <span>Built with</span>
            {stack.map((s) => (
              <code
                key={s}
                className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[12px] text-ink-2"
              >
                {s}
              </code>
            ))}
          </p>
        </div>

        <SystemMap />
      </div>
    </section>
  );
}
