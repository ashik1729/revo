import {
  Leaf,
  Wheat,
  Package,
  TreePine,
  Box,
  Layers,
  Droplets,
  Sparkles,
  ShoppingBag,
  CupSoda,
  Building2,
  AirVent,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { products, services, aboutContent, productsSectionTitle } from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import type { SiteContent } from "@/lib/site-content";

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Wheat,
  Package,
  TreePine,
  Box,
  Layers,
  Droplets,
  Sparkles,
  ShoppingBag,
  CupSoda,
  Building2,
  AirVent,
  Settings2,
};

interface ItemCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

function ItemCard({ title, description, icon, delay = 0 }: ItemCardProps) {
  const Icon = iconMap[icon] ?? Package;

  return (
    <ScrollReveal delay={delay} variant="scale">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-xl hover:shadow-navy/5">
        <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-navy to-accent transition-transform duration-500 group-hover:scale-x-100" />
        <IconBox icon={Icon} className="mb-5" />
        <h3 className="text-base font-semibold text-navy transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="mt-4 text-xs font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          Learn more →
        </span>
      </article>
    </ScrollReveal>
  );
}

export default function ProductsServices() {
  return <ProductsServicesContent />;
}

interface ProductsServicesProps {
  about?: SiteContent["about"];
  productsList?: SiteContent["products"];
  servicesList?: SiteContent["services"];
  productsTitle?: string;
  servicesTitle?: string;
}

export function ProductsServicesContent({
  about = aboutContent,
  productsList = products,
  servicesList = services,
  productsTitle = productsSectionTitle,
  servicesTitle = "Services",
}: ProductsServicesProps = {}) {
  return (
    <>
      <section id="about" className="section-gradient relative overflow-hidden pt-20 pb-4">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Who We Are"
            title={about.title}
            description={about.description}
            className="mb-0"
          />
        </div>
      </section>

      <section id="products" className="relative bg-white pt-4 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Offer"
            title="Products & Services"
            description="Eco-friendly hospitality packaging and facility maintenance solutions tailored to your business"
          />

          <ScrollReveal variant="up" className="mb-8 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-navy to-accent" />
              <h3 className="text-2xl font-bold text-navy">{productsTitle}</h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {productsList.map((product, index) => (
                <ItemCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  icon={product.icon}
                  delay={index * 40}
                />
              ))}
            </div>
          </ScrollReveal>

          <div id="services">
            <ScrollReveal
              variant="up"
              delay={100}
              className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-navy to-accent" />
                <h3 className="text-2xl font-bold text-navy">{servicesTitle}</h3>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {servicesList.map((service, index) => (
                  <ItemCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    delay={index * 80}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
