import { companyInfo } from "@/data/content";

interface LogoProps {
  className?: string;
  variant?: "default" | "footer" | "hero";
  companyName?: string;
  showTagline?: boolean;
}

export default function Logo({
  className = "",
  variant = "default",
  companyName = companyInfo.name,
  showTagline = false,
}: LogoProps) {
  const isLight = variant === "footer" || variant === "hero";

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-display text-2xl font-semibold tracking-tight ${
          isLight ? "text-white" : "text-forest"
        }`}
      >
        {companyName}
      </span>
      {showTagline ? (
        <span
          className={`mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] ${
            isLight ? "text-mist" : "text-leaf"
          }`}
        >
          Packaging
        </span>
      ) : null}
    </span>
  );
}
