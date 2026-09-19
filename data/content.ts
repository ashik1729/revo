/** Packaging catalogue CDN image helpers */
const RP = "https://realpackpackaging.com/wp-content/uploads";

export type LocaleCode = "en" | "ar";

export const companyInfo = {
  name: "Revo Trading",
  tagline: "Your Trusted Packaging Partner in Qatar",
  address: "Industrial Area, Doha, Qatar",
  phone: "+974 30423043",
  phoneHref: "tel:+97430423043",
  email: "info@revo.qa",
  emailHref: "mailto:info@revo.qa",
  whatsapp: "97430423043",
  whatsappHref: "https://wa.me/97430423043",
  heroImageUrl: `${RP}/2025/01/Slide-1-1.webp`,
  aboutImageUrl: "/about-revo.jpg",
  contactBannerUrl: "/contact-banner.jpg",
  contactSideImageUrl: `${RP}/2025/01/Homepage-Banner-5.jpg`,
} as const;

export const heroSlidesByLocale: Record<
  LocaleCode,
  ReadonlyArray<{
    imageUrl: string;
    imageAlt: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
  }>
> = {
  en: [
    {
      imageUrl: `${RP}/2025/01/Slide-1-1.webp`,
      imageAlt: "Eco-friendly packaging collection",
      eyebrow: "Eco-Friendly Packaging",
      headline: "Sustainable Solutions for a Greener Tomorrow",
      subheadline:
        "Compostable cups, lids, and foodservice packs for hotels and F&B across Qatar.",
    },
    {
      imageUrl: `${RP}/2025/01/Slide-2-1.webp`,
      imageAlt: "Premium packaging supply",
      eyebrow: "Paper & Kraft Range",
      headline: "Boxes, Bags & Everyday Kraft Essentials",
      subheadline:
        "Pizza boxes, paper bags, wraps, and trays built for busy commercial kitchens.",
    },
    {
      imageUrl: `${RP}/2025/01/Slide-3-1.webp`,
      imageAlt: "Innovative packaging formats",
      eyebrow: "Innovation in Packaging",
      headline: "Pioneering Sustainability in Qatar",
      subheadline:
        "Biodegradable, kraft, and PLA-style options designed for everyday commercial use.",
    },
    {
      imageUrl: `${RP}/2025/01/Homepage-Banner-4b.webp`,
      imageAlt: "Bagasse and plant-fiber packaging",
      eyebrow: "Bagasse Collection",
      headline: "Plant-Fiber Plates, Bowls & Meal Trays",
      subheadline:
        "Heat-resistant bagasse ware with matching lids for takeaway and catering.",
    },
    {
      imageUrl: `${RP}/2025/01/Homepage-Banner-5.jpg`,
      imageAlt: "Complete packaging catalogue",
      eyebrow: "Full Catalogue Supply",
      headline: "From Aluminium to Hygiene — One Partner",
      subheadline:
        "Aluminium, plastics, cleaning, and hygiene lines delivered reliably in Doha.",
    },
  ],
  ar: [
    {
      imageUrl: `${RP}/2025/01/Slide-1-1.webp`,
      imageAlt: "مجموعة تغليف صديق للبيئة",
      eyebrow: "تغليف صديق للبيئة",
      headline: "حلول مستدامة لغد أكثر خضرة",
      subheadline: "أكواب وأغطية وتغليف غذائي قابل للتحلل للفنادق وقطاع الأغذية في قطر.",
    },
    {
      imageUrl: `${RP}/2025/01/Slide-2-1.webp`,
      imageAlt: "توريدات تغليف مميزة",
      eyebrow: "نطاق الورق والكرتون",
      headline: "صناديق وأكياس ومستلزمات كرتون يومية",
      subheadline: "علب بيتزا وأكياس ورق ولفائف وصواني للمطابخ التجارية المزدحمة.",
    },
    {
      imageUrl: `${RP}/2025/01/Slide-3-1.webp`,
      imageAlt: "ابتكار في أشكال التغليف",
      eyebrow: "ابتكار في التغليف",
      headline: "ريادة الاستدامة في قطر",
      subheadline: "خيارات قابلة للتحلل وكرتون وPLA للاستخدام التجاري اليومي.",
    },
    {
      imageUrl: `${RP}/2025/01/Homepage-Banner-4b.webp`,
      imageAlt: "تغليف الباجاس والألياف النباتية",
      eyebrow: "مجموعة الباجاس",
      headline: "أطباق وأوعية وصواني وجبات من ألياف نباتية",
      subheadline: "أدوات باجاس مقاومة للحرارة مع أغطية للطلبات الخارجية والتموين.",
    },
    {
      imageUrl: `${RP}/2025/01/Homepage-Banner-5.jpg`,
      imageAlt: "كتالوج تغليف متكامل",
      eyebrow: "توريد الكتالوج الكامل",
      headline: "من الألمنيوم إلى النظافة — شريك واحد",
      subheadline: "خطوط ألمنيوم وبلاستيك وتنظيف ونظافة بتوريد موثوق في الدوحة.",
    },
  ],
};

