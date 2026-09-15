const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: "Revo Qatar",
      address: "Industrial Area, Doha, Qatar",
      phone: "+974 7071 8232",
      email: "info@revo.qa",
      whatsapp: "97470718232",
    },
    create: {
      id: 1,
      companyName: "Revo Qatar",
      address: "Industrial Area, Doha, Qatar",
      phone: "+974 7071 8232",
      email: "info@revo.qa",
      whatsapp: "97470718232",
    },
  });

  await prisma.siteTranslation.upsert({
    where: { locale: "en" },
    update: {
      tagline: "Hospitality & Building Maintenance Solutions You Can Trust",
      heroEyebrow: "Hospitality Packaging & Maintenance",
      heroHeadline: "Integrated Hospitality & Building Maintenance Solutions",
      heroSubheadline:
        "Specialists in eco-friendly hospitality packaging and facility supply for hotels, resorts, and businesses across Qatar — plus reliable building maintenance support.",
      heroCtaLabel: "Get a Quote",
      heroCtaHref: "#contact",
      aboutTitle: "About Revo Qatar",
      aboutDescription:
        "Revo Qatar is a trusted partner for hotels, facilities, and businesses across Qatar. We supply eco-friendly packaging ranges alongside facility management supplies and professional building maintenance services.",
      productsSectionTitle: "Hospitality Packaging Products",
      servicesSectionTitle: "Services",
      contactTitle: "Contact Us",
      contactDescription: "Get in touch for quotes, product inquiries, or service requests",
    },
    create: {
      locale: "en",
      tagline: "Hospitality & Building Maintenance Solutions You Can Trust",
      heroEyebrow: "Hospitality Packaging & Maintenance",
      heroHeadline: "Integrated Hospitality & Building Maintenance Solutions",
      heroSubheadline:
        "Specialists in eco-friendly hospitality packaging and facility supply for hotels, resorts, and businesses across Qatar — plus reliable building maintenance support.",
      heroCtaLabel: "Get a Quote",
      heroCtaHref: "#contact",
      aboutTitle: "About Revo Qatar",
      aboutDescription:
        "Revo Qatar is a trusted partner for hotels, facilities, and businesses across Qatar. We supply eco-friendly packaging ranges alongside facility management supplies and professional building maintenance services.",
      productsSectionTitle: "Hospitality Packaging Products",
      servicesSectionTitle: "Services",
      contactTitle: "Contact Us",
      contactDescription: "Get in touch for quotes, product inquiries, or service requests",
    },
  });

  await prisma.siteTranslation.upsert({
    where: { locale: "ar" },
    update: {
      tagline: "حلول الضيافة وصيانة المباني التي يمكنك الوثوق بها",
      heroEyebrow: "تغليف الضيافة والصيانة",
      heroHeadline: "حلول متكاملة للضيافة وصيانة المباني",
      heroSubheadline:
        "متخصصون في تغليف الضيافة الصديق للبيئة وتوريد المنشآت في قطر، مع خدمات صيانة موثوقة.",
      heroCtaLabel: "اطلب عرض سعر",
      heroCtaHref: "#contact",
      aboutTitle: "عن ريفو قطر",
      aboutDescription:
        "ريفو قطر شريك موثوق للفنادق والمنشآت في قطر، نوفر تغليفاً صديقاً للبيئة ومستلزمات المنشآت وخدمات صيانة المباني.",
      productsSectionTitle: "منتجات تغليف الضيافة",
      servicesSectionTitle: "الخدمات",
      contactTitle: "تواصل معنا",
      contactDescription: "تواصل معنا لطلبات الأسعار أو الاستفسارات حول المنتجات والخدمات.",
    },
    create: {
      locale: "ar",
      tagline: "حلول الضيافة وصيانة المباني التي يمكنك الوثوق بها",
      heroEyebrow: "تغليف الضيافة والصيانة",
      heroHeadline: "حلول متكاملة للضيافة وصيانة المباني",
      heroSubheadline:
        "متخصصون في تغليف الضيافة الصديق للبيئة وتوريد المنشآت في قطر، مع خدمات صيانة موثوقة.",
      heroCtaLabel: "اطلب عرض سعر",
      heroCtaHref: "#contact",
      aboutTitle: "عن ريفو قطر",
      aboutDescription:
        "ريفو قطر شريك موثوق للفنادق والمنشآت في قطر، نوفر تغليفاً صديقاً للبيئة ومستلزمات المنشآت وخدمات صيانة المباني.",
      productsSectionTitle: "منتجات تغليف الضيافة",
      servicesSectionTitle: "الخدمات",
      contactTitle: "تواصل معنا",
      contactDescription: "تواصل معنا لطلبات الأسعار أو الاستفسارات حول المنتجات والخدمات.",
    },
  });

  await prisma.navItemTranslation.deleteMany();
  await prisma.navItem.deleteMany();
  await prisma.productTranslation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.serviceTranslation.deleteMany();
  await prisma.service.deleteMany();

  const navData = [
    { href: "#home", orderIndex: 1, labels: { en: "Home", ar: "الرئيسية" } },
    { href: "#products", orderIndex: 2, labels: { en: "Products", ar: "المنتجات" } },
    { href: "#services", orderIndex: 3, labels: { en: "Services", ar: "الخدمات" } },
    { href: "#about", orderIndex: 4, labels: { en: "About", ar: "من نحن" } },
    { href: "#contact", orderIndex: 5, labels: { en: "Contact", ar: "اتصل بنا" } },
  ];

  for (const item of navData) {
    const nav = await prisma.navItem.create({
      data: {
        href: item.href,
        orderIndex: item.orderIndex,
        isActive: true,
      },
    });

    await prisma.navItemTranslation.createMany({
      data: [
        { navItemId: nav.id, locale: "en", label: item.labels.en },
        { navItemId: nav.id, locale: "ar", label: item.labels.ar },
      ],
    });
  }

  const productData = [
    { icon: "Leaf", title: "ECO Range Products", description: "Sustainable packaging designed to lower environmental impact without compromising performance." },
    { icon: "Wheat", title: "Bagasse Products", description: "Plant-fiber food packaging from sugarcane residue — sturdy, compostable, and food-safe." },
    { icon: "Package", title: "Paper & Kraft Products", description: "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft." },
    { icon: "TreePine", title: "Wooden Products", description: "Natural wooden cutlery and serving items for cafés, catering, and hospitality brands." },
    { icon: "Box", title: "Styro Foam Products", description: "Insulated foam packaging for hot and cold food service where temperature retention matters." },
    { icon: "Layers", title: "Aluminium Products", description: "Foil containers and trays built for catering, bakeries, and high-volume kitchens." },
    { icon: "Droplets", title: "Hygiene Products", description: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations." },
    { icon: "Sparkles", title: "Cleaning Products", description: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean." },
    { icon: "ShoppingBag", title: "Plastic Bags & Films", description: "Zipper bags, films, and flexible packaging for storage, retail, and food prep." },
    { icon: "CupSoda", title: "Plastic Products", description: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls." },
  ];

  for (const [index, item] of productData.entries()) {
    const product = await prisma.product.create({
      data: {
        icon: item.icon,
        orderIndex: index + 1,
        isActive: true,
      },
    });

    await prisma.productTranslation.createMany({
      data: [
        { productId: product.id, locale: "en", title: item.title, description: item.description },
        { productId: product.id, locale: "ar", title: item.title, description: item.description },
      ],
    });
  }

  const serviceData = [
    { icon: "Building2", title: "Building Maintenance", description: "Comprehensive upkeep to keep your facilities running smoothly." },
    { icon: "AirVent", title: "HVAC", description: "Heating, ventilation, and air conditioning installation and service." },
    { icon: "Settings2", title: "Installation", description: "Professional installation services for equipment and systems." },
  ];

  for (const [index, item] of serviceData.entries()) {
    const service = await prisma.service.create({
      data: {
        icon: item.icon,
        orderIndex: index + 1,
        isActive: true,
      },
    });

    await prisma.serviceTranslation.createMany({
      data: [
        { serviceId: service.id, locale: "en", title: item.title, description: item.description },
        { serviceId: service.id, locale: "ar", title: item.title, description: item.description },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
