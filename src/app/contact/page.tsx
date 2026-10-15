"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Link2 } from "lucide-react";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Mode = "email" | "video" | "phone";

const modes: { value: Mode; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "video", label: "Video call" },
  { value: "phone", label: "Phone call" },
];

const topics = [
  "Website or online shop",
  "Custom business system",
  "Integration or automation",
  "Not sure yet",
];

const times = [
  "Weekday morning (9:00–12:00)",
  "Weekday afternoon (12:00–17:00)",
  "Any time on a weekday",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  time: string;
  notes: string;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  topic: "",
  time: "",
  notes: "",
};

const nextSteps = [
  ["We reply", "Usually within 24 hours, by email or with a call, whichever you prefer."],
  ["We understand the problem", "A few questions about your business and what needs to change."],
  ["You get a plan", "A written scope and a fixed quote. Nothing starts until you approve it."],
];

function Field({
  label,
  hint,
  children,
  className,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {hint ? <span className="text-xs font-normal text-ink-3">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [mode, setMode] = useState<Mode>("email");
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const id = useId();

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type === "call" || type === "video") setMode("video");
    if (type === "phone") setMode("phone");
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const f = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim()])
    ) as FormState;

    if (mode === "email" && !f.notes) {
      setStatus("error");
      setFeedback("Add a short message so we know how to help.");
      return;
    }

    const isCall = mode !== "email";
    const modeLabel = modes.find((m) => m.value === mode)?.label ?? "Email";
    const message =
      isCall
        ? [
            `${modeLabel.toUpperCase()} REQUEST`,
            `Best time: ${f.time}`,
            f.phone ? `Phone: ${f.phone}` : null,
            "",
            f.notes ? `Notes:\n${f.notes}` : "No notes added.",
          ]
            .filter((line) => line !== null)
            .join("\n")
        : f.notes;

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          businessName: f.company,
          need: f.topic,
          timeline: isCall ? `${modeLabel}: ${f.time}` : "Reply by email",
          message,
        }),
      });
      const text = await response.text();
      let result: { message?: string; error?: string } = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        // non-JSON response; fall through to generic handling
      }
      if (!response.ok) throw new Error(result.error ?? "We couldn't send that. Please try again.");

      setForm(empty);
      setStatus("success");
      setFeedback(
        isCall
          ? "Sent. We'll email you to confirm a time for the call."
          : "Message sent. We'll reply by email, usually within 24 hours."
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? `${error.message} You can also email hello@ziffera.ie.`
          : "Something went wrong. You can also email hello@ziffera.ie."
      );
    }
  };

  const fid = (name: string) => `${id}-${name}`;

  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        <div className="blueprint absolute inset-x-0 top-0 -z-10 h-[34rem]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-[20rem] -z-10 h-[14rem] bg-gradient-to-b from-transparent to-paper" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10 lg:pt-16">
          <div>
            <p className="text-sm font-medium text-z-deep">Contact</p>
            <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[1] tracking-[-0.05em] text-ink sm:text-6xl">
              Let&apos;s talk about your project
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-ink-2">
              Tell us a little about your business and how you&apos;d like to hear back: by
              email or on a call. A website, a custom system or an integration, we&apos;ll tell
              you honestly what makes sense.
            </p>

            <ol className="mt-10 space-y-6 border-l border-line-strong pl-6">
              {nextSteps.map(([title, body], i) => (
                <li key={title} className="relative">
                  <span
                    className="absolute -left-[1.95rem] top-0.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-z-blue bg-paper"
                    aria-hidden="true"
                  >
                    {i === nextSteps.length - 1 ? <span className="h-1.5 w-1.5 rounded-full bg-z-blue" /> : null}
                  </span>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 max-w-sm text-[15px] leading-6 text-ink-2">{body}</p>
                </li>
              ))}
            </ol>

            <dl className="mt-10 grid gap-4 text-[15px]">
              <div className="flex items-center gap-3">
                <dt className="sr-only">Email</dt>
                <Mail className="h-4 w-4 text-ink-3" aria-hidden="true" />
                <dd><a href="mailto:hello@ziffera.ie" className="font-medium text-ink hover:text-z-blue">hello@ziffera.ie</a></dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">LinkedIn</dt>
                <Link2 className="h-4 w-4 text-ink-3" aria-hidden="true" />
                <dd>
                  <a href="https://www.linkedin.com/company/ziffera" target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:text-z-blue">
                    Ziffera on LinkedIn
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Location</dt>
                <MapPin className="h-4 w-4 text-ink-3" aria-hidden="true" />
                <dd className="text-ink-2">Dublin, Ireland</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_60px_-36px_rgba(13,21,48,0.35)] sm:p-9">
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor={fid("name")}>
                <Input id={fid("name")} autoComplete="name" required value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Work email" htmlFor={fid("email")}>
                <Input id={fid("email")} type="email" autoComplete="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Company" htmlFor={fid("company")}>
                <Input id={fid("company")} autoComplete="organization" required value={form.company} onChange={(e) => set("company", e.target.value)} />
              </Field>
              <Field label="What is it about?" htmlFor={fid("topic")}>
                <Select id={fid("topic")} required value={form.topic} onChange={(e) => set("topic", e.target.value)}>
                  <option value="" disabled>Choose one</option>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </Select>
              </Field>

              <fieldset className="space-y-2 sm:col-span-2">
                <legend className="text-sm font-medium text-ink">How should we get back to you?</legend>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-line bg-paper p-1">
                  {modes.map((m) => (
                    <label
                      key={m.value}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-2.5 text-center text-[15px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-z-blue",
                        mode === m.value ? "bg-surface text-ink shadow-[0_1px_3px_rgba(13,21,48,0.12)]" : "text-ink-3 hover:text-ink"
                      )}
                    >
                      <input
                        type="radio"
                        name="reply-mode"
                        value={m.value}
                        checked={mode === m.value}
                        onChange={() => setMode(m.value)}
                        className="sr-only"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {mode !== "email" ? (
                <>
                  <Field label="Best time" htmlFor={fid("time")} className={mode === "video" ? "sm:col-span-2" : undefined}>
                    <Select id={fid("time")} required value={form.time} onChange={(e) => set("time", e.target.value)}>
                      <option value="" disabled>Choose a time</option>
                      {times.map((t) => <option key={t}>{t}</option>)}
                    </Select>
                  </Field>
                  {mode === "phone" ? (
                    <Field label="Phone number" htmlFor={fid("phone")}>
                      <Input id={fid("phone")} type="tel" autoComplete="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </Field>
                  ) : null}
                </>
              ) : null}

              <Field
                label={mode === "email" ? "Message" : "Anything we should know?"}
                hint={mode === "email" ? undefined : "Optional"}
                htmlFor={fid("notes")}
                className="sm:col-span-2"
              >
                <Textarea
                  id={fid("notes")}
                  className="min-h-[140px]"
                  required={mode === "email"}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder={
                    mode === "email"
                      ? "Tell us what you need, which tools you use today, and any deadlines."
                      : "What does the business do, and what would you like to improve?"
                  }
                />
              </Field>

              <div className="flex flex-col gap-4 border-t border-line pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p
                  aria-live="polite"
                  className={cn(
                    "text-sm leading-6",
                    status === "success" ? "text-emerald-700" : status === "error" ? "text-rose-700" : "text-ink-3"
                  )}
                >
                  {feedback || (
                    <>
                      Goes straight to hello@ziffera.ie. See our{" "}
                      <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                        privacy policy
                      </Link>
                      .
                    </>
                  )}
                </p>
                <Button type="submit" size="lg" disabled={status === "sending"} className="shrink-0">
                  {status === "sending"
                    ? "Sending…"
                    : mode === "email"
                      ? "Send message"
                      : "Request a call"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter cta={false} />
    </>
  );
}
