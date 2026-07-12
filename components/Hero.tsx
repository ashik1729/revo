import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Award, type LucideIcon } from "lucide-react";
import { heroContent } from "@/data/content";

const trustIconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Truck,
  Award,
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
      aria-label="Hero banner"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroContent.imageUrl}
          alt={heroContent.imageAlt}
          fill
          priority
          className="animate-ken-burns object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-navy/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.25),transparent_55%)]" />

      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 animate-float rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-56 w-56 animate-float rounded-full bg-accent-light/10 blur-3xl [animation-delay:1.5s]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="opacity-0-start animate-fade-in-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-light" />
            {heroContent.eyebrow}
          </p>

          <h1 className="opacity-0-start animate-fade-in-up animate-delay-100 text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {heroContent.headline}
          </h1>

          <p className="opacity-0-start animate-fade-in-up animate-delay-200 mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            {heroContent.subheadline}
          </p>

          <div className="opacity-0-start animate-fade-in-up animate-delay-300 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={heroContent.ctaHref}
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/40"
            >
              {heroContent.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="opacity-0-start animate-fade-in-up animate-delay-500 mt-14 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
            {heroContent.trustBadges.map(({ icon, label }) => {
              const Icon = trustIconMap[icon] ?? ShieldCheck;
              return (
                <div
                  key={label}
                  className="flex items-center gap-3 text-sm text-slate-200 transition-colors duration-300 hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-accent-light" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
