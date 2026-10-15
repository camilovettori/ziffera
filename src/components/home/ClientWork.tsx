import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrowserFrame from "@/components/home/BrowserFrame";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "Rub & Scrub",
    client: "Mobile car valeting, Dublin",
    logo: { src: "/systems/rubandscrub-logo.png", w: 360, h: 271 },
    needed: "Local customers kept phoning at the wrong time. They needed to book a valet in under a minute from a phone.",
    built: [
      "Mobile-first service site with prices up front",
      "Booking flow that drops straight into WhatsApp",
      "Before/after gallery and local SEO for Dublin searches",
    ],
    stack: ["Next.js", "Supabase", "Vercel"],
    url: "rubandscrub.ie",
    live: "https://www.rubandscrub.ie",
    caseStudy: "/work/rub-and-scrub",
    media: {
      kind: "video" as const,
      src: "/examples/rubandscrub.mp4",
      poster: "/examples/rubandscrub-poster.jpg",
    },
  },
  {
    name: "Frequency Framed",
    client: "Artist selling framed originals",
    logo: { src: "/systems/frequency-framed-logo.png", w: 520, h: 273 },
    needed: "Sales happened over DMs. The artist wanted a proper shop that handles payment, stock and orders without him.",
    built: [
      "Storefront with Stripe, Apple Pay and Google Pay",
      "Admin panel for artworks, stock status and orders",
      "Automatic order emails and a blog editor",
    ],
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    url: "frequencyframed.ie",
    live: "https://www.frequencyframed.ie",
    caseStudy: "/work/frequency-framed",
    media: {
      kind: "image" as const,
      src: "/examples/homepage.png",
      width: 1362,
      height: 1261,
      alt: "Frequency Framed homepage",
    },
  },
  {
    name: "Zconnect",
    client: "Built for Lovin from the Oven, a bakery business",
    logo: null,
    needed: "Staff copied every delivery order from Unify into Zoho Books by hand: names, line items, VAT, totals.",
    built: [
      "Pulls orders from the Unify ordering API",
      "Creates matching draft invoices in Zoho Books",
      "Flags API and authorisation errors instead of failing silently",
    ],
    stack: ["FastAPI", "Next.js", "Zoho API"],
    url: "zconnect — internal tool",
    live: null,
    caseStudy: null,
    media: {
      kind: "video" as const,
      src: "/examples/zconnect.mp4",
      poster: "/examples/zconnect-poster.jpg",
    },
  },
];

export default function ClientWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
          Client work
        </h2>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          Three businesses, three different problems. Each one is running in production today.
        </p>
      </div>

      <div className="mt-14 grid gap-20 lg:gap-28">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
          >
            <BrowserFrame
              url={p.url}
              media={p.media}
              className={i % 2 === 1 ? "lg:order-2" : undefined}
            />

            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                  {p.logo ? (
                    <Image
                      src={p.logo.src}
                      alt=""
                      width={p.logo.w}
                      height={p.logo.h}
                      className="h-11 w-11 rounded-none object-contain"
                    />
                  ) : (
                    <Image
                      src="/brand/ziffera-mark.png"
                      alt=""
                      width={360}
                      height={308}
                      className="h-8 w-auto rounded-none"
                    />
                  )}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.035em] text-ink">{p.name}</h3>
                  <p className="text-sm text-ink-3">{p.client}</p>
                </div>
              </div>

              <p className="mt-6 text-[17px] leading-7 text-ink-2">{p.needed}</p>

              <ul className="mt-5 space-y-2.5 border-l-2 border-z-blue/25 pl-5">
                {p.built.map((b) => (
                  <li key={b} className="text-[15px] leading-6 text-ink">
                    {b}
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <code
                    key={s}
                    className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[12px] text-ink-2"
                  >
                    {s}
                  </code>
                ))}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {p.live ? (
                  <Button asChild variant="outline">
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      Visit {p.url}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {p.caseStudy ? (
                  <Button asChild variant="ghost">
                    <Link href={p.caseStudy}>Read the case study</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
