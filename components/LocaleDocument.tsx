"use client";

import { useEffect } from "react";

export default function LocaleDocument({
  locale,
  dir,
}: {
  locale: string;
  dir: "ltr" | "rtl";
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("locale-ar", locale === "ar");
  }, [locale, dir]);

  return null;
}
