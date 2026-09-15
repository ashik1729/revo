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

const SLIDE_MS = 6500;

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

function AnimatedHeadline({ text, animKey }: { text: string; animKey: number }) {
  const words = text.split(" ");
  return (
    <h1
      key={`headline-${animKey}`}
      className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white [perspective:600px] sm:text-3xl lg:text-[2.75rem] lg:leading-[1.15]"
    >
      {words.map((word, i) => (
        <span
          key={`${animKey}-${i}-${word}`}
          className="hero-word inline-block opacity-0"
          style={{ animationDelay: `${180 + i * 70}ms` }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
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
  const [paused, setPaused] = useState(false);
  const total = slides.length || 1;
  const isRtl = locale === "ar";

  useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [total, paused, index]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 sm:items-center sm:pb-24 sm:pt-24"
      aria-label="Hero banner"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((item, i) => (
        <div
          key={item.imageUrl}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            priority={i === 0}
            className={`object-cover ${i === index ? "hero-ken-burns" : "scale-105"}`}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
      <div
        className={`absolute inset-0 ${
          isRtl
            ? "bg-gradient-to-l from-navy/90 via-navy/45 to-transparent"
            : "bg-gradient-to-r from-navy/90 via-navy/45 to-transparent"
        }`}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="hero-brand text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {brandName}
          </p>

          <div key={`copy-${index}`} className="mt-5">
            <p
              className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.22em] text-accent-light opacity-0"
              style={{ animationDelay: "60ms" }}
            >
              {slide.eyebrow}
            </p>

            <AnimatedHeadline text={slide.headline} animKey={index} />

            <p
              className="hero-sub mt-5 max-w-2xl text-base leading-relaxed text-slate-100 opacity-0 sm:text-lg"
              style={{ animationDelay: "520ms" }}
            >
              {slide.subheadline}
            </p>
          </div>

          <div
            key={`cta-${index}`}
            className="hero-cta mt-9 flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center"
            style={{ animationDelay: "680ms" }}
          >
            <Link
              href={resolveHref(locale, ctaHref)}
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              {ctaLabel}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                  isRtl ? "rotate-180 group-hover:-translate-x-1" : ""
                }`}
              />
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
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-flex"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex w-[min(90%,28rem)] -translate-x-1/2 flex-col items-center gap-3">
            <div className="flex gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.imageUrl}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-9 bg-accent" : "w-2.5 bg-white/45 hover:bg-white/80"
                  }`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                key={`progress-${index}`}
                className={`h-full bg-accent hero-progress ${paused ? "hero-progress-paused" : ""}`}
              />
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
