"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { defaultLocale, isSupportedLocale, type SiteLocale } from "@/lib/i18n";

function getLocale(input: FormDataEntryValue | null): SiteLocale {
  if (typeof input === "string" && isSupportedLocale(input)) {
    return input;
  }

  return defaultLocale;
}

function parseNumber(input: FormDataEntryValue | null, fallback = 0) {
  if (typeof input !== "string") {
    return fallback;
  }

  const value = Number(input);
  return Number.isFinite(value) ? value : fallback;
}

function parseBool(input: FormDataEntryValue | null) {
  return input === "on" || input === "true";
}

function revalidateLocale(locale: SiteLocale) {
  revalidatePath(`/${locale}`);
  revalidatePath("/admin");
}

export async function saveSiteSettings(formData: FormData) {
  const locale = getLocale(formData.get("locale"));

  await db.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: String(formData.get("companyName") || ""),
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
    },
    create: {
      id: 1,
      companyName: String(formData.get("companyName") || ""),
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
    },
  });

  revalidateLocale(locale);
}

export async function saveSiteTranslation(formData: FormData) {
  const locale = getLocale(formData.get("locale"));

  await db.siteTranslation.upsert({
    where: { locale },
    update: {
      tagline: String(formData.get("tagline") || ""),
      heroEyebrow: String(formData.get("heroEyebrow") || ""),
      heroHeadline: String(formData.get("heroHeadline") || ""),
      heroSubheadline: String(formData.get("heroSubheadline") || ""),
      heroCtaLabel: String(formData.get("heroCtaLabel") || ""),
      heroCtaHref: String(formData.get("heroCtaHref") || "#contact"),
      aboutTitle: String(formData.get("aboutTitle") || ""),
      aboutDescription: String(formData.get("aboutDescription") || ""),
      productsSectionTitle: String(formData.get("productsSectionTitle") || ""),
      servicesSectionTitle: String(formData.get("servicesSectionTitle") || ""),
      contactTitle: String(formData.get("contactTitle") || "Contact Us"),
      contactDescription: String(formData.get("contactDescription") || ""),
    },
    create: {
      locale,
      tagline: String(formData.get("tagline") || ""),
      heroEyebrow: String(formData.get("heroEyebrow") || ""),
      heroHeadline: String(formData.get("heroHeadline") || ""),
      heroSubheadline: String(formData.get("heroSubheadline") || ""),
      heroCtaLabel: String(formData.get("heroCtaLabel") || ""),
      heroCtaHref: String(formData.get("heroCtaHref") || "#contact"),
      aboutTitle: String(formData.get("aboutTitle") || ""),
      aboutDescription: String(formData.get("aboutDescription") || ""),
      productsSectionTitle: String(formData.get("productsSectionTitle") || ""),
      servicesSectionTitle: String(formData.get("servicesSectionTitle") || ""),
      contactTitle: String(formData.get("contactTitle") || "Contact Us"),
      contactDescription: String(formData.get("contactDescription") || ""),
    },
  });

  revalidateLocale(locale);
}

export async function upsertNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const navId = String(formData.get("navId") || "");
  const href = String(formData.get("href") || "#");
  const label = String(formData.get("label") || "");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const navItem =
    navId.length > 0
      ? await db.navItem.update({
          where: { id: navId },
          data: { href, orderIndex, isActive },
        })
      : await db.navItem.create({
          data: { href, orderIndex, isActive },
        });

  await db.navItemTranslation.upsert({
    where: {
      navItemId_locale: {
        navItemId: navItem.id,
        locale,
      },
    },
    update: { label },
    create: {
      navItemId: navItem.id,
      locale,
      label,
    },
  });

  revalidateLocale(locale);
}

export async function deleteNavItem(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const navId = String(formData.get("navId") || "");
  if (!navId) return;

  await db.navItem.delete({ where: { id: navId } });
  revalidateLocale(locale);
}

export async function upsertProduct(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = String(formData.get("itemId") || "");
  const icon = String(formData.get("icon") || "BedDouble");
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const product =
    itemId.length > 0
      ? await db.product.update({
          where: { id: itemId },
          data: { icon, orderIndex, isActive },
        })
      : await db.product.create({
          data: { icon, orderIndex, isActive },
        });

  await db.productTranslation.upsert({
    where: {
      productId_locale: {
        productId: product.id,
        locale,
      },
    },
    update: { title, description },
    create: {
      productId: product.id,
      locale,
      title,
      description,
    },
  });

  revalidateLocale(locale);
}

export async function deleteProduct(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = String(formData.get("itemId") || "");
  if (!itemId) return;

  await db.product.delete({ where: { id: itemId } });
  revalidateLocale(locale);
}

export async function upsertService(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = String(formData.get("itemId") || "");
  const icon = String(formData.get("icon") || "Building2");
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const orderIndex = parseNumber(formData.get("orderIndex"));
  const isActive = parseBool(formData.get("isActive"));

  const service =
    itemId.length > 0
      ? await db.service.update({
          where: { id: itemId },
          data: { icon, orderIndex, isActive },
        })
      : await db.service.create({
          data: { icon, orderIndex, isActive },
        });

  await db.serviceTranslation.upsert({
    where: {
      serviceId_locale: {
        serviceId: service.id,
        locale,
      },
    },
    update: { title, description },
    create: {
      serviceId: service.id,
      locale,
      title,
      description,
    },
  });

  revalidateLocale(locale);
}

export async function deleteService(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const itemId = String(formData.get("itemId") || "");
  if (!itemId) return;

  await db.service.delete({ where: { id: itemId } });
  revalidateLocale(locale);
}
