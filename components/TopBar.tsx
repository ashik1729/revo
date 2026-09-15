import { MapPin, Phone, Mail } from "lucide-react";
import { companyInfo } from "@/data/content";
import type { SiteContent } from "@/lib/site-content";

interface TopBarProps {
  company?: SiteContent["company"];
}

export default function TopBar({ company = companyInfo }: TopBarProps) {
  return (
    <div className="animate-slide-down bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-1 px-4 py-1 text-xs sm:flex-row sm:items-center sm:px-5 lg:px-6">
        <div className="flex items-center gap-2.5 transition-colors duration-300 hover:text-accent-light">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-light" strokeWidth={1.5} aria-hidden="true" />
          <span>{company.address}</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href={company.phoneHref}
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-accent-light"
            aria-label={`Call us at ${company.phone}`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-accent-light transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
            <span>{company.phone}</span>
          </a>
          <a
            href={company.emailHref}
            className="group flex items-center gap-2 transition-colors duration-300 hover:text-accent-light"
            aria-label={`Email us at ${company.email}`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-accent-light transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
            <span>{company.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
