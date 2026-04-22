import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Website Projects — Ziffera",
  description:
    "Explore real websites built by Ziffera, including e-commerce stores and business websites.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Website Projects — Ziffera",
    description:
      "Explore real websites built by Ziffera, including e-commerce stores and business websites.",
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
      "Explore real websites built by Ziffera, including e-commerce stores and business websites.",
    images: ["/examples/homepage.png"],
  },
};

const projects = [
  {
    name: "Frequency Framed",
    badge: "E-commerce website",
    image: "/examples/homepage.png",
    imageAlt: "Frequency Framed homepage preview",
    liveHref: "https://www.frequencyframed.ie",
    detailHref: "/work/frequency-framed",
    summary:
      "A premium storefront that helps the brand look more established and makes it easier to sell online.",
    outcome: "Started selling online instantly",
    bullets: [
      "Looks more established from the first screen",
      "Makes online selling feel easier",
      "Helps visitors take action faster",
    ],
  },
  {
    name: "Rub & Scrub",
    badge: "Service website",
    image: "/examples/rub-and-scrub.png",
    imageAlt: "Rub and Scrub homepage preview",
    liveHref: "https://www.rubandscrub.ie",
    detailHref: "/work/rub-and-scrub",
    summary:
      "A clean booking site that turns local traffic into enquiries and makes the business look more credible.",
    outcome: "Increased bookings with a simple flow",
    bullets: [
      "Helps people book faster",
      "Shows proof of quality with photos",
      "Builds trust before the customer reaches out",
    ],
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F0F4FF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f5f9ff_40%,#eef4ff_100%)]" />
        <div className="absolute left-[-10%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-cyan-200/32 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-indigo-200/28 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <Badge>Our work</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-950 md:text-7xl xl:text-[5.5rem]">
            Real builds.
            <br />
            <span className="bg-[linear-gradient(180deg,#1d4ed8_0%,#3b82f6_45%,#7dd3fc_100%)] bg-clip-text text-transparent">
              Live results.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-[1.16rem] md:leading-9">
            Every project shown here is live and serving real customers. No
            mock-up galleries, no software demos - just working websites.
          </p>
        </div>

        <div className="mt-16 grid gap-10">
          {projects.map((project) => (
            <div key={project.name} className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="max-w-2xl">
                <Badge>Live client project</Badge>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
                  {project.name}.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  {project.summary}
                </p>
                <div className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                  Outcome: {project.outcome}
                </div>

                <div className="mt-6 grid gap-3">
                  {project.bullets.map((point) => (
                    <Card
                      key={point}
                      className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
                    >
                      <CardContent className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {point}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" aria-label={`View the live ${project.name} website`}>
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View live site <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={project.detailHref}>View case study</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Get your website</Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <Card className="overflow-hidden border-slate-200 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="secondary">{project.name}</Badge>
                    <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-700">
                      {project.badge}
                    </div>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      </div>
                    </div>
                    <div className="relative aspect-[16/11] bg-slate-200">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 56vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-16">
          <Badge>Start your project</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
            Want a website like this?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
            The same quality of work is available for your business. A clear
            process, a fixed price, and a live result in 5-14 days.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get your website <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
