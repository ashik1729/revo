import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/lib/site-content";

interface MediaCardProps {
  title: string;
  description: string;
  details?: string;
  imageUrl: string;
  imageAlt: string;
  delay?: number;
}

function MediaCard({
  title,
  description,
  details,
  imageUrl,
  imageAlt,
  delay = 0,
}: MediaCardProps) {
  return (
    <ScrollReveal delay={delay} variant="up">
      <article className="group relative h-full overflow-hidden bg-navy">
        <div className="relative aspect-[4/5]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-100">{description}</p>
          {details ? (
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{details}</p>
          ) : null}
        </div>
      </article>
    </ScrollReveal>
  );
}

interface ProductsServicesProps {
  about: SiteContent["about"];
  vision: SiteContent["vision"];
  mission: SiteContent["mission"];
  productsList: SiteContent["products"];
  servicesList: SiteContent["services"];
  productsTitle: string;
  productsDescription: string;
  servicesTitle: string;
  servicesDescription: string;
}

export function ProductsServicesContent({
  about,
  vision,
  mission,
  productsList,
  servicesList,
  productsTitle,
  productsDescription,
  servicesTitle,
  servicesDescription,
}: ProductsServicesProps) {
  return (
    <>
      <section id="about" className="relative overflow-hidden bg-slate-50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[340px] lg:min-h-[580px]">
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
              {about.extra ? (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                  {about.extra}
                </p>
              ) : null}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
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

      <section id="products" className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Catalogue"
            title={productsTitle}
            description={productsDescription}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {productsList.map((product, index) => (
              <MediaCard
                key={product.id}
                title={product.title}
                description={product.description}
                details={product.details}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                delay={index * 30}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="relative bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Choose Us"
            title={servicesTitle}
            description={servicesDescription}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {servicesList.map((service, index) => (
              <MediaCard
                key={service.id}
                title={service.title}
                description={service.description}
                details={service.details}
                imageUrl={service.imageUrl}
                imageAlt={service.imageAlt}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductsServices() {
  return null;
}
