import {
  companyInfo,
  faqsByLocale,
  featuredByLocale,
  footerContent,
  heroSlidesByLocale,
  localeCopy,
  navLinksByLocale,
  productsByLocale,
  solutionsByLocale,
  type LocaleCode,
} from "@/data/content";
import { readCmsDocument, siteContentFromCms } from "@/lib/cms-store";
import type { SiteLocale } from "@/lib/i18n";

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  details: string;
  imageUrl: string;
  imageAlt: string;
  sizes: readonly string[];
}

export interface SiteContent {
  locale: SiteLocale;
  company: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    whatsapp: string;
    whatsappHref: string;
    heroImageUrl: string;
    aboutImageUrl: string;
    contactBannerUrl: string;
    contactSideImageUrl: string;
  };
  nav: ReadonlyArray<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    imageUrl: string;
    imageAlt: string;
    trustBadges: ReadonlyArray<{ label: string }>;
    slides: ReadonlyArray<{
      imageUrl: string;
      imageAlt: string;
      eyebrow: string;
      headline: string;
      subheadline: string;
    }>;
  };
  about: {
    title: string;
    description: string;
    extra: string;
    imageUrl: string;
    imageAlt: string;
  };
  vision: { title: string; text: string };
  mission: { title: string; text: string };
  productsSectionTitle: string;
  productsSectionDescription: string;
  servicesSectionTitle: string;
  servicesSectionDescription: string;
  featuredSectionTitle: string;
  featuredSectionDescription: string;
  faqSectionTitle: string;
  faqSectionDescription: string;
  ui: {
    viewDetailsLabel: string;
    availableInLabel: string;
    closeLabel: string;
  };
  contact: {
    title: string;
    description: string;
    bannerUrl: string;
    sideImageUrl: string;
  };
  products: ReadonlyArray<CatalogItem>;
  services: ReadonlyArray<CatalogItem>;
  featured: ReadonlyArray<CatalogItem>;
  faqs: ReadonlyArray<{ question: string; answer: string }>;
  footer: {
    quickLinks: ReadonlyArray<{ label: string; href: string }>;
    socialLinks: ReadonlyArray<{ label: string; href: string; icon: string }>;
    copyright: string;
  };
}

function toPhoneHref(phone: string) {
  const compact = phone.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : "";
}

function toWhatsappHref(whatsapp: string) {
  const compact = whatsapp.replace(/[^\d]/g, "");
  return compact ? `https://wa.me/${compact}` : "";
}

function asLocale(locale: SiteLocale): LocaleCode {
  return locale === "ar" ? "ar" : "en";
}

export function getFallbackContent(locale: SiteLocale): SiteContent {
  const code = asLocale(locale);
  const copy = localeCopy[code];
  const products = productsByLocale[code];
  const services = solutionsByLocale[code];
  const featured = featuredByLocale[code];
  const nav = navLinksByLocale[code];
  const slides = heroSlidesByLocale[code];

  return {
    locale,
    company: {
      name: companyInfo.name,
      tagline: copy.tagline,
      address: companyInfo.address,
      phone: companyInfo.phone,
      phoneHref: companyInfo.phoneHref,
      email: companyInfo.email,
      emailHref: companyInfo.emailHref,
      whatsapp: companyInfo.whatsapp,
      whatsappHref: companyInfo.whatsappHref,
      heroImageUrl: companyInfo.heroImageUrl,
      aboutImageUrl: companyInfo.aboutImageUrl,
      contactBannerUrl: companyInfo.contactBannerUrl,
      contactSideImageUrl: companyInfo.contactSideImageUrl,
    },
    nav,
    hero: {
      eyebrow: copy.heroEyebrow,
      headline: copy.heroHeadline,
      subheadline: copy.heroSubheadline,
      ctaLabel: copy.heroCtaLabel,
      ctaHref: copy.heroCtaHref,
      secondaryCtaLabel: copy.heroSecondaryCtaLabel,
      secondaryCtaHref: copy.heroSecondaryCtaHref,
      imageUrl: companyInfo.heroImageUrl,
      imageAlt: copy.heroImageAlt,
      trustBadges: copy.trustBadges.map((label) => ({ label })),
      slides: [...slides],
    },
    about: {
      title: copy.aboutTitle,
      description: copy.aboutDescription,
      extra: copy.aboutExtra,
      imageUrl: companyInfo.aboutImageUrl,
      imageAlt: copy.aboutImageAlt,
    },
    vision: { title: copy.visionTitle, text: copy.visionText },
    mission: { title: copy.missionTitle, text: copy.missionText },
    productsSectionTitle: copy.productsSectionTitle,
    productsSectionDescription: copy.productsSectionDescription,
    servicesSectionTitle: copy.servicesSectionTitle,
    servicesSectionDescription: copy.servicesSectionDescription,
    featuredSectionTitle: copy.featuredSectionTitle,
    featuredSectionDescription: copy.featuredSectionDescription,
    faqSectionTitle: copy.faqSectionTitle,
    faqSectionDescription: copy.faqSectionDescription,
    ui: {
      viewDetailsLabel: copy.viewDetailsLabel,
      availableInLabel: copy.availableInLabel,
      closeLabel: copy.closeLabel,
    },
    contact: {
      title: copy.contactTitle,
      description: copy.contactDescription,
      bannerUrl: companyInfo.contactBannerUrl,
      sideImageUrl: companyInfo.contactSideImageUrl,
    },
    products: products.map((item) => ({ ...item })),
    services: services.map((item) => ({ ...item })),
    featured: featured.map((item) => ({
      ...item,
      details: item.description,
    })),
    faqs: [...faqsByLocale[code]],
    footer: {
      ...footerContent,
      quickLinks: nav,
      copyright:
        locale === "ar"
          ? "© 2026 ريفو للتجارة. جميع الحقوق محفوظة."
          : footerContent.copyright,
    },
  };
}

export async function getSiteContent(locale: SiteLocale): Promise<SiteContent> {
  try {
    const doc = await readCmsDocument();
    return siteContentFromCms(doc, locale);
  } catch {
    return getFallbackContent(locale);
  }
}
