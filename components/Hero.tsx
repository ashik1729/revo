"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
}

interface HeroProps {
  brandName: string;
  locale?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  trustBadges: ReadonlyArray<{ label: string }>;
  slides: ReadonlyArray<HeroSlide>;
}

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

export default function Hero({
  brandName,
  locale = "en",
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref = "#products",
  trustBadges,
  slides,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length || 1;

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [total]);

  const slide = slides[index] ?? slides[0];

  if (!slide) return null;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-24"
      aria-label="Hero banner"
    >
      {slides.map((item, i) => (
        <div
          key={item.imageUrl}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {brandName}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.6rem] lg:leading-tight">
            {slide.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
            {slide.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={resolveHref(locale, ctaHref)}
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {secondaryCtaLabel ? (
              <Link
                href={resolveHref(locale, secondaryCtaHref)}
                className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-8 text-sm font-medium text-white/90">
            {trustBadges.map(({ label }) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
            onClick={() => setIndex((current) => (current - 1 + total) % total)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
            onClick={() => setIndex((current) => (current + 1) % total)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((item, i) => (
              <button
                key={item.imageUrl}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-accent" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
