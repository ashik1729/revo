import {
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildLocalBusinessJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import type { SiteContent } from "@/lib/site-content";

function JsonLdScript({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function SeoJsonLd({ content }: { content: SiteContent }) {
  const siteUrl = content.seo.siteUrl.replace(/\/$/, "") || "https://revo.qa";
  const pageUrl = `${siteUrl}/${content.locale}`;

  const graphs = [
    buildLocalBusinessJsonLd(content),
    buildWebSiteJsonLd(content),
    buildWebPageJsonLd(content),
    buildFaqJsonLd(content),
    buildItemListJsonLd(
      content.seo.productsSeoTitle || content.productsSectionTitle,
      content.seo.productsSeoDescription || content.productsSectionDescription,
      content.products,
      siteUrl,
      `${pageUrl}#products`,
    ),
    buildItemListJsonLd(
      content.seo.featuredSeoTitle || content.featuredSectionTitle,
      content.seo.featuredSeoDescription || content.featuredSectionDescription,
      content.featured,
      siteUrl,
      `${pageUrl}#featured`,
    ),
    buildItemListJsonLd(
      content.seo.solutionsSeoTitle || content.servicesSectionTitle,
      content.seo.solutionsSeoDescription || content.servicesSectionDescription,
      content.services,
      siteUrl,
      `${pageUrl}#solutions`,
    ),
  ].filter(Boolean);

  return (
    <>
      {graphs.map((data, index) => (
        <JsonLdScript key={index} data={data} />
      ))}
    </>
  );
}
