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
    <ScrollReveal className={`mb-10 max-w-3xl ${alignClass} ${className}`}>
      {label && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      <div
        className={`mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-navy to-accent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {description && (
        <p className="mt-6 text-lg leading-relaxed text-slate-600">{description}</p>
      )}
    </ScrollReveal>
  );
}