export const navLinksByLocale: Record<LocaleCode, ReadonlyArray<{ label: string; href: string }>> = {
  en: [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Featured", href: "#featured" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  ar: [
    { label: "الرئيسية", href: "#home" },
    { label: "المنتجات", href: "#products" },
    { label: "مميز", href: "#featured" },
    { label: "من نحن", href: "#about" },
    { label: "الأسئلة", href: "#faq" },
    { label: "اتصل بنا", href: "#contact" },
  ],
};

export const localeCopy: Record<
  LocaleCode,
  {
    tagline: string;
    heroEyebrow: string;
    heroHeadline: string;
    heroSubheadline: string;
    heroCtaLabel: string;
    heroCtaHref: string;
    heroSecondaryCtaLabel: string;
    heroSecondaryCtaHref: string;
    heroImageAlt: string;
    trustBadges: readonly string[];
    aboutTitle: string;
    aboutDescription: string;
    aboutExtra: string;
    aboutImageAlt: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    productsSectionTitle: string;
    productsSectionDescription: string;
    servicesSectionTitle: string;
    servicesSectionDescription: string;
    featuredSectionTitle: string;
    featuredSectionDescription: string;
    faqSectionTitle: string;
    faqSectionDescription: string;
    contactTitle: string;
    contactDescription: string;
    viewDetailsLabel: string;
    availableInLabel: string;
    closeLabel: string;
  }
