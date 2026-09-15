"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import Logo from "@/components/Logo";
import type { SiteContent } from "@/lib/site-content";
import { localeNames, supportedLocales, type SiteLocale } from "@/lib/i18n";

function resolveHref(locale: string, href: string) {
  return href.startsWith("#") ? `/${locale}${href}` : href;
}

interface NavbarProps {
  navItems?: SiteContent["nav"];
  locale?: SiteLocale;
  ctaLabel?: string;
}

export default function Navbar({
  navItems = navLinks,
  locale = "en",
  ctaLabel = "Contact Us",
}: NavbarProps) {
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
            ? "border-forest/10 bg-paper/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-paper"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link href={`/${locale}#home`} className="flex shrink-0 items-center" onClick={closeMenu}>
            <Logo showTagline />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={resolveHref(locale, link.href)}
                  className="nav-link py-0.5 text-sm font-medium text-forest transition-colors duration-300 hover:text-leaf"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            {supportedLocales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  locale === code
                    ? "bg-forest text-white"
                    : "text-forest/70 hover:bg-mist hover:text-forest"
                }`}
              >
                {localeNames[code]}
              </Link>
            ))}
            <Link
              href={`/${locale}#contact`}
              className="btn-shine rounded-md bg-forest px-3.5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-leaf"
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1.5 text-forest transition-all duration-300 hover:bg-mist lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-forest/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-80 flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-4 py-3">
          <Logo showTagline />
          <button
            type="button"
            className="rounded-md p-2 text-forest transition-colors hover:bg-mist"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          <li className="mb-2 flex gap-2">
            {supportedLocales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                onClick={closeMenu}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  locale === code
                    ? "bg-forest text-white"
                    : "bg-mist text-forest hover:bg-leaf/20"
                }`}
              >
                {localeNames[code]}
              </Link>
            ))}
          </li>
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveHref(locale, link.href)}
                className="block rounded-md px-4 py-3.5 text-base font-medium text-forest transition-all duration-300 hover:bg-mist hover:text-leaf"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-forest/10 p-4">
          <Link
            href={`/${locale}#contact`}
            onClick={closeMenu}
            className="flex w-full items-center justify-center rounded-md bg-forest py-3.5 text-sm font-semibold text-white transition-colors hover:bg-leaf"
          >
            {ctaLabel}
          </Link>
        </div>
      </aside>
    </>
  );
}
