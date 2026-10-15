import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import BrowserFrame from "@/components/home/BrowserFrame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Media =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string; width: number; height: number; alt: string };

export type CaseStudyData = {
  name: string;
  type: string;
  client: string;
  logo: { src: string; w: number; h: number };
  summary: string;
  url: string;
  live: string;
  stack: string[];
  result: string;
  challenge: string;
  built: string[];
  hero: Media;
  gallery: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    /** tall images (phones, photos) get a narrower column */
    tall?: boolean;
  }[];
  next: { name: string; href: string; type: string };
};

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  const facts = [
    ["Client", data.client],
    ["Project", data.type],
    ["Built with", data.stack.join(", ")],
    ["Result", data.result],
  ];

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative border-b border-line">
          <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-paper"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-10 lg:pb-20 lg:pt-12">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All work
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line bg-white">
                    <Image
                      src={data.logo.src}
                      alt=""
                      width={data.logo.w}
                      height={data.logo.h}
                      priority
                      className="h-12 w-12 rounded-none object-contain"
                    />
                  </span>
                  <p className="font-mono text-[13px] text-z-deep">{data.type}</p>
                </div>
                <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1] tracking-[-0.05em] text-ink sm:text-6xl xl:text-7xl">
                  {data.name}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-ink-2">{data.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <a href={data.live} target="_blank" rel="noopener noreferrer">
                      Visit {data.url}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </div>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line text-[15px]">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 bg-surface px-5 py-3.5">
                    <dt className="font-mono text-[12px] leading-6 text-ink-3">{k}</dt>
                    <dd className="leading-6 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <BrowserFrame url={data.url} media={data.hero} aspect="aspect-[16/9]" className="mt-14" />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-ink md:text-4xl">The challenge</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-2">{data.challenge}</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-ink md:text-4xl">What we built</h2>
            <ul className="mt-5 space-y-3 border-l-2 border-z-blue/25 pl-5">
              {data.built.map((b) => (
                <li key={b} className="text-[17px] leading-7 text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {data.gallery.length ? (
          <section className="border-y border-line bg-surface">
            <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
              <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-ink md:text-4xl">Inside the build</h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.gallery.map((g) => (
                  <figure key={g.src} className={cn(g.tall ? "" : "lg:col-span-1")}>
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-xl border border-line bg-paper",
                        g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                      )}
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="rounded-none object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-3 text-[15px] text-ink-2">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <Link
            href={data.next.href}
            className="group flex flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-z-blue/40 sm:flex-row sm:items-center sm:p-9"
          >
            <div>
              <p className="text-sm text-ink-3">Next project</p>
              <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-ink">{data.next.name}</p>
              <p className="font-mono text-[12px] text-z-deep">{data.next.type}</p>
            </div>
            <ArrowRight
              className="h-6 w-6 text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-z-blue"
              aria-hidden="true"
            />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
