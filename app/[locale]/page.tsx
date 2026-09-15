import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ProductsServicesContent } from "@/components/ProductsServices";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
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
  const productTitles = content.products.map((item) => item.title);
  const serviceTitles = content.services.map((item) => item.title);

  return (
    <>
      <TopBar company={content.company} />
      <Navbar navItems={content.nav} locale={locale} ctaLabel={content.hero.ctaLabel} />
      <main>
        <Hero content={content.hero} brandName={content.company.name} locale={locale} />
        <ProductsServicesContent
          about={content.about}
          vision={content.vision}
          mission={content.mission}
          productsList={content.products}
          servicesList={content.services}
          productsTitle={content.productsSectionTitle}
          productsDescription={content.productsSectionDescription}
          servicesTitle={content.servicesSectionTitle}
          servicesDescription={content.servicesSectionDescription}
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
