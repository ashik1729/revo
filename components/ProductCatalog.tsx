"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  details: string;
  imageUrl: string;
  imageAlt: string;
  sizes?: readonly string[];
}

interface ProductCatalogProps {
  title: string;
  description: string;
  items: ReadonlyArray<CatalogItem>;
  viewDetailsLabel: string;
  availableInLabel: string;
  closeLabel: string;
}

export default function ProductCatalog({
  title,
  description,
  items,
  viewDetailsLabel,
  availableInLabel,
  closeLabel,
}: ProductCatalogProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<CatalogItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const scrollByCard = (direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = Math.min(360, node.clientWidth * 0.8);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="products" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Catalogue</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Scroll products left"
              className="rounded-full border border-slate-200 bg-white p-2 text-navy transition hover:border-accent hover:text-accent"
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll products right"
              className="rounded-full border border-slate-200 bg-white p-2 text-navy transition hover:border-accent hover:text-accent"
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="group w-[78%] shrink-0 snap-start overflow-hidden border border-slate-200 bg-white sm:w-[46%] lg:w-[31%] xl:w-[23%]"
            >
              <div className="relative aspect-square bg-slate-50">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 23vw"
                />
              </div>
              <div className="space-y-3 p-4">
                <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <button
                  type="button"
                  className="text-sm font-semibold text-accent transition hover:text-accent-hover"
                  onClick={() => setActive(item)}
                >
                  {viewDetailsLabel} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={closeLabel}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-navy shadow"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px] bg-slate-50 md:min-h-full">
                <Image
                  src={active.imageUrl}
                  alt={active.imageAlt}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <h3 id="product-modal-title" className="text-2xl font-bold text-navy">
                  {active.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{active.description}</p>
                <p className="text-sm leading-relaxed text-slate-700">{active.details}</p>
                {active.sizes && active.sizes.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {availableInLabel}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {active.sizes.map((size) => (
                        <li
                          key={size}
                          className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-navy"
                        >
                          {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