> = {
  en: {
    tagline: "Your Trusted Packaging Partner in Qatar",
    heroEyebrow: "Eco-Friendly Packaging",
    heroHeadline: "Sustainable Solutions for a Greener Tomorrow",
    heroSubheadline:
      "Trusted packaging partner for hotels, F&B, and facilities across Qatar.",
    heroCtaLabel: "Contact Us",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "Browse Products",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "Eco-friendly packaging banner",
    trustBadges: ["Eco Range", "Bulk Supply", "Qatar Delivery"],
    aboutTitle: "About Revo Trading",
    aboutDescription:
      "Revo Trading supplies eco-friendly and cost-effective packaging for businesses across Qatar — biodegradable, Kraft, bagasse, aluminium, hygiene, cleaning, and specialty plastic ranges.",
    aboutExtra:
      "We help hotels, restaurants, retail, and facilities choose practical sustainable packaging with reliable local supply from Industrial Area, Doha.",
    aboutImageAlt: "Greener tomorrows — sustainable packaging solutions",
    visionTitle: "Our Vision",
    visionText:
      "To lead packaging supply in Qatar toward a more sustainable future with innovative, renewable solutions.",
    missionTitle: "Our Mission",
    missionText:
      "To offer accessible, durable, and sustainable packaging that meets unique business needs while promoting environmental responsibility.",
    productsSectionTitle: "Our Products",
    productsSectionDescription: "Browse packaging categories — tap a card for full details and available sizes.",
    servicesSectionTitle: "Sustainable Focus",
    servicesSectionDescription: "Biodegradable, Kraft, and PLA-style solutions for greener operations.",
    featuredSectionTitle: "Popular Items",
    featuredSectionDescription: "Selected packaging lines from our catalogue, ready for bulk enquiry.",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDescription: "Quick answers about ordering packaging with Revo Trading.",
    contactTitle: "Have questions or need assistance?",
    contactDescription: "Tell us what you need — quotes, sizes, and bulk supply guidance.",
    viewDetailsLabel: "View details",
    availableInLabel: "Available in",
    closeLabel: "Close",
  },
  ar: {
    tagline: "شريكك الموثوق للتغليف في قطر",
    heroEyebrow: "تغليف صديق للبيئة",
    heroHeadline: "حلول مستدامة لغد أكثر خضرة",
    heroSubheadline: "شريك موثوق للتغليف للفنادق وقطاع الأغذية والمنشآت في قطر.",
    heroCtaLabel: "تواصل معنا",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "تصفح المنتجات",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "بانر تغليف صديق للبيئة",
    trustBadges: ["نطاق بيئي", "توريد بالجملة", "توصيل داخل قطر"],
    aboutTitle: "عن ريفو للتجارة",
    aboutDescription:
      "توفر ريفو للتجارة تغليفاً صديقاً للبيئة وفعّال التكلفة للشركات في قطر — قابل للتحلل، كرتون، باجاس، ألمنيوم، نظافة، تنظيف، وبلاستيك متخصص.",
    aboutExtra:
      "نساعد الفنادق والمطاعم والتجزئة والمنشآت على اختيار تغليف مستدام عملي مع توريد محلي موثوق من المنطقة الصناعية بالدوحة.",
    aboutImageAlt: "غدٌ أكثر خضرة — حلول تغليف مستدامة",
    visionTitle: "رؤيتنا",
    visionText: "قيادة توريد التغليف في قطر نحو مستقبل أكثر استدامة بحلول مبتكرة ومتجددة.",
    missionTitle: "رسالتنا",
    missionText:
      "تقديم تغليف متاح ومتين ومستدام يلبي احتياجات الأعمال ويعزز المسؤولية البيئية.",
    productsSectionTitle: "منتجاتنا",
    productsSectionDescription: "تصفح فئات التغليف — اضغط البطاقة للتفاصيل والأحجام المتاحة.",
    servicesSectionTitle: "التركيز المستدام",
    servicesSectionDescription: "حلول قابلة للتحلل وكرتون وPLA لعمليات أكثر خضرة.",
    featuredSectionTitle: "أصناف مميزة",
    featuredSectionDescription: "منتجات مختارة من الكتالوج جاهزة لطلبات الجملة.",
    faqSectionTitle: "الأسئلة الشائعة",
    faqSectionDescription: "إجابات سريعة عن طلب التغليف من ريفو للتجارة.",
    contactTitle: "هل لديك أسئلة أو تحتاج مساعدة؟",
    contactDescription: "أخبرنا بما تحتاجه — عروض أسعار وأحجام وإرشاد للتوريد بالجملة.",
    viewDetailsLabel: "عرض التفاصيل",
    availableInLabel: "متوفر بـ",
    closeLabel: "إغلاق",
  },
};

type ProductDef = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  sizes: readonly string[];
  en: { title: string; description: string; details: string };
  ar: { title: string; description: string; details: string };
};

