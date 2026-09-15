import ScrollReveal from "@/components/ScrollReveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <ScrollReveal className={`mb-12 max-w-3xl ${alignClass} ${className}`}>
      {label && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-leaf">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-16 bg-leaf ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-forest/70 sm:text-lg">{description}</p>
      )}
    </ScrollReveal>
  );
}
