import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BrowserFrame from "@/components/home/BrowserFrame";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <section id="products" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
            Software we build and run ourselves
          </h2>
          <p className="max-w-lg text-lg leading-8 text-ink-2 lg:justify-self-end">
            Ziffera also ships its own products for food businesses. The same people who
            build your website maintain these every week.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* ZRecipe */}
          <article className="overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <Image
                src="/systems/zrecipe-logo.png"
                alt="ZRecipe"
                width={560}
                height={186}
                className="h-10 w-auto rounded-none"
              />
              <Button asChild variant="outline" size="sm">
                <a href="https://zrecipe.ie" target="_blank" rel="noopener noreferrer">
                  zrecipe.ie
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="max-w-lg px-6 pt-4 text-[17px] leading-7 text-ink-2 sm:px-8">
              Food costing for bakeries and restaurants. Add your ingredients once and see the
              true cost, margin and selling price of every recipe, VAT included.
            </p>
            <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
              <BrowserFrame
                url="zrecipe.ie/recipes"
                aspect="aspect-[16/10]"
                media={{
                  kind: "video",
                  src: "/systems/zrecipe-demo.mp4",
                  poster: "/systems/zrecipe-poster.jpg",
                }}
              />
            </div>
          </article>

          {/* MarginFlow */}
          <article className="flex flex-col rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <Image
              src="/systems/marginflow-logo.png"
              alt="MarginFlow"
              width={520}
              height={103}
              className="h-8 w-auto self-start rounded-none"
            />
            <p className="mt-5 text-[17px] leading-7 text-ink-2">
              Weekly margin reports for cafés and bakeries, already used by a working café.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
              {[
                ["Sales", "Synced from Zoho Invoice, ex VAT"],
                ["Costing", "Recipes and ingredient prices"],
                ["Reports", "Weekly PDF sent by email"],
                ["Multi-site", "Switch between companies"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 bg-surface px-4 py-3">
                  <dt className="font-mono text-[12px] leading-5 text-z-deep">{k}</dt>
                  <dd className="leading-5 text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-auto pt-6 text-sm text-ink-3">
              Built with Next.js, FastAPI and PostgreSQL.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
