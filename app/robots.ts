import type { MetadataRoute } from "next";
import { readCmsDocument } from "@/lib/cms-store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const doc = await readCmsDocument();
  const siteUrl = (doc.seo?.siteUrl || "https://revo.qa").replace(/\/$/, "");
  const allowIndex = doc.seo?.robotsIndex !== false;

  return {
    rules: allowIndex
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/api/admin"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
