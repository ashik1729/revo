"use client";

import { useState } from "react";
import Image from "next/image";
import { companyInfo } from "@/data/content";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  variant?: "default" | "footer";
  companyName?: string;
}

export default function Logo({
  width = 180,
  height = 41,
  className = "h-auto w-[180px]",
  priority = false,
  variant = "default",
  companyName = companyInfo.name,
}: LogoProps) {
  const [src, setSrc] = useState(variant === "footer" ? "/logo-footer.png" : "/logo.png");

  return (
    <Image
      src={src}
      alt={`${companyName} logo`}
      width={width}
      height={height}
      className={`block leading-none transition-transform duration-500 hover:scale-[1.02] ${className}`}
      priority={priority}
      onError={() => setSrc("/logo.svg")}
    />
  );
}