const productDefs: ProductDef[] = [
  {
    id: "eco-range",
    imageUrl: `${RP}/2025/01/ECO-Range-Products.webp`,
    imageAlt: "ECO Range Products",
    sizes: ["Hot cups 4–16 oz", "Food pails 16–32 oz", "Lunch boxes XS–L", "PLA cups & lids"],
    en: {
      title: "ECO Range Products",
      description: "Compostable cups, lids, cutlery, food pails, and lunch boxes.",
      details:
        "Includes ECO hot cups, ripple/double wall cups, CPLA lids, corn-starch cutlery, PLA cold cups, deli containers, paper straws, and window lunch boxes.",
    },
    ar: {
      title: "منتجات النطاق البيئي",
      description: "أكواب وأغطية وأدوات مائدة ودلاء طعام وعلب غداء قابلة للتحلل.",
      details:
        "يشمل أكواب ساخنة، أكواب مزدوجة، أغطية CPLA، أدوات ذرة، أكواب PLA باردة، حاويات ديلي، مصاصات ورقية، وعلب غداء بنافذة.",
    },
  },
  {
    id: "bagasse",
    imageUrl: `${RP}/2025/01/Bagasse-Products.webp`,
    imageAlt: "Bagasse Products",
    sizes: ["Plates 7–10″", "Bowls 250–500 ml", "Containers 12–32 oz", "Multi-comp trays"],
    en: {
      title: "Bagasse Products",
      description: "Plant-fiber plates, bowls, and containers with PET lids.",
      details:
        "ECO bagasse plates, bowls, round/square/rect containers, hinged lids, sushi trays, souffle cups, and multi-compartment meal trays.",
    },
    ar: {
      title: "منتجات الباجاس",
      description: "أطباق وأوعية وحاويات من ألياف نباتية مع أغطية PET.",
      details:
        "أطباق وأوعية وحاويات دائرية ومربعة ومستطيلة، أغطية مفصلية، صواني سوشي، أكواب سوفليه، وصواني متعددة الأقسام.",
    },
  },
  {
    id: "paper-kraft",
    imageUrl: `${RP}/2025/01/Paper-and-Kraft.webp`,
    imageAlt: "Paper & Kraft Products",
    sizes: ["Pizza boxes S–L", "Napkins many sizes", "Bags & pouches", "Wraps & trays"],
    en: {
      title: "Paper & Kraft Products",
      description: "Boxes, cups, bags, wraps, trays, and tissue essentials.",
      details:
        "Containers & boxes, hot cups & carrying trays, paper bags & pouches, wraps and baking sheets, trays, and tissue products including pizza boxes and doilies.",
    },
    ar: {
      title: "منتجات الورق والكرتون",
      description: "صناديق وأكواب وأكياس ولفائف وصواني ومناديل.",
      details:
        "حاويات وصناديق، أكواب ساخنة وصواني حمل، أكياس ولفائف خبز، صواني، ومنتجات مناديل بما في ذلك علب البيتزا.",
    },
  },
  {
    id: "wooden",
    imageUrl: `${RP}/2025/01/Wooden-Products.webp`,
    imageAlt: "Wooden Products",
    sizes: ["Skewers", "Chopsticks", "Fruit picks", "Cutlery sets"],
    en: {
      title: "Wooden Products",
      description: "Bamboo skewers, chopsticks, picks, and wooden cutlery.",
      details:
        "Bamboo fruit picks, gun-shaped and knotted skewers, wooden chopsticks, and related natural serving accessories.",
    },
    ar: {
      title: "منتجات خشبية",
      description: "أسياخ وعيدان وأعواد وأدوات مائدة خشبية.",
      details: "أعواد فواكه، أسياخ بامبو، عيدان خشبية، ومستلزمات تقديم طبيعية.",
    },
  },
  {
    id: "styrofoam",
    imageUrl: `${RP}/2025/01/Styro-Foam-Products.webp`,
    imageAlt: "Styro Foam Products",
    sizes: ["Bowls", "Boxes", "Cups", "Plates", "Takeaway boxes"],
    en: {
      title: "Styro Foam Products",
      description: "Insulated foam bowls, boxes, cups, and plates.",
      details:
        "Styro foam bowls, boxes, cups, plates, and food takeaway boxes for temperature-sensitive service.",
    },
    ar: {
      title: "منتجات الستايروفوم",
      description: "أوعية وصناديق وأكواب وأطباق رغوية عازلة.",
      details: "أوعية وصناديق وأكواب وأطباق رغوية وعلب طلبات خارجية.",
    },
  },
  {
    id: "aluminium",
    imageUrl: `${RP}/2025/01/Aluminium-Products.webp`,
    imageAlt: "Aluminium Products",
    sizes: ["Containers + lids", "Foils", "Platters", "Round trays"],
    en: {
      title: "Aluminium Products",
      description: "Foil containers, platters, wraps, and lids.",
      details:
        "Aluminium containers with lids, foils, platters, burger foil wrap, and round aluminium containers for catering and bakeries.",
    },
    ar: {
      title: "منتجات الألمنيوم",
      description: "حاويات ورقائق وصواني وأغطية ألمنيوم.",
      details: "حاويات بغطاء، رقائق، صواني تقديم، لفائف برغر، وحاويات دائرية للتموين والمخابز.",
    },
  },
  {
    id: "hygiene",
    imageUrl: `${RP}/2025/01/Hygiene-Products.webp`,
    imageAlt: "Hygiene Products",
    sizes: ["Napkins 23–40 cm", "Maxi rolls 1–2 ply", "Wet tissues", "Chef hats"],
    en: {
      title: "Hygiene Products",
      description: "Napkins, tissues, hats, and hygiene essentials.",
      details:
        "White/yellow paper napkins, maxi rolls, wet refreshing tissues, Duni napkins, forage hats, chef hats, and related hygiene supplies.",
    },
    ar: {
      title: "منتجات النظافة",
      description: "مناديل ومناديل ورقية وقبعات ومستلزمات نظافة.",
      details:
        "مناديل ورقية، رولات ماكسي، مناديل مبللة، مناديل دوني، قبعات طهاة، ومستلزمات نظافة.",
    },
  },
  {
    id: "cleaning",
    imageUrl: `${RP}/2025/01/Cleaning-Products.webp`,
    imageAlt: "Cleaning Products",
    sizes: ["Dispensers", "Cleaners", "Dishwash", "Air freshener"],
    en: {
      title: "Cleaning Products",
      description: "Dispensers, cleaners, and washroom essentials.",
      details:
        "Dispensers for maxi roll, napkin, hand wash, and gloves, plus cleaners, disinfectant, dishwash, rinse aid, and air fresheners.",
    },
    ar: {
      title: "منتجات التنظيف",
      description: "موزعات ومنظفات ومستلزمات دورات المياه.",
      details: "موزعات رولات ومناديل وغسول يد، ومنظفات ومطهرات وغسيل صحون ومعطرات.",
    },
  },
  {
    id: "plastic-bags-films",
    imageUrl: `${RP}/2025/01/Plastic-bags.webp`,
    imageAlt: "Plastic Bags & Films",
    sizes: ["Zipper 12×25 to 30×40 cm", "Garbage bags", "Cling film", "Shopping bags"],
    en: {
      title: "Plastic Bags & Films",
      description: "Zipper bags, garbage bags, cling film, and shopping bags.",
      details:
        "Zipper lock bags in multiple sizes, clear/black garbage bags, clear plastic shopping bags, and cling film.",
    },
    ar: {
      title: "أكياس وأفلام بلاستيكية",
      description: "أكياس سحّاب وقمامة ونايلون تغليف وأكياس تسوق.",
      details: "أكياس سحّاب بأحجام متعددة، أكياس قمامة، أكياس تسوق شفافة، ونايلون تغليف.",
    },
  },
  {
    id: "plastic-products",
    imageUrl: `${RP}/2025/01/Plastic-Products.webp`,
    imageAlt: "Plastic Products",
    sizes: ["PET cups 10–20 oz", "Microwavable 4–48 oz", "Sushi trays", "Salad bowls"],
    en: {
      title: "Plastic Products",
      description: "PET cups, microwavable containers, cutlery, and trays.",
      details:
        "Clear PET U-shape cups with dome/diamond/heart lids, black microwavable containers, sushi trays, salad bowls, chicken containers, and cutlery sets.",
    },
    ar: {
      title: "منتجات بلاستيكية",
      description: "أكواب PET وحاويات ميكروويف وأدوات مائدة وصواني.",
      details:
        "أكواب PET بأغطية قبة/ماسة/قلب، حاويات ميكروويف سوداء، صواني سوشي، أوعية سلطة، حاويات دجاج، وأطقم أدوات مائدة.",
    },
  },
];

