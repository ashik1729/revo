import { redirect } from "next/navigation";
import type { SiteTranslation } from "@prisma/client";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { defaultLocale, supportedLocales, type SiteLocale } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import AdminDashboard, {
  type AdminCatalogItem,
  type AdminFaqItem,
  type AdminNavItem,
  type AdminTranslation,
} from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ locale?: string }>;
};

function toTranslation(content: Awaited<ReturnType<typeof getSiteContent>>, translation: SiteTranslation | null): AdminTranslation {
  return {
    tagline: translation?.tagline ?? content.company.tagline,
    heroEyebrow: translation?.heroEyebrow ?? content.hero.eyebrow,
    heroHeadline: translation?.heroHeadline ?? content.hero.headline,
    heroSubheadline: translation?.heroSubheadline ?? content.hero.subheadline,
    heroCtaLabel: translation?.heroCtaLabel ?? content.hero.ctaLabel,
    heroCtaHref: translation?.heroCtaHref ?? content.hero.ctaHref,
    heroSecondaryCtaLabel: translation?.heroSecondaryCtaLabel ?? content.hero.secondaryCtaLabel,
    heroSecondaryCtaHref: translation?.heroSecondaryCtaHref ?? content.hero.secondaryCtaHref,
    heroImageAlt: translation?.heroImageAlt ?? content.hero.imageAlt,
    trustBadge1: translation?.trustBadge1 ?? content.hero.trustBadges[0]?.label ?? "",
    trustBadge2: translation?.trustBadge2 ?? content.hero.trustBadges[1]?.label ?? "",
    trustBadge3: translation?.trustBadge3 ?? content.hero.trustBadges[2]?.label ?? "",
    aboutTitle: translation?.aboutTitle ?? content.about.title,
    aboutDescription: translation?.aboutDescription ?? content.about.description,
    aboutExtra: translation?.aboutExtra ?? content.about.extra,
    aboutImageAlt: translation?.aboutImageAlt ?? content.about.imageAlt,
    visionTitle: translation?.visionTitle ?? content.vision.title,
    visionText: translation?.visionText ?? content.vision.text,
    missionTitle: translation?.missionTitle ?? content.mission.title,
    missionText: translation?.missionText ?? content.mission.text,
    productsSectionTitle: translation?.productsSectionTitle ?? content.productsSectionTitle,
    productsSectionDescription:
      translation?.productsSectionDescription ?? content.productsSectionDescription,
    servicesSectionTitle: translation?.servicesSectionTitle ?? content.servicesSectionTitle,
    servicesSectionDescription:
      translation?.servicesSectionDescription ?? content.servicesSectionDescription,
    faqSectionTitle: translation?.faqSectionTitle ?? content.faqSectionTitle,
    faqSectionDescription: translation?.faqSectionDescription ?? content.faqSectionDescription,
    contactTitle: translation?.contactTitle ?? content.contact.title,
    contactDescription: translation?.contactDescription ?? content.contact.description,
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const locale = (params.locale && supportedLocales.includes(params.locale as SiteLocale)
    ? params.locale
    : defaultLocale) as SiteLocale;

  const content = await getSiteContent(locale);
  let dbReady = true;
  let translation: SiteTranslation | null = null;
  let navItems: AdminNavItem[] = [];
  let products: AdminCatalogItem[] = [];
  let services: AdminCatalogItem[] = [];
  let faqs: AdminFaqItem[] = [];

  try {
    const [dbTranslation, dbNav, dbProducts, dbServices, dbFaqs] = await Promise.all([
      db.siteTranslation.findUnique({ where: { locale } }),
      db.navItem.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
      db.product.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
      db.service.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
      db.faqItem.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
    ]);

    translation = dbTranslation;

    navItems = dbNav.map((item) => ({
      id: item.id,
      href: item.href,
      orderIndex: item.orderIndex,
      isActive: item.isActive,
      label:
        item.translations.find((entry) => entry.locale === locale)?.label ||
        item.translations[0]?.label ||
        "",
    }));

    products = dbProducts.map((item) => {
      const localeEntry =
        item.translations.find((entry) => entry.locale === locale) || item.translations[0];
      return {
        id: item.id,
        imageUrl: item.imageUrl,
        orderIndex: item.orderIndex,
        isActive: item.isActive,
        title: localeEntry?.title ?? "",
        description: localeEntry?.description ?? "",
        details: localeEntry?.details ?? "",
      };
    });

    services = dbServices.map((item) => {
      const localeEntry =
        item.translations.find((entry) => entry.locale === locale) || item.translations[0];
      return {
        id: item.id,
        imageUrl: item.imageUrl,
        orderIndex: item.orderIndex,
        isActive: item.isActive,
        title: localeEntry?.title ?? "",
        description: localeEntry?.description ?? "",
        details: localeEntry?.details ?? "",
      };
    });

    faqs = dbFaqs.map((item) => {
      const localeEntry =
        item.translations.find((entry) => entry.locale === locale) || item.translations[0];
      return {
        id: item.id,
        orderIndex: item.orderIndex,
        isActive: item.isActive,
        question: localeEntry?.question ?? "",
        answer: localeEntry?.answer ?? "",
      };
    });
  } catch {
    dbReady = false;
  }

  return (
    <AdminDashboard
      locale={locale}
      content={content}
      dbReady={dbReady}
      translation={toTranslation(content, translation)}
      navItems={navItems}
      products={products}
      services={services}
      faqs={faqs}
    />
  );
}
