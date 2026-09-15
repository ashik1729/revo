import {
  companyInfo,
  faqsByLocale,
  footerContent,
  localeCopy,
  navLinksByLocale,
  productsByLocale,
  solutionsByLocale,
  type LocaleCode,
} from "@/data/content";
import { getDb } from "@/lib/db";
import type { SiteLocale } from "@/lib/i18n";

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
  faqSectionTitle: string;
  faqSectionDescription: string;
  contact: {
    title: string;
    description: string;
    bannerUrl: string;
    sideImageUrl: string;
  };
  products: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  services: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    imageAlt: string;
  }>;
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
  const nav = navLinksByLocale[code];

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
    faqSectionTitle: copy.faqSectionTitle,
    faqSectionDescription: copy.faqSectionDescription,
    contact: {
      title: copy.contactTitle,
      description: copy.contactDescription,
      bannerUrl: companyInfo.contactBannerUrl,
      sideImageUrl: companyInfo.contactSideImageUrl,
    },
    products: products.map((item) => ({ ...item })),
    services: services.map((item) => ({ ...item })),
    faqs: [...faqsByLocale[code]],
    footer: {
      ...footerContent,
      quickLinks: nav,
      copyright:
        locale === "ar"
          ? "© 2026 ريفو قطر. جميع الحقوق محفوظة."
          : footerContent.copyright,
    },
  };
}

