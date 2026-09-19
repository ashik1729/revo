"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Sparkles,
  ExternalLink,
  X,
  Navigation,
  Images,
  Star,
  Share2,
} from "lucide-react";
import type { CmsCatalogItem, CmsDocument } from "@/lib/cms-store";
import type { SiteLocale } from "@/lib/i18n";
import { localeNames, supportedLocales } from "@/lib/i18n";
import { logoutAdmin } from "@/app/admin/login/actions";
import {
  saveCompany,
  saveLocaleCopy,
  upsertHeroSlide,
  deleteHeroSlide,
  upsertNavItem,
  deleteNavItem,
  upsertProduct,
  deleteProduct,
  upsertFeatured,
  deleteFeatured,
  upsertService,
  deleteService,
  upsertFaq,
  deleteFaq,
  upsertSocialLink,
  deleteSocialLink,
  resetCmsToDefaults,
} from "@/app/admin/actions";
import {
  DangerButton,
  EmptyState,
  Field,
  PanelHeader,
  SaveButton,
  adminInput,
  adminTextarea,
} from "@/components/admin/ui";
import ImageUploader from "@/components/admin/ImageUploader";

type SectionId =
  | "overview"
  | "company"
  | "content"
  | "slides"
  | "menu"
  | "products"
  | "featured"
  | "solutions"
  | "faqs"
  | "footer";

const nav = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "company" as const, label: "Company", icon: Building2 },
  { id: "content" as const, label: "Page Copy", icon: FileText },
  { id: "slides" as const, label: "Hero Slides", icon: Images },
  { id: "menu" as const, label: "Navigation", icon: Navigation },
  { id: "products" as const, label: "Products", icon: Package },
  { id: "featured" as const, label: "Featured", icon: Star },
  { id: "solutions" as const, label: "Solutions", icon: Sparkles },
  { id: "faqs" as const, label: "FAQs", icon: HelpCircle },
  { id: "footer" as const, label: "Footer", icon: Share2 },
];

interface AdminDashboardProps {
  locale: SiteLocale;
  doc: CmsDocument;
  cmsRemote: boolean;
}

