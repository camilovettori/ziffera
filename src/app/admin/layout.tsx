import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ziffera",
  description: "Ziffera Core admin and commercial control plane.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_34%,#eef4ff_100%)] text-slate-900">
      {children}
    </main>
  );
}
