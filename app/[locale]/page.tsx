import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ProductsServicesContent } from "@/components/ProductsServices";
import Locations from "@/components/Locations";
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
      <TopBar company={content.company} locationItems={content.locations} />
      <Navbar navItems={content.nav} locale={locale} ctaLabel={content.hero.ctaLabel} />
      <main>
        <Hero content={content.hero} locale={locale} brandName={content.company.name} />
        <ProductsServicesContent
          about={content.about}
          productsList={content.products}
          servicesList={content.services}
          productsTitle={content.productsSectionTitle}
          servicesTitle={content.servicesSectionTitle}
        />
        <Locations items={content.locations} />
        <FaqSection items={content.faqs} />
        <ContactForm
          company={content.company}
          productItems={productTitles}
          serviceItems={serviceTitles}
          title={content.contact.title}
          description={content.contact.description}
        />
      </main>
      <Footer
        company={content.company}
        footer={content.footer}
        locale={locale}
        locationItems={content.locations}
      />
      <WhatsAppButton company={content.company} />
    </>
  );
}
