import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const grotesk = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-grotesk",
  display: "swap",
});

const code = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziffera — Websites, custom software and integrations",
  description:
    "Ziffera is a Dublin web and software studio. We build websites, custom business systems and integrations that connect the tools you already use.",
  keywords: [
    "website design",
    "website development",
    "e-commerce website",
    "business website",
    "small business website",
    "website builder",
    "professional website design",
  ],
  authors: [{ name: "Ziffera" }],
  alternates: {
    canonical: "https://www.ziffera.ie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Ziffera — Websites, custom software and integrations",
    description:
      "Websites, custom business software and integrations, built in Dublin by Ziffera.",
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
    title: "Ziffera — Websites, custom software and integrations",
    description:
      "Websites, custom business software and integrations, built in Dublin by Ziffera.",
    images: ["/examples/homepage.png"],
  },
  metadataBase: new URL("https://www.ziffera.ie"),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ziffera",
  url: "https://www.ziffera.ie",
  logo: "https://www.ziffera.ie/logos/ziffera-logo.png",
  email: "hello@ziffera.ie",
  sameAs: ["https://www.linkedin.com/company/ziffera"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@ziffera.ie",
      availableLanguage: ["en"],
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Design",
  serviceType: "Website Design",
  provider: {
    "@type": "Organization",
    name: "Ziffera",
    url: "https://www.ziffera.ie",
  },
  url: "https://www.ziffera.ie",
  areaServed: "Worldwide",
  description:
    "Websites, custom business systems and integrations for growing companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${code.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, serviceJsonLd]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
