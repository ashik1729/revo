import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ProductsServicesContent } from "@/components/ProductsServices";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import DesignHome from "@/components/v2/DesignHome";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getDesignVariant } from "@/lib/design";
import { getSiteContent } from "@/lib/site-content";
import { isSupportedLocale, supportedLocales, type SiteLocale } from "@/lib/i18n";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = await getSiteContent(locale as SiteLocale);
  const variant = getDesignVariant();

  if (variant === "v2") {
    return (
      <>
        <SeoJsonLd content={content} />
        <DesignHome content={content} locale={locale as SiteLocale} />
      </>
    );
  }

  const productTitles = content.products.map((item) => item.title);
  const serviceTitles = content.services.map((item) => item.title);

  return (
    <>
      <SeoJsonLd content={content} />
      <TopBar company={content.company} />
      <Navbar navItems={content.nav} locale={locale} ctaLabel={content.hero.ctaLabel} />
      <main>
        <Hero
          brandName={content.company.name}
          locale={locale}
          ctaLabel={content.hero.ctaLabel}
          ctaHref={content.hero.ctaHref}
          secondaryCtaLabel={content.hero.secondaryCtaLabel}
          secondaryCtaHref={content.hero.secondaryCtaHref}
          trustBadges={content.hero.trustBadges}
          slides={content.hero.slides}
        />
        <ProductsServicesContent
          about={content.about}
          vision={content.vision}
          mission={content.mission}
          productsList={content.products}
          servicesList={content.services}
          featuredList={content.featured}
          productsTitle={content.productsSectionTitle}
          productsDescription={content.productsSectionDescription}
          servicesTitle={content.servicesSectionTitle}
          servicesDescription={content.servicesSectionDescription}
          featuredTitle={content.featuredSectionTitle}
          featuredDescription={content.featuredSectionDescription}
          viewDetailsLabel={content.ui.viewDetailsLabel}
          availableInLabel={content.ui.availableInLabel}
          closeLabel={content.ui.closeLabel}
        />
        <FaqSection
          items={content.faqs}
          title={content.faqSectionTitle}
          description={content.faqSectionDescription}
        />
        <ContactForm
          company={content.company}
          productItems={productTitles}
          serviceItems={serviceTitles}
          title={content.contact.title}
          description={content.contact.description}
          bannerUrl={content.contact.bannerUrl}
          sideImageUrl={content.contact.sideImageUrl}
        />
      </main>
      <Footer company={content.company} footer={content.footer} locale={locale} />
      <WhatsAppButton company={content.company} />
    </>
  );
}
