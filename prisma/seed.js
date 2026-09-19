const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const companySettings = {
  companyName: "Revo Trading",
  address: "Industrial Area, Doha, Qatar",
  phone: "+974 7071 8232",
  email: "info@revo.qa",
  whatsapp: "97470718232",
  heroImageUrl:
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1920&q=80",
  aboutImageUrl:
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80",
  contactBannerUrl:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  contactSideImageUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
};

const translations = {
  en: {
    tagline: "Your Trusted Packaging Partner in Qatar",
    heroEyebrow: "Eco-Friendly Packaging",
    heroHeadline: "Sustainable Solutions for a Greener Tomorrow",
    heroSubheadline:
      "Revo Trading supplies eco-friendly and cost-effective packaging for hotels, restaurants, retail, and facilities across Qatar — biodegradable, Kraft, bagasse, aluminium, hygiene, and specialty ranges backed by reliable delivery.",
    heroCtaLabel: "Contact Us",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "Browse Products",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "Stacks of kraft packaging boxes ready for hospitality supply",
    trustBadge1: "Eco Range",
    trustBadge2: "Bulk Supply",
    trustBadge3: "Qatar Delivery",
    aboutTitle: "About Revo Trading",
    aboutDescription:
      "Revo Trading is a trusted packaging partner for businesses across Qatar. We provide an extensive range of high-quality eco-friendly products — including biodegradable, Kraft, bagasse, PLA-style plant-based options, aluminium, hygiene, cleaning, and specialty plastic ranges — designed for daily commercial use while supporting a healthier planet.",
    aboutExtra:
      "Founded with deep packaging and hospitality supply experience, we help hotels, F&B operators, retailers, and facilities reduce their carbon footprint with practical, accessible sustainable packaging. From food containers and shopping bags to customizable solutions, our team guides you to the right range for your operations.",
    aboutImageAlt: "Organized warehouse shelves with packaged goods ready for supply",
    visionTitle: "Our Vision",
    visionText:
      "To lead packaging supply in Qatar toward a more sustainable future by providing innovative, renewable, and eco-conscious packaging solutions that businesses can rely on every day.",
    missionTitle: "Our Mission",
    missionText:
      "To improve environmental outcomes by offering accessible, durable, and sustainable packaging that meets unique business needs while promoting responsible operations across hospitality, retail, and facilities.",
    productsSectionTitle: "Our Packaging Products",
    productsSectionDescription:
      "A complete catalogue for food service and commercial packaging — from compostable eco ranges to kraft, aluminium, hygiene, cleaning, and specialty plastics.",
    servicesSectionTitle: "Sustainable Focus",
    servicesSectionDescription:
      "Three pillars that define how we source and supply packaging for a greener operation.",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDescription: "Everything you need to know about ordering packaging with Revo Trading.",
    contactTitle: "Have questions or need assistance?",
    contactDescription:
      "Our team will help you find the right packaging solutions for your business — quotes, bulk supply, and product guidance.",
  },
  ar: {
    tagline: "شريكك الموثوق للتغليف في قطر",
    heroEyebrow: "تغليف صديق للبيئة",
    heroHeadline: "حلول مستدامة لغد أكثر خضرة",
    heroSubheadline:
      "توفر ريفو للتجارة تغليفاً صديقاً للبيئة وفعّال التكلفة للفنادق والمطاعم والتجزئة والمنشآت في قطر — بما في ذلك المنتجات القابلة للتحلل والكرتون والباجاس والألمنيوم ومستلزمات النظافة، مع توريد موثوق.",
    heroCtaLabel: "تواصل معنا",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "تصفح المنتجات",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "صناديق تغليف كرتونية جاهزة للتوريد لقطاع الضيافة",
    trustBadge1: "نطاق بيئي",
    trustBadge2: "توريد بالجملة",
    trustBadge3: "توصيل داخل قطر",
    aboutTitle: "عن ريفو للتجارة",
    aboutDescription:
      "ريفو للتجارة شريك موثوق في التغليف للشركات في قطر. نوفر مجموعة واسعة من المنتجات عالية الجودة الصديقة للبيئة — بما في ذلك القابلة للتحلل والكرتون والباجاس وخيارات نباتية شبيهة بـ PLA والألمنيوم والنظافة والتنظيف والبلاستيك المتخصص — للاستخدام التجاري اليومي مع دعم بيئة أكثر صحة.",
    aboutExtra:
      "بخبرة في توريد التغليف والضيافة، نساعد الفنادق وقطاع الأغذية والتجزئة والمنشآت على تقليل البصمة الكربونية عبر حلول تغليف عملية ومستدامة. من حاويات الطعام وأكياس التسوق إلى الحلول المخصصة، يرشدك فريقنا إلى النطاق المناسب لعملياتك.",
    aboutImageAlt: "رفوف مستودع منظمة تحتوي على بضائع معبأة جاهزة للتوريد",
    visionTitle: "رؤيتنا",
    visionText:
      "قيادة توريد التغليف في قطر نحو مستقبل أكثر استدامة عبر حلول مبتكرة ومتجددة وواعية بيئياً يمكن للشركات الاعتماد عليها يومياً.",
    missionTitle: "رسالتنا",
    missionText:
      "تحسين الأثر البيئي عبر تقديم تغليف متاح ومتين ومستدام يلبي احتياجات الأعمال ويعزز ممارسات مسؤولة في الضيافة والتجزئة والمنشآت.",
    productsSectionTitle: "منتجات التغليف",
    productsSectionDescription:
      "كتالوج متكامل لتغليف الخدمات الغذائية والاستخدام التجاري — من النطاق البيئي القابل للتحلل إلى الكرتون والألمنيوم والنظافة والتنظيف والبلاستيك المتخصص.",
    servicesSectionTitle: "التركيز المستدام",
    servicesSectionDescription: "ثلاث ركائز تحدد كيفية توريدنا للتغليف لعمليات أكثر خضرة.",
    faqSectionTitle: "الأسئلة الشائعة",
    faqSectionDescription: "كل ما تحتاج معرفته عن طلب التغليف من ريفو للتجارة.",
    contactTitle: "هل لديك أسئلة أو تحتاج مساعدة؟",
    contactDescription:
      "فريقنا جاهز لمساعدتك في إيجاد حلول التغليف المناسبة — عروض أسعار، توريد بالجملة، وإرشاد للمنتجات.",
  },
};

