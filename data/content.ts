export type LocaleCode = "en" | "ar";

export const companyInfo = {
  name: "Revo Qatar",
  tagline: "Your Real Packaging Partner in Qatar",
  address: "Industrial Area, Doha, Qatar",
  phone: "+974 7071 8232",
  phoneHref: "tel:+97470718232",
  email: "info@revo.qa",
  emailHref: "mailto:info@revo.qa",
  whatsapp: "97470718232",
  whatsappHref: "https://wa.me/97470718232",
  heroImageUrl:
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1920&q=80",
  aboutImageUrl:
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80",
  contactBannerUrl:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  contactSideImageUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
} as const;

export const navLinksByLocale: Record<LocaleCode, ReadonlyArray<{ label: string; href: string }>> = {
  en: [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  ar: [
    { label: "الرئيسية", href: "#home" },
    { label: "المنتجات", href: "#products" },
    { label: "الحلول", href: "#solutions" },
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
    faqSectionTitle: string;
    faqSectionDescription: string;
    contactTitle: string;
    contactDescription: string;
  }
> = {
  en: {
    tagline: "Your Real Packaging Partner in Qatar",
    heroEyebrow: "Eco-Friendly Packaging",
    heroHeadline: "Sustainable Solutions for a Greener Tomorrow",
    heroSubheadline:
      "Revo Qatar supplies eco-friendly and cost-effective packaging for hotels, restaurants, retail, and facilities across Qatar — biodegradable, Kraft, bagasse, aluminium, hygiene, and specialty ranges backed by reliable delivery.",
    heroCtaLabel: "Contact Us",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "Browse Products",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "Stacks of kraft packaging boxes ready for hospitality supply",
    trustBadges: ["Eco Range", "Bulk Supply", "Qatar Delivery"],
    aboutTitle: "About Revo Qatar",
    aboutDescription:
      "Revo Qatar is a trusted packaging partner for businesses across Qatar. We provide an extensive range of high-quality eco-friendly products — including biodegradable, Kraft, bagasse, PLA-style plant-based options, aluminium, hygiene, cleaning, and specialty plastic ranges — designed for daily commercial use while supporting a healthier planet.",
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
    faqSectionDescription: "Everything you need to know about ordering packaging with Revo Qatar.",
    contactTitle: "Have questions or need assistance?",
    contactDescription:
      "Our team will help you find the right packaging solutions for your business — quotes, bulk supply, and product guidance.",
  },
  ar: {
    tagline: "شريكك الحقيقي في التغليف في قطر",
    heroEyebrow: "تغليف صديق للبيئة",
    heroHeadline: "حلول مستدامة لغد أكثر خضرة",
    heroSubheadline:
      "توفر ريفو قطر تغليفاً صديقاً للبيئة وفعّال التكلفة للفنادق والمطاعم والتجزئة والمنشآت في قطر — بما في ذلك المنتجات القابلة للتحلل والكرتون والباجاس والألمنيوم ومستلزمات النظافة، مع توريد موثوق.",
    heroCtaLabel: "تواصل معنا",
    heroCtaHref: "#contact",
    heroSecondaryCtaLabel: "تصفح المنتجات",
    heroSecondaryCtaHref: "#products",
    heroImageAlt: "صناديق تغليف كرتونية جاهزة للتوريد لقطاع الضيافة",
    trustBadges: ["نطاق بيئي", "توريد بالجملة", "توصيل داخل قطر"],
    aboutTitle: "عن ريفو قطر",
    aboutDescription:
      "ريفو قطر شريك موثوق في التغليف للشركات في قطر. نوفر مجموعة واسعة من المنتجات عالية الجودة الصديقة للبيئة — بما في ذلك القابلة للتحلل والكرتون والباجاس وخيارات نباتية شبيهة بـ PLA والألمنيوم والنظافة والتنظيف والبلاستيك المتخصص — للاستخدام التجاري اليومي مع دعم بيئة أكثر صحة.",
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
    faqSectionDescription: "كل ما تحتاج معرفته عن طلب التغليف من ريفو قطر.",
    contactTitle: "هل لديك أسئلة أو تحتاج مساعدة؟",
    contactDescription:
      "فريقنا جاهز لمساعدتك في إيجاد حلول التغليف المناسبة — عروض أسعار، توريد بالجملة، وإرشاد للمنتجات.",
  },
};

export const productsByLocale: Record<
  LocaleCode,
  ReadonlyArray<{
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    imageAlt: string;
  }>
> = {
  en: [
    {
      id: "eco-range",
      title: "ECO Range Products",
      description:
        "Sustainable packaging designed to lower environmental impact without compromising strength or presentation.",
      details:
        "Ideal for hotels and F&B brands that want greener takeaway and on-premise packaging. Includes compostable and recyclable formats suited to daily high-volume use.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Recycled paper and eco-friendly packaging materials",
    },
    {
      id: "bagasse",
      title: "Bagasse Products",
      description:
        "Plant-fiber food packaging made from sugarcane residue — sturdy, compostable, and food-safe.",
      details:
        "Excellent for hot meals, clamshells, plates, and bowls. A strong alternative to conventional foam for restaurants and catering kitchens.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Takeaway food packed in disposable food containers",
    },
    {
      id: "paper-kraft",
      title: "Paper & Kraft Products",
      description:
        "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft.",
      details:
        "Covers pizza boxes, hot cups and carrying trays, paper bags and pouches, wraps and baking sheets, trays, and related kraft formats for cafés and QSR brands.",
      imageUrl:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Stacked kraft paper packaging boxes",
    },
    {
      id: "wooden",
      title: "Wooden Products",
      description:
        "Natural wooden cutlery and serving items for cafés, catering, and hospitality brands.",
      details:
        "Spoons, forks, knives, and serving accessories that pair well with eco food packaging and premium takeaway presentation.",
      imageUrl:
        "https://images.unsplash.com/photo-1556911220-bff31c28d0fc?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Kitchen tools and natural serving materials",
    },
    {
      id: "styrofoam",
      title: "Styro Foam Products",
      description:
        "Insulated foam packaging for hot and cold food service where temperature retention matters.",
      details:
        "Used widely for delivery and bulk catering when insulation and cost efficiency are priorities for high-volume kitchens.",
      imageUrl:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Insulated takeaway meal containers",
    },
    {
      id: "aluminium",
      title: "Aluminium Products",
      description:
        "Foil containers and trays built for catering, bakeries, and high-volume kitchens.",
      details:
        "Heat-tolerant trays and containers for cooking, transport, and display — dependable for hotels, bakeries, and event catering.",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Kitchen prep trays and catering cookware",
    },
    {
      id: "hygiene",
      title: "Hygiene Products",
      description:
        "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations.",
      details:
        "Paper napkins, maxi rolls, wet tissues, chef and forage hats, and related hygiene items that keep front-of-house and kitchen teams compliant and presentable.",
      imageUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Clean towels and hygiene supplies",
    },
    {
      id: "cleaning",
      title: "Cleaning Products",
      description:
        "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean.",
      details:
        "Includes dispenser systems for rolls, napkins, hand wash, and related accessories used in hospitality washrooms and prep areas.",
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Professional cleaning supplies for facilities",
    },
    {
      id: "plastic-bags-films",
      title: "Plastic Bags & Films",
      description:
        "Zipper bags, films, and flexible packaging for storage, retail, and food prep.",
      details:
        "Practical formats for portioning, storage, and retail packaging — available in multiple sizes for kitchens and back-of-house teams.",
      imageUrl:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Transparent plastic packaging bags",
    },
    {
      id: "plastic-products",
      title: "Plastic Products",
      description:
        "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls.",
      details:
        "Clear PET cups with dome and heart lids, heavy-duty cutlery, black microwavable containers, sushi trays, salad bowls, and multi-compartment meal trays.",
      imageUrl:
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Clear plastic cups for beverage service",
    },
  ],
  ar: [
    {
      id: "eco-range",
      title: "منتجات النطاق البيئي",
      description: "تغليف مستدام يقلل الأثر البيئي دون المساس بالمتانة أو المظهر.",
      details:
        "مناسب للفنادق وعلامات الأغذية التي تريد تغليفاً أكثر خضرة للاستخدام اليومي وبكميات كبيرة، بما في ذلك الصيغ القابلة للتحلل وإعادة التدوير.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
      imageAlt: "مواد تغليف ورقية معاد تدويرها وصديقة للبيئة",
    },
    {
      id: "bagasse",
      title: "منتجات الباجاس",
      description: "تغليف غذائي من ألياف نباتية مشتقة من مخلفات قصب السكر — متين وقابل للتحلل وآمن غذائياً.",
      details:
        "ممتاز للوجبات الساخنة والحاويات والأطباق والأوعية، وبديل قوي للرغوي التقليدي في المطاعم ومطابخ التموين.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
      imageAlt: "طعام جاهز معبأ في حاويات غذائية",
    },
    {
      id: "paper-kraft",
      title: "منتجات الورق والكرتون",
      description: "حاويات وصناديق وأكواب وأكياس ولفائف وصواني ومناديل من الكرتون القابل لإعادة التدوير.",
      details:
        "يشمل علب البيتزا وأكواب ساخنة وصواني حمل وأكياس ورقية ولفائف خبز وصواني ومستلزمات كرتونية للمقاهي والمطاعم السريعة.",
      imageUrl:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
      imageAlt: "صناديق تغليف كرتونية مكدسة",
    },
    {
      id: "wooden",
      title: "منتجات خشبية",
      description: "أدوات مائدة وتقديم خشبية طبيعية للمقاهي والتموين والضيافة.",
      details:
        "ملاعق وشوك وسكاكين ومستلزمات تقديم تتناسب مع التغليف الغذائي البيئي والعروض الفاخرة للطلبات الخارجية.",
      imageUrl:
        "https://images.unsplash.com/photo-1556911220-bff31c28d0fc?auto=format&fit=crop&w=900&q=80",
      imageAlt: "أدوات مطبخ ومواد تقديم طبيعية",
    },
    {
      id: "styrofoam",
      title: "منتجات الستايروفوم",
      description: "تغليف رغوي عازل للخدمات الغذائية الساخنة والباردة حيث تهم المحافظة على الحرارة.",
      details:
        "يُستخدم على نطاق واسع للتوصيل والتموين بالجملة عندما تكون العزل والكفاءة من الأولويات للمطابخ عالية الحجم.",
      imageUrl:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
      imageAlt: "حاويات وجبات معزولة للطلبات الخارجية",
    },
    {
      id: "aluminium",
      title: "منتجات الألمنيوم",
      description: "حاويات وصواني ألمنيوم للمطابخ والتموين والمخابز.",
      details:
        "صواني وحاويات تتحمل الحرارة للطهي والنقل والعرض — موثوقة للفنادق والمخابز وتموين الفعاليات.",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
      imageAlt: "صواني تحضير وأدوات تموين",
    },
    {
      id: "hygiene",
      title: "منتجات النظافة",
      description: "مناديل ومناديل ورقية وقبعات ومستلزمات نظافة لقطاع الأغذية والمنشآت.",
      details:
        "مناديل ورقية ورولات ماكسي ومناديل مبللة وقبعات طهاة ومستلزمات نظافة تبقي فرق العمل جاهزة ومتوافقة مع معايير الضيافة.",
      imageUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      imageAlt: "مناشف ومستلزمات نظافة نظيفة",
    },
    {
      id: "cleaning",
      title: "منتجات التنظيف",
      description: "موزعات ومستلزمات تنظيف للمطاعم والمطابخ ومناطق الاستقبال.",
      details:
        "يشمل أنظمة موزعات للرولات والمناديل وغسول اليدين ومستلزمات مرتبطة بمرافق الضيافة ومناطق التحضير.",
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      imageAlt: "مستلزمات تنظيف احترافية للمنشآت",
    },
    {
      id: "plastic-bags-films",
      title: "أكياس وأفلام بلاستيكية",
      description: "أكياس سحّاب وأفلام وتغليف مرن للتخزين والتجزئة وتحضير الطعام.",
      details:
        "صيغ عملية للتقسيم والتخزين وتغليف التجزئة — بأحجام متعددة للمطابخ وفرق العمليات.",
      imageUrl:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=900&q=80",
      imageAlt: "أكياس تغليف بلاستيكية شفافة",
    },
    {
      id: "plastic-products",
      title: "منتجات بلاستيكية",
      description: "أكواب وأغطية وأدوات مائدة وحاويات قابلة للميكروويف وصواني سوشي وأوعية سلطة.",
      details:
        "أكواب PET شفافة مع أغطية قبة وقلب، أدوات مائدة متينة، حاويات ميكروويف سوداء، صواني سوشي، أوعية سلطة، وصواني وجبات متعددة الأقسام.",
      imageUrl:
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
      imageAlt: "أكواب بلاستيكية شفافة لتقديم المشروبات",
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
  }>
> = {
  en: [
    {
      id: "biodegradable",
      title: "Biodegradable Packaging",
      description:
        "Designed to naturally decompose, reducing waste and supporting sustainability goals.",
      details:
        "Choose ranges that break down more responsibly after use — suited to brands communicating eco commitments to guests and customers.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Eco packaging materials emphasizing sustainability",
    },
    {
      id: "kraft",
      title: "Kraft Products",
      description:
        "Durable, versatile, recyclable options that balance quality with eco-consciousness.",
      details:
        "Kraft boxes, bags, wraps, and cups that present well on counters and delivery runs while remaining practical for high throughput.",
      imageUrl:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Kraft packaging stacked in a supply setting",
    },
    {
      id: "pla",
      title: "PLA Solutions",
      description:
        "Plant-based packaging from renewable resources like cornstarch and sugarcane.",
      details:
        "PLA-style options for forward-looking F&B operators seeking renewable materials without sacrificing clarity and performance.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Plant-based food packaging for modern F&B",
    },
  ],
  ar: [
    {
      id: "biodegradable",
      title: "تغليف قابل للتحلل",
      description: "مصمم للتحلل الطبيعي وتقليل النفايات ودعم أهداف الاستدامة.",
      details:
        "اختر نطاقاً يتحلل بمسؤولية أكبر بعد الاستخدام — مناسب للعلامات التي تُظهر التزامها البيئي للضيوف والعملاء.",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "مواد تغليف صديقة للبيئة تبرز الاستدامة",
    },
    {
      id: "kraft",
      title: "منتجات الكرتون",
      description: "خيارات متينة ومرنة وقابلة لإعادة التدوير توازن بين الجودة والوعي البيئي.",
      details:
        "علب وأكياس ولفائف وأكواب كرتونية بمظهر احترافي للاستخدام اليومي والتوصيل مع إنتاجية عالية.",
      imageUrl:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "تغليف كرتوني مكدس في بيئة توريد",
    },
    {
      id: "pla",
      title: "حلول PLA",
      description: "تغليف نباتي من موارد متجددة مثل نشا الذرة وقصب السكر.",
      details:
        "خيارات شبيهة بـ PLA لمشغلي الأغذية الباحثين عن مواد متجددة دون التضحية بالوضوح والأداء.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "تغليف غذائي نباتي لقطاع الأغذية الحديث",
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
        "We provide an extensive range of eco-friendly packaging, including biodegradable items that naturally decompose, durable Kraft products from recyclable paper, bagasse plant-fiber formats, and PLA-style solutions from renewable resources like cornstarch and sugarcane. Offerings also include food containers, shopping bags, aluminium trays, hygiene supplies, cleaning accessories, and specialty plastic cups, lids, and meal containers tailored for hospitality and F&B.",
    },
    {
      question: "What makes Revo Qatar's packaging environmentally friendly?",
      answer:
        "Many of our ranges use renewable and biodegradable materials, helping reduce environmental impact. We focus on practical sustainable options that still meet commercial durability, food-safety, and presentation needs.",
    },
    {
      question: "Do you offer customized packaging solutions?",
      answer:
        "Yes. We collaborate with clients to source and supply packaging that aligns with brand presentation, portion sizes, and operational requirements.",
    },
    {
      question: "What industries do you cater to?",
      answer:
        "We serve hotels, resorts, restaurants, cafés, catering, retail, healthcare-related facilities, and other commercial operations that need reliable packaging supply.",
    },
    {
      question: "Where do you deliver your products?",
      answer:
        "We deliver across Qatar, with responsive support for hospitality and facility clients from our base in the Industrial Area, Doha.",
    },
    {
      question: "How can I place an order with Revo Qatar?",
      answer:
        "Contact us by phone at +974 7071 8232 or email info@revo.qa. Our team will guide you through product selection, quantities, and delivery.",
    },
    {
      question: "Are your products compliant with quality standards?",
      answer:
        "Yes. We prioritize products that meet strict expectations for quality, durability, and environmental responsibility suitable for commercial food service and facilities.",
    },
  ],
  ar: [
    {
      question: "ما أنواع منتجات التغليف الصديقة للبيئة التي تقدمونها؟",
      answer:
        "نوفر مجموعة واسعة من التغليف الصديق للبيئة، بما في ذلك المنتجات القابلة للتحلل، ومنتجات الكرتون القابلة لإعادة التدوير، وصيغ الباجاس النباتية، وحلول شبيهة بـ PLA من موارد متجددة مثل نشا الذرة وقصب السكر. كما تشمل عروضنا حاويات الطعام وأكياس التسوق وصواني الألمنيوم ومستلزمات النظافة والتنظيف وأكواب وأغطية وحاويات بلاستيكية متخصصة للضيافة وقطاع الأغذية.",
    },
    {
      question: "ما الذي يجعل تغليف ريفو قطر صديقاً للبيئة؟",
      answer:
        "كثير من نطاقاتنا يعتمد على مواد متجددة وقابلة للتحلل لتقليل الأثر البيئي، مع الحفاظ على المتانة وسلامة الغذاء والمظهر المطلوب للاستخدام التجاري.",
    },
    {
      question: "هل تقدمون حلول تغليف مخصصة؟",
      answer:
        "نعم. نتعاون مع العملاء لتوريد تغليف يتوافق مع هوية العلامة وأحجام الحصص ومتطلبات التشغيل.",
    },
    {
      question: "ما القطاعات التي تخدمونها؟",
      answer:
        "نخدم الفنادق والمنتجعات والمطاعم والمقاهي والتموين والتجزئة والمنشآت الصحية وغيرها من العمليات التجارية التي تحتاج توريد تغليف موثوق.",
    },
    {
      question: "أين يتم التوصيل؟",
      answer:
        "نوصل داخل قطر، مع دعم سريع لعملاء الضيافة والمنشآت من مقرنا في المنطقة الصناعية بالدوحة.",
    },
    {
      question: "كيف أطلب من ريفو قطر؟",
      answer:
        "تواصل معنا عبر الهاتف على +974 7071 8232 أو البريد info@revo.qa. سيرشدك فريقنا في اختيار المنتجات والكميات والتوصيل.",
    },
    {
      question: "هل منتجاتكم متوافقة مع معايير الجودة؟",
      answer:
        "نعم. نركز على منتجات تلبي توقعات صارمة للجودة والمتانة والمسؤولية البيئية ومناسبة للخدمات الغذائية والمنشآت التجارية.",
    },
  ],
};

export const inquiryTypes = ["Product", "Service"] as const;

export const productOptions = productsByLocale.en.map((p) => p.title);
export const serviceOptions = solutionsByLocale.en.map((s) => s.title);

/** @deprecated use navLinksByLocale */
export const navLinks = navLinksByLocale.en;
/** @deprecated use productsByLocale */
export const products = productsByLocale.en;
/** @deprecated use solutionsByLocale */
export const services = solutionsByLocale.en;
/** @deprecated use faqsByLocale */
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
  copyright: "© 2026 Revo Qatar. All rights reserved.",
} as const;