export default function AdminDashboard({ locale, doc, cmsRemote }: AdminDashboardProps) {
  const [section, setSection] = useState<SectionId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const bundle = doc.locales[locale];
  const company = doc.company;

  const stats = [
    { label: "Slides", value: bundle.heroSlides.length, tone: "bg-sky-50 text-sky-700" },
    { label: "Products", value: bundle.products.length, tone: "bg-blue-50 text-blue-700" },
    { label: "Featured", value: bundle.featured.length, tone: "bg-amber-50 text-amber-700" },
    { label: "Solutions", value: bundle.services.length, tone: "bg-emerald-50 text-emerald-700" },
    { label: "FAQs", value: bundle.faqs.length, tone: "bg-violet-50 text-violet-700" },
    { label: "Menu links", value: bundle.nav.length, tone: "bg-orange-50 text-orange-700" },
  ];

  const activeLabel = nav.find((item) => item.id === section)?.label ?? "Overview";

  function selectSection(id: SectionId) {
    setSection(id);
    setMobileOpen(false);
  }

  const sidebarNav = (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {nav.map((item) => {
        const Icon = item.icon;
        const active = section === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => selectSection(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-white text-[#0b1f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200/80 bg-[#0b1f5c] text-white lg:flex">
          <div className="border-b border-white/10 px-5 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">
              Revo Trading
            </p>
            <h1 className="mt-2 text-lg font-semibold">Content Studio</h1>
            <p className="mt-1 text-xs text-blue-100/80">Manage site content & catalogue</p>
          </div>

          {sidebarNav}

          <div className="space-y-2 border-t border-white/10 p-4">
            <Link
              href={`/${locale}`}
              target="_blank"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              View live site
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </form>
          </div>
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/50"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-[#0b1f5c] text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <p className="font-semibold">Content Studio</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {sidebarNav}
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Dashboard
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900">{activeLabel}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-xl bg-slate-100 p-1">
                  {supportedLocales.map((code) => (
                    <Link
                      key={code}
                      href={`/admin?locale=${code}`}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        code === locale
                          ? "bg-white text-[#0b1f5c] shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {localeNames[code]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {section === "overview" ? (
              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-[#0b1f5c] via-[#12307a] to-[#1d4ed8] p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm text-blue-100">Welcome back</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        cmsRemote
                          ? "bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-300/40"
                          : "bg-amber-400/20 text-amber-100 ring-1 ring-amber-300/40"
                      }`}
                    >
                      {cmsRemote ? "Cloud KV connected" : "Local memory store"}
                    </span>
                  </div>
                  <h3 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                    Manage {company.name} website content
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm text-blue-100/90">
                    Editing language: <strong>{localeNames[locale]}</strong>. Switch EN/AR above, then
                    open a section from the sidebar.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSection("products")}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0b1f5c]"
                    >
                      Manage products
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection("content")}
                      className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Edit page copy
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                      <span
                        className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${stat.tone}`}
                      >
                        {localeNames[locale]} catalogue
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <PanelHeader title="Company snapshot" description="Public contact details" />
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Name</dt>
                        <dd className="font-medium text-slate-900">{company.name}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Phone</dt>
                        <dd className="font-medium text-slate-900">{company.phone}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Email</dt>
                        <dd className="font-medium text-slate-900">{company.email}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Address</dt>
                        <dd className="text-right font-medium text-slate-900">{company.address}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <PanelHeader
                      title="CMS storage"
                      description={
                        cmsRemote
                          ? "Edits persist in Cloudflare KV."
                          : "Edits are stored in process memory until KV is available."
                      }
                    />
                    <ul className="mb-5 space-y-3 text-sm text-slate-600">
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Switch language before editing page copy, slides, products, and FAQs.
                      </li>
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Company phone/email and image URLs are shared across both languages.
                      </li>
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Copyright text lives under Page Copy; social icons are under Footer.
                      </li>
                    </ul>
                    <form
                      action={resetCmsToDefaults}
                      onSubmit={(event) => {
                        if (
                          !window.confirm(
                            "Reset all CMS content to defaults? This cannot be undone.",
                          )
                        ) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="locale" value={locale} />
                      <DangerButton>Reset CMS to defaults</DangerButton>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}

            {section === "company" ? (
              <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                <PanelHeader
                  title="Company settings"
                  description="Shared across English and Arabic"
                />
                <form action={saveCompany} className="grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="locale" value={locale} />
                  <Field label="Company name">
                    <input
                      name="companyName"
                      defaultValue={company.name}
                      className={adminInput}
                      required
                    />
                  </Field>
                  <Field label="Address">
                    <input
                      name="address"
                      defaultValue={company.address}
                      className={adminInput}
                      required
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      name="phone"
                      defaultValue={company.phone}
                      className={adminInput}
                      required
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      name="email"
                      defaultValue={company.email}
                      className={adminInput}
                      required
                    />
                  </Field>
                  <Field label="WhatsApp (digits only)" className="sm:col-span-2">
                    <input
                      name="whatsapp"
                      defaultValue={company.whatsapp}
                      className={adminInput}
                      required
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <ImageUploader
                      name="heroImageUrl"
                      label="Hero / default banner image"
                      defaultValue={company.heroImageUrl}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <ImageUploader
                      name="aboutImageUrl"
                      label="About section image"
                      defaultValue={company.aboutImageUrl}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <ImageUploader
                      name="contactBannerUrl"
                      label="Contact banner image"
                      defaultValue={company.contactBannerUrl}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <ImageUploader
                      name="contactSideImageUrl"
                      label="Contact side image"
                      defaultValue={company.contactSideImageUrl}
                    />
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <SaveButton>Save company info</SaveButton>
                  </div>
                </form>
              </section>
            ) : null}

            {section === "content" ? (
              <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                <PanelHeader
                  title={`Page copy · ${localeNames[locale]}`}
                  description="Hero defaults, about, section titles, UI labels, and contact intro"
                />
                <form action={saveLocaleCopy} className="grid gap-5">
                  <input type="hidden" name="locale" value={locale} />

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Hero defaults
                    </h3>
                    <div className="grid gap-4">
                      <Field label="Tagline">
                        <input
                          name="tagline"
                          defaultValue={bundle.tagline}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Eyebrow">
                        <input
                          name="heroEyebrow"
                          defaultValue={bundle.heroEyebrow}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Headline">
                        <input
                          name="heroHeadline"
                          defaultValue={bundle.heroHeadline}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Subheadline">
                        <textarea
                          name="heroSubheadline"
                          defaultValue={bundle.heroSubheadline}
                          className={adminTextarea}
                          rows={3}
                          required
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Primary CTA label">
                          <input
                            name="heroCtaLabel"
                            defaultValue={bundle.heroCtaLabel}
                            className={adminInput}
                            required
                          />
                        </Field>
                        <Field label="Primary CTA href">
                          <input
                            name="heroCtaHref"
                            defaultValue={bundle.heroCtaHref}
                            className={adminInput}
                            required
                          />
                        </Field>
                        <Field label="Secondary CTA label">
                          <input
                            name="heroSecondaryCtaLabel"
                            defaultValue={bundle.heroSecondaryCtaLabel}
                            className={adminInput}
                          />
                        </Field>
                        <Field label="Secondary CTA href">
                          <input
                            name="heroSecondaryCtaHref"
                            defaultValue={bundle.heroSecondaryCtaHref}
                            className={adminInput}
                          />
                        </Field>
                      </div>
                      <Field label="Hero image alt">
                        <input
                          name="heroImageAlt"
                          defaultValue={bundle.heroImageAlt}
                          className={adminInput}
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="Trust badge 1">
                          <input
                            name="trustBadge1"
                            defaultValue={bundle.trustBadge1}
                            className={adminInput}
                          />
                        </Field>
                        <Field label="Trust badge 2">
                          <input
                            name="trustBadge2"
                            defaultValue={bundle.trustBadge2}
                            className={adminInput}
                          />
                        </Field>
                        <Field label="Trust badge 3">
                          <input
                            name="trustBadge3"
                            defaultValue={bundle.trustBadge3}
                            className={adminInput}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      About
                    </h3>
                    <div className="grid gap-4">
                      <Field label="About title">
                        <input
                          name="aboutTitle"
                          defaultValue={bundle.aboutTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="About description">
                        <textarea
                          name="aboutDescription"
                          defaultValue={bundle.aboutDescription}
                          className={adminTextarea}
                          rows={3}
                          required
                        />
                      </Field>
                      <Field label="About extra">
                        <textarea
                          name="aboutExtra"
                          defaultValue={bundle.aboutExtra}
                          className={adminTextarea}
                          rows={3}
                        />
                      </Field>
                      <Field label="About image alt">
                        <input
                          name="aboutImageAlt"
                          defaultValue={bundle.aboutImageAlt}
                          className={adminInput}
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Vision title">
                          <input
                            name="visionTitle"
                            defaultValue={bundle.visionTitle}
                            className={adminInput}
                          />
                        </Field>
                        <Field label="Mission title">
                          <input
                            name="missionTitle"
                            defaultValue={bundle.missionTitle}
                            className={adminInput}
                          />
                        </Field>
                      </div>
                      <Field label="Vision text">
                        <textarea
                          name="visionText"
                          defaultValue={bundle.visionText}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                      <Field label="Mission text">
                        <textarea
                          name="missionText"
                          defaultValue={bundle.missionText}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Sections
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Products section title">
                        <input
                          name="productsSectionTitle"
                          defaultValue={bundle.productsSectionTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Solutions section title">
                        <input
                          name="servicesSectionTitle"
                          defaultValue={bundle.servicesSectionTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Products section description" className="sm:col-span-2">
                        <textarea
                          name="productsSectionDescription"
                          defaultValue={bundle.productsSectionDescription}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                      <Field label="Solutions section description" className="sm:col-span-2">
                        <textarea
                          name="servicesSectionDescription"
                          defaultValue={bundle.servicesSectionDescription}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                      <Field label="Featured section title">
                        <input
                          name="featuredSectionTitle"
                          defaultValue={bundle.featuredSectionTitle}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Featured section description">
                        <input
                          name="featuredSectionDescription"
                          defaultValue={bundle.featuredSectionDescription}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="FAQ section title">
                        <input
                          name="faqSectionTitle"
                          defaultValue={bundle.faqSectionTitle}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="FAQ section description">
                        <input
                          name="faqSectionDescription"
                          defaultValue={bundle.faqSectionDescription}
                          className={adminInput}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      UI labels
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="View details label">
                        <input
                          name="viewDetailsLabel"
                          defaultValue={bundle.viewDetailsLabel}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Available in label">
                        <input
                          name="availableInLabel"
                          defaultValue={bundle.availableInLabel}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Close label">
                        <input
                          name="closeLabel"
                          defaultValue={bundle.closeLabel}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Copyright">
                        <input
                          name="copyright"
                          defaultValue={bundle.copyright}
                          className={adminInput}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Contact
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Contact title">
                        <input
                          name="contactTitle"
                          defaultValue={bundle.contactTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Contact description">
                        <input
                          name="contactDescription"
                          defaultValue={bundle.contactDescription}
                          className={adminInput}
                          required
                        />
                      </Field>
                    </div>
                  </div>

                  <SaveButton>Save page copy</SaveButton>
                </form>
              </section>
            ) : null}

            {section === "slides" ? (
              <section className="space-y-4">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                  <PanelHeader
                    title={`Hero slides · ${localeNames[locale]}`}
                    description="Carousel slides shown in the homepage hero"
                  />
                  {bundle.heroSlides.length === 0 ? (
                    <EmptyState
                      title="No hero slides yet"
                      description="Add a slide below. Fallback hero copy is used until slides exist."
                    />
                  ) : (
                    <div className="space-y-4">
                      {bundle.heroSlides.map((slide) => (
                        <div
                          key={slide.id}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60"
                        >
                          <div className="grid sm:grid-cols-[160px_1fr]">
                            <div className="relative min-h-[140px] bg-white">
                              {slide.imageUrl ? (
                                <Image
                                  src={slide.imageUrl}
                                  alt={slide.imageAlt || slide.headline}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                  sizes="160px"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <form action={upsertHeroSlide} className="grid gap-3">
                                <input type="hidden" name="locale" value={locale} />
                                <input type="hidden" name="itemId" value={slide.id} />
                                <ImageUploader
                                  name="imageUrl"
                                  label="Slide image"
                                  defaultValue={slide.imageUrl}
                                />
                                <Field label="Image alt">
                                  <input
                                    name="imageAlt"
                                    defaultValue={slide.imageAlt}
                                    className={adminInput}
                                  />
                                </Field>
                                <Field label="Eyebrow">
                                  <input
                                    name="eyebrow"
                                    defaultValue={slide.eyebrow}
                                    className={adminInput}
                                  />
                                </Field>
                                <Field label="Headline">
                                  <input
                                    name="headline"
                                    defaultValue={slide.headline}
                                    className={adminInput}
                                    required
                                  />
                                </Field>
                                <Field label="Subheadline">
                                  <textarea
                                    name="subheadline"
                                    defaultValue={slide.subheadline}
                                    rows={2}
                                    className={adminTextarea}
                                  />
                                </Field>
                                <SaveButton>Save slide</SaveButton>
                              </form>
                              <form action={deleteHeroSlide} className="mt-2">
                                <input type="hidden" name="locale" value={locale} />
                                <input type="hidden" name="itemId" value={slide.id} />
                                <DangerButton>Delete slide</DangerButton>
                              </form>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  action={upsertHeroSlide}
                  className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <p className="mb-4 text-sm font-semibold text-slate-800">Add hero slide</p>
                  <div className="mb-3">
                    <ImageUploader name="imageUrl" label="Slide image" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="imageAlt" placeholder="Image alt" className={adminInput} />
                    <input name="eyebrow" placeholder="Eyebrow" className={adminInput} />
                    <input name="headline" placeholder="Headline" className={adminInput} required />
                  </div>
                  <textarea
                    name="subheadline"
                    placeholder="Subheadline"
                    rows={2}
                    className={`${adminTextarea} mt-3`}
                  />
                  <div className="mt-4">
                    <SaveButton>Add slide</SaveButton>
                  </div>
                </form>
              </section>
            ) : null}

            {section === "menu" ? (
              <section className="space-y-4">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                  <PanelHeader
                    title={`Navigation · ${localeNames[locale]}`}
                    description="Header menu links and order"
                  />
                  {bundle.nav.length === 0 ? (
                    <EmptyState
                      title="No menu items yet"
                      description="Fallback nav is used on the site until you add items here."
                    />
                  ) : (
                    <div className="space-y-4">
                      {bundle.nav.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <form action={upsertNavItem} className="grid gap-3 sm:grid-cols-4">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <Field label="Label">
                              <input
                                name="label"
                                defaultValue={item.label}
                                className={adminInput}
                                required
                              />
                            </Field>
                            <Field label="Href">
                              <input
                                name="href"
                                defaultValue={item.href}
                                className={adminInput}
                                required
                              />
                            </Field>
                            <Field label="Order">
                              <input
                                type="number"
                                name="orderIndex"
                                defaultValue={item.orderIndex}
                                className={adminInput}
                              />
                            </Field>
                            <label className="flex items-end gap-2 pb-2 text-sm font-medium text-slate-700">
                              <input
                                type="checkbox"
                                name="isActive"
                                defaultChecked={item.isActive}
                                className="rounded"
                              />
                              Active
                            </label>
                            <div className="sm:col-span-4">
                              <SaveButton>Save link</SaveButton>
                            </div>
                          </form>
                          <form action={deleteNavItem} className="mt-2">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <DangerButton>Delete</DangerButton>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  action={upsertNavItem}
                  className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <p className="mb-3 text-sm font-semibold text-slate-800">Add menu item</p>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <input name="label" placeholder="Label" className={adminInput} required />
                    <input name="href" placeholder="#section" className={adminInput} required />
                    <input
                      type="number"
                      name="orderIndex"
                      defaultValue={99}
                      className={adminInput}
                    />
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" name="isActive" defaultChecked className="rounded" />{" "}
                      Active
                    </label>
                  </div>
                  <div className="mt-4">
                    <SaveButton>Add menu item</SaveButton>
                  </div>
                </form>
              </section>
            ) : null}

            {section === "products" ? (
              <CatalogCardsSection
                title={`Products · ${localeNames[locale]}`}
                description="Category cards shown on the homepage catalogue"
                items={bundle.products}
                locale={locale}
                upsertAction={upsertProduct}
                deleteAction={deleteProduct}
                addLabel="Add product"
              />
            ) : null}

            {section === "featured" ? (
              <CatalogCardsSection
                title={`Featured · ${localeNames[locale]}`}
                description="Highlighted catalogue cards"
                items={bundle.featured}
                locale={locale}
                upsertAction={upsertFeatured}
                deleteAction={deleteFeatured}
                addLabel="Add featured item"
              />
            ) : null}

            {section === "solutions" ? (
              <CatalogCardsSection
                title={`Solutions · ${localeNames[locale]}`}
                description="Sustainable focus / solution cards"
                items={bundle.services}
                locale={locale}
                upsertAction={upsertService}
                deleteAction={deleteService}
                addLabel="Add solution"
              />
            ) : null}

            {section === "faqs" ? (
              <section className="space-y-4">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                  <PanelHeader
                    title={`FAQs · ${localeNames[locale]}`}
                    description="Accordion questions shown near the contact section"
                  />
                  {bundle.faqs.length === 0 ? (
                    <EmptyState
                      title="No FAQs yet"
                      description="Fallback FAQs are used until you add entries here."
                    />
                  ) : (
                    <div className="space-y-4">
                      {bundle.faqs.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                        >
                          <form action={upsertFaq} className="grid gap-3">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                              <Field label="Order">
                                <input
                                  type="number"
                                  name="orderIndex"
                                  defaultValue={item.orderIndex}
                                  className={adminInput}
                                />
                              </Field>
                              <label className="flex items-end gap-2 pb-2 text-sm font-medium text-slate-700">
                                <input
                                  type="checkbox"
                                  name="isActive"
                                  defaultChecked={item.isActive}
                                  className="rounded"
                                />
                                Active
                              </label>
                            </div>
                            <Field label="Question">
                              <input
                                name="question"
                                defaultValue={item.question}
                                className={adminInput}
                                required
                              />
                            </Field>
                            <Field label="Answer">
                              <textarea
                                name="answer"
                                defaultValue={item.answer}
                                rows={3}
                                className={adminTextarea}
                                required
                              />
                            </Field>
                            <SaveButton>Save FAQ</SaveButton>
                          </form>
                          <form action={deleteFaq} className="mt-2">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <DangerButton>Delete FAQ</DangerButton>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  action={upsertFaq}
                  className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <p className="mb-4 text-sm font-semibold text-slate-800">Add FAQ</p>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      type="number"
                      name="orderIndex"
                      defaultValue={99}
                      className={adminInput}
                    />
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" name="isActive" defaultChecked className="rounded" />{" "}
                      Active
                    </label>
                  </div>
                  <input
                    name="question"
                    placeholder="Question"
                    className={`${adminInput} mt-3`}
                    required
                  />
                  <textarea
                    name="answer"
                    placeholder="Answer"
                    rows={3}
                    className={`${adminTextarea} mt-3`}
                    required
                  />
                  <div className="mt-4">
                    <SaveButton>Add FAQ</SaveButton>
                  </div>
                </form>
              </section>
            ) : null}

            {section === "footer" ? (
              <section className="space-y-4">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                  <PanelHeader
                    title={`Social links · ${localeNames[locale]}`}
                    description="Footer social icons. Copyright text is edited under Page Copy."
                  />
                  {bundle.socialLinks.length === 0 ? (
                    <EmptyState
                      title="No social links yet"
                      description="Add Facebook, LinkedIn, or Instagram links below."
                    />
                  ) : (
                    <div className="space-y-4">
                      {bundle.socialLinks.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                        >
                          <form action={upsertSocialLink} className="grid gap-3 sm:grid-cols-3">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <Field label="Label">
                              <input
                                name="label"
                                defaultValue={item.label}
                                className={adminInput}
                                required
                              />
                            </Field>
                            <Field label="Href">
                              <input
                                name="href"
                                defaultValue={item.href}
                                className={adminInput}
                                required
                              />
                            </Field>
                            <Field label="Icon">
                              <select name="icon" defaultValue={item.icon} className={adminInput}>
                                <option value="Facebook">Facebook</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="Instagram">Instagram</option>
                              </select>
                            </Field>
                            <div className="sm:col-span-3">
                              <SaveButton>Save link</SaveButton>
                            </div>
                          </form>
                          <form action={deleteSocialLink} className="mt-2">
                            <input type="hidden" name="locale" value={locale} />
                            <input type="hidden" name="itemId" value={item.id} />
                            <DangerButton>Delete</DangerButton>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  action={upsertSocialLink}
                  className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <p className="mb-3 text-sm font-semibold text-slate-800">Add social link</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <input name="label" placeholder="Label" className={adminInput} required />
                    <input
                      name="href"
                      placeholder="https://..."
                      className={adminInput}
                      required
                    />
                    <select name="icon" defaultValue="Instagram" className={adminInput}>
                      <option value="Facebook">Facebook</option>
                      <option value="Linkedin">Linkedin</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <SaveButton>Add social link</SaveButton>
                  </div>
                </form>

                <p className="rounded-2xl border border-slate-200/80 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
                  Copyright text is managed in Page Copy → UI labels.
                </p>
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}

function CatalogCardsSection({
  title,
  description,
  items,
  locale,
  upsertAction,
  deleteAction,
  addLabel,
}: {
  title: string;
  description: string;
  items: CmsCatalogItem[];
  locale: SiteLocale;
  upsertAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  addLabel: string;
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
        <PanelHeader title={title} description={description} />
        {items.length === 0 ? (
          <EmptyState
            title="No catalogue items yet"
            description="Fallback catalogue content is shown on the site until you add items here."
          />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm"
              >
                <div className="grid sm:grid-cols-[140px_1fr]">
                  <div className="relative min-h-[140px] bg-white">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        unoptimized
                        className="object-contain p-3"
                        sizes="140px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <form action={upsertAction} className="grid gap-3">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="itemId" value={item.id} />
                      <Field label="Title">
                        <input
                          name="title"
                          defaultValue={item.title}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <ImageUploader
                        name="imageUrl"
                        label="Item image"
                        defaultValue={item.imageUrl}
                      />
                      <Field label="Image alt">
                        <input
                          name="imageAlt"
                          defaultValue={item.imageAlt}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Short description">
                        <textarea
                          name="description"
                          defaultValue={item.description}
                          rows={2}
                          className={adminTextarea}
                          required
                        />
                      </Field>
                      <Field label="Full details (popup)">
                        <textarea
                          name="details"
                          defaultValue={item.details}
                          rows={2}
                          className={adminTextarea}
                        />
                      </Field>
                      <Field label="Sizes (one per line)">
                        <textarea
                          name="sizesText"
                          defaultValue={item.sizesText}
                          rows={3}
                          placeholder="One size per line"
                          className={adminTextarea}
                        />
                      </Field>
                      <div className="flex flex-wrap items-center gap-3">
                        <Field label="Order" className="w-28">
                          <input
                            type="number"
                            name="orderIndex"
                            defaultValue={item.orderIndex}
                            className={adminInput}
                          />
                        </Field>
                        <label className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-700">
                          <input
                            type="checkbox"
                            name="isActive"
                            defaultChecked={item.isActive}
                            className="rounded"
                          />
                          Active
                        </label>
                      </div>
                      <SaveButton>Save item</SaveButton>
                    </form>
                    <form action={deleteAction} className="mt-2">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="itemId" value={item.id} />
                      <DangerButton>Delete</DangerButton>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <form
        action={upsertAction}
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7"
      >
        <input type="hidden" name="locale" value={locale} />
        <p className="mb-4 text-sm font-semibold text-slate-800">{addLabel}</p>
        <div className="mb-3">
          <ImageUploader name="imageUrl" label="Item image" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Title" className={adminInput} required />
          <input name="imageAlt" placeholder="Image alt" className={adminInput} />
        </div>
        <textarea
          name="description"
          placeholder="Short description"
          rows={2}
          className={`${adminTextarea} mt-3`}
          required
        />
        <textarea
          name="details"
          placeholder="Full details for popup"
          rows={2}
          className={`${adminTextarea} mt-3`}
        />
        <textarea
          name="sizesText"
          placeholder="One size per line"
          rows={3}
          className={`${adminTextarea} mt-3`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="number"
            name="orderIndex"
            defaultValue={99}
            className={`${adminInput} w-28`}
          />
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="isActive" defaultChecked className="rounded" /> Active
          </label>
        </div>
        <div className="mt-4">
          <SaveButton>{addLabel}</SaveButton>
        </div>
      </form>
    </section>
  );
}
