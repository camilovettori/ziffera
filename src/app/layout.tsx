import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* =========================
   FONTS
========================= */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   METADATA (SEO + BRAND)
========================= */

export const metadata: Metadata = {
  title: {
    default: "Ziffera — Premium Websites & Software",
    template: "%s | Ziffera",
  },
  description:
    "Ziffera builds premium websites, scalable systems, and SaaS products designed to help modern businesses grow with clarity, performance, and precision.",

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
    title: "Ziffera — Premium Websites & Software",
    description:
      "Premium websites and scalable software built for modern businesses.",
    url: "https://ziffera.ie",
    siteName: "Ziffera",
    locale: "en_IE",
    type: "website",
  },

  metadataBase: new URL("https://ziffera.ie"),
};

/* =========================
   LAYOUT
========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#0B0F14] text-white antialiased">
        {children}
      </body>
    </html>
  );
}