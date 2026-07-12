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
  eyebrow: "Hospitality & Maintenance Solutions",
  headline: "Integrated Hospitality & Building Maintenance Solutions",
  subheadline:
    "Specialists in hospitality packaging and supply solutions for hotels, resorts, and facilities — delivering quality products, reliable bulk supply, and tailored packaging across Qatar.",
  ctaLabel: "Get a Quote",
  ctaHref: "#contact",
  imageUrl:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
  imageAlt: "Warehouse with hospitality packaging boxes and industrial supply storage",
  trustBadges: [
    { icon: "ShieldCheck", label: "Quality Packaging" },
    { icon: "Truck", label: "Reliable Supply" },
    { icon: "Award", label: "Hospitality Expertise" },
  ],
} as const;

export const aboutContent = {
  title: "About Revo Qatar",
  description:
    "Revo Qatar is a trusted partner for hotels, facilities, and businesses across Qatar. We provide comprehensive hospitality products, facility management supplies, and professional building maintenance services — backed by quality, reliability, and responsive support.",
} as const;

export const products = [
  {
    id: "guest-room-supplies",
    title: "Guest Room Supplies",
    description: "Essential amenities and supplies to enhance every guest room experience.",
    icon: "BedDouble",
  },
  {
    id: "housekeeping-supplies",
    title: "Housekeeping Supplies",
    description: "Professional cleaning and housekeeping products for spotless operations.",
    icon: "Sparkles",
  },
  {
    id: "hotel-furniture",
    title: "Hotel Furniture",
    description: "Durable, stylish furniture designed for hospitality environments.",
    icon: "Sofa",
  },
  {
    id: "hvac-solutions",
    title: "HVAC Solutions",
    description: "Climate control products and systems for comfort and efficiency.",
    icon: "AirVent",
  },
  {
    id: "washroom-solutions",
    title: "Washroom Solutions",
    description: "Complete washroom fittings, dispensers, and hygiene essentials.",
    icon: "Bath",
  },
  {
    id: "facility-management-supplies",
    title: "Facility Management Supplies",
    description: "Tools and supplies to keep your facility running smoothly.",
    icon: "ClipboardList",
  },
  {
    id: "storage-material-handling",
    title: "Storage & Material Handling",
    description: "Storage systems and handling equipment for organized operations.",
    icon: "Warehouse",
  },
  {
    id: "spare-parts-maintenance",
    title: "Spare Parts & Maintenance Accessories",
    description: "Reliable spare parts and accessories for ongoing maintenance needs.",
    icon: "Wrench",
  },
] as const;

export const productsSectionTitle = "Hospitality Products";

export const services = [
  {
    id: "building-maintenance",
    title: "Building Maintenance",
    description: "Comprehensive upkeep to keep your facilities running smoothly.",
    icon: "Building2",
  },
  {
    id: "hvac",
    title: "HVAC",
    description: "Heating, ventilation, and air conditioning installation and service.",
    icon: "AirVent",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Professional installation services for equipment and systems.",
    icon: "Settings2",
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