export const productsByLocale: Record<
  LocaleCode,
  ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    imageAlt: string;
    sizes: readonly string[];
  }>
> = {
  en: productDefs.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    sizes: item.sizes,
    ...item.en,
  })),
  ar: productDefs.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    sizes: item.sizes,
    ...item.ar,
  })),
};

export const featuredByLocale: Record<
  LocaleCode,
  ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    sizes: readonly string[];
  }>
> = {
  en: [
    {
      id: "white-pizza-boxes",
      title: "White Pizza Boxes",
      description: "Paper & kraft pizza boxes with liners and stands.",
      imageUrl: `${RP}/2025/02/3-Compartment-Lunch-Box-1.jpg`,
      imageAlt: "White pizza boxes",
      sizes: ["Small 23×23 cm", "Medium 28×28 cm", "Large 33×33 cm"],
    },
    {
      id: "white-paper-napkins",
      title: "White Paper Napkins",
      description: "Hospitality napkins including dispenser and interfold.",
      imageUrl: `${RP}/2025/02/White-Paper-Napkins.jpg`,
      imageAlt: "White paper napkins",
      sizes: ["23×23", "30×30", "33×33", "40×40", "Dispenser", "Interfold"],
    },
    {
      id: "pet-dome-cups",
      title: "Clear PET U Shape Cup + Dome Lids",
      description: "Clear cups with dome lids for cold drinks.",
      imageUrl: `${RP}/2025/02/Clear-PET-U-Shape-Cup-Dome-Lids.jpg`,
      imageAlt: "Clear PET cups with dome lids",
      sizes: ["10 oz", "12 oz", "14 oz", "16 oz", "20 oz"],
    },
    {
      id: "zipper-bags",
      title: "Zipper Lock Bags",
      description: "Reusable zipper bags for prep and storage.",
      imageUrl: `${RP}/2025/02/Zipper-Lock-Bags.jpg`,
      imageAlt: "Zipper lock bags",
      sizes: ["12×25 cm", "19×10 cm", "22×11 cm", "27×30 cm", "30×40 cm"],
    },
    {
      id: "black-microwavable-round",
      title: "Black Microwavable Round Cont + Lids",
      description: "Round microwavable meal containers with lids.",
      imageUrl: `${RP}/2025/02/Black-Microwavable-Round-Cont-Lids.jpg`,
      imageAlt: "Black microwavable round containers",
      sizes: ["4 oz", "8 oz", "10 oz", "12 oz", "16 oz", "20 oz", "30 oz"],
    },
    {
      id: "bagasse-plates",
      title: "ECO Bagasse Plates",
      description: "Compostable bagasse plates for dine-in and takeaway.",
      imageUrl: `${RP}/2025/02/eco-bagasse-plates.jpg`,
      imageAlt: "ECO bagasse plates",
      sizes: ["7″", "9″", "10″", "10″ 3 COMP"],
    },
  ],
  ar: [
    {
      id: "white-pizza-boxes",
      title: "علب بيتزا بيضاء",
      description: "علب بيتزا ورقية مع بطانات وحوامل.",
      imageUrl: `${RP}/2025/02/3-Compartment-Lunch-Box-1.jpg`,
      imageAlt: "علب بيتزا بيضاء",
      sizes: ["صغير 23×23", "وسط 28×28", "كبير 33×33"],
    },
    {
      id: "white-paper-napkins",
      title: "مناديل ورقية بيضاء",
      description: "مناديل ضيافة بما في ذلك موزع وإنترفولد.",
      imageUrl: `${RP}/2025/02/White-Paper-Napkins.jpg`,
      imageAlt: "مناديل ورقية بيضاء",
      sizes: ["23×23", "30×30", "33×33", "40×40", "موزع", "إنترفولد"],
    },
    {
      id: "pet-dome-cups",
      title: "كوب PET شفاف + غطاء قبة",
      description: "أكواب شفافة بأغطية قبة للمشروبات الباردة.",
      imageUrl: `${RP}/2025/02/Clear-PET-U-Shape-Cup-Dome-Lids.jpg`,
      imageAlt: "أكواب PET شفافة بغطاء قبة",
      sizes: ["10 oz", "12 oz", "14 oz", "16 oz", "20 oz"],
    },
    {
      id: "zipper-bags",
      title: "أكياس سحّاب",
      description: "أكياس سحّاب للتحضير والتخزين.",
      imageUrl: `${RP}/2025/02/Zipper-Lock-Bags.jpg`,
      imageAlt: "أكياس سحّاب",
      sizes: ["12×25 سم", "19×10 سم", "22×11 سم", "27×30 سم", "30×40 سم"],
    },
    {
      id: "black-microwavable-round",
      title: "حاوية ميكروويف دائرية سوداء + غطاء",
      description: "حاويات وجبات دائرية قابلة للميكروويف.",
      imageUrl: `${RP}/2025/02/Black-Microwavable-Round-Cont-Lids.jpg`,
      imageAlt: "حاويات ميكروويف دائرية سوداء",
      sizes: ["4 oz", "8 oz", "10 oz", "12 oz", "16 oz", "20 oz", "30 oz"],
    },
    {
      id: "bagasse-plates",
      title: "أطباق باجاس بيئية",
      description: "أطباق باجاس قابلة للتحلل للجلوس والطلبات الخارجية.",
      imageUrl: `${RP}/2025/02/eco-bagasse-plates.jpg`,
      imageAlt: "أطباق باجاس بيئية",
      sizes: ["7″", "9″", "10″", "10″ 3 أقسام"],
    },
  ],
};

