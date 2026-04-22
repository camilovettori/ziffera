import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ziffera | Premium Website Design for Irish Businesses",
    template: "%s | Ziffera",
  },
  description:
    "Ziffera builds premium websites, e-commerce stores, and digital systems for Irish businesses. Fast delivery, honest pricing, no lock-in contracts.",
  keywords: [
    "web design Ireland",
    "website development Dublin",
    "SaaS development",
    "business websites",
    "custom systems",
    "Ziffera",
  ],
  authors: [{ name: "Ziffera" }],
  openGraph: {
    title: "Ziffera | Premium Website Design for Irish Businesses",
    description:
      "Premium websites for Irish businesses. Delivered in 7 days. From \u20AC800.",
    url: "https://www.ziffera.ie",
    siteName: "Ziffera",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/examples/homepage.png",
        width: 1200,
        height: 630,
        alt: "Ziffera website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziffera | Premium Website Design for Irish Businesses",
    description:
      "Premium websites for Irish businesses. Delivered in 7 days. From \u20AC800.",
    images: ["/examples/homepage.png"],
  },
  metadataBase: new URL("https://www.ziffera.ie"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="min-h-screen bg-[#F7FAFF] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
