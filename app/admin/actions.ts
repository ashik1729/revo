"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { defaultLocale, isSupportedLocale, type SiteLocale } from "@/lib/i18n";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function getLocale(input: FormDataEntryValue | null): SiteLocale {
  if (typeof input === "string" && isSupportedLocale(input)) {
    return input;
  }
  return defaultLocale;
}

function parseNumber(input: FormDataEntryValue | null, fallback = 0) {
  if (typeof input !== "string") return fallback;
  const value = Number(input);
  return Number.isFinite(value) ? value : fallback;
}

function parseBool(input: FormDataEntryValue | null) {
  return input === "on" || input === "true";
}

function str(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) || fallback);
}

function revalidateLocale(locale: SiteLocale) {
  revalidatePath(`/${locale}`);
  revalidatePath("/admin");
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  const locale = getLocale(formData.get("locale"));

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: str(formData, "companyName"),
      address: str(formData, "address"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      whatsapp: str(formData, "whatsapp"),
      heroImageUrl: str(formData, "heroImageUrl"),
      aboutImageUrl: str(formData, "aboutImageUrl"),
      contactBannerUrl: str(formData, "contactBannerUrl"),
      contactSideImageUrl: str(formData, "contactSideImageUrl"),
    },
    create: {
      id: 1,
      companyName: str(formData, "companyName"),
      address: str(formData, "address"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      whatsapp: str(formData, "whatsapp"),
      heroImageUrl: str(formData, "heroImageUrl"),
      aboutImageUrl: str(formData, "aboutImageUrl"),
      contactBannerUrl: str(formData, "contactBannerUrl"),
      contactSideImageUrl: str(formData, "contactSideImageUrl"),
    },
  });

  revalidateLocale(locale);
}

export async function saveSiteTranslation(formData: FormData) {
  const locale = getLocale(formData.get("locale"));

  const payload = {
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
    faqSectionTitle: str(formData, "faqSectionTitle"),
    faqSectionDescription: str(formData, "faqSectionDescription"),
    contactTitle: str(formData, "contactTitle", "Contact Us"),
    contactDescription: str(formData, "contactDescription"),
  };

  await db.siteTranslation.upsert({
    where: { locale },
    update: payload,
    create: { locale, ...payload },
  });

  revalidateLocale(locale);
}

export async function upsertNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const navId = str(formData, "navId");
  const href = str(formData, "href", "#");
  const label = str(formData, "label", "Menu");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const nav = navId
    ? await db.navItem.update({
        where: { id: navId },
        data: { href, orderIndex, isActive },
      })
    : await db.navItem.create({
        data: { href, orderIndex, isActive },
      });

  await db.navItemTranslation.upsert({
    where: { navItemId_locale: { navItemId: nav.id, locale } },
    update: { label },
    create: { navItemId: nav.id, locale, label },
  });

  revalidateLocale(locale);
}

export async function deleteNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const navId = str(formData, "navId");
  if (navId) await db.navItem.delete({ where: { id: navId } });
  revalidateLocale(locale);
}

export async function upsertProduct(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const imageUrl = str(formData, "imageUrl");
  const title = str(formData, "title");
  const description = str(formData, "description");
  const details = str(formData, "details");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const product = itemId
    ? await db.product.update({
        where: { id: itemId },
        data: { imageUrl, orderIndex, isActive },
      })
    : await db.product.create({
        data: { imageUrl, orderIndex, isActive },
      });

  await db.productTranslation.upsert({
    where: { productId_locale: { productId: product.id, locale } },
    update: { title, description, details },
    create: { productId: product.id, locale, title, description, details },
  });

  revalidateLocale(locale);
}

export async function deleteProduct(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  if (itemId) await db.product.delete({ where: { id: itemId } });
  revalidateLocale(locale);
}

export async function upsertService(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const imageUrl = str(formData, "imageUrl");
  const title = str(formData, "title");
  const description = str(formData, "description");
  const details = str(formData, "details");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const service = itemId
    ? await db.service.update({
        where: { id: itemId },
        data: { imageUrl, orderIndex, isActive },
      })
    : await db.service.create({
        data: { imageUrl, orderIndex, isActive },
      });

  await db.serviceTranslation.upsert({
    where: { serviceId_locale: { serviceId: service.id, locale } },
    update: { title, description, details },
    create: { serviceId: service.id, locale, title, description, details },
  });

  revalidateLocale(locale);
}

export async function deleteService(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  if (itemId) await db.service.delete({ where: { id: itemId } });
  revalidateLocale(locale);
}

export async function upsertFaq(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  const question = str(formData, "question");
  const answer = str(formData, "answer");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const faq = itemId
    ? await db.faqItem.update({
        where: { id: itemId },
        data: { orderIndex, isActive },
      })
    : await db.faqItem.create({
        data: { orderIndex, isActive },
      });

  await db.faqTranslation.upsert({
    where: { faqItemId_locale: { faqItemId: faq.id, locale } },
    update: { question, answer },
    create: { faqItemId: faq.id, locale, question, answer },
  });

  revalidateLocale(locale);
}

export async function deleteFaq(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = str(formData, "itemId");
  if (itemId) await db.faqItem.delete({ where: { id: itemId } });
  revalidateLocale(locale);
}
