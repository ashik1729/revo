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
  Recycle,
  PackageOpen,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { products, services, aboutContent, productsSectionTitle } from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
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
  Recycle,
  PackageOpen,
  Sprout,
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
    <ScrollReveal delay={delay} variant="up">
      <article className="group h-full border-b border-forest/10 pb-6 transition-colors duration-300 hover:border-leaf/40">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-mist text-forest transition-colors duration-300 group-hover:bg-leaf group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg font-semibold text-forest">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-forest/70">{description}</p>
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
  servicesTitle = "Sustainable Focus",
}: ProductsServicesProps = {}) {
  return (
    <>
      <section id="products" className="section-atmosphere relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Catalogue"
            title={productsTitle}
            description="Eco range, bagasse, kraft, aluminium, hygiene, cleaning, and specialty packaging for F&B and retail."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-forest py-20 text-white">
        <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <ScrollReveal variant="up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist">Who We Are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {about.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{about.description}</p>
          </ScrollReveal>

          <div className="grid gap-6">
            {servicesList.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Sprout;
              return (
                <ScrollReveal key={service.id} delay={index * 80} variant="up">
                  <div className="border-l-2 border-leaf/70 pl-5">
                    <div className="mb-2 flex items-center gap-2 text-mist">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em]">{servicesTitle}</p>
                    </div>
                    <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{service.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
