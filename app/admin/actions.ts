"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  newId,
  readCmsDocument,
  resetCmsDocument,
  writeCmsDocument,
  type CmsCatalogItem,
  type CmsDocument,
  type CmsFaqItem,
  type CmsHeroSlide,
  type CmsNavItem,
  type CmsSocialLink,
} from "@/lib/cms-store";
import { defaultLocale, isSupportedLocale, type SiteLocale } from "@/lib/i18n";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function getLocale(input: FormDataEntryValue | null): SiteLocale {
  if (typeof input === "string" && isSupportedLocale(input)) return input;
  return defaultLocale;
}

function str(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) || fallback);
}

function parseNumber(input: FormDataEntryValue | null, fallback = 0) {
  if (typeof input !== "string") return fallback;
  const value = Number(input);
  return Number.isFinite(value) ? value : fallback;
}

function parseBool(input: FormDataEntryValue | null) {
  return input === "on" || input === "true";
}

function revalidateAll(locale: SiteLocale) {
  revalidatePath(`/${locale}`);
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/admin");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
}

async function mutate(locale: SiteLocale, updater: (doc: CmsDocument) => void) {
  await requireAdmin();
  const doc = await readCmsDocument();
  updater(doc);
  await writeCmsDocument(doc);
  revalidateAll(locale);
}

export async function saveCompany(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await mutate(locale, (doc) => {
    doc.company = {
      name: str(formData, "companyName"),
      address: str(formData, "address"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      whatsapp: str(formData, "whatsapp"),
      heroImageUrl: str(formData, "heroImageUrl"),
      aboutImageUrl: str(formData, "aboutImageUrl"),
      contactBannerUrl: str(formData, "contactBannerUrl"),
      contactSideImageUrl: str(formData, "contactSideImageUrl"),
    };
  });
}

export async function saveLocaleCopy(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await mutate(locale, (doc) => {
    const bundle = doc.locales[locale];
    Object.assign(bundle, {
      tagline: str(formData, "tagline"),
      heroEyebrow: str(formData, "heroEyebrow"),
      heroHeadline: str(formData, "heroHeadline"),
      heroSubheadline: str(formData, "heroSubheadline"),
      heroCtaLabel: str(formData, "heroCtaLabel"),
      heroCtaHref: str(formData, "heroCtaHref", "#contact"),
      heroSecondaryCtaLabel: str(formData, "heroSecondaryCtaLabel"),
      heroSecondaryCtaHref: str(formData, "heroSecondaryCtaHref", "#products"),
      heroImageAlt: str(formData, "heroImageAlt"),
      trustBadge1: str(formData, "trustBadge1"),
      trustBadge2: str(formData, "trustBadge2"),
      trustBadge3: str(formData, "trustBadge3"),
      aboutTitle: str(formData, "aboutTitle"),
      aboutDescription: str(formData, "aboutDescription"),
      aboutExtra: str(formData, "aboutExtra"),
      aboutImageAlt: str(formData, "aboutImageAlt"),
      visionTitle: str(formData, "visionTitle"),
      visionText: str(formData, "visionText"),
      missionTitle: str(formData, "missionTitle"),
      missionText: str(formData, "missionText"),
      productsSectionTitle: str(formData, "productsSectionTitle"),
      productsSectionDescription: str(formData, "productsSectionDescription"),
      servicesSectionTitle: str(formData, "servicesSectionTitle"),
      servicesSectionDescription: str(formData, "servicesSectionDescription"),
      featuredSectionTitle: str(formData, "featuredSectionTitle"),
      featuredSectionDescription: str(formData, "featuredSectionDescription"),
      faqSectionTitle: str(formData, "faqSectionTitle"),
      faqSectionDescription: str(formData, "faqSectionDescription"),
      contactTitle: str(formData, "contactTitle"),
      contactDescription: str(formData, "contactDescription"),
      viewDetailsLabel: str(formData, "viewDetailsLabel"),
      availableInLabel: str(formData, "availableInLabel"),
      closeLabel: str(formData, "closeLabel"),
      copyright: str(formData, "copyright"),
    });
  });
}

function readSlide(formData: FormData, id?: string): CmsHeroSlide {
  return {
    id: id || str(formData, "itemId") || newId(),
    imageUrl: str(formData, "imageUrl"),
    imageAlt: str(formData, "imageAlt"),
    eyebrow: str(formData, "eyebrow"),
    headline: str(formData, "headline"),
    subheadline: str(formData, "subheadline"),
  };
}

export async function upsertHeroSlide(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    const slides = doc.locales[locale].heroSlides;
    const next = readSlide(formData, itemId || undefined);
    const index = slides.findIndex((item) => item.id === itemId);
    if (index >= 0) slides[index] = next;
    else slides.push(next);
  });
}

export async function deleteHeroSlide(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    doc.locales[locale].heroSlides = doc.locales[locale].heroSlides.filter(
      (item) => item.id !== itemId,
    );
  });
}

export async function upsertNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const next: CmsNavItem = {
    id: itemId || newId(),
    href: str(formData, "href", "#"),
    orderIndex: parseNumber(formData.get("orderIndex")),
    isActive: parseBool(formData.get("isActive")),
    label: str(formData, "label", "Menu"),
  };
  await mutate(locale, (doc) => {
    const list = doc.locales[locale].nav;
    const index = list.findIndex((item) => item.id === itemId);
    if (index >= 0) list[index] = next;
    else list.push(next);
  });
}

export async function deleteNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    doc.locales[locale].nav = doc.locales[locale].nav.filter((item) => item.id !== itemId);
  });
}

