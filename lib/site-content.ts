import {
  aboutContent,
  companyInfo,
  faqs,
  footerContent,
  heroContent,
  locations,
  navLinks,
  products,
  productsSectionTitle,
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
  locations: ReadonlyArray<{
    id: string;
    city: string;
    country: string;
    address: string;
  }>;
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
  };
  productsSectionTitle: string;
  servicesSectionTitle: string;
  contact: {
    title: string;
    description: string;
  };
  products: ReadonlyArray<{ id: string; title: string; description: string; icon: string }>;
  services: ReadonlyArray<{ id: string; title: string; description: string; icon: string }>;
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

function getFallbackContent(locale: SiteLocale): SiteContent {
  const localeAwareNav =
    locale === "ar"
      ? [
          { label: "الرئيسية", href: "#home" },
          { label: "المنتجات", href: "#products" },
          { label: "من نحن", href: "#about" },
          { label: "مواقعنا", href: "#locations" },
          { label: "اتصل بنا", href: "#contact" },
        ]
      : navLinks;

  return {
    locale,
    company: {
      name: companyInfo.name,
      tagline:
        locale === "ar" ? "شريكك الحقيقي في التغليف" : companyInfo.tagline,
      address: companyInfo.address,
      phone: companyInfo.phone,
      phoneHref: companyInfo.phoneHref,
      email: companyInfo.email,
      emailHref: companyInfo.emailHref,
      whatsapp: companyInfo.whatsapp,
      whatsappHref: companyInfo.whatsappHref,
    },
    locations: [...locations],
    nav: localeAwareNav,
    hero: {
      ...heroContent,
      eyebrow: locale === "ar" ? "تغليف صديق للبيئة" : heroContent.eyebrow,
      headline:
        locale === "ar"
          ? "حلول مستدامة لغد أكثر خضرة"
          : heroContent.headline,
      subheadline:
        locale === "ar"
          ? "شريك موثوق للتغليف لقطاعات الأغذية والتجزئة والضيافة في الإمارات وقطر والبحرين."
          : heroContent.subheadline,
      ctaLabel: locale === "ar" ? "تواصل معنا" : heroContent.ctaLabel,
    },
    about: {
      title: locale === "ar" ? "عن ريالبك" : aboutContent.title,
      description:
        locale === "ar"
          ? "ريالبك، ومقرها دبي، الإمارات، مزود رائد لحلول التغليف الصديقة للبيئة وفعّالة التكلفة في المنطقة، بما في ذلك المنتجات القابلة للتحلل والكرتون وPLA."
          : aboutContent.description,
    },
    productsSectionTitle: locale === "ar" ? "منتجاتنا" : productsSectionTitle,
    servicesSectionTitle: locale === "ar" ? "التركيز المستدام" : "Sustainable Focus",
    contact: {
      title:
        locale === "ar"
          ? "هل لديك أسئلة أو تحتاج مساعدة؟"
          : "Have questions or need assistance?",
      description:
        locale === "ar"
          ? "فريقنا جاهز لمساعدتك في إيجاد حلول التغليف المناسبة لعملك."
          : "Our expert team is here to help you find the right packaging solutions for your business.",
    },
    products: products.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
    })),
    services: services.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
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

            return {
              id: item.id,
              icon: item.icon,
              title: localeTranslation?.title || fallbackTranslation?.title || "Product",
              description:
                localeTranslation?.description ||
                fallbackTranslation?.description ||
                "Description not set.",
            };
          })
        : fallback.products;

    const servicesData =
      serviceItems.length > 0
        ? serviceItems.map((item) => {
            const localeTranslation = item.translations.find((entry) => entry.locale === locale);
            const fallbackTranslation = item.translations[0];

            return {
              id: item.id,
              icon: item.icon,
              title: localeTranslation?.title || fallbackTranslation?.title || "Service",
              description:
                localeTranslation?.description ||
                fallbackTranslation?.description ||
                "Description not set.",
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
