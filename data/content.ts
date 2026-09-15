export const companyInfo = {
  name: "Realpack",
  tagline: "Your Real Packaging Partner",
  address: "Ras Al Khor 2, Dubai, UAE",
  phone: "+971 52 790 6070",
  phoneHref: "tel:+971527906070",
  email: "info@realpackpackaging.com",
  emailHref: "mailto:info@realpackpackaging.com",
  whatsapp: "971527906070",
  whatsappHref: "https://wa.me/971527906070",
} as const;

export const locations = [
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    address: "Ras Al Khor 2, Dubai, UAE",
  },
  {
    id: "qatar",
    city: "Doha",
    country: "Qatar",
    address: "Salwa Road, Doha, Qatar",
  },
  {
    id: "bahrain",
    city: "Hidd",
    country: "Bahrain",
    address: "HIDD O05, Kingdom of Bahrain",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroContent = {
  eyebrow: "Eco-Friendly Packaging",
  headline: "Sustainable Solutions for a Greener Tomorrow",
  subheadline:
    "Trusted packaging partner for food, retail, and hospitality across the UAE, Qatar, and Bahrain.",
  ctaLabel: "Contact Us",
  ctaHref: "#contact",
  imageUrl:
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1920&q=80",
  imageAlt: "Stacked eco-friendly packaging cartons in a warehouse",
  trustBadges: [
    { icon: "Leaf", label: "Eco Range" },
    { icon: "Truck", label: "Regional Supply" },
    { icon: "Award", label: "Quality Standards" },
  ],
} as const;

export const aboutContent = {
  title: "About Realpack",
  description:
    "Realpack, based in Dubai, UAE, is a leading provider of eco-friendly and cost-effective packaging solutions in the region. Our range includes biodegradable, Kraft, and PLA options designed for business needs while supporting a healthier planet. Founded by packaging industry experts, we help businesses reduce their carbon footprint with sustainable, practical supply.",
} as const;

export const products = [
  {
    id: "eco-range",
    title: "ECO Range Products",
    description: "Sustainable packaging designed to lower environmental impact without compromising performance.",
    icon: "Leaf",
  },
  {
    id: "bagasse",
    title: "Bagasse Products",
    description: "Plant-fiber food packaging from sugarcane residue — sturdy, compostable, and food-safe.",
    icon: "Wheat",
  },
  {
    id: "paper-kraft",
    title: "Paper & Kraft Products",
    description: "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft.",
    icon: "Package",
  },
  {
    id: "wooden",
    title: "Wooden Products",
    description: "Natural wooden cutlery and serving items for cafés, catering, and takeaway brands.",
    icon: "TreePine",
  },
  {
    id: "styrofoam",
    title: "Styro Foam Products",
    description: "Insulated foam packaging for hot and cold food service where temperature retention matters.",
    icon: "Box",
  },
  {
    id: "aluminium",
    title: "Aluminium Products",
    description: "Foil containers and trays built for catering, bakeries, and high-volume kitchens.",
    icon: "Layers",
  },
  {
    id: "hygiene",
    title: "Hygiene Products",
    description: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations.",
    icon: "Droplets",
  },
  {
    id: "cleaning",
    title: "Cleaning Products",
    description: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean.",
    icon: "Sparkles",
  },
  {
    id: "plastic-bags-films",
    title: "Plastic Bags & Films",
    description: "Zipper bags, films, and flexible packaging for storage, retail, and food prep.",
    icon: "ShoppingBag",
  },
  {
    id: "plastic-products",
    title: "Plastic Products",
    description: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls.",
    icon: "CupSoda",
  },
] as const;

export const productsSectionTitle = "Our Products";

export const services = [
  {
    id: "biodegradable",
    title: "Biodegradable Packaging",
    description: "Designed to naturally decompose, reducing waste and supporting sustainability goals.",
    icon: "Recycle",
  },
  {
    id: "kraft",
    title: "Kraft Products",
    description: "Durable, versatile, recyclable options that balance quality with eco-consciousness.",
    icon: "PackageOpen",
  },
  {
    id: "pla",
    title: "PLA Solutions",
    description: "Plant-based packaging from renewable resources like cornstarch and sugarcane.",
    icon: "Sprout",
  },
] as const;

export const faqs = [
  {
    question: "What types of eco-friendly packaging products do you offer?",
    answer:
      "We provide biodegradable items, durable Kraft products from recyclable paper, and PLA solutions made from renewable resources. Offerings include food containers, shopping bags, and customizable packaging for businesses across industries.",
  },
  {
    question: "What makes Realpack's products environmentally friendly?",
    answer:
      "Our products are made from renewable and biodegradable materials, with a focus on reducing carbon footprints and promoting sustainable practices.",
  },
  {
    question: "Do you offer customized packaging solutions?",
    answer:
      "Yes. We collaborate with clients to design and create tailored packaging that aligns with unique business needs.",
  },
  {
    question: "What industries do you cater to?",
    answer:
      "We serve food and beverage, retail, healthcare, e-commerce, and more.",
  },
  {
    question: "Where do you deliver your products?",
    answer:
      "We deliver across the UAE and are expanding our network across Qatar, Bahrain, and other regions.",
  },
  {
    question: "How can I place an order with Realpack?",
    answer:
      "Contact us by phone at +971 52 790 6070 or email info@realpackpackaging.com. Our team will guide you through the process.",
  },
  {
    question: "Are your products compliant with international standards?",
    answer:
      "Yes. Our products adhere to strict international standards for quality, durability, and environmental sustainability.",
  },
] as const;

export const inquiryTypes = ["Product", "Service"] as const;

export const productOptions = products.map((p) => p.title);
export const serviceOptions = services.map((s) => s.title);

export const footerContent = {
  quickLinks: navLinks,
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  ],
  copyright: "© Realpack Packaging LLC. All Rights Reserved",
} as const;
