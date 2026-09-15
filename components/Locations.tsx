import { MapPin } from "lucide-react";
import { locations } from "@/data/content";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/lib/site-content";

interface LocationsProps {
  items?: SiteContent["locations"];
  title?: string;
  description?: string;
}

export default function Locations({
  items = locations,
  title = "Our Locations",
  description = "Serving businesses across the UAE, Qatar, and Bahrain with reliable packaging supply.",
}: LocationsProps) {
  return (
    <section id="locations" className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Regional Presence" title={title} description={description} />

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((location, index) => (
            <ScrollReveal key={location.id} delay={index * 90} variant="up">
              <article className="h-full">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-mist text-forest">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-forest">
                  {location.city}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-leaf">
                  {location.country}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-forest/70">{location.address}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
