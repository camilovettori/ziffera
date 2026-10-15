import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Proof = { name: string; src: string; w: number; h: number };

const proof = {
  zrecipe: { name: "ZRecipe", src: "/systems/zrecipe-icon.png", w: 200, h: 242 },
  marginflow: { name: "MarginFlow", src: "/systems/marginflow-icon.png", w: 200, h: 194 },
  ff: { name: "Frequency Framed", src: "/systems/frequency-framed-logo.png", w: 520, h: 273 },
  rs: { name: "Rub & Scrub", src: "/systems/rubandscrub-logo.png", w: 360, h: 271 },
  zconnect: { name: "Zconnect", src: "/brand/ziffera-mark.png", w: 360, h: 308 },
} satisfies Record<string, Proof>;

function ProofRow({ items, label }: { items: Proof[]; label: string }) {
  return (
    <div className="mt-auto flex items-center gap-3 border-t border-line pt-5">
      <span className="text-sm text-ink-3">{label}</span>
      <span className="flex -space-x-2">
        {items.map((p) => (
          <span
            key={p.name}
            title={p.name}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-line bg-white ring-2 ring-surface"
          >
            <Image src={p.src} alt={p.name} width={p.w} height={p.h} className="h-7 w-7 rounded-none object-contain" />
          </span>
        ))}
      </span>
    </div>
  );
}

const connected = ["Zoho Books", "Zoho Invoice", "Unify", "Stripe", "WhatsApp", "Supabase", "Resend", "Your own APIs"];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
          What we build for companies
        </h2>
        <p className="max-w-lg text-lg leading-8 text-ink-2 lg:justify-self-end">
          Most clients come to us for a website and stay for the systems behind it. We
          design, build, host and support all three.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {/* Custom systems */}
        <article className="flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-9">
          <h3 className="text-2xl font-bold tracking-[-0.035em] text-ink">Custom business systems</h3>
          <p className="mt-3 text-[17px] leading-7 text-ink-2">
            Software built around the way your company works, instead of bending your team
            around another off-the-shelf tool.
          </p>
          <ul className="mt-7 grid gap-x-6 gap-y-3 pb-8 sm:grid-cols-2">
            {[
              "Dashboards and weekly reports",
              "Admin panels and back-office tools",
              "Booking, ordering and stock systems",
              "Customer portals and SaaS products",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-z-blue" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ProofRow items={[proof.zrecipe, proof.marginflow, proof.ff]} label="Running today in" />
        </article>

        {/* Integrations */}
        <article className="flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-9">
          <h3 className="text-2xl font-bold tracking-[-0.035em] text-ink">Integrations and automation</h3>
          <p className="mt-3 text-[17px] leading-7 text-ink-2">
            If your team copies data from one system into another, we connect them so it
            happens on its own, with errors flagged instead of lost.
          </p>

          <div
            className="mt-7 flex items-center gap-2 overflow-x-auto rounded-xl border border-line bg-paper p-3 font-mono text-[12px] text-ink-2"
            aria-label="Example: Unify orders become Zoho Books invoices through Zconnect"
          >
            <span className="shrink-0 rounded-md border border-line bg-surface px-2.5 py-1.5">Unify orders</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-z-blue" aria-hidden="true" />
            <span className="shrink-0 rounded-md border border-z-blue/30 bg-z-wash px-2.5 py-1.5 text-z-deep">Zconnect</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-z-blue" aria-hidden="true" />
            <span className="shrink-0 rounded-md border border-line bg-surface px-2.5 py-1.5">Zoho Books invoices</span>
          </div>

          <p className="mt-6 text-sm text-ink-3">Tools we&apos;ve connected</p>
          <p className="mt-2 flex flex-wrap gap-2 pb-8">
            {connected.map((c) => (
              <code key={c} className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[12px] text-ink-2">
                {c}
              </code>
            ))}
          </p>
          <ProofRow items={[proof.zconnect, proof.ff]} label="Running today in" />
        </article>

        {/* Websites */}
        <article className="grid gap-8 rounded-2xl border border-line bg-surface p-7 sm:p-9 lg:col-span-2 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-[-0.035em] text-ink">Websites and online shops</h3>
            <p className="mt-3 max-w-lg text-[17px] leading-7 text-ink-2">
              Fast, mobile-first sites that explain what you do and turn visitors into
              bookings, enquiries and sales. Online payments with Stripe, Apple Pay and
              Google Pay.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {["Company and service websites", "E-commerce with stock and orders", "Booking and quote flows", "SEO, hosting and ongoing care"].map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-z-blue" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="#work" className="inline-flex items-center gap-2 text-[15px] font-semibold text-z-deep hover:text-z-blue">
              See websites we&apos;ve launched
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
