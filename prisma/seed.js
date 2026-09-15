const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      companyName: "Realpack",
      address: "Ras Al Khor 2, Dubai, UAE",
      phone: "+971 52 790 6070",
      email: "info@realpackpackaging.com",
      whatsapp: "971527906070",
    },
    create: {
      id: 1,
      companyName: "Realpack",
      address: "Ras Al Khor 2, Dubai, UAE",
      phone: "+971 52 790 6070",
      email: "info@realpackpackaging.com",
      whatsapp: "971527906070",
    },
  });

  await prisma.siteTranslation.upsert({
    where: { locale: "en" },
    update: {
      tagline: "Your Real Packaging Partner",
      heroEyebrow: "Eco-Friendly Packaging",
      heroHeadline: "Sustainable Solutions for a Greener Tomorrow",
      heroSubheadline:
        "Trusted packaging partner for food, retail, and hospitality across the UAE, Qatar, and Bahrain.",
      heroCtaLabel: "Contact Us",
      heroCtaHref: "#contact",
      aboutTitle: "About Realpack",
      aboutDescription:
        "Realpack, based in Dubai, UAE, is a leading provider of eco-friendly and cost-effective packaging solutions in the region. Our range includes biodegradable, Kraft, and PLA options designed for business needs while supporting a healthier planet.",
      productsSectionTitle: "Our Products",
      servicesSectionTitle: "Sustainable Focus",
      contactTitle: "Have questions or need assistance?",
      contactDescription:
        "Our expert team is here to help you find the right packaging solutions for your business.",
    },
    create: {
      locale: "en",
      tagline: "Your Real Packaging Partner",
      heroEyebrow: "Eco-Friendly Packaging",
      heroHeadline: "Sustainable Solutions for a Greener Tomorrow",
      heroSubheadline:
        "Trusted packaging partner for food, retail, and hospitality across the UAE, Qatar, and Bahrain.",
      heroCtaLabel: "Contact Us",
      heroCtaHref: "#contact",
      aboutTitle: "About Realpack",
      aboutDescription:
        "Realpack, based in Dubai, UAE, is a leading provider of eco-friendly and cost-effective packaging solutions in the region. Our range includes biodegradable, Kraft, and PLA options designed for business needs while supporting a healthier planet.",
      productsSectionTitle: "Our Products",
      servicesSectionTitle: "Sustainable Focus",
      contactTitle: "Have questions or need assistance?",
      contactDescription:
        "Our expert team is here to help you find the right packaging solutions for your business.",
    },
  });

  await prisma.siteTranslation.upsert({
    where: { locale: "ar" },
    update: {
      tagline: "شريكك الحقيقي في التغليف",
      heroEyebrow: "تغليف صديق للبيئة",
      heroHeadline: "حلول مستدامة لغد أكثر خضرة",
      heroSubheadline:
        "شريك موثوق للتغليف لقطاعات الأغذية والتجزئة والضيافة في الإمارات وقطر والبحرين.",
      heroCtaLabel: "تواصل معنا",
      heroCtaHref: "#contact",
      aboutTitle: "عن ريالبك",
      aboutDescription:
        "ريالبك، ومقرها دبي، الإمارات، مزود رائد لحلول التغليف الصديقة للبيئة وفعّالة التكلفة في المنطقة، بما في ذلك المنتجات القابلة للتحلل والكرتون وPLA.",
      productsSectionTitle: "منتجاتنا",
      servicesSectionTitle: "التركيز المستدام",
      contactTitle: "هل لديك أسئلة أو تحتاج مساعدة؟",
      contactDescription: "فريقنا جاهز لمساعدتك في إيجاد حلول التغليف المناسبة لعملك.",
    },
    create: {
      locale: "ar",
      tagline: "شريكك الحقيقي في التغليف",
      heroEyebrow: "تغليف صديق للبيئة",
      heroHeadline: "حلول مستدامة لغد أكثر خضرة",
      heroSubheadline:
        "شريك موثوق للتغليف لقطاعات الأغذية والتجزئة والضيافة في الإمارات وقطر والبحرين.",
      heroCtaLabel: "تواصل معنا",
      heroCtaHref: "#contact",
      aboutTitle: "عن ريالبك",
      aboutDescription:
        "ريالبك، ومقرها دبي، الإمارات، مزود رائد لحلول التغليف الصديقة للبيئة وفعّالة التكلفة في المنطقة، بما في ذلك المنتجات القابلة للتحلل والكرتون وPLA.",
      productsSectionTitle: "منتجاتنا",
      servicesSectionTitle: "التركيز المستدام",
      contactTitle: "هل لديك أسئلة أو تحتاج مساعدة؟",
      contactDescription: "فريقنا جاهز لمساعدتك في إيجاد حلول التغليف المناسبة لعملك.",
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
    { href: "#about", orderIndex: 3, labels: { en: "About", ar: "من نحن" } },
    { href: "#locations", orderIndex: 4, labels: { en: "Locations", ar: "مواقعنا" } },
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
    {
      icon: "Leaf",
      title: { en: "ECO Range Products", ar: "منتجات النطاق البيئي" },
      description: {
        en: "Sustainable packaging designed to lower environmental impact without compromising performance.",
        ar: "تغليف مستدام يقلل الأثر البيئي دون المساس بالأداء.",
      },
    },
    {
      icon: "Wheat",
      title: { en: "Bagasse Products", ar: "منتجات الباجاس" },
      description: {
        en: "Plant-fiber food packaging from sugarcane residue — sturdy, compostable, and food-safe.",
        ar: "تغليف غذائي من ألياف نباتية مشتقة من مخلفات قصب السكر.",
      },
    },
    {
      icon: "Package",
      title: { en: "Paper & Kraft Products", ar: "منتجات الورق والكرتون" },
      description: {
        en: "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft.",
        ar: "حاويات وأكواب وأكياس ولفائف وصواني ومناديل من الكرتون القابل لإعادة التدوير.",
      },
    },
    {
      icon: "TreePine",
      title: { en: "Wooden Products", ar: "منتجات خشبية" },
      description: {
        en: "Natural wooden cutlery and serving items for cafés, catering, and takeaway brands.",
        ar: "أدوات مائدة وتقديم خشبية طبيعية للمقاهي والتموين.",
      },
    },
    {
      icon: "Box",
      title: { en: "Styro Foam Products", ar: "منتجات الستايروفوم" },
      description: {
        en: "Insulated foam packaging for hot and cold food service where temperature retention matters.",
        ar: "تغليف رغوي عازل للخدمات الغذائية الساخنة والباردة.",
      },
    },
    {
      icon: "Layers",
      title: { en: "Aluminium Products", ar: "منتجات الألمنيوم" },
      description: {
        en: "Foil containers and trays built for catering, bakeries, and high-volume kitchens.",
        ar: "حاويات وصواني ألمنيوم للمطابخ والتموين والمخابز.",
      },
    },
    {
      icon: "Droplets",
      title: { en: "Hygiene Products", ar: "منتجات النظافة" },
      description: {
        en: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations.",
        ar: "مناديل ومناديل ورقية وقبعات ومستلزمات نظافة لقطاع الأغذية.",
      },
    },
    {
      icon: "Sparkles",
      title: { en: "Cleaning Products", ar: "منتجات التنظيف" },
      description: {
        en: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean.",
        ar: "موزعات ومستلزمات تنظيف للمطاعم والمطابخ.",
      },
    },
    {
      icon: "ShoppingBag",
      title: { en: "Plastic Bags & Films", ar: "أكياس وأفلام بلاستيكية" },
      description: {
        en: "Zipper bags, films, and flexible packaging for storage, retail, and food prep.",
        ar: "أكياس سحّاب وأفلام وتغليف مرن للتخزين والتجزئة.",
      },
    },
    {
      icon: "CupSoda",
      title: { en: "Plastic Products", ar: "منتجات بلاستيكية" },
      description: {
        en: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls.",
        ar: "أكواب وأغطية وأدوات مائدة وحاويات قابلة للميكروويف.",
      },
    },
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
        {
          productId: product.id,
          locale: "en",
          title: item.title.en,
          description: item.description.en,
        },
        {
          productId: product.id,
          locale: "ar",
          title: item.title.ar,
          description: item.description.ar,
        },
      ],
    });
  }

  const serviceData = [
    {
      icon: "Recycle",
      title: { en: "Biodegradable Packaging", ar: "تغليف قابل للتحلل" },
      description: {
        en: "Designed to naturally decompose, reducing waste and supporting sustainability goals.",
        ar: "مصمم للتحلل الطبيعي وتقليل النفايات ودعم الاستدامة.",
      },
    },
    {
      icon: "PackageOpen",
      title: { en: "Kraft Products", ar: "منتجات الكرتون" },
      description: {
        en: "Durable, versatile, recyclable options that balance quality with eco-consciousness.",
        ar: "خيارات متينة وقابلة لإعادة التدوير توازن بين الجودة والوعي البيئي.",
      },
    },
    {
      icon: "Sprout",
      title: { en: "PLA Solutions", ar: "حلول PLA" },
      description: {
        en: "Plant-based packaging from renewable resources like cornstarch and sugarcane.",
        ar: "تغليف نباتي من موارد متجددة مثل نشا الذرة وقصب السكر.",
      },
    },
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
        {
          serviceId: service.id,
          locale: "en",
          title: item.title.en,
          description: item.description.en,
        },
        {
          serviceId: service.id,
          locale: "ar",
          title: item.title.ar,
          description: item.description.ar,
        },
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
