const steps = [
  {
    when: "Step 1",
    title: "Discovery call",
    body: "A 30-minute call about your business, then a written scope and a fixed quote.",
  },
  {
    when: "Step 2",
    title: "Design and develop",
    body: "You get a private preview link early, so you see progress as it happens.",
  },
  {
    when: "Step 3",
    title: "Test with real data",
    body: "Your team uses the real thing before launch. We fix what doesn't fit how you work.",
  },
  {
    when: "Step 4",
    title: "Go live and stay supported",
    body: "We handle launch, hosting and security updates, and we're here for changes after.",
  },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-ink md:text-5xl">
          How a project runs
        </h2>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          The same four steps for a website or a custom system. A typical website goes live
          in 5–14 days; systems are planned and delivered in phases.
        </p>
      </div>

      <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line-strong md:left-0 md:top-[7px] md:h-px md:w-full"
          aria-hidden="true"
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-8 md:pl-0 md:pt-9">
            <span
              className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-z-blue bg-surface md:top-0"
              aria-hidden="true"
            >
              {i === steps.length - 1 ? <span className="h-1.5 w-1.5 rounded-full bg-z-blue" /> : null}
            </span>
            <p className="font-mono text-[13px] text-z-deep">{s.when}</p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-ink">{s.title}</h3>
            <p className="mt-2 max-w-[17rem] text-[15px] leading-6 text-ink-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
