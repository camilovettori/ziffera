import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ziffera | Premium Website Design for Irish Businesses",
    template: "%s | Ziffera",
  },
  description:
    "Ziffera builds premium, fast-loading websites for Irish businesses. Custom design, mobile-optimized, delivered in 7 days. Starting at \u20AC650.",
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
      "Ziffera builds premium, fast-loading websites for Irish businesses. Custom design, mobile-optimized, delivered in 7 days. Starting at \u20AC650.",
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
      "Ziffera builds premium, fast-loading websites for Irish businesses. Custom design, mobile-optimized, delivered in 7 days. Starting at \u20AC650.",
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
      <body className="min-h-screen bg-[#F7FAFF] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
