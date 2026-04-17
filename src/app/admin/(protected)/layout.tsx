import Link from "next/link";
import Image from "next/image";
import { requireAdminSession } from "@/lib/core/auth";
import { logoutAdminAction } from "./actions";

export const dynamic = "force-dynamic";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Products", href: "/admin/products" },
  { label: "Subscriptions", href: "/admin/subscriptions" },
  { label: "Payments", href: "/admin/payments" },
];

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-6 lg:grid-cols-[272px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Link href="/admin" className="inline-flex flex-col items-start">
            <Image
              src="/logos/ziffera-logo.png"
              alt="Ziffera logo"
              width={192}
              height={64}
              className="h-11 w-auto object-contain"
            />
            <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Core admin
            </span>
          </Link>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-[1.5rem] border border-blue-100 bg-blue-50 px-4 py-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-blue-700">
              Signed in as
            </div>
            <div className="mt-2 text-sm font-medium text-slate-950">
              {session.admin.name}
            </div>
            <div className="mt-1 text-sm text-slate-600">{session.admin.email}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
              Role: {session.admin.role}
            </div>
          </div>

          <form action={logoutAdminAction} className="mt-6">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Sign out
            </button>
          </form>
        </aside>

        <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
