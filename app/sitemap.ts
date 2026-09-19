import type { MetadataRoute } from "next";
import { readCmsDocument } from "@/lib/cms-store";
import { supportedLocales } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doc = await readCmsDocument();
  const siteUrl = (doc.seo?.siteUrl || "https://revo.qa").replace(/\/$/, "");
  const lastModified = new Date();

  return supportedLocales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        supportedLocales.map((code) => [code, `${siteUrl}/${code}`]),
      ),
    },
  }));
}
