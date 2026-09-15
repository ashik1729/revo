"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  sizes?: readonly string[];
}

interface FeaturedSliderProps {
  title: string;
  description: string;
  items: ReadonlyArray<FeaturedItem>;
}

export default function FeaturedSlider({ title, description, items }: FeaturedSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(420, node.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous featured"
              className="rounded-full border border-slate-200 bg-white p-2 text-navy transition hover:border-accent hover:text-accent"
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next featured"
              className="rounded-full border border-slate-200 bg-white p-2 text-navy transition hover:border-accent hover:text-accent"
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="w-[85%] shrink-0 snap-start overflow-hidden border border-slate-200 bg-white sm:w-[48%] lg:w-[32%]"
            >
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                />
              </div>
              <div className="space-y-2 border-t border-slate-100 p-4">
                <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                {item.sizes && item.sizes.length > 0 ? (
                  <p className="text-xs text-slate-500">{item.sizes.join(" · ")}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
