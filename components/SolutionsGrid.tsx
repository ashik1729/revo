"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { CatalogItem } from "@/components/ProductCatalog";

interface SolutionsGridProps {
  title: string;
  description: string;
  items: ReadonlyArray<CatalogItem>;
  viewDetailsLabel: string;
  closeLabel: string;
}

export default function SolutionsGrid({
  title,
  description,
  items,
  viewDetailsLabel,
  closeLabel,
}: SolutionsGridProps) {
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

  return (
    <section id="solutions" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-slate-50">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                <button
                  type="button"
                  className="text-sm font-semibold text-accent hover:text-accent-hover"
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
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={closeLabel}
              className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-navy"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative mb-5 aspect-[16/10] bg-slate-50">
              <Image
                src={active.imageUrl}
                alt={active.imageAlt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
            <h3 className="text-2xl font-bold text-navy">{active.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{active.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{active.details}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
