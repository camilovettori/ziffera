import Link from "next/link";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "Fixed-scope project",
    fit: "Websites, online shops and smaller tools",
    body: "We agree what gets built and you get one fixed price in writing before any work starts.",
  },
  {
    name: "Phased system build",
    fit: "Custom systems and integrations",
    body: "Larger builds are split into phases you can use as they ship, each with its own scope and quote.",
  },
  {
    name: "Ongoing care",
    fit: "Everything we've launched",
    body: "Hosting, security updates, maintenance and small changes on a monthly plan you can cancel any time.",
  },
];

const commitments = [
  "Written scope and fixed quote",
  "No lock-in contracts",
  "One team from first contact to support",
  "Based in Dublin, working across Ireland",
];

export default function Engagement() {
  return (
    <section id="engagement" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
            How we work together
          </h2>
          <p className="max-w-lg text-lg leading-8 text-ink-2 lg:justify-self-end">
            Every business is different, so we quote after a short conversation rather than
            from a price list. You&apos;ll know the full cost before we start.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {models.map((m) => (
            <article key={m.name} className="flex flex-col bg-paper p-7 sm:p-8">
              <p className="font-mono text-[12px] text-z-deep">{m.fit}</p>
              <h3 className="mt-3 text-xl font-bold tracking-[-0.03em] text-ink">{m.name}</h3>
              <p className="mt-3 text-[15px] leading-6 text-ink-2">{m.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {commitments.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-[15px] text-ink">
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-z-blue" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
