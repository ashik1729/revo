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
} from "@/data/content";
import type { SiteLocale } from "@/lib/i18n";
import type { CatalogItem, SiteContent } from "@/lib/site-content";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CmsHeroSlide = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
};

export type CmsNavItem = {
  id: string;
  href: string;
  orderIndex: number;
  isActive: boolean;
  label: string;
};

export type CmsCatalogItem = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  orderIndex: number;
  isActive: boolean;
  title: string;
  description: string;
  details: string;
  sizesText: string;
};

export type CmsFaqItem = {
  id: string;
  orderIndex: number;
  isActive: boolean;
  question: string;
  answer: string;
};

export type CmsSocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export type CmsLocaleBundle = {
  tagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroImageAlt: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutExtra: string;
  aboutImageAlt: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  productsSectionTitle: string;
  productsSectionDescription: string;
  servicesSectionTitle: string;
  servicesSectionDescription: string;
  featuredSectionTitle: string;
  featuredSectionDescription: string;
  faqSectionTitle: string;
  faqSectionDescription: string;
  contactTitle: string;
  contactDescription: string;
  viewDetailsLabel: string;
  availableInLabel: string;
  closeLabel: string;
  copyright: string;
  heroSlides: CmsHeroSlide[];
  nav: CmsNavItem[];
  products: CmsCatalogItem[];
  featured: CmsCatalogItem[];
  services: CmsCatalogItem[];
  faqs: CmsFaqItem[];
  socialLinks: CmsSocialLink[];
};

export type CmsCompany = {
  name: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  heroImageUrl: string;
  aboutImageUrl: string;
  contactBannerUrl: string;
  contactSideImageUrl: string;
};

export type CmsDocument = {
  version: 1;
  company: CmsCompany;
  locales: Record<SiteLocale, CmsLocaleBundle>;
};

const CMS_KEY = "cms:document:v1";
const memoryStore = new Map<string, string>();

export function newId() {
  return crypto.randomUUID();
}

export function sizesToText(sizes: readonly string[]) {
  return sizes.join("\n");
}

