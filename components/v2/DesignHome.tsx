import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroV2 from "@/components/v2/HeroV2";
import AboutV2 from "@/components/v2/AboutV2";
import ProductsGridV2 from "@/components/v2/ProductsGridV2";
import PopularV2 from "@/components/v2/PopularV2";
import SolutionsV2 from "@/components/v2/SolutionsV2";
import ContactV2 from "@/components/v2/ContactV2";
import type { SiteContent } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/i18n";

interface DesignHomeProps {
  content: SiteContent;
  locale: SiteLocale;
}

export default function DesignHome({ content, locale }: DesignHomeProps) {
  const productTitles = content.products.map((item) => item.title);
  const serviceTitles = content.services.map((item) => item.title);

  const featuredTitle =
    locale === "ar" ? "المنتجات الشائعة" : "Popular Items";
  const featuredDescription =
    locale === "ar"
      ? "منتجات جاهزة للطلب مع تفاصيل كاملة عند الطلب."
      : "Ready-to-order packaging picks — tap for full details and sizes.";
  const productsDescription =
    locale === "ar"
      ? "تصميم تغليف بسيط لكل قطاع بطريقة عصرية ومستدامة."
      : "Simple packaging design for every sector in a modern and sustainable way.";

  return (
    <div className="design-v2">
      <TopBar company={content.company} />
      <Navbar
        navItems={content.nav}
        locale={locale}
        ctaLabel={locale === "ar" ? "طلب عرض سعر" : "Get a Quick Quote"}
      />
      <main>
        <HeroV2
          brandName={content.company.name}
          locale={locale}
          ctaLabel={locale === "ar" ? "تسوق صديق للبيئة" : "Shop Eco-friendly"}
          ctaHref={content.hero.ctaHref}
          secondaryCtaLabel={
            locale === "ar" ? "حلول الأعمال" : "Business Solutions"
          }
          secondaryCtaHref={content.hero.secondaryCtaHref}
          trustBadges={content.hero.trustBadges}
          slides={content.hero.slides}
        />
        <AboutV2
          about={content.about}
          vision={content.vision}
          mission={content.mission}
          locale={locale}
          readMoreLabel={locale === "ar" ? "اقرأ المزيد" : "Read More"}
        />
        <ProductsGridV2
          title={content.productsSectionTitle}
          description={productsDescription}
          items={content.products}
          viewDetailsLabel={content.ui.viewDetailsLabel}
          closeLabel={content.ui.closeLabel}
        />
        <PopularV2
          title={featuredTitle}
          description={featuredDescription}
          items={content.featured}
          viewDetailsLabel={content.ui.viewDetailsLabel}
          availableInLabel={content.ui.availableInLabel}
          closeLabel={content.ui.closeLabel}
          locale={locale}
          viewAllLabel={
            locale === "ar" ? "عرض كل الكتالوج" : "View All Product Catalog"
          }
        />
        <SolutionsV2
          title={content.servicesSectionTitle}
          description={content.servicesSectionDescription}
          items={content.services}
          viewDetailsLabel={content.ui.viewDetailsLabel}
          closeLabel={content.ui.closeLabel}
        />
        <FaqSection
          items={content.faqs}
          title={content.faqSectionTitle}
          description={content.faqSectionDescription}
        />
        <ContactV2
          company={content.company}
          productItems={productTitles}
          serviceItems={serviceTitles}
          title={content.contact.title}
          description={content.contact.description}
        />
      </main>
      <Footer company={content.company} footer={content.footer} locale={locale} />
      <WhatsAppButton company={content.company} />
    </div>
  );
}
