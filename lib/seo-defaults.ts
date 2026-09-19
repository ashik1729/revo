import type { SiteLocale } from "@/lib/i18n";

export type CmsSeoGlobal = {
  siteUrl: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  searchConsoleVerification: string;
  defaultOgImageUrl: string;
  robotsIndex: boolean;
  businessType: string;
  geoRegion: string;
  geoPlacename: string;
  latitude: string;
  longitude: string;
  priceRange: string;
  openingHours: string;
};

export type CmsLocaleSeo = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  localBusinessDescription: string;
  aboutSeoTitle: string;
  aboutSeoDescription: string;
  productsSeoTitle: string;
  productsSeoDescription: string;
  featuredSeoTitle: string;
  featuredSeoDescription: string;
  solutionsSeoTitle: string;
  solutionsSeoDescription: string;
  faqSeoTitle: string;
  faqSeoDescription: string;
  contactSeoTitle: string;
  contactSeoDescription: string;
};

export function defaultSeoGlobal(): CmsSeoGlobal {
  return {
    siteUrl: "https://revo.qa",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    searchConsoleVerification: "",
    defaultOgImageUrl: "/media/full-catalogue-supply.jpg",
    robotsIndex: true,
    businessType: "Store",
    geoRegion: "QA",
    geoPlacename: "Doha, Qatar",
    latitude: "25.2854",
    longitude: "51.5310",
    priceRange: "$$",
    openingHours: "Mo-Th 08:00-18:00, Su 08:00-18:00",
  };
}

export function defaultLocaleSeo(locale: SiteLocale): CmsLocaleSeo {
  if (locale === "ar") {
    return {
      metaTitle: "ريفو للتجارة | مورّد تغليف صديق للبيئة في قطر | الدوحة",
      metaDescription:
        "اشترِ تغليفاً صديقاً للبيئة في قطر. ريفو للتجارة تورّد الباجاس والكرتون والألمنيوم ومستلزمات النظافة والضيافة في الدوحة مع توصيل محلي موثوق.",
      metaKeywords:
        "تغليف قطر, تغليف صديق للبيئة الدوحة, مورد تغليف غذائي قطر, علب كرتون قطر, أطباق باجاس الدوحة, ريفو للتجارة",
      ogTitle: "ريفو للتجارة | تغليف مستدام في قطر",
      ogDescription:
        "حلول تغليف للفنادق والمطاعم والمنشآت في الدوحة — باجاس، كرتون، ألمنيوم والمزيد.",
      ogImageUrl: "",
      ogImageAlt: "منتجات تغليف صديقة للبيئة من ريفو للتجارة في قطر",
      twitterTitle: "ريفو للتجارة | تغليف مستدام في قطر",
      twitterDescription: "مورد تغليف موثوق في الدوحة للضيافة وقطاع الأغذية.",
      localBusinessDescription:
        "ريفو للتجارة مورّد تغليف في المنطقة الصناعية بالدوحة، قطر، يخدم الفنادق والمطاعم والمنشآت.",
      aboutSeoTitle: "عن ريفو للتجارة | مورّد تغليف في قطر",
      aboutSeoDescription: "تعرّف على رؤية ورسالة ريفو للتجارة في توريد التغليف المستدام في قطر.",
      productsSeoTitle: "منتجات التغليف في قطر | كتالوج ريفو للتجارة",
      productsSeoDescription: "تصفح فئات التغليف: بيئي، باجاس، كرتون، ألمنيوم، نظافة والمزيد في الدوحة.",
      featuredSeoTitle: "منتجات تغليف مميزة في قطر",
      featuredSeoDescription: "أصناف جاهزة للطلب بالجملة من كتالوج ريفو للتجارة.",
      solutionsSeoTitle: "حلول تغليف مستدامة في قطر",
      solutionsSeoDescription: "باجاس وكرتون وPLA للعمليات الأكثر استدامة في الدوحة.",
      faqSeoTitle: "أسئلة شائعة عن التغليف في قطر",
      faqSeoDescription: "إجابات عن التوريد والأحجام والتوصيل من ريفو للتجارة في الدوحة.",
      contactSeoTitle: "تواصل مع ريفو للتجارة | الدوحة، قطر",
      contactSeoDescription: "اطلب عرض سعر للتغليف في قطر — هاتف، واتساب، أو نموذج الاتصال.",
    };
  }

  return {
    metaTitle: "Revo Trading | Eco-Friendly Packaging Supplier in Qatar | Doha",
    metaDescription:
      "Buy eco-friendly packaging in Qatar. Revo Trading supplies bagasse, kraft, aluminium, hygiene and foodservice packaging across Doha with reliable local delivery.",
    metaKeywords:
      "packaging Qatar, eco packaging Doha, food packaging supplier Qatar, kraft boxes Qatar, bagasse plates Doha, aluminium containers Qatar, Revo Trading packaging",
    ogTitle: "Revo Trading | Sustainable Packaging in Qatar",
    ogDescription:
      "Packaging solutions for hotels, F&B and facilities in Doha — bagasse, kraft, aluminium and more.",
    ogImageUrl: "",
    ogImageAlt: "Eco-friendly packaging products from Revo Trading in Qatar",
    twitterTitle: "Revo Trading | Sustainable Packaging in Qatar",
    twitterDescription: "Trusted packaging supplier in Doha for hospitality and F&B.",
    localBusinessDescription:
      "Revo Trading is a packaging supplier in Industrial Area, Doha, Qatar, serving hotels, restaurants and facilities.",
    aboutSeoTitle: "About Revo Trading | Packaging Supplier in Qatar",
    aboutSeoDescription: "Learn about Revo Trading’s vision and mission for sustainable packaging supply in Qatar.",
    productsSeoTitle: "Packaging Products in Qatar | Revo Trading Catalogue",
    productsSeoDescription:
      "Browse packaging categories: eco range, bagasse, kraft, aluminium, hygiene and more in Doha.",
    featuredSeoTitle: "Featured Packaging Products in Qatar",
    featuredSeoDescription: "Ready-to-order wholesale packaging picks from Revo Trading.",
    solutionsSeoTitle: "Sustainable Packaging Solutions in Qatar",
    solutionsSeoDescription: "Bagasse, kraft and PLA options for greener operations in Doha.",
    faqSeoTitle: "Packaging FAQs in Qatar | Revo Trading",
    faqSeoDescription: "Answers about supply, sizes and delivery from Revo Trading in Doha.",
    contactSeoTitle: "Contact Revo Trading | Doha, Qatar",
    contactSeoDescription: "Request a packaging quote in Qatar — phone, WhatsApp or contact form.",
  };
}
