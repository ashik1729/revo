"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? "border-slate-200/80 bg-white/95 shadow-lg shadow-navy/5 backdrop-blur-md"
            : "border-transparent bg-white shadow-sm"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-5 lg:px-6"
          aria-label="Main navigation"
        >
          <Link href="#home" className="flex shrink-0 items-center leading-none" onClick={closeMenu}>
            <Logo priority />
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link py-0.5 text-sm font-medium leading-none text-navy transition-colors duration-300 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="btn-shine hidden rounded-lg bg-navy px-3 py-1.5 text-sm font-semibold leading-none text-white shadow-md shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg md:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-1.5 text-navy transition-all duration-300 hover:bg-slate-100 md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-80 flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <Logo />
          <button
            type="button"
            className="rounded-lg p-2 text-navy transition-colors hover:bg-slate-100"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className="animate-fade-in-up opacity-0-start"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
            >
              <Link
                href={link.href}
                className="block rounded-lg px-4 py-3.5 text-base font-medium text-navy transition-all duration-300 hover:translate-x-1 hover:bg-slate-50 hover:text-accent"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-slate-200 p-4">
          <Link
            href="#contact"
            onClick={closeMenu}
            className="flex w-full items-center justify-center rounded-lg bg-navy py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            Get a Quote
          </Link>
        </div>
      </aside>
    </>
  );
}
