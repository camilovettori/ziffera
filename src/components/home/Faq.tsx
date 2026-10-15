import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How fast can you build my website?",
    a: "Most projects go live in 5–14 days once the text, photos and scope are agreed.",
  },
  {
    q: "What do I need to provide?",
    a: "Your business details, any logo or branding you already have, and a few notes on what the site needs to do. We can help with the writing.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. The monthly plan can be paused or cancelled at any time.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Hosting, security updates, basic maintenance and small text or image changes, so the site keeps working after launch.",
  },
  {
    q: "Can you connect my website to the tools I already use?",
    a: "Usually, yes. We've connected sites and apps to Stripe, WhatsApp, Supabase, Zoho Books and Unify. Tell us what you use and we'll say what's possible.",
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
