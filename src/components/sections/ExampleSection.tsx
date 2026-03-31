"use client";

import Image from "next/image";

export default function ExampleSection() {
  return (
    <section className="mt-24">
      {/* HEADER */}
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.24em] text-blue-200">
          Real project example
        </div>

        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          This is the difference between looking amateur and looking established.
        </h2>

        <p className="mt-5 text-lg leading-8 text-slate-400">
          Below is a real client project built by Ziffera — including premium
          design, e-commerce flow, checkout, and a functional admin dashboard.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* MAIN VIDEO */}
          <div className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
              <video
                src="/examples/homepage.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Live website experience — homepage and structure
            </div>
          </div>

          {/* CHECKOUT */}
          <div className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
              <Image
                src="/examples/checkout.png"
                alt="Checkout"
                width={1200}
                height={900}
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Full checkout system with customer and delivery flow
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* GALLERY */}
          <div className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10">
              <Image
                src="/examples/gallery.png"
                alt="Gallery"
                width={1000}
                height={750}
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="mt-3 text-sm text-slate-400">
              Product gallery / collection layout
            </div>
          </div>

          {/* ADMIN VIDEO */}
          <div className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10">
              <video
                src="/examples/admin.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <div className="mt-3 text-sm text-slate-400">
              Admin dashboard to manage content, products and business data
            </div>
          </div>

          {/* CART */}
          <div className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10">
              <Image
                src="/examples/cart.png"
                alt="Cart"
                width={1000}
                height={750}
                className="w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="mt-3 text-sm text-slate-400">
              Cart experience designed for clarity and conversion
            </div>
          </div>
        </div>
      </div>

      {/* VALUE STRIP */}
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          "Custom design — no templates",
          "Professional e-commerce flow",
          "Admin dashboard included",
          "Built to look credible and premium",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-slate-300 transition duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]"
          >
            {item}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#apply"
          className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.35)] transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-300"
        >
          I want something like this
        </a>

        <a
          href="https://frequencyframed.ie"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm text-white transition duration-300 hover:bg-white/[0.08]"
        >
          Visit live website
        </a>
      </div>
    </section>
  );
}