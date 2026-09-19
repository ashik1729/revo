import type { Metadata } from "next";
import type { SiteContent } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/i18n";

function absolutize(siteUrl: string, pathOrUrl: string) {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  const base = siteUrl.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function buildPageMetadata(content: SiteContent): Metadata {
  const seo = content.seo;
  const locale = content.locale;
  const siteUrl = seo.siteUrl.replace(/\/$/, "") || "https://revo.qa";
  const title = seo.metaTitle || `${content.company.name} | ${content.company.tagline}`;
  const description = seo.metaDescription || content.hero.subheadline;
  const ogImage =
    absolutize(siteUrl, seo.ogImageUrl || seo.defaultOgImageUrl || content.hero.imageUrl) ||
    absolutize(siteUrl, "/media/full-catalogue-supply.jpg");
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const canonical = `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: seo.metaKeywords
      ? seo.metaKeywords.split(",").map((part) => part.trim()).filter(Boolean)
      : undefined,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        "x-default": `${siteUrl}/en`,
      },
    },
    robots: seo.robotsIndex
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      url: canonical,
      siteName: content.company.name,
      title: ogTitle,
      description: ogDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: seo.ogImageAlt || content.hero.imageAlt || content.company.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || ogTitle,
      description: seo.twitterDescription || ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    verification: seo.searchConsoleVerification
      ? { google: seo.searchConsoleVerification }
      : undefined,
    other: {
      "geo.region": seo.geoRegion || "QA",
      "geo.placename": seo.geoPlacename || "Doha, Qatar",
    },
  };
}

export function buildLocalBusinessJsonLd(content: SiteContent) {
  const seo = content.seo;
  const siteUrl = seo.siteUrl.replace(/\/$/, "") || "https://revo.qa";
  const image =
    absolutize(siteUrl, seo.ogImageUrl || seo.defaultOgImageUrl || content.about.imageUrl) ||
    absolutize(siteUrl, "/logo.png");

  return {
    "@context": "https://schema.org",
    "@type": seo.businessType || "Store",
    name: content.company.name,
    description: seo.localBusinessDescription || content.company.tagline,
    url: `${siteUrl}/${content.locale}`,
    image,
    email: content.company.email,
    telephone: content.company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.company.address,
      addressLocality: "Doha",
      addressCountry: "QA",
    },
    geo:
      seo.latitude && seo.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: seo.latitude,
            longitude: seo.longitude,
          }
        : undefined,
    areaServed: {
      "@type": "Country",
      name: "Qatar",
    },
    priceRange: seo.priceRange || "$$",
    openingHours: seo.openingHours || undefined,
    sameAs: content.footer.socialLinks.map((item) => item.href).filter(Boolean),
  };
}

export function buildWebSiteJsonLd(content: SiteContent) {
  const siteUrl = content.seo.siteUrl.replace(/\/$/, "") || "https://revo.qa";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.company.name,
    url: siteUrl,
    inLanguage: content.locale === "ar" ? "ar" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/${content.locale}#products`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildFaqJsonLd(content: SiteContent) {
  if (!content.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListJsonLd(
  name: string,
  description: string,
  items: ReadonlyArray<{ title: string; description: string; imageUrl: string; imageAlt: string }>,
  siteUrl: string,
  pageUrl: string,
) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: pageUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.title,
        description: item.description,
        image: absolutize(siteUrl, item.imageUrl),
        brand: {
          "@type": "Brand",
          name: "Revo Trading",
        },
      },
    })),
  };
}

export function buildWebPageJsonLd(content: SiteContent) {
  const seo = content.seo;
  const siteUrl = seo.siteUrl.replace(/\/$/, "") || "https://revo.qa";
  const pageUrl = `${siteUrl}/${content.locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.metaTitle,
    description: seo.metaDescription,
    url: pageUrl,
    inLanguage: content.locale === "ar" ? "ar" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: content.company.name,
      url: siteUrl,
    },
    about: {
      "@type": "Organization",
      name: content.company.name,
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        name: seo.aboutSeoTitle || content.about.title,
        description: seo.aboutSeoDescription || content.about.description,
        cssSelector: "#about",
      },
      {
        "@type": "WebPageElement",
        name: seo.productsSeoTitle || content.productsSectionTitle,
        description: seo.productsSeoDescription || content.productsSectionDescription,
        cssSelector: "#products",
      },
      {
        "@type": "WebPageElement",
        name: seo.featuredSeoTitle || content.featuredSectionTitle,
        description: seo.featuredSeoDescription || content.featuredSectionDescription,
        cssSelector: "#featured",
      },
      {
        "@type": "WebPageElement",
        name: seo.solutionsSeoTitle || content.servicesSectionTitle,
        description: seo.solutionsSeoDescription || content.servicesSectionDescription,
        cssSelector: "#solutions",
      },
      {
        "@type": "WebPageElement",
        name: seo.faqSeoTitle || content.faqSectionTitle,
        description: seo.faqSeoDescription || content.faqSectionDescription,
        cssSelector: "#faq",
      },
      {
        "@type": "WebPageElement",
        name: seo.contactSeoTitle || content.contact.title,
        description: seo.contactSeoDescription || content.contact.description,
        cssSelector: "#contact",
      },
    ],
  };
}
