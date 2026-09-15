import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCatalog from "@/components/ProductCatalog";
import FeaturedSlider from "@/components/FeaturedSlider";
import SolutionsGrid from "@/components/SolutionsGrid";
import type { SiteContent } from "@/lib/site-content";

interface ProductsServicesProps {
  about: SiteContent["about"];
  vision: SiteContent["vision"];
  mission: SiteContent["mission"];
  productsList: SiteContent["products"];
  servicesList: SiteContent["services"];
  featuredList: SiteContent["featured"];
  productsTitle: string;
  productsDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  featuredTitle: string;
  featuredDescription: string;
  viewDetailsLabel: string;
  availableInLabel: string;
  closeLabel: string;
}

export function ProductsServicesContent({
  about,
  vision,
  mission,
  productsList,
  servicesList,
  featuredList,
  productsTitle,
  productsDescription,
  servicesTitle,
  servicesDescription,
  featuredTitle,
  featuredDescription,
  viewDetailsLabel,
  availableInLabel,
  closeLabel,
}: ProductsServicesProps) {
  return (
    <>
      <section id="about" className="relative overflow-hidden bg-slate-50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] bg-white lg:min-h-[520px]">
            <Image
              src={about.imageUrl}
              alt={about.imageAlt}
              fill
              className="object-contain object-center p-4 sm:p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
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
              {about.extra ? (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                  {about.extra}
                </p>
              ) : null}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal variant="up">
            <h3 className="text-2xl font-bold text-accent-light">{vision.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-200">{vision.text}</p>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={100}>
            <h3 className="text-2xl font-bold text-accent-light">{mission.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-200">{mission.text}</p>
          </ScrollReveal>
        </div>
      </section>

      <ProductCatalog
        title={productsTitle}
        description={productsDescription}
        items={productsList}
        viewDetailsLabel={viewDetailsLabel}
        availableInLabel={availableInLabel}
        closeLabel={closeLabel}
      />

      <div id="featured">
        <FeaturedSlider
          title={featuredTitle}
          description={featuredDescription}
          items={featuredList}
        />
      </div>

      <SolutionsGrid
        title={servicesTitle}
        description={servicesDescription}
        items={servicesList}
        viewDetailsLabel={viewDetailsLabel}
        closeLabel={closeLabel}
      />
    </>
  );
}

export default function ProductsServices() {
  return null;
}