function readCatalog(formData: FormData, itemId?: string): CmsCatalogItem {
  return {
    id: itemId || str(formData, "itemId") || newId(),
    imageUrl: str(formData, "imageUrl"),
    imageAlt: str(formData, "imageAlt"),
    orderIndex: parseNumber(formData.get("orderIndex")),
    isActive: parseBool(formData.get("isActive")),
    title: str(formData, "title"),
    description: str(formData, "description"),
    details: str(formData, "details"),
    sizesText: str(formData, "sizesText"),
  };
}

async function upsertCatalog(
  kind: "products" | "featured" | "services",
  formData: FormData,
) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const next = readCatalog(formData, itemId || undefined);
  await mutate(locale, (doc) => {
    const list = doc.locales[locale][kind];
    const index = list.findIndex((item) => item.id === itemId);
    if (index >= 0) list[index] = next;
    else list.push(next);
  });
}

async function deleteCatalog(
  kind: "products" | "featured" | "services",
  formData: FormData,
) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    doc.locales[locale][kind] = doc.locales[locale][kind].filter((item) => item.id !== itemId);
  });
}

export async function upsertProduct(formData: FormData) {
  await upsertCatalog("products", formData);
}
export async function deleteProduct(formData: FormData) {
  await deleteCatalog("products", formData);
}
export async function upsertFeatured(formData: FormData) {
  await upsertCatalog("featured", formData);
}
export async function deleteFeatured(formData: FormData) {
  await deleteCatalog("featured", formData);
}
export async function upsertService(formData: FormData) {
  await upsertCatalog("services", formData);
}
export async function deleteService(formData: FormData) {
  await deleteCatalog("services", formData);
}

export async function upsertFaq(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const next: CmsFaqItem = {
    id: itemId || newId(),
    orderIndex: parseNumber(formData.get("orderIndex")),
    isActive: parseBool(formData.get("isActive")),
    question: str(formData, "question"),
    answer: str(formData, "answer"),
  };
  await mutate(locale, (doc) => {
    const list = doc.locales[locale].faqs;
    const index = list.findIndex((item) => item.id === itemId);
    if (index >= 0) list[index] = next;
    else list.push(next);
  });
}

export async function deleteFaq(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    doc.locales[locale].faqs = doc.locales[locale].faqs.filter((item) => item.id !== itemId);
  });
}

export async function upsertSocialLink(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const next: CmsSocialLink = {
    id: itemId || newId(),
    label: str(formData, "label"),
    href: str(formData, "href"),
    icon: str(formData, "icon", "Instagram"),
  };
  await mutate(locale, (doc) => {
    const list = doc.locales[locale].socialLinks;
    const index = list.findIndex((item) => item.id === itemId);
    if (index >= 0) list[index] = next;
    else list.push(next);
  });
}

export async function deleteSocialLink(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  await mutate(locale, (doc) => {
    doc.locales[locale].socialLinks = doc.locales[locale].socialLinks.filter(
      (item) => item.id !== itemId,
    );
  });
}

export async function resetCmsToDefaults(formData: FormData) {
  await requireAdmin();
  const locale = getLocale(formData.get("locale"));
  await resetCmsDocument();
  revalidateAll(locale);
}

export async function saveSeoGlobal(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await mutate(locale, (doc) => {
    doc.seo = {
      siteUrl: str(formData, "siteUrl", "https://revo.qa"),
      googleAnalyticsId: str(formData, "googleAnalyticsId"),
      googleTagManagerId: str(formData, "googleTagManagerId"),
      searchConsoleVerification: str(formData, "searchConsoleVerification"),
      defaultOgImageUrl: str(formData, "defaultOgImageUrl"),
      robotsIndex: parseBool(formData.get("robotsIndex")),
      businessType: str(formData, "businessType", "Store"),
      geoRegion: str(formData, "geoRegion", "QA"),
      geoPlacename: str(formData, "geoPlacename", "Doha, Qatar"),
      latitude: str(formData, "latitude"),
      longitude: str(formData, "longitude"),
      priceRange: str(formData, "priceRange", "$$"),
      openingHours: str(formData, "openingHours"),
    };
  });
}

export async function saveLocaleSeo(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await mutate(locale, (doc) => {
    doc.locales[locale].seo = {
      metaTitle: str(formData, "metaTitle"),
      metaDescription: str(formData, "metaDescription"),
      metaKeywords: str(formData, "metaKeywords"),
      ogTitle: str(formData, "ogTitle"),
      ogDescription: str(formData, "ogDescription"),
      ogImageUrl: str(formData, "ogImageUrl"),
      ogImageAlt: str(formData, "ogImageAlt"),
      twitterTitle: str(formData, "twitterTitle"),
      twitterDescription: str(formData, "twitterDescription"),
      localBusinessDescription: str(formData, "localBusinessDescription"),
      aboutSeoTitle: str(formData, "aboutSeoTitle"),
      aboutSeoDescription: str(formData, "aboutSeoDescription"),
      productsSeoTitle: str(formData, "productsSeoTitle"),
      productsSeoDescription: str(formData, "productsSeoDescription"),
      featuredSeoTitle: str(formData, "featuredSeoTitle"),
      featuredSeoDescription: str(formData, "featuredSeoDescription"),
      solutionsSeoTitle: str(formData, "solutionsSeoTitle"),
      solutionsSeoDescription: str(formData, "solutionsSeoDescription"),
      faqSeoTitle: str(formData, "faqSeoTitle"),
      faqSeoDescription: str(formData, "faqSeoDescription"),
      contactSeoTitle: str(formData, "contactSeoTitle"),
      contactSeoDescription: str(formData, "contactSeoDescription"),
    };
  });
}

// Back-compat aliases used by older imports
export const saveSiteSettings = saveCompany;
export const saveSiteTranslation = saveLocaleCopy;
