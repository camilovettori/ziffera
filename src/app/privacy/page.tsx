import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Ziffera",
  description: "How Ziffera collects, uses and protects personal data, and your rights under GDPR.",
  alternates: { canonical: "/privacy" },
};

const updated = "15 October 2026";

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Ziffera is a web and software studio based in Dublin, Ireland. For the purposes of
          the General Data Protection Regulation (GDPR) and the Irish Data Protection Acts
          1988–2018, Ziffera is the data controller for the personal data described here.
        </p>
        <p>
          You can contact us about anything in this policy at{" "}
          <a href="mailto:hello@ziffera.ie">hello@ziffera.ie</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>We only collect what we need to reply to you and deliver our work:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, company, the topic you
            choose, how you&apos;d like us to reply, and your message. If you ask for a phone
            call, your phone number and preferred time.
          </li>
          <li>
            <strong>Emails you send us</strong> and our replies.
          </li>
          <li>
            <strong>Clients:</strong> billing contact details, invoices and payment records
            needed to run the project and the monthly care plan.
          </li>
          <li>
            <strong>Technical logs:</strong> our hosting provider keeps short-lived server logs
            (such as IP address and browser type) to keep the site secure and working.
          </li>
        </ul>
        <p>
          We don&apos;t use advertising or analytics trackers on this website, and we don&apos;t
          sell or rent personal data to anyone.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use it, and on what legal basis",
    body: (
      <ul>
        <li>
          <strong>To answer your enquiry and prepare a quote:</strong> taking steps at your
          request before entering a contract (GDPR Article 6(1)(b)).
        </li>
        <li>
          <strong>To deliver and support projects for clients:</strong> performance of a
          contract (Article 6(1)(b)).
        </li>
        <li>
          <strong>To keep invoices and accounting records:</strong> legal obligation under
          Irish tax law (Article 6(1)(c)).
        </li>
        <li>
          <strong>To keep the website secure:</strong> our legitimate interest in running a
          safe, working service (Article 6(1)(f)).
        </li>
      </ul>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We use a small number of service providers who process data on our behalf, under
          data processing terms:
        </p>
        <ul>
          <li><strong>Vercel</strong> hosts this website.</li>
          <li><strong>Resend</strong> delivers the emails sent from our contact form.</li>
          <li><strong>Stripe</strong> processes card payments for clients. We never see or store full card numbers.</li>
        </ul>
        <p>
          Some of these providers may process data outside the European Economic Area. Where
          they do, the transfer is covered by safeguards recognised under GDPR, such as the
          European Commission&apos;s Standard Contractual Clauses or the EU–US Data Privacy
          Framework.
        </p>
      </>
    ),
  },
  {
    id: "how-long",
    title: "How long we keep it",
    body: (
      <ul>
        <li>Enquiries that don&apos;t become a project: up to 24 months, then deleted.</li>
        <li>Client project correspondence: for the length of our relationship and up to 24 months after.</li>
        <li>Invoices and accounting records: six years, as required by Irish tax law.</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website doesn&apos;t set advertising or analytics cookies. The only cookies we use
        are strictly necessary ones in our private admin area, to keep staff signed in. They aren&apos;t used to track you and don&apos;t require consent.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under GDPR you have the right to:</p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>have inaccurate data corrected;</li>
          <li>have your data deleted, where we no longer need to keep it;</li>
          <li>restrict or object to how we use it;</li>
          <li>receive your data in a portable format.</li>
        </ul>
        <p>
          To use any of these rights, email <a href="mailto:hello@ziffera.ie">hello@ziffera.ie</a>.
          We&apos;ll reply within one month. If you&apos;re not happy with how we handle your
          data, you can complain to the Data Protection Commission at{" "}
          <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer">
            dataprotection.ie
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change how we handle personal data, we&apos;ll update this page and the date at
        the top.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative border-b border-line">
          <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-paper" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-5 pb-14 pt-12 lg:px-10 lg:pb-16 lg:pt-20">
            <p className="text-sm font-medium text-z-deep">Legal</p>
            <h1 className="mt-4 text-[2.75rem] font-extrabold leading-[1] tracking-[-0.05em] text-ink sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-ink-2">Last updated {updated}</p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:px-10 lg:py-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2.5 border-l border-line pl-4 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-2 hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="max-w-[68ch] space-y-12 text-[17px] leading-8 text-ink-2 [&_a]:font-medium [&_a]:text-z-deep [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul+p]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="mb-4 text-2xl font-bold tracking-[-0.03em] text-ink">{s.title}</h2>
                {s.body}
              </section>
            ))}
            <p className="border-t border-line pt-8 text-[15px]">
              Questions? <Link href="/contact">Get in touch</Link> or email{" "}
              <a href="mailto:hello@ziffera.ie">hello@ziffera.ie</a>.
            </p>
          </article>
        </div>
      </main>
      <SiteFooter cta={false} />
    </>
  );
}
