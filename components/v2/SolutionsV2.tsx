"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import type { CatalogItem } from "@/components/ProductCatalog";

interface SolutionsV2Props {
  title: string;
  description: string;
  items: ReadonlyArray<CatalogItem>;
  viewDetailsLabel: string;
  closeLabel: string;
}

const cardTints = ["bg-[#eef6ff]", "bg-[#eef8f2]", "bg-[#f5f3ff]"];

export default function SolutionsV2({
  title,
  description,
  items,
  viewDetailsLabel,
  closeLabel,
}: SolutionsV2Props) {
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
    <section id="solutions" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-slate-600">{description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={item.id}
              className={`rounded-2xl p-6 ${cardTints[i % cardTints.length]}`}
            >
              <div className="relative mb-4 h-28 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2563eb]"
              >
                {viewDetailsLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
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
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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
            <h3 className="pr-10 text-2xl font-bold text-navy">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{active.details}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
