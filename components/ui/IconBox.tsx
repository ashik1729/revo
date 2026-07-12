import { type LucideIcon } from "lucide-react";

interface IconBoxProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: { box: "h-10 w-10", icon: "h-4 w-4" },
  md: { box: "h-12 w-12", icon: "h-5 w-5" },
  lg: { box: "h-14 w-14", icon: "h-6 w-6" },
};

export default function IconBox({ icon: Icon, size = "md", className = "" }: IconBoxProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={`group/icon relative flex shrink-0 items-center justify-center rounded-lg ${sizes.box} icon-gradient text-white shadow-md shadow-navy/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/30 ${className}`}
    >
      <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100" />
      <Icon
        className={`relative ${sizes.icon} transition-transform duration-500 group-hover/icon:scale-110`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}