export function textToSizes(value: string) {
  return value
    .split(/\n|,/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function catalogFromSource(
  items: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details?: string;
    imageUrl: string;
    imageAlt: string;
    sizes: readonly string[];
  }>,
): CmsCatalogItem[] {
  return items.map((item, index) => ({
    id: item.id || newId(),
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    orderIndex: index,
    isActive: true,
    title: item.title,
    description: item.description,
    details: item.details ?? "",
    sizesText: sizesToText(item.sizes),
  }));
}

function localeBundle(locale: SiteLocale): CmsLocaleBundle {
  const code = locale === "ar" ? "ar" : "en";
  const copy = localeCopy[code];
  const products = productsByLocale[code];
  const featured = featuredByLocale[code];
  const services = solutionsByLocale[code];
  const faqs = faqsByLocale[code];
  const nav = navLinksByLocale[code];
  const slides = heroSlidesByLocale[code];

  return {
    tagline: copy.tagline,
    heroEyebrow: copy.heroEyebrow,
    heroHeadline: copy.heroHeadline,
    heroSubheadline: copy.heroSubheadline,
    heroCtaLabel: copy.heroCtaLabel,
    heroCtaHref: copy.heroCtaHref,
    heroSecondaryCtaLabel: copy.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: copy.heroSecondaryCtaHref,
    heroImageAlt: copy.heroImageAlt,
    trustBadge1: copy.trustBadges[0] ?? "",
    trustBadge2: copy.trustBadges[1] ?? "",
    trustBadge3: copy.trustBadges[2] ?? "",
    aboutTitle: copy.aboutTitle,
    aboutDescription: copy.aboutDescription,
    aboutExtra: copy.aboutExtra,
    aboutImageAlt: copy.aboutImageAlt,
    visionTitle: copy.visionTitle,
    visionText: copy.visionText,
    missionTitle: copy.missionTitle,
    missionText: copy.missionText,
    productsSectionTitle: copy.productsSectionTitle,
    productsSectionDescription: copy.productsSectionDescription,
    servicesSectionTitle: copy.servicesSectionTitle,
    servicesSectionDescription: copy.servicesSectionDescription,
    featuredSectionTitle: copy.featuredSectionTitle,
    featuredSectionDescription: copy.featuredSectionDescription,
    faqSectionTitle: copy.faqSectionTitle,
    faqSectionDescription: copy.faqSectionDescription,
    contactTitle: copy.contactTitle,
    contactDescription: copy.contactDescription,
    viewDetailsLabel: copy.viewDetailsLabel,
    availableInLabel: copy.availableInLabel,
    closeLabel: copy.closeLabel,
    copyright:
      locale === "ar" ? "© 2026 ريفو للتجارة. جميع الحقوق محفوظة." : footerContent.copyright,
    heroSlides: slides.map((slide, index) => ({
      id: `slide-${locale}-${index + 1}`,
      imageUrl: slide.imageUrl,
      imageAlt: slide.imageAlt,
      eyebrow: slide.eyebrow,
      headline: slide.headline,
      subheadline: slide.subheadline,
    })),
    nav: nav.map((item, index) => ({
      id: `nav-${locale}-${index + 1}`,
      href: item.href,
      orderIndex: index,
      isActive: true,
      label: item.label,
    })),
    products: catalogFromSource(products),
    featured: catalogFromSource(featured),
    services: catalogFromSource(services),
    faqs: faqs.map((item, index) => ({
      id: `faq-${locale}-${index + 1}`,
      orderIndex: index,
      isActive: true,
      question: item.question,
      answer: item.answer,
    })),
    socialLinks: footerContent.socialLinks.map((item, index) => ({
      id: `social-${index + 1}`,
      label: item.label,
      href: item.href,
      icon: item.icon,
    })),
  };
}

export function buildCmsDocumentFromFallback(): CmsDocument {
  return {
    version: 1,
    company: {
      name: companyInfo.name,
      address: companyInfo.address,
      phone: companyInfo.phone,
      email: companyInfo.email,
      whatsapp: companyInfo.whatsapp,
      heroImageUrl: companyInfo.heroImageUrl,
      aboutImageUrl: companyInfo.aboutImageUrl,
      contactBannerUrl: companyInfo.contactBannerUrl,
      contactSideImageUrl: companyInfo.contactSideImageUrl,
    },
    locales: {
      en: localeBundle("en"),
      ar: localeBundle("ar"),
    },
  };
}

type KvLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

async function getKv(): Promise<KvLike> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as { CMS_KV?: KvLike }).CMS_KV;
    if (kv) return kv;
  } catch {
    // fall through to memory
  }
  return {
    async get(key) {
      return memoryStore.get(key) ?? null;
    },
    async put(key, value) {
      memoryStore.set(key, value);
    },
  };
}

export async function isRemoteCmsAvailable() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return Boolean((env as { CMS_KV?: unknown }).CMS_KV);
  } catch {
    return false;
  }
}

export async function readCmsDocument(): Promise<CmsDocument> {
  const kv = await getKv();
  const raw = await kv.get(CMS_KEY);
  if (!raw) {
    const seeded = buildCmsDocumentFromFallback();
    await kv.put(CMS_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as CmsDocument;
  } catch {
    return buildCmsDocumentFromFallback();
  }
}

export async function writeCmsDocument(doc: CmsDocument) {
  const kv = await getKv();
  await kv.put(CMS_KEY, JSON.stringify(doc));
}

export async function resetCmsDocument() {
  const seeded = buildCmsDocumentFromFallback();
  await writeCmsDocument(seeded);
  return seeded;
}

function toPhoneHref(phone: string) {
  const compact = phone.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : "";
}

function toWhatsappHref(whatsapp: string) {
  const compact = whatsapp.replace(/[^\d]/g, "");
  return compact ? `https://wa.me/${compact}` : "";
}

function mapCatalog(items: CmsCatalogItem[]): CatalogItem[] {
  return items
    .filter((item) => item.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      details: item.details,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt || item.title,
      sizes: textToSizes(item.sizesText),
    }));
}

