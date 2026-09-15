import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroContent, companyInfo } from "@/data/content";
import type { SiteContent } from "@/lib/site-content";

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

interface HeroProps {
  content?: SiteContent["hero"];
  locale?: string;
  brandName?: string;
}

export default function Hero({
  content = heroContent,
  locale = "en",
  brandName = companyInfo.name,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-36 sm:items-center sm:pb-24 sm:pt-28"
      aria-label="Hero banner"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={content.imageUrl}
          alt={content.imageAlt}
          fill
          priority
          className="animate-ken-burns object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest/75 to-forest/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(47,125,79,0.28),transparent_55%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="opacity-0-start animate-fade-in-up font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {brandName}
          </p>

          <h1 className="opacity-0-start animate-fade-in-up animate-delay-100 mt-5 max-w-2xl font-display text-2xl font-medium leading-snug text-mist sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
            {content.headline}
          </h1>

          <p className="opacity-0-start animate-fade-in-up animate-delay-200 mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {content.subheadline}
          </p>

          <div className="opacity-0-start animate-fade-in-up animate-delay-300 mt-9">
            <Link
              href={resolveHref(locale, content.ctaHref)}
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf-hover"
            >
              {content.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
