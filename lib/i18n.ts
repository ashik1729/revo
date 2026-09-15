export const supportedLocales = ["en", "ar"] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export const defaultLocale: SiteLocale = "en";

export function isSupportedLocale(value: string): value is SiteLocale {
  return supportedLocales.includes(value as SiteLocale);
}

export const localeNames: Record<SiteLocale, string> = {
  en: "English",
  ar: "Arabic",
};
