import LocaleDocument from "@/components/LocaleDocument";
import { isSupportedLocale } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  if (!isSupportedLocale(locale)) {
    return children;
  }

  return (
    <>
      <LocaleDocument locale={locale} dir={dir} />
      <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : undefined}>
        {children}
      </div>
    </>
  );
}
