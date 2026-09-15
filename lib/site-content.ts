import {
  aboutContent,
  companyInfo,
  faqs,
  footerContent,
  heroContent,
  navLinks,
  productImageByTitle,
  products,
  productsSectionTitle,
  serviceImageByTitle,
  services,
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
  };
  nav: ReadonlyArray<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    imageUrl: string;
    imageAlt: string;
    trustBadges: typeof heroContent.trustBadges;
  };
  about: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  };
  productsSectionTitle: string;
  servicesSectionTitle: string;
  contact: {
    title: string;
    description: string;
  };
  products: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  services: ReadonlyArray<{
    id: string;
    title: string;
    description: string;
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

function resolveMedia(
  stored: string,
  title: string,
  lookup: Record<string, { imageUrl: string; imageAlt: string }>,
  fallbackAlt: string,
) {
  if (stored.startsWith("http")) {
    return { imageUrl: stored, imageAlt: title };
  }

  const fromTitle = lookup[title];
  if (fromTitle) {
    return fromTitle;
  }

  return {
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    imageAlt: fallbackAlt,
  };
}

function getFallbackContent(locale: SiteLocale): SiteContent {
  const localeAwareNav =
    locale === "ar"
      ? [
          { label: "الرئيسية", href: "#home" },
          { label: "المنتجات", href: "#products" },
          { label: "الخدمات", href: "#services" },
          { label: "من نحن", href: "#about" },
          { label: "اتصل بنا", href: "#contact" },
        ]
      : navLinks;

  return {
    locale,
    company: {
      name: companyInfo.name,
      tagline:
        locale === "ar"
          ? "حلول الضيافة وصيانة المباني التي يمكنك الوثوق بها"
          : companyInfo.tagline,
      address: companyInfo.address,
      phone: companyInfo.phone,
      phoneHref: companyInfo.phoneHref,
      email: companyInfo.email,
      emailHref: companyInfo.emailHref,
      whatsapp: companyInfo.whatsapp,
      whatsappHref: companyInfo.whatsappHref,
    },
    nav: localeAwareNav,
    hero: {
      ...heroContent,
      eyebrow: locale === "ar" ? "تغليف الضيافة والصيانة" : heroContent.eyebrow,
      headline:
        locale === "ar"
          ? "حلول متكاملة للضيافة وصيانة المباني"
          : heroContent.headline,
      subheadline:
        locale === "ar"
          ? "متخصصون في تغليف الضيافة الصديق للبيئة وتوريد المنشآت في قطر، مع خدمات صيانة موثوقة."
          : heroContent.subheadline,
      ctaLabel: locale === "ar" ? "اطلب عرض سعر" : heroContent.ctaLabel,
    },
    about: {
      title: locale === "ar" ? "عن ريفو قطر" : aboutContent.title,
      description:
        locale === "ar"
          ? "ريفو قطر شريك موثوق للفنادق والمنشآت في قطر، نوفر تغليفاً صديقاً للبيئة ومستلزمات المنشآت وخدمات صيانة المباني."
          : aboutContent.description,
      imageUrl: aboutContent.imageUrl,
      imageAlt: aboutContent.imageAlt,
    },
    productsSectionTitle:
      locale === "ar" ? "منتجات تغليف الضيافة" : productsSectionTitle,
    servicesSectionTitle: locale === "ar" ? "الخدمات" : "Services",
    contact: {
      title: locale === "ar" ? "تواصل معنا" : "Contact Us",
      description:
        locale === "ar"
          ? "تواصل معنا لطلبات الأسعار أو الاستفسارات حول المنتجات والخدمات."
          : "Get in touch for quotes, product inquiries, or service requests",
    },
    products: products.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
    })),
    services: services.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
    })),
    faqs: [...faqs],
    footer: {
      ...footerContent,
      quickLinks: localeAwareNav,
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
    const [settings, translation, navItems, productItems, serviceItems] = await Promise.all([
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

    const productsData =
      productItems.length > 0
        ? productItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const fallbackTranslation = item.translations[0];
            const title = localeTranslation?.title || fallbackTranslation?.title || "Product";
            const media = resolveMedia(item.icon, title, productImageByTitle, title);

            return {
              id: item.id,
              title,
              description:
                localeTranslation?.description ||
                fallbackTranslation?.description ||
                "Description not set.",
              imageUrl: media.imageUrl,
              imageAlt: media.imageAlt,
            };
          })
        : fallback.products;

    const servicesData =
      serviceItems.length > 0
        ? serviceItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const fallbackTranslation = item.translations[0];
            const title = localeTranslation?.title || fallbackTranslation?.title || "Service";
            const media = resolveMedia(item.icon, title, serviceImageByTitle, title);

            return {
              id: item.id,
              title,
              description:
                localeTranslation?.description ||
                fallbackTranslation?.description ||
                "Description not set.",
              imageUrl: media.imageUrl,
              imageAlt: media.imageAlt,
            };
          })
        : fallback.services;

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
      },
      nav,
      hero: {
        ...fallback.hero,
        eyebrow: translation?.heroEyebrow || fallback.hero.eyebrow,
        headline: translation?.heroHeadline || fallback.hero.headline,
        subheadline: translation?.heroSubheadline || fallback.hero.subheadline,
        ctaLabel: translation?.heroCtaLabel || fallback.hero.ctaLabel,
        ctaHref: translation?.heroCtaHref || fallback.hero.ctaHref,
      },
      about: {
        title: translation?.aboutTitle || fallback.about.title,
        description: translation?.aboutDescription || fallback.about.description,
        imageUrl: fallback.about.imageUrl,
        imageAlt: fallback.about.imageAlt,
      },
      productsSectionTitle:
        translation?.productsSectionTitle || fallback.productsSectionTitle,
      servicesSectionTitle:
        translation?.servicesSectionTitle || fallback.servicesSectionTitle,
      contact: {
        title: translation?.contactTitle || fallback.contact.title,
        description: translation?.contactDescription || fallback.contact.description,
      },
      products: productsData,
      services: servicesData,
      footer: {
        ...fallback.footer,
        quickLinks: nav,
      },
    };
  } catch {
    return fallback;
  }
}
