import Image from "next/image";
import {
  products,
  services,
  aboutContent,
  productsSectionTitle,
} from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/lib/site-content";

interface MediaCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  delay?: number;
  tall?: boolean;
}

function MediaCard({
  title,
  description,
  imageUrl,
  imageAlt,
  delay = 0,
  tall = false,
}: MediaCardProps) {
  return (
    <ScrollReveal delay={delay} variant="up">
      <article className="group relative overflow-hidden bg-navy">
        <div className={`relative ${tall ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-200/95">{description}</p>
        </div>
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
      <section id="about" className="relative overflow-hidden bg-slate-50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src={about.imageUrl}
              alt={about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex items-center px-4 py-16 sm:px-8 lg:px-14 lg:py-20">
            <ScrollReveal variant="up">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Who We Are
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {about.title}
              </h2>
              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-navy to-accent" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {about.description}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="products" className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Offer"
            title={productsTitle}
            description="Real product ranges for hotels, F&B, and facilities — shown as they look in supply."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {productsList.map((product, index) => (
              <MediaCard
                key={product.id}
                title={product.title}
                description={product.description}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                delay={index * 40}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Professional Support"
            title={servicesTitle}
            description="Facility services backed by experienced teams across Qatar."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {servicesList.map((service, index) => (
              <MediaCard
                key={service.id}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                imageAlt={service.imageAlt}
                delay={index * 80}
                tall
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
