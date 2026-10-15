import Link from "next/link";
import { Button } from "@/components/ui/button";
import ZifferaLogo from "@/components/layout/ZifferaLogo";

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="border-t border-line">
      {cta ? (
      <section id="contact" className="relative overflow-hidden">
        <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-ink md:text-6xl">
              Let&apos;s talk about what your business needs.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-2">
              Send us an email or ask for a call, whichever suits you. We&apos;ll ask the right
              questions and follow up with a written scope and a fixed quote. If we&apos;re not
              the right fit, we&apos;ll say so.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:hello@ziffera.ie">hello@ziffera.ie</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      <div className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-ink-2 md:flex-row md:items-center md:justify-between lg:px-10">
          <ZifferaLogo markClassName="h-6" className="[&>span]:text-lg" />
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            <Link href="/#services" className="hover:text-ink">Services</Link>
            <Link href="/work" className="hover:text-ink">Work</Link>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
            <a href="mailto:hello@ziffera.ie" className="hover:text-ink">hello@ziffera.ie</a>
            <a
              href="https://www.linkedin.com/company/ziffera"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
          </nav>
          <p className="flex gap-4 text-ink-3">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <span>© {new Date().getFullYear()} Ziffera, Dublin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