export const solutionsByLocale: Record<
  LocaleCode,
  ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    imageAlt: string;
    sizes: readonly string[];
  }>
> = {
  en: [
    {
      id: "biodegradable",
      title: "Biodegradable Packaging",
      description: "Designed to decompose and reduce waste.",
      details: "Choose compostable bagasse and plant-based ranges for greener takeaway programs.",
      imageUrl: `${RP}/2025/02/eco-bagasse-plates.jpg`,
      imageAlt: "Biodegradable bagasse packaging",
      sizes: [],
    },
    {
      id: "kraft",
      title: "Kraft Products",
      description: "Durable, recyclable kraft for everyday service.",
      details: "Kraft boxes, bags, wraps, and cups that balance presentation with practicality.",
      imageUrl: `${RP}/2025/01/Paper-and-Kraft.webp`,
      imageAlt: "Kraft packaging range",
      sizes: [],
    },
    {
      id: "pla",
      title: "PLA Solutions",
      description: "Plant-based cups, lids, and containers.",
      details: "PLA cold cups, souffle cups, deli containers, and related renewable formats.",
      imageUrl: `${RP}/2025/01/ECO-Range-Products.webp`,
      imageAlt: "PLA eco packaging solutions",
      sizes: [],
    },
  ],
  ar: [
    {
      id: "biodegradable",
      title: "تغليف قابل للتحلل",
      description: "مصمم للتحلل وتقليل النفايات.",
      details: "اختر نطاقات الباجاس والنباتية لبرامج الطلبات الخارجية الأكثر خضرة.",
      imageUrl: `${RP}/2025/02/eco-bagasse-plates.jpg`,
      imageAlt: "تغليف باجاس قابل للتحلل",
      sizes: [],
    },
    {
      id: "kraft",
      title: "منتجات الكرتون",
      description: "كرتون متين وقابل لإعادة التدوير للاستخدام اليومي.",
      details: "علب وأكياس ولفائف وأكواب كرتونية توازن المظهر مع العملية.",
      imageUrl: `${RP}/2025/01/Paper-and-Kraft.webp`,
      imageAlt: "نطاق تغليف كرتوني",
      sizes: [],
    },
    {
      id: "pla",
      title: "حلول PLA",
      description: "أكواب وأغطية وحاويات نباتية.",
      details: "أكواب باردة وأكواب سوفليه وحاويات ديلي بصيغ متجددة.",
      imageUrl: `${RP}/2025/01/ECO-Range-Products.webp`,
      imageAlt: "حلول تغليف PLA",
      sizes: [],
    },
  ],
};

