import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/data/content";
import type { SiteContent } from "@/lib/site-content";

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

interface HeroProps {
  content?: SiteContent["hero"];
  locale?: string;
}

export default function Hero({ content = heroContent, locale = "en" }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-20"
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

      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="opacity-0-start animate-fade-in-up mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
            {content.eyebrow}
          </p>

          <h1 className="opacity-0-start animate-fade-in-up animate-delay-100 text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl lg:text-[2.85rem] lg:leading-tight">
            {content.headline}
          </h1>

          <p className="opacity-0-start animate-fade-in-up animate-delay-200 mt-6 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
            {content.subheadline}
          </p>

          <div className="opacity-0-start animate-fade-in-up animate-delay-300 mt-9">
            <Link
              href={resolveHref(locale, content.ctaHref)}
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              {content.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="opacity-0-start animate-fade-in-up animate-delay-400 mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-8 text-sm font-medium text-white/90">
            {content.trustBadges.map(({ label }) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