const navData = [
  { href: "#home", orderIndex: 1, labels: { en: "Home", ar: "الرئيسية" } },
  { href: "#products", orderIndex: 2, labels: { en: "Products", ar: "المنتجات" } },
  { href: "#solutions", orderIndex: 3, labels: { en: "Solutions", ar: "الحلول" } },
  { href: "#about", orderIndex: 4, labels: { en: "About", ar: "من نحن" } },
  { href: "#faq", orderIndex: 5, labels: { en: "FAQ", ar: "الأسئلة" } },
  { href: "#contact", orderIndex: 6, labels: { en: "Contact", ar: "اتصل بنا" } },
];

const productData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "ECO Range Products",
      description:
        "Sustainable packaging designed to lower environmental impact without compromising strength or presentation.",
      details:
        "Ideal for hotels and F&B brands that want greener takeaway and on-premise packaging. Includes compostable and recyclable formats suited to daily high-volume use.",
    },
    ar: {
      title: "منتجات النطاق البيئي",
      description: "تغليف مستدام يقلل الأثر البيئي دون المساس بالمتانة أو المظهر.",
      details:
        "مناسب للفنادق وعلامات الأغذية التي تريد تغليفاً أكثر خضرة للاستخدام اليومي وبكميات كبيرة، بما في ذلك الصيغ القابلة للتحلل وإعادة التدوير.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Bagasse Products",
      description:
        "Plant-fiber food packaging made from sugarcane residue — sturdy, compostable, and food-safe.",
      details:
        "Excellent for hot meals, clamshells, plates, and bowls. A strong alternative to conventional foam for restaurants and catering kitchens.",
    },
    ar: {
      title: "منتجات الباجاس",
      description:
        "تغليف غذائي من ألياف نباتية مشتقة من مخلفات قصب السكر — متين وقابل للتحلل وآمن غذائياً.",
      details:
        "ممتاز للوجبات الساخنة والحاويات والأطباق والأوعية، وبديل قوي للرغوي التقليدي في المطاعم ومطابخ التموين.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Paper & Kraft Products",
      description:
        "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft.",
      details:
        "Covers pizza boxes, hot cups and carrying trays, paper bags and pouches, wraps and baking sheets, trays, and related kraft formats for cafés and QSR brands.",
    },
    ar: {
      title: "منتجات الورق والكرتون",
      description: "حاويات وصناديق وأكواب وأكياس ولفائف وصواني ومناديل من الكرتون القابل لإعادة التدوير.",
      details:
        "يشمل علب البيتزا وأكواب ساخنة وصواني حمل وأكياس ورقية ولفائف خبز وصواني ومستلزمات كرتونية للمقاهي والمطاعم السريعة.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c28d0fc?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Wooden Products",
      description: "Natural wooden cutlery and serving items for cafés, catering, and hospitality brands.",
      details:
        "Spoons, forks, knives, and serving accessories that pair well with eco food packaging and premium takeaway presentation.",
    },
    ar: {
      title: "منتجات خشبية",
      description: "أدوات مائدة وتقديم خشبية طبيعية للمقاهي والتموين والضيافة.",
      details:
        "ملاعق وشوك وسكاكين ومستلزمات تقديم تتناسب مع التغليف الغذائي البيئي والعروض الفاخرة للطلبات الخارجية.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Styro Foam Products",
      description:
        "Insulated foam packaging for hot and cold food service where temperature retention matters.",
      details:
        "Used widely for delivery and bulk catering when insulation and cost efficiency are priorities for high-volume kitchens.",
    },
    ar: {
      title: "منتجات الستايروفوم",
      description: "تغليف رغوي عازل للخدمات الغذائية الساخنة والباردة حيث تهم المحافظة على الحرارة.",
      details:
        "يُستخدم على نطاق واسع للتوصيل والتموين بالجملة عندما تكون العزل والكفاءة من الأولويات للمطابخ عالية الحجم.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Aluminium Products",
      description: "Foil containers and trays built for catering, bakeries, and high-volume kitchens.",
      details:
        "Heat-tolerant trays and containers for cooking, transport, and display — dependable for hotels, bakeries, and event catering.",
    },
    ar: {
      title: "منتجات الألمنيوم",
      description: "حاويات وصواني ألمنيوم للمطابخ والتموين والمخابز.",
      details:
        "صواني وحاويات تتحمل الحرارة للطهي والنقل والعرض — موثوقة للفنادق والمخابز وتموين الفعاليات.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Hygiene Products",
      description: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations.",
      details:
        "Paper napkins, maxi rolls, wet tissues, chef and forage hats, and related hygiene items that keep front-of-house and kitchen teams compliant and presentable.",
    },
    ar: {
      title: "منتجات النظافة",
      description: "مناديل ومناديل ورقية وقبعات ومستلزمات نظافة لقطاع الأغذية والمنشآت.",
      details:
        "مناديل ورقية ورولات ماكسي ومناديل مبللة وقبعات طهاة ومستلزمات نظافة تبقي فرق العمل جاهزة ومتوافقة مع معايير الضيافة.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Cleaning Products",
      description: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean.",
      details:
        "Includes dispenser systems for rolls, napkins, hand wash, and related accessories used in hospitality washrooms and prep areas.",
    },
    ar: {
      title: "منتجات التنظيف",
      description: "موزعات ومستلزمات تنظيف للمطاعم والمطابخ ومناطق الاستقبال.",
      details:
        "يشمل أنظمة موزعات للرولات والمناديل وغسول اليدين ومستلزمات مرتبطة بمرافق الضيافة ومناطق التحضير.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Plastic Bags & Films",
      description: "Zipper bags, films, and flexible packaging for storage, retail, and food prep.",
      details:
        "Practical formats for portioning, storage, and retail packaging — available in multiple sizes for kitchens and back-of-house teams.",
    },
    ar: {
      title: "أكياس وأفلام بلاستيكية",
      description: "أكياس سحّاب وأفلام وتغليف مرن للتخزين والتجزئة وتحضير الطعام.",
      details:
        "صيغ عملية للتقسيم والتخزين وتغليف التجزئة — بأحجام متعددة للمطابخ وفرق العمليات.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    en: {
      title: "Plastic Products",
      description: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls.",
      details:
        "Clear PET cups with dome and heart lids, heavy-duty cutlery, black microwavable containers, sushi trays, salad bowls, and multi-compartment meal trays.",
    },
    ar: {
      title: "منتجات بلاستيكية",
      description: "أكواب وأغطية وأدوات مائدة وحاويات قابلة للميكروويف وصواني سوشي وأوعية سلطة.",
      details:
        "أكواب PET شفافة مع أغطية قبة وقلب، أدوات مائدة متينة، حاويات ميكروويف سوداء، صواني سوشي، أوعية سلطة، وصواني وجبات متعددة الأقسام.",
    },
  },
];