export async function getSiteContent(locale: SiteLocale): Promise<SiteContent> {
  const fallback = getFallbackContent(locale);
  const db = getDb();
  if (!db) {
    return fallback;
  }

  try {
    const [settings, translation, navItems, productItems, serviceItems, faqItems] =
      await Promise.all([
        db.siteSettings.findUnique({ where: { id: 1 } }),
        db.siteTranslation.findUnique({ where: { locale } }),
        db.navItem.findMany({
          where: { isActive: true },
          orderBy: { orderIndex: "asc" },
          include: { translations: true },
        }),
        db.product.findMany({
          where: { isActive: true },
          orderBy: { orderIndex: "asc" },
          include: { translations: true },
        }),
        db.service.findMany({
          where: { isActive: true },
          orderBy: { orderIndex: "asc" },
          include: { translations: true },
        }),
        db.faqItem.findMany({
          where: { isActive: true },
          orderBy: { orderIndex: "asc" },
          include: { translations: true },
        }),
      ]);

    const nav =
      navItems.length > 0
        ? navItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            return {
              href: item.href,
              label: localeTranslation?.label || item.translations[0]?.label || "Menu",
            };
          })
        : fallback.nav;

    const products =
      productItems.length > 0
        ? productItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const first = item.translations[0];
            const title = localeTranslation?.title || first?.title || "Product";
            return {
              id: item.id,
              title,
              description: localeTranslation?.description || first?.description || "",
              details: localeTranslation?.details || first?.details || "",
              imageUrl: item.imageUrl || fallback.products[0]?.imageUrl || "",
              imageAlt: title,
            };
          })
        : fallback.products;

    const services =
      serviceItems.length > 0
        ? serviceItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const first = item.translations[0];
            const title = localeTranslation?.title || first?.title || "Solution";
            return {
              id: item.id,
              title,
              description: localeTranslation?.description || first?.description || "",
              details: localeTranslation?.details || first?.details || "",
              imageUrl: item.imageUrl || fallback.services[0]?.imageUrl || "",
              imageAlt: title,
            };
          })
        : fallback.services;

    const faqs =
      faqItems.length > 0
        ? faqItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const first = item.translations[0];
            return {
              question: localeTranslation?.question || first?.question || "",
              answer: localeTranslation?.answer || first?.answer || "",
            };
          })
        : fallback.faqs;

    const trustBadges = [
      translation?.trustBadge1,
      translation?.trustBadge2,
      translation?.trustBadge3,
    ]
      .filter((value): value is string => Boolean(value && value.trim()))
      .map((label) => ({ label }));

    return {
      ...fallback,
      company: {
        name: settings?.companyName || fallback.company.name,
        tagline: translation?.tagline || fallback.company.tagline,
        address: settings?.address || fallback.company.address,
        phone: settings?.phone || fallback.company.phone,
        phoneHref: settings?.phone ? toPhoneHref(settings.phone) : fallback.company.phoneHref,
        email: settings?.email || fallback.company.email,
        emailHref: settings?.email ? `mailto:${settings.email}` : fallback.company.emailHref,
        whatsapp: settings?.whatsapp || fallback.company.whatsapp,
        whatsappHref: settings?.whatsapp
          ? toWhatsappHref(settings.whatsapp)
          : fallback.company.whatsappHref,
        heroImageUrl: settings?.heroImageUrl || fallback.company.heroImageUrl,
        aboutImageUrl: settings?.aboutImageUrl || fallback.company.aboutImageUrl,
        contactBannerUrl: settings?.contactBannerUrl || fallback.company.contactBannerUrl,
        contactSideImageUrl:
          settings?.contactSideImageUrl || fallback.company.contactSideImageUrl,
      },
      nav,
      hero: {
        eyebrow: translation?.heroEyebrow || fallback.hero.eyebrow,
        headline: translation?.heroHeadline || fallback.hero.headline,
        subheadline: translation?.heroSubheadline || fallback.hero.subheadline,
        ctaLabel: translation?.heroCtaLabel || fallback.hero.ctaLabel,
        ctaHref: translation?.heroCtaHref || fallback.hero.ctaHref,
        secondaryCtaLabel:
          translation?.heroSecondaryCtaLabel || fallback.hero.secondaryCtaLabel,
        secondaryCtaHref:
          translation?.heroSecondaryCtaHref || fallback.hero.secondaryCtaHref,
        imageUrl: settings?.heroImageUrl || fallback.hero.imageUrl,
        imageAlt: translation?.heroImageAlt || fallback.hero.imageAlt,
        trustBadges: trustBadges.length > 0 ? trustBadges : fallback.hero.trustBadges,
      },
      about: {
        title: translation?.aboutTitle || fallback.about.title,
        description: translation?.aboutDescription || fallback.about.description,
        extra: translation?.aboutExtra || fallback.about.extra,
        imageUrl: settings?.aboutImageUrl || fallback.about.imageUrl,
        imageAlt: translation?.aboutImageAlt || fallback.about.imageAlt,
      },
      vision: {
        title: translation?.visionTitle || fallback.vision.title,
        text: translation?.visionText || fallback.vision.text,
      },
      mission: {
        title: translation?.missionTitle || fallback.mission.title,
        text: translation?.missionText || fallback.mission.text,
      },
      productsSectionTitle:
        translation?.productsSectionTitle || fallback.productsSectionTitle,
      productsSectionDescription:
        translation?.productsSectionDescription || fallback.productsSectionDescription,
      servicesSectionTitle:
        translation?.servicesSectionTitle || fallback.servicesSectionTitle,
      servicesSectionDescription:
        translation?.servicesSectionDescription || fallback.servicesSectionDescription,
      faqSectionTitle: translation?.faqSectionTitle || fallback.faqSectionTitle,
      faqSectionDescription:
        translation?.faqSectionDescription || fallback.faqSectionDescription,
      contact: {
        title: translation?.contactTitle || fallback.contact.title,
        description: translation?.contactDescription || fallback.contact.description,
        bannerUrl: settings?.contactBannerUrl || fallback.contact.bannerUrl,
        sideImageUrl: settings?.contactSideImageUrl || fallback.contact.sideImageUrl,
      },
      products,
      services,
      faqs,
      footer: {
        ...fallback.footer,
        quickLinks: nav,
      },
    };
  } catch {
    return fallback;
  }
}
