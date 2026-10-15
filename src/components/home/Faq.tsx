import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on what you need, so we don't use a price list. After a short call you get a written scope and a fixed quote, and nothing starts until you approve it.",
  },
  {
    q: "Can you build a custom system for my company?",
    a: "Yes. Dashboards, admin tools, booking or ordering systems and customer portals are all things we build. Bigger systems are delivered in phases, so your team can start using parts of it early.",
  },
  {
    q: "Can you connect the tools we already use?",
    a: "Usually, yes. We've connected Zoho Books, Zoho Invoice, Unify, Stripe, WhatsApp and Supabase. Tell us what you use and we'll tell you what's possible before you commit.",
  },
  {
    q: "How long does a website take?",
    a: "Most websites go live in 5–14 days once the content and scope are agreed.",
  },
  {
    q: "What happens after launch?",
    a: "We can host and look after everything on a monthly care plan: hosting, security updates, maintenance and small changes. There's no long-term contract.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="max-w-sm text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
          Questions people ask first
        </h2>

        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-[-0.02em] text-ink">
                {f.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-[16px] leading-7 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
