import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import ClientWork from "@/components/home/ClientWork";
import Products from "@/components/home/Products";

export const metadata: Metadata = {
  title: "Website Projects — Ziffera",
  description:
    "Websites, an online shop, a SaaS product and an integration built by Ziffera, all live and in daily use.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Website Projects — Ziffera",
    description:
      "Websites, an online shop, a SaaS product and an integration built by Ziffera, all live and in daily use.",
    url: "https://www.ziffera.ie/work",
    siteName: "Ziffera",
    type: "website",
    images: [
      {
        url: "/examples/homepage.png",
        width: 1200,
        height: 630,
        alt: "Ziffera website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Projects — Ziffera",
    description:
      "Websites, an online shop, a SaaS product and an integration built by Ziffera, all live and in daily use.",
    images: ["/examples/homepage.png"],
  },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative border-b border-line">
          <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-paper"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
            <p className="text-sm font-medium text-z-deep">Work</p>
            <h1 className="mt-4 max-w-3xl text-[2.75rem] font-extrabold leading-[1] tracking-[-0.05em] text-ink sm:text-6xl xl:text-7xl">
              Real systems, running in production.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-2">
              An online shop, a booking site, a SaaS product and an integration. No mock-ups
              or concept work: everything here is live and used every day.
            </p>
          </div>
        </section>
        <ClientWork showHeading={false} />
        <Products />
      </main>
      <SiteFooter />
    </>
  );
}
