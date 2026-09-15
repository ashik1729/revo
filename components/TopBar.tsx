import { MapPin, Phone, Mail } from "lucide-react";
import { companyInfo, locations } from "@/data/content";
import type { SiteContent } from "@/lib/site-content";

interface TopBarProps {
  company?: SiteContent["company"];
  locationItems?: SiteContent["locations"];
}

export default function TopBar({
  company = companyInfo,
  locationItems = locations,
}: TopBarProps) {
  return (
    <div className="animate-slide-down bg-forest-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-mist">
          {locationItems.map((location) => (
            <span key={location.id} className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-leaf" strokeWidth={1.5} aria-hidden="true" />
              <span>
                {location.city}, {location.country}
              </span>
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={company.phoneHref}
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-mist"
            aria-label={`Call us at ${company.phone}`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-leaf" strokeWidth={1.5} aria-hidden="true" />
            <span>{company.phone}</span>
          </a>
          <a
            href={company.emailHref}
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-mist"
            aria-label={`Email us at ${company.email}`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-leaf" strokeWidth={1.5} aria-hidden="true" />
            <span>{company.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