export const faqsByLocale: Record<
  LocaleCode,
  ReadonlyArray<{ question: string; answer: string }>
> = {
  en: [
    {
      question: "What types of eco-friendly packaging products do you offer?",
      answer:
        "We supply biodegradable items, Kraft products, bagasse formats, and PLA-style solutions, plus aluminium, hygiene, cleaning, plastic bags/films, and specialty plastic cups, lids, and meal containers for hospitality and F&B.",
    },
    {
      question: "What makes the packaging environmentally friendly?",
      answer:
        "Many ranges use renewable and biodegradable materials to reduce environmental impact while meeting commercial durability needs.",
    },
    {
      question: "Do you offer customized packaging solutions?",
      answer:
        "Yes. We help clients match sizes, formats, and presentation to their brand and operational requirements.",
    },
    {
      question: "What industries do you cater to?",
      answer: "Hotels, restaurants, cafés, catering, retail, and facilities across Qatar.",
    },
    {
      question: "Where do you deliver?",
      answer: "Across Qatar from our base in Industrial Area, Doha.",
    },
    {
      question: "How can I place an order?",
      answer: "Call +974 30423043 or email info@revo.qa and our team will assist.",
    },
    {
      question: "Are products quality compliant?",
      answer:
        "We prioritize packaging that meets commercial expectations for quality, durability, and responsible materials.",
    },
  ],
  ar: [
    {
      question: "ما أنواع التغليف الصديق للبيئة التي تقدمونها؟",
      answer:
        "نوفر منتجات قابلة للتحلل وكرتون وباجاس وحلول PLA، إضافة إلى ألمنيوم ونظافة وتنظيف وأكياس/أفلام وبلاستيك متخصص للضيافة وقطاع الأغذية.",
    },
    {
      question: "ما الذي يجعل التغليف صديقاً للبيئة؟",
      answer: "كثير من النطاقات يعتمد على مواد متجددة وقابلة للتحلل مع الحفاظ على المتانة التجارية.",
    },
    {
      question: "هل تقدمون حلولاً مخصصة؟",
      answer: "نعم. نساعد العملاء على مطابقة الأحجام والصيغ مع متطلبات العلامة والتشغيل.",
    },
    {
      question: "ما القطاعات التي تخدمونها؟",
      answer: "الفنادق والمطاعم والمقاهي والتموين والتجزئة والمنشآت في قطر.",
    },
    {
      question: "أين يتم التوصيل؟",
      answer: "داخل قطر من مقرنا في المنطقة الصناعية بالدوحة.",
    },
    {
      question: "كيف أضع طلباً؟",
      answer: "اتصل على +974 30423043 أو راسل info@revo.qa وسنساعدك.",
    },
    {
      question: "هل المنتجات متوافقة مع معايير الجودة؟",
      answer: "نركز على تغليف يلبي توقعات الجودة والمتانة والمواد المسؤولة للاستخدام التجاري.",
    },
  ],
};

