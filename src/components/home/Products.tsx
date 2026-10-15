import Image from "next/image";

const features = [
  ["Sales", "Synced from Zoho Invoice, ex VAT"],
  ["Costing", "Recipes and ingredient prices"],
  ["Reports", "Weekly PDF sent by email"],
  ["Multi-site", "Switch between companies"],
];

export default function Products() {
  return (
    <section id="products" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <p className="font-mono text-[12px] text-z-deep">In development</p>
          <Image
            src="/systems/marginflow-logo.png"
            alt="MarginFlow"
            width={520}
            height={103}
            className="mt-3 h-9 w-auto rounded-none"
          />
          <p className="mt-5 max-w-md text-lg leading-8 text-ink-2">
            Weekly margin reports for cafés and bakeries, already used by a working café.
            Built alongside ZRecipe on Next.js, FastAPI and PostgreSQL.
          </p>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line text-[15px] sm:grid-cols-2">
          {features.map(([k, v]) => (
            <div key={k} className="bg-paper px-5 py-4">
              <dt className="font-mono text-[12px] text-z-deep">{k}</dt>
              <dd className="mt-1 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
