import Image from "next/image";
import Link from "next/link";

const proofPoints = [
  "Real client project",
  "Stripe integration",
  "Admin panel",
  "Mobile-ready",
];

export default function ExampleSection() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-blue-700">
            Real proof
          </div>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Frequency Framed.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A real e-commerce build with Stripe, an admin panel, and a
            polished storefront.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {proofPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
              >
                {point}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Start your project
            </Link>

            <a
              href="https://www.frequencyframed.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition duration-300 hover:border-blue-200 hover:bg-blue-50"
            >
              Visit live website
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[16/10]">
              <Image
                src="/examples/homepage.png"
                alt="Frequency Framed homepage"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
              Homepage and storefront presentation.
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/examples/checkout.png"
                alt="Frequency Framed checkout view"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
              Checkout flow.
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/examples/admin.png"
                alt="Frequency Framed admin dashboard"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
              Admin panel.
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/examples/gallery.png"
                alt="Frequency Framed gallery view"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
              Product gallery.
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/examples/mobileFF.jpg"
                alt="Frequency Framed mobile preview"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
              Mobile view.
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/examples/cart.png"
                alt="Frequency Framed cart view"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
              Cart flow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