const serviceData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Biodegradable Packaging",
      description:
        "Designed to naturally decompose, reducing waste and supporting sustainability goals.",
      details:
        "Choose ranges that break down more responsibly after use — suited to brands communicating eco commitments to guests and customers.",
    },
    ar: {
      title: "تغليف قابل للتحلل",
      description: "مصمم للتحلل الطبيعي وتقليل النفايات ودعم أهداف الاستدامة.",
      details:
        "اختر نطاقاً يتحلل بمسؤولية أكبر بعد الاستخدام — مناسب للعلامات التي تُظهر التزامها البيئي للضيوف والعملاء.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Kraft Products",
      description:
        "Durable, versatile, recyclable options that balance quality with eco-consciousness.",
      details:
        "Kraft boxes, bags, wraps, and cups that present well on counters and delivery runs while remaining practical for high throughput.",
    },
    ar: {
      title: "منتجات الكرتون",
      description: "خيارات متينة ومرنة وقابلة لإعادة التدوير توازن بين الجودة والوعي البيئي.",
      details:
        "علب وأكياس ولفائف وأكواب كرتونية بمظهر احترافي للاستخدام اليومي والتوصيل مع إنتاجية عالية.",
    },
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "PLA Solutions",
      description: "Plant-based packaging from renewable resources like cornstarch and sugarcane.",
      details:
        "PLA-style options for forward-looking F&B operators seeking renewable materials without sacrificing clarity and performance.",
    },
    ar: {
      title: "حلول PLA",
      description: "تغليف نباتي من موارد متجددة مثل نشا الذرة وقصب السكر.",
      details:
        "خيارات شبيهة بـ PLA لمشغلي الأغذية الباحثين عن مواد متجددة دون التضحية بالوضوح والأداء.",
    },
  },
];