export function siteContentFromCms(doc: CmsDocument, locale: SiteLocale): SiteContent {
  const bundle = doc.locales[locale] || doc.locales.en;
  const company = doc.company;
  const slides = [...bundle.heroSlides];
  const activeNav = bundle.nav
    .filter((item) => item.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((item) => ({ label: item.label, href: item.href }));

  const trustBadges = [bundle.trustBadge1, bundle.trustBadge2, bundle.trustBadge3]
    .filter((value) => Boolean(value && value.trim()))
    .map((label) => ({ label }));

  return {
    locale,
    company: {
      name: company.name,
      tagline: bundle.tagline,
      address: company.address,
      phone: company.phone,
      phoneHref: toPhoneHref(company.phone),
      email: company.email,
      emailHref: `mailto:${company.email}`,
      whatsapp: company.whatsapp,
      whatsappHref: toWhatsappHref(company.whatsapp),
      heroImageUrl: company.heroImageUrl,
      aboutImageUrl: company.aboutImageUrl,
      contactBannerUrl: company.contactBannerUrl,
      contactSideImageUrl: company.contactSideImageUrl,
    },
    nav: activeNav,
    hero: {
      eyebrow: bundle.heroEyebrow,
      headline: bundle.heroHeadline,
      subheadline: bundle.heroSubheadline,
      ctaLabel: bundle.heroCtaLabel,
      ctaHref: bundle.heroCtaHref,
      secondaryCtaLabel: bundle.heroSecondaryCtaLabel,
      secondaryCtaHref: bundle.heroSecondaryCtaHref,
      imageUrl: slides[0]?.imageUrl || company.heroImageUrl,
      imageAlt: bundle.heroImageAlt || slides[0]?.imageAlt || "",
      trustBadges,
      slides: slides.map((slide) => ({
        imageUrl: slide.imageUrl,
        imageAlt: slide.imageAlt,
        eyebrow: slide.eyebrow,
        headline: slide.headline,
        subheadline: slide.subheadline,
      })),
    },
    about: {
      title: bundle.aboutTitle,
      description: bundle.aboutDescription,
      extra: bundle.aboutExtra,
      imageUrl: company.aboutImageUrl,
      imageAlt: bundle.aboutImageAlt,
    },
    vision: { title: bundle.visionTitle, text: bundle.visionText },
    mission: { title: bundle.missionTitle, text: bundle.missionText },
    productsSectionTitle: bundle.productsSectionTitle,
    productsSectionDescription: bundle.productsSectionDescription,
    servicesSectionTitle: bundle.servicesSectionTitle,
    servicesSectionDescription: bundle.servicesSectionDescription,
    featuredSectionTitle: bundle.featuredSectionTitle,
    featuredSectionDescription: bundle.featuredSectionDescription,
    faqSectionTitle: bundle.faqSectionTitle,
    faqSectionDescription: bundle.faqSectionDescription,
    ui: {
      viewDetailsLabel: bundle.viewDetailsLabel,
      availableInLabel: bundle.availableInLabel,
      closeLabel: bundle.closeLabel,
    },
    contact: {
      title: bundle.contactTitle,
      description: bundle.contactDescription,
      bannerUrl: company.contactBannerUrl,
      sideImageUrl: company.contactSideImageUrl,
    },
    products: mapCatalog(bundle.products),
    featured: mapCatalog(bundle.featured),
    services: mapCatalog(bundle.services),
    faqs: bundle.faqs
      .filter((item) => item.isActive)
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((item) => ({ question: item.question, answer: item.answer })),
    footer: {
      quickLinks: activeNav,
      socialLinks: bundle.socialLinks.map((item) => ({
        label: item.label,
        href: item.href,
        icon: item.icon,
      })),
      copyright: bundle.copyright,
    },
  };
}
