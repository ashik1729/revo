"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { CatalogItem } from "@/components/ProductCatalog";

const badges = ["Best Seller", "Eco Friendly", "Popular", "In Demand", "Top Pick", "New"];

interface PopularV2Props {
  title: string;
  description: string;
  items: ReadonlyArray<CatalogItem>;
  viewDetailsLabel: string;
  availableInLabel: string;
  closeLabel: string;
  locale: string;
  viewAllLabel?: string;
}

export default function PopularV2({
  title,
  description,
  items,
  viewDetailsLabel,
  availableInLabel,
  closeLabel,
  locale,
  viewAllLabel = "View All Product Catalog",
}: PopularV2Props) {
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
    <section id="featured" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-base text-slate-600">{description}</p>
          </div>
          <Link
            href={`/${locale}#products`}
            className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
          >
            {viewAllLabel} →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-slate-50">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#1a7a4c] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {badges[i % badges.length]}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    Available
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-slate-600">{item.description}</p>
                {item.sizes?.length ? (
                  <p className="text-xs text-slate-500">
                    {availableInLabel}: {item.sizes.slice(0, 3).join(" · ")}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#132a6e]"
                >
                  {viewDetailsLabel}
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
          </div>
        </div>
      ) : null}
    </section>
  );
}
