import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdminLoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login | Ziffera",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10 lg:px-10">
      <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(125,211,252,0.08),transparent_24%)]" />
          <div className="relative">
            <Link href="/" className="inline-flex flex-col items-start">
              <Image
                src="/logos/ziffera-logo.png"
                alt="Ziffera logo"
                width={220}
                height={72}
                priority
                className="h-12 w-auto object-contain"
              />
              <span className="mt-2 text-[10px] uppercase tracking-[0.34em] text-slate-500">
                Commercial control plane
              </span>
            </Link>

            <div className="mt-10 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-blue-700">
              Ziffera Core
            </div>

            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 md:text-5xl">
              Secure access for the people running the business.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              This area will hold the operational core for clients, billing,
              entitlements, and Stripe sync once the foundation is connected.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Protected", "Auditable", "Production-minded"].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.1)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.04),transparent_26%)]" />
          <div className="relative">
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                Admin sign in
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Enter the control plane
              </h2>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)]">
              <AdminLoginForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