export const inquiryTypes = ["Product", "Service"] as const;
export const productOptions = productsByLocale.en.map((p) => p.title);
export const serviceOptions = solutionsByLocale.en.map((s) => s.title);
export const navLinks = navLinksByLocale.en;
export const products = productsByLocale.en;
export const services = solutionsByLocale.en;
export const faqs = faqsByLocale.en;
export const productsSectionTitle = localeCopy.en.productsSectionTitle;
export const aboutContent = {
  title: localeCopy.en.aboutTitle,
  description: localeCopy.en.aboutDescription,
  imageUrl: companyInfo.aboutImageUrl,
  imageAlt: localeCopy.en.aboutImageAlt,
};
export const heroContent = {
  eyebrow: localeCopy.en.heroEyebrow,
  headline: localeCopy.en.heroHeadline,
  subheadline: localeCopy.en.heroSubheadline,
  ctaLabel: localeCopy.en.heroCtaLabel,
  ctaHref: localeCopy.en.heroCtaHref,
  imageUrl: companyInfo.heroImageUrl,
  imageAlt: localeCopy.en.heroImageAlt,
  trustBadges: localeCopy.en.trustBadges.map((label) => ({ label })),
};
export const footerContent = {
  quickLinks: navLinksByLocale.en,
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  ],
  copyright: "© 2026 Revo Trading. All rights reserved.",
} as const;
