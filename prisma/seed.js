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
    { icon: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80", title: "ECO Range Products", description: "Sustainable packaging designed to lower environmental impact without compromising performance." },
    { icon: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80", title: "Bagasse Products", description: "Plant-fiber food packaging from sugarcane residue — sturdy, compostable, and food-safe." },
    { icon: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80", title: "Paper & Kraft Products", description: "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft." },
    { icon: "https://images.unsplash.com/photo-1556911220-bff31c28d0fc?auto=format&fit=crop&w=900&q=80", title: "Wooden Products", description: "Natural wooden cutlery and serving items for cafés, catering, and hospitality brands." },
    { icon: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80", title: "Styro Foam Products", description: "Insulated foam packaging for hot and cold food service where temperature retention matters." },
    { icon: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80", title: "Aluminium Products", description: "Foil containers and trays built for catering, bakeries, and high-volume kitchens." },
    { icon: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80", title: "Hygiene Products", description: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations." },
    { icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80", title: "Cleaning Products", description: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean." },
    { icon: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=900&q=80", title: "Plastic Bags & Films", description: "Zipper bags, films, and flexible packaging for storage, retail, and food prep." },
    { icon: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80", title: "Plastic Products", description: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls." },
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
    { icon: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80", title: "Building Maintenance", description: "Comprehensive upkeep to keep your facilities running smoothly." },
    { icon: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80", title: "HVAC", description: "Heating, ventilation, and air conditioning installation and service." },
    { icon: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80", title: "Installation", description: "Professional installation services for equipment and systems." },
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
