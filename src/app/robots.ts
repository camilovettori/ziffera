import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/checkout/"],
    },
    host: "https://www.ziffera.ie",
    sitemap: "https://www.ziffera.ie/sitemap.xml",
  };
}
