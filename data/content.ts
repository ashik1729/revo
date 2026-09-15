export const companyInfo = {
  name: "Revo Qatar",
  tagline: "Hospitality & Building Maintenance Solutions You Can Trust",
  address: "Industrial Area, Doha, Qatar",
  phone: "+974 7071 8232",
  phoneHref: "tel:+97470718232",
  email: "info@revo.qa",
  emailHref: "mailto:info@revo.qa",
  whatsapp: "97470718232",
  whatsappHref: "https://wa.me/97470718232",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroContent = {
  eyebrow: "Hospitality Packaging & Maintenance",
  headline: "Integrated Hospitality & Building Maintenance Solutions",
  subheadline:
    "Specialists in eco-friendly hospitality packaging and facility supply for hotels, resorts, and businesses across Qatar — plus reliable building maintenance support.",
  ctaLabel: "Get a Quote",
  ctaHref: "#contact",
  imageUrl:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
  imageAlt: "Warehouse with hospitality packaging boxes and industrial supply storage",
  trustBadges: [
    { label: "Quality Packaging" },
    { label: "Reliable Supply" },
    { label: "Hospitality Expertise" },
  ],
} as const;

export const aboutContent = {
  title: "About Revo Qatar",
  description:
    "Revo Qatar is a trusted partner for hotels, facilities, and businesses across Qatar. We supply eco-friendly and cost-effective packaging — including biodegradable, Kraft, bagasse, aluminium, hygiene, and plastic ranges — alongside facility management supplies and professional building maintenance services.",
  imageUrl:
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Organized warehouse shelves with packaged goods ready for supply",
} as const;

export const products = [
  {
    id: "eco-range",
    title: "ECO Range Products",
    description: "Sustainable packaging designed to lower environmental impact without compromising performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Recycled paper and eco-friendly packaging materials",
  },
  {
    id: "bagasse",
    title: "Bagasse Products",
    description: "Plant-fiber food packaging from sugarcane residue — sturdy, compostable, and food-safe.",
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Takeaway food packed in disposable food containers",
  },
  {
    id: "paper-kraft",
    title: "Paper & Kraft Products",
    description: "Containers, boxes, cups, bags, wraps, trays, and tissue essentials in recyclable kraft.",
    imageUrl:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Stacked kraft paper packaging boxes",
  },
  {
    id: "wooden",
    title: "Wooden Products",
    description: "Natural wooden cutlery and serving items for cafés, catering, and hospitality brands.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c28d0fc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Kitchen tools and natural serving materials",
  },
  {
    id: "styrofoam",
    title: "Styro Foam Products",
    description: "Insulated foam packaging for hot and cold food service where temperature retention matters.",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Insulated takeaway meal containers",
  },
  {
    id: "aluminium",
    title: "Aluminium Products",
    description: "Foil containers and trays built for catering, bakeries, and high-volume kitchens.",
    imageUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Kitchen prep trays and catering cookware",
  },
  {
    id: "hygiene",
    title: "Hygiene Products",
    description: "Napkins, tissues, hats, and hygiene supplies for F&B and facility operations.",
    imageUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Clean towels and hygiene supplies",
  },
  {
    id: "cleaning",
    title: "Cleaning Products",
    description: "Dispensers and cleaning essentials that keep front-of-house and kitchens running clean.",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional cleaning supplies for facilities",
  },
  {
    id: "plastic-bags-films",
    title: "Plastic Bags & Films",
    description: "Zipper bags, films, and flexible packaging for storage, retail, and food prep.",
    imageUrl:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Transparent plastic packaging bags",
  },
  {
    id: "plastic-products",
    title: "Plastic Products",
    description: "Cups, lids, cutlery, microwavable containers, sushi trays, and salad bowls.",
    imageUrl:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Clear plastic cups for beverage service",
  },
] as const;

export const productsSectionTitle = "Hospitality Packaging Products";

export const services = [
  {
    id: "building-maintenance",
    title: "Building Maintenance",
    description: "Comprehensive upkeep to keep your facilities running smoothly.",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Technician performing building maintenance work",
  },
  {
    id: "hvac",
    title: "HVAC",
    description: "Heating, ventilation, and air conditioning installation and service.",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "HVAC technician servicing air conditioning equipment",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Professional installation services for equipment and systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Professional installer working on facility equipment",
  },
] as const;

export const faqs = [
  {
    question: "What types of eco-friendly packaging products do you offer?",
    answer:
      "We supply biodegradable items, durable Kraft products from recyclable paper, bagasse and PLA-style sustainable options, plus aluminium, hygiene, cleaning, and specialty plastic packaging for hospitality and F&B.",
  },
  {
    question: "What makes your packaging products environmentally friendly?",
    answer:
      "Many of our ranges use renewable and biodegradable materials, helping reduce carbon footprints while meeting day-to-day operational needs.",
  },
  {
    question: "Do you offer customized packaging solutions?",
    answer:
      "Yes. We work with clients to source and supply packaging that aligns with their brand and operational requirements.",
  },
  {
    question: "What industries do you cater to?",
    answer:
      "Hotels, resorts, F&B, facilities, and businesses across Qatar that need packaging supply and building maintenance support.",
  },
  {
    question: "Where do you deliver?",
    answer: "We deliver across Qatar, with responsive support for hospitality and facility clients.",
  },
  {
    question: "How can I place an order with Revo Qatar?",
    answer:
      "Contact us by phone at +974 7071 8232 or email info@revo.qa. Our team will guide you through the process.",
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
  copyright: "© 2026 Revo Qatar. All rights reserved.",
} as const;

/** Fallback images when CMS entries only store an icon key */
export const productImageById: Record<string, { imageUrl: string; imageAlt: string }> =
  Object.fromEntries(
    products.map((item) => [item.id, { imageUrl: item.imageUrl, imageAlt: item.imageAlt }]),
  );

export const serviceImageById: Record<string, { imageUrl: string; imageAlt: string }> =
  Object.fromEntries(
    services.map((item) => [item.id, { imageUrl: item.imageUrl, imageAlt: item.imageAlt }]),
  );

export const productImageByTitle: Record<string, { imageUrl: string; imageAlt: string }> =
  Object.fromEntries(
    products.map((item) => [item.title, { imageUrl: item.imageUrl, imageAlt: item.imageAlt }]),
  );

export const serviceImageByTitle: Record<string, { imageUrl: string; imageAlt: string }> =
  Object.fromEntries(
    services.map((item) => [item.title, { imageUrl: item.imageUrl, imageAlt: item.imageAlt }]),
  );
