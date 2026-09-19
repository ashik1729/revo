import type { Metadata } from "next";
import LocaleDocument from "@/components/LocaleDocument";
import Analytics from "@/components/Analytics";
import { isSupportedLocale, type SiteLocale } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/seo";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    return {};
  }
  const content = await getSiteContent(locale as SiteLocale);
  return buildPageMetadata(content);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  if (!isSupportedLocale(locale)) {
    return children;
  }

  const content = await getSiteContent(locale as SiteLocale);

  return (
    <>
      <LocaleDocument locale={locale} dir={dir} />
      <Analytics
        googleAnalyticsId={content.seo.googleAnalyticsId}
        googleTagManagerId={content.seo.googleTagManagerId}
      />
      <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : undefined}>
        {children}
      </div>
    </>
  );
}
