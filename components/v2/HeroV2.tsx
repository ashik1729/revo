"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Package,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

interface HeroV2Props {
  brandName: string;
  locale: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustBadges: ReadonlyArray<{ label: string }>;
  slides: SiteContent["hero"]["slides"];
}

const SLIDE_MS = 6000;

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

function highlightHeadline(text: string) {
  const match = text.match(/^(.*?)\b(Greener Tomorrow|غد أكثر خضرة)\b(.*)$/i);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <span className="text-[#5ec4a8]">{match[2]}</span>
      {match[3]}
    </>
  );
}

const badgeIcons = [Truck, Leaf, Package];

export default function HeroV2({
  brandName,
  locale,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  trustBadges,
  slides,
}: HeroV2Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length || 1;
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [total, index]);

  if (!slide) return null;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#071536] text-white"
      aria-label="Hero banner"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#1a7a4c]/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#93c5fd]">
            {brandName}
          </p>

          <div key={index} className="mt-5">
            <p
              className="v2-rise text-xs font-semibold uppercase tracking-[0.2em] text-[#5ec4a8] opacity-0"
              style={{ animationDelay: "40ms" }}
            >
              {slide.eyebrow}
            </p>
            <h1
              className="v2-rise mt-4 text-3xl font-bold leading-tight tracking-tight opacity-0 sm:text-4xl lg:text-5xl"
              style={{ animationDelay: "120ms" }}
            >
              {highlightHeadline(slide.headline)}
            </h1>
            <p
              className="v2-rise mt-5 max-w-xl text-base leading-relaxed text-slate-200 opacity-0 sm:text-lg"
              style={{ animationDelay: "260ms" }}
            >
              {slide.subheadline}
            </p>
          </div>

          <div
            key={`cta-${index}`}
            className="v2-rise mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animationDelay: "380ms" }}
          >
            <Link
              href={resolveHref(locale, ctaHref)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={resolveHref(locale, secondaryCtaHref)}
              className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              {secondaryCtaLabel}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {trustBadges.slice(0, 3).map(({ label }, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <div key={label} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#5ec4a8]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium leading-snug">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2563eb]/30 to-[#1a7a4c]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-2xl shadow-black/40">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
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
                    sizes="(max-width: 1024px) 90vw, 40vw"
                  />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#93c5fd]">
                  Latest range
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{slide.eyebrow}</p>
              </div>
            </div>
          </div>

          {total > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous slide"
                className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
                onClick={() => setIndex((current) => (current - 1 + total) % total)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {slides.map((item, i) => (
                  <button
                    key={item.imageUrl}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-7 bg-[#5ec4a8]" : "w-2 bg-white/40"
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next slide"
                className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
                onClick={() => setIndex((current) => (current + 1) % total)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