const faqData = [
  {
    en: {
      question: "What types of eco-friendly packaging products do you offer?",
      answer:
        "We provide an extensive range of eco-friendly packaging, including biodegradable items that naturally decompose, durable Kraft products from recyclable paper, bagasse plant-fiber formats, and PLA-style solutions from renewable resources like cornstarch and sugarcane. Offerings also include food containers, shopping bags, aluminium trays, hygiene supplies, cleaning accessories, and specialty plastic cups, lids, and meal containers tailored for hospitality and F&B.",
    },
    ar: {
      question: "ما أنواع منتجات التغليف الصديقة للبيئة التي تقدمونها؟",
      answer:
        "نوفر مجموعة واسعة من التغليف الصديق للبيئة، بما في ذلك المنتجات القابلة للتحلل، ومنتجات الكرتون القابلة لإعادة التدوير، وصيغ الباجاس النباتية، وحلول شبيهة بـ PLA من موارد متجددة مثل نشا الذرة وقصب السكر. كما تشمل عروضنا حاويات الطعام وأكياس التسوق وصواني الألمنيوم ومستلزمات النظافة والتنظيف وأكواب وأغطية وحاويات بلاستيكية متخصصة للضيافة وقطاع الأغذية.",
    },
  },
  {
    en: {
      question: "What makes Revo Trading's packaging environmentally friendly?",
      answer:
        "Many of our ranges use renewable and biodegradable materials, helping reduce environmental impact. We focus on practical sustainable options that still meet commercial durability, food-safety, and presentation needs.",
    },
    ar: {
      question: "ما الذي يجعل تغليف ريفو للتجارة صديقاً للبيئة؟",
      answer:
        "كثير من نطاقاتنا يعتمد على مواد متجددة وقابلة للتحلل لتقليل الأثر البيئي، مع الحفاظ على المتانة وسلامة الغذاء والمظهر المطلوب للاستخدام التجاري.",
    },
  },
  {
    en: {
      question: "Do you offer customized packaging solutions?",
      answer:
        "Yes. We collaborate with clients to source and supply packaging that aligns with brand presentation, portion sizes, and operational requirements. Contact Revo Trading at +974 7071 8232 or info@revo.qa to discuss your needs.",
    },
    ar: {
      question: "هل تقدمون حلول تغليف مخصصة؟",
      answer:
        "نعم. نتعاون مع العملاء لتوريد تغليف يتوافق مع هوية العلامة وأحجام الحصص ومتطلبات التشغيل. تواصل مع ريفو للتجارة على +974 7071 8232 أو info@revo.qa لمناقشة احتياجاتك.",
    },
  },
  {
    en: {
      question: "What industries do you cater to?",
      answer:
        "We serve hotels, resorts, restaurants, cafés, catering, retail, healthcare-related facilities, and other commercial operations that need reliable packaging supply across Qatar.",
    },
    ar: {
      question: "ما القطاعات التي تخدمونها؟",
      answer:
        "نخدم الفنادق والمنتجعات والمطاعم والمقاهي والتموين والتجزئة والمنشآت الصحية وغيرها من العمليات التجارية التي تحتاج توريد تغليف موثوق داخل قطر.",
    },
  },
  {
    en: {
      question: "Where do you deliver your products?",
      answer:
        "We deliver across Qatar, with responsive support for hospitality and facility clients from our base in the Industrial Area, Doha. Call +974 7071 8232 for delivery timelines.",
    },
    ar: {
      question: "أين يتم التوصيل؟",
      answer:
        "نوصل داخل قطر، مع دعم سريع لعملاء الضيافة والمنشآت من مقرنا في المنطقة الصناعية بالدوحة. اتصل على +974 7071 8232 لمواعيد التوصيل.",
    },
  },
  {
    en: {
      question: "How can I place an order with Revo Trading?",
      answer:
        "Contact us by phone at +974 7071 8232, WhatsApp 97470718232, or email info@revo.qa. Our team will guide you through product selection, quantities, and delivery.",
    },
    ar: {
      question: "كيف أطلب من ريفو للتجارة؟",
      answer:
        "تواصل معنا عبر الهاتف على +974 7071 8232 أو واتساب 97470718232 أو البريد info@revo.qa. سيرشدك فريقنا في اختيار المنتجات والكميات والتوصيل.",
    },
  },
  {
    en: {
      question: "Are your products compliant with quality standards?",
      answer:
        "Yes. We prioritize products that meet strict expectations for quality, durability, and environmental responsibility suitable for commercial food service and facilities. Reach out at info@revo.qa for product specifications.",
    },
    ar: {
      question: "هل منتجاتكم متوافقة مع معايير الجودة؟",
      answer:
        "نعم. نركز على منتجات تلبي توقعات صارمة للجودة والمتانة والمسؤولية البيئية ومناسبة للخدمات الغذائية والمنشآت التجارية. راسلنا على info@revo.qa لمواصفات المنتجات.",
    },
  },
];

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: companySettings,
    create: { id: 1, ...companySettings },
  });

  for (const [locale, payload] of Object.entries(translations)) {
    await prisma.siteTranslation.upsert({
      where: { locale },
      update: payload,
      create: { locale, ...payload },
    });
  }

  await prisma.navItemTranslation.deleteMany();
  await prisma.navItem.deleteMany();
  await prisma.productTranslation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.serviceTranslation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.faqTranslation.deleteMany();
  await prisma.faqItem.deleteMany();

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

  for (const [index, item] of productData.entries()) {
    const product = await prisma.product.create({
      data: {
        imageUrl: item.imageUrl,
        orderIndex: index + 1,
        isActive: true,
      },
    });

    await prisma.productTranslation.createMany({
      data: [
        {
          productId: product.id,
          locale: "en",
          title: item.en.title,
          description: item.en.description,
          details: item.en.details,
        },
        {
          productId: product.id,
          locale: "ar",
          title: item.ar.title,
          description: item.ar.description,
          details: item.ar.details,
        },
      ],
    });
  }

  for (const [index, item] of serviceData.entries()) {
    const service = await prisma.service.create({
      data: {
        imageUrl: item.imageUrl,
        orderIndex: index + 1,
        isActive: true,
      },
    });

    await prisma.serviceTranslation.createMany({
      data: [
        {
          serviceId: service.id,
          locale: "en",
          title: item.en.title,
          description: item.en.description,
          details: item.en.details,
        },
        {
          serviceId: service.id,
          locale: "ar",
          title: item.ar.title,
          description: item.ar.description,
          details: item.ar.details,
        },
      ],
    });
  }

  for (const [index, item] of faqData.entries()) {
    const faq = await prisma.faqItem.create({
      data: {
        orderIndex: index + 1,
        isActive: true,
      },
    });

    await prisma.faqTranslation.createMany({
      data: [
        {
          faqItemId: faq.id,
          locale: "en",
          question: item.en.question,
          answer: item.en.answer,
        },
        {
          faqItemId: faq.id,
          locale: "ar",
          question: item.ar.question,
          answer: item.ar.answer,
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
