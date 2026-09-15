"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import type { CatalogItem } from "@/components/ProductCatalog";

interface ProductsGridV2Props {
  title: string;
  description: string;
  items: ReadonlyArray<CatalogItem>;
  viewDetailsLabel: string;
  closeLabel: string;
}

export default function ProductsGridV2({
  title,
  description,
  items,
  viewDetailsLabel,
  closeLabel,
}: ProductsGridV2Props) {
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
    <section id="products" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-slate-600">{description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square bg-white p-3">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-2 transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="space-y-2 p-4 pt-0">
                <h3 className="text-sm font-semibold leading-snug text-navy">{item.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
                >
                  {viewDetailsLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/55 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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
            <div className="relative mb-5 aspect-[16/10] rounded-2xl bg-slate-50">
              <Image
                src={active.imageUrl}
                alt={active.imageAlt}
                fill
                className="object-contain p-4"
                sizes="42rem"
              />
            </div>
            <h3 className="text-2xl font-bold text-navy">{active.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{active.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{active.details}</p>
            {active.sizes?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {active.sizes.map((size) => (
                  <li
                    key={size}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {size}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
