"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

const hiddenVariants: Record<RevealVariant, string> = {
  up: "translate-y-10 opacity-0 blur-[2px]",
  down: "-translate-y-10 opacity-0 blur-[2px]",
  left: "translate-x-10 opacity-0 blur-[2px]",
  right: "-translate-x-10 opacity-0 blur-[2px]",
  scale: "scale-95 opacity-0",
  fade: "opacity-0",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : hiddenVariants[variant]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
