import Image from "next/image";
import Link from "next/link";
import { Eye, Target } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

interface AboutV2Props {
  about: SiteContent["about"];
  vision: SiteContent["vision"];
  mission: SiteContent["mission"];
  locale: string;
  readMoreLabel?: string;
}

const stats = [
  { value: "100+", label: "Products" },
  { value: "100%", label: "Satisfied Clients" },
  { value: "Doha", label: "Located" },
];

export default function AboutV2({
  about,
  vision,
  mission,
  locale,
  readMoreLabel = "Read More",
}: AboutV2Props) {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-50 shadow-lg shadow-slate-200/60">
          <div className="relative aspect-[4/3]">
            <Image
              src={about.imageUrl}
              alt={about.imageAlt}
              fill
              className="object-contain object-center p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a7a4c]">
            Who We Are
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {about.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">{about.description}</p>
          {about.extra ? (
            <p className="mt-3 text-base leading-relaxed text-slate-600">{about.extra}</p>
          ) : null}

          <Link
            href={`/${locale}#contact`}
            className="mt-6 inline-flex rounded-xl bg-[#1a7a4c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#14633e]"
          >
            {readMoreLabel}
          </Link>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-navy">{vision.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{vision.text}</p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a7a4c]/10 text-[#1a7a4c]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-navy">{mission.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{mission.text}</p>
            </article>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-navy sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
