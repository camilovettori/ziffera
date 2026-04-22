import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ziffera — Premium Website Design & Development",
  description:
    "Ziffera builds fast, modern websites for real businesses. Clean design, e-commerce ready, and built to bring customers.",
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
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    title: "Ziffera — Premium Website Design & Development",
    description:
      "Premium website design and development for real businesses. Clean design, e-commerce ready, built to bring customers.",
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
    title: "Ziffera — Premium Website Design & Development",
    description:
      "Premium website design and development for real businesses. Clean design, e-commerce ready, built to bring customers.",
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
    "Premium website design and development for businesses that need a modern, customer-focused site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="min-h-screen bg-[#F7FAFF] text-slate-900 antialiased">
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
