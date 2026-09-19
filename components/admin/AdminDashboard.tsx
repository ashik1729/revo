"use client";

import { useMemo, useState, type ReactNode } from "react";
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
} from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/i18n";
import { localeNames, supportedLocales } from "@/lib/i18n";
import { logoutAdmin } from "@/app/admin/login/actions";
import {
  deleteFaq,
  deleteNavItem,
  deleteProduct,
  deleteService,
  saveSiteSettings,
  saveSiteTranslation,
  upsertFaq,
  upsertNavItem,
  upsertProduct,
  upsertService,
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

export type AdminNavItem = {
  id: string;
  href: string;
  orderIndex: number;
  isActive: boolean;
  label: string;
};

export type AdminCatalogItem = {
  id: string;
  imageUrl: string;
  orderIndex: number;
  isActive: boolean;
  title: string;
  description: string;
  details: string;
};

export type AdminFaqItem = {
  id: string;
  orderIndex: number;
  isActive: boolean;
  question: string;
  answer: string;
};

export type AdminTranslation = {
  tagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroImageAlt: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutExtra: string;
  aboutImageAlt: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  productsSectionTitle: string;
  productsSectionDescription: string;
  servicesSectionTitle: string;
  servicesSectionDescription: string;
  faqSectionTitle: string;
  faqSectionDescription: string;
  contactTitle: string;
  contactDescription: string;
};

type SectionId =
  | "overview"
  | "company"
  | "content"
  | "menu"
  | "products"
  | "solutions"
  | "faqs";

const nav = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "company" as const, label: "Company", icon: Building2 },
  { id: "content" as const, label: "Page Copy", icon: FileText },
  { id: "menu" as const, label: "Navigation", icon: Navigation },
  { id: "products" as const, label: "Products", icon: Package },
  { id: "solutions" as const, label: "Solutions", icon: Sparkles },
  { id: "faqs" as const, label: "FAQs", icon: HelpCircle },
];

interface AdminDashboardProps {
  locale: SiteLocale;
  content: SiteContent;
  dbReady: boolean;
  translation: AdminTranslation;
  navItems: AdminNavItem[];
  products: AdminCatalogItem[];
  services: AdminCatalogItem[];
  faqs: AdminFaqItem[];
}

export default function AdminDashboard({
  locale,
  content,
  dbReady,
  translation,
  navItems,
  products,
  services,
  faqs,
}: AdminDashboardProps) {
  const [section, setSection] = useState<SectionId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Products", value: products.length || content.products.length, tone: "bg-blue-50 text-blue-700" },
      { label: "Solutions", value: services.length || content.services.length, tone: "bg-emerald-50 text-emerald-700" },
      { label: "FAQs", value: faqs.length || content.faqs.length, tone: "bg-violet-50 text-violet-700" },
      { label: "Menu links", value: navItems.length || content.nav.length, tone: "bg-amber-50 text-amber-700" },
    ],
    [products, services, faqs, navItems, content],
  );

  const activeLabel = nav.find((item) => item.id === section)?.label ?? "Overview";

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

          <nav className="flex-1 space-y-1 px-3 py-4">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
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
                <button type="button" onClick={() => setMobileOpen(false)} className="rounded-lg p-2 hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 p-3">
                {nav.map((item) => {
                  const Icon = item.icon;
                  const active = section === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSection(item.id);
                        setMobileOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        active ? "bg-white text-[#0b1f5c]" : "text-blue-100 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
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
            {!dbReady ? (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                Database is not connected yet. The dashboard shows live fallback content. Connect
                `DATABASE_URL`, migrate, and seed to enable saving edits.
              </div>
            ) : null}

            {section === "overview" ? (
              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-[#0b1f5c] via-[#12307a] to-[#1d4ed8] p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
                  <p className="text-sm text-blue-100">Welcome back</p>
                  <h3 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                    Manage {content.company.name} website content
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

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                      <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${stat.tone}`}>
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
                        <dd className="font-medium text-slate-900">{content.company.name}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Phone</dt>
                        <dd className="font-medium text-slate-900">{content.company.phone}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Email</dt>
                        <dd className="font-medium text-slate-900">{content.company.email}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Address</dt>
                        <dd className="text-right font-medium text-slate-900">{content.company.address}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <PanelHeader title="Quick tips" description="Keep content bilingual and scannable" />
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Switch language before editing page copy, products, and FAQs.
                      </li>
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Use short card blurbs; put long specs in the details field for popups.
                      </li>
                      <li className="rounded-xl bg-slate-50 px-4 py-3">
                        Company phone/email are shared across both languages.
                      </li>
                    </ul>
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
                <form action={saveSiteSettings} className="grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="locale" value={locale} />
                  <Field label="Company name">
                    <input name="companyName" defaultValue={content.company.name} className={adminInput} required />
                  </Field>
                  <Field label="Address">
                    <input name="address" defaultValue={content.company.address} className={adminInput} required />
                  </Field>
                  <Field label="Phone">
                    <input name="phone" defaultValue={content.company.phone} className={adminInput} required />
                  </Field>
                  <Field label="Email">
                    <input name="email" defaultValue={content.company.email} className={adminInput} required />
                  </Field>
                  <Field label="WhatsApp (digits only)" className="sm:col-span-2">
                    <input name="whatsapp" defaultValue={content.company.whatsapp} className={adminInput} required />
                  </Field>
                  <Field label="Hero image URL" className="sm:col-span-2">
                    <input name="heroImageUrl" defaultValue={content.company.heroImageUrl} className={adminInput} />
                  </Field>
                  <Field label="About image URL" className="sm:col-span-2">
                    <input name="aboutImageUrl" defaultValue={content.company.aboutImageUrl} className={adminInput} />
                  </Field>
                  <Field label="Contact banner URL" className="sm:col-span-2">
                    <input
                      name="contactBannerUrl"
                      defaultValue={content.company.contactBannerUrl}
                      className={adminInput}
                    />
                  </Field>
                  <Field label="Contact side image URL" className="sm:col-span-2">
                    <input
                      name="contactSideImageUrl"
                      defaultValue={content.company.contactSideImageUrl}
                      className={adminInput}
                    />
                  </Field>
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
                  description="Hero, about, vision/mission, section titles, and contact intro"
                />
                <form action={saveSiteTranslation} className="grid gap-5">
                  <input type="hidden" name="locale" value={locale} />

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Hero
                    </h3>
                    <div className="grid gap-4">
                      <Field label="Tagline">
                        <input name="tagline" defaultValue={translation.tagline} className={adminInput} required />
                      </Field>
                      <Field label="Eyebrow">
                        <input name="heroEyebrow" defaultValue={translation.heroEyebrow} className={adminInput} required />
                      </Field>
                      <Field label="Headline">
                        <input name="heroHeadline" defaultValue={translation.heroHeadline} className={adminInput} required />
                      </Field>
                      <Field label="Subheadline">
                        <textarea
                          name="heroSubheadline"
                          defaultValue={translation.heroSubheadline}
                          className={adminTextarea}
                          rows={3}
                          required
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Primary CTA label">
                          <input name="heroCtaLabel" defaultValue={translation.heroCtaLabel} className={adminInput} required />
                        </Field>
                        <Field label="Primary CTA href">
                          <input name="heroCtaHref" defaultValue={translation.heroCtaHref} className={adminInput} required />
                        </Field>
                        <Field label="Secondary CTA label">
                          <input
                            name="heroSecondaryCtaLabel"
                            defaultValue={translation.heroSecondaryCtaLabel}
                            className={adminInput}
                          />
                        </Field>
                        <Field label="Secondary CTA href">
                          <input
                            name="heroSecondaryCtaHref"
                            defaultValue={translation.heroSecondaryCtaHref}
                            className={adminInput}
                          />
                        </Field>
                      </div>
                      <Field label="Hero image alt">
                        <input name="heroImageAlt" defaultValue={translation.heroImageAlt} className={adminInput} />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="Trust badge 1">
                          <input name="trustBadge1" defaultValue={translation.trustBadge1} className={adminInput} />
                        </Field>
                        <Field label="Trust badge 2">
                          <input name="trustBadge2" defaultValue={translation.trustBadge2} className={adminInput} />
                        </Field>
                        <Field label="Trust badge 3">
                          <input name="trustBadge3" defaultValue={translation.trustBadge3} className={adminInput} />
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      About & vision
                    </h3>
                    <div className="grid gap-4">
                      <Field label="About title">
                        <input name="aboutTitle" defaultValue={translation.aboutTitle} className={adminInput} required />
                      </Field>
                      <Field label="About description">
                        <textarea
                          name="aboutDescription"
                          defaultValue={translation.aboutDescription}
                          className={adminTextarea}
                          rows={3}
                          required
                        />
                      </Field>
                      <Field label="About extra">
                        <textarea name="aboutExtra" defaultValue={translation.aboutExtra} className={adminTextarea} rows={3} />
                      </Field>
                      <Field label="About image alt">
                        <input name="aboutImageAlt" defaultValue={translation.aboutImageAlt} className={adminInput} />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Vision title">
                          <input name="visionTitle" defaultValue={translation.visionTitle} className={adminInput} />
                        </Field>
                        <Field label="Mission title">
                          <input name="missionTitle" defaultValue={translation.missionTitle} className={adminInput} />
                        </Field>
                      </div>
                      <Field label="Vision text">
                        <textarea name="visionText" defaultValue={translation.visionText} className={adminTextarea} rows={2} />
                      </Field>
                      <Field label="Mission text">
                        <textarea name="missionText" defaultValue={translation.missionText} className={adminTextarea} rows={2} />
                      </Field>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Sections & contact
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Products section title">
                        <input
                          name="productsSectionTitle"
                          defaultValue={translation.productsSectionTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Solutions section title">
                        <input
                          name="servicesSectionTitle"
                          defaultValue={translation.servicesSectionTitle}
                          className={adminInput}
                          required
                        />
                      </Field>
                      <Field label="Products section description" className="sm:col-span-2">
                        <textarea
                          name="productsSectionDescription"
                          defaultValue={translation.productsSectionDescription}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                      <Field label="Solutions section description" className="sm:col-span-2">
                        <textarea
                          name="servicesSectionDescription"
                          defaultValue={translation.servicesSectionDescription}
                          className={adminTextarea}
                          rows={2}
                        />
                      </Field>
                      <Field label="FAQ section title">
                        <input name="faqSectionTitle" defaultValue={translation.faqSectionTitle} className={adminInput} />
                      </Field>
                      <Field label="FAQ section description">
                        <input
                          name="faqSectionDescription"
                          defaultValue={translation.faqSectionDescription}
                          className={adminInput}
                        />
                      </Field>
                      <Field label="Contact title">
                        <input name="contactTitle" defaultValue={translation.contactTitle} className={adminInput} required />
                      </Field>
                      <Field label="Contact description">
                        <input
                          name="contactDescription"
                          defaultValue={translation.contactDescription}
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

            {section === "menu" ? (
              <CatalogListSection
                title={`Navigation · ${localeNames[locale]}`}
                description="Header menu links and order"
                emptyTitle="No menu items in database"
                emptyDescription="Fallback nav is used on the site until you add items here."
                items={navItems}
                locale={locale}
                renderItem={(item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <form action={upsertNavItem} className="grid gap-3 sm:grid-cols-4">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="navId" value={item.id} />
                      <Field label="Label">
                        <input name="label" defaultValue={item.label} className={adminInput} required />
                      </Field>
                      <Field label="Href">
                        <input name="href" defaultValue={item.href} className={adminInput} required />
                      </Field>
                      <Field label="Order">
                        <input type="number" name="orderIndex" defaultValue={item.orderIndex} className={adminInput} />
                      </Field>
                      <label className="flex items-end gap-2 pb-2 text-sm font-medium text-slate-700">
                        <input type="checkbox" name="isActive" defaultChecked={item.isActive} className="rounded" />
                        Active
                      </label>
                      <div className="sm:col-span-4">
                        <SaveButton>Save link</SaveButton>
                      </div>
                    </form>
                    <form action={deleteNavItem} className="mt-2">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="navId" value={item.id} />
                      <DangerButton>Delete</DangerButton>
                    </form>
                  </div>
                )}
                addForm={
                  <form action={upsertNavItem} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
                    <input type="hidden" name="locale" value={locale} />
                    <p className="mb-3 text-sm font-semibold text-slate-800">Add menu item</p>
                    <div className="grid gap-3 sm:grid-cols-4">
                      <input name="label" placeholder="Label" className={adminInput} required />
                      <input name="href" placeholder="#section" className={adminInput} required />
                      <input type="number" name="orderIndex" defaultValue={99} className={adminInput} />
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <input type="checkbox" name="isActive" defaultChecked className="rounded" /> Active
                      </label>
                    </div>
                    <div className="mt-4">
                      <SaveButton>Add menu item</SaveButton>
                    </div>
                  </form>
                }
              />
            ) : null}

            {section === "products" ? (
              <CatalogCardsSection
                title={`Products · ${localeNames[locale]}`}
                description="Category cards shown on the homepage catalogue"
                items={products}
                locale={locale}
                upsertAction={upsertProduct}
                deleteAction={deleteProduct}
                addLabel="Add product"
              />
            ) : null}

            {section === "solutions" ? (
              <CatalogCardsSection
                title={`Solutions · ${localeNames[locale]}`}
                description="Sustainable focus / solution cards"
                items={services}
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
                  {faqs.length === 0 ? (
                    <EmptyState
                      title="No FAQs in database"
                      description="Fallback FAQs are used until you add entries here."
                    />
                  ) : (
                    <div className="space-y-4">
                      {faqs.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
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
                                <input type="checkbox" name="isActive" defaultChecked={item.isActive} className="rounded" />
                                Active
                              </label>
                            </div>
                            <Field label="Question">
                              <input name="question" defaultValue={item.question} className={adminInput} required />
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

                <form action={upsertFaq} className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-7">
                  <input type="hidden" name="locale" value={locale} />
                  <p className="mb-4 text-sm font-semibold text-slate-800">Add FAQ</p>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input type="number" name="orderIndex" defaultValue={99} className={adminInput} />
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" name="isActive" defaultChecked className="rounded" /> Active
                    </label>
                  </div>
                  <input name="question" placeholder="Question" className={`${adminInput} mt-3`} required />
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
          </main>
        </div>
      </div>
    </div>
  );
}

function CatalogListSection({
  title,
  description,
  emptyTitle,
  emptyDescription,
  items,
  renderItem,
  addForm,
}: {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  items: AdminNavItem[];
  locale: SiteLocale;
  renderItem: (item: AdminNavItem) => ReactNode;
  addForm: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
        <PanelHeader title={title} description={description} />
        {items.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <div className="space-y-4">{items.map(renderItem)}</div>
        )}
      </div>
      {addForm}
    </section>
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
  items: AdminCatalogItem[];
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
            title="No catalogue items in database"
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
                        alt={item.title}
                        fill
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
                        <input name="title" defaultValue={item.title} className={adminInput} required />
                      </Field>
                      <Field label="Image URL">
                        <input name="imageUrl" defaultValue={item.imageUrl} className={adminInput} required />
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
                          <input type="checkbox" name="isActive" defaultChecked={item.isActive} className="rounded" />
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
        <div className="grid gap-3 sm:grid-cols-3">
          <input name="title" placeholder="Title" className={adminInput} required />
          <input name="imageUrl" placeholder="https://... image URL" className={adminInput} required />
          <input type="number" name="orderIndex" defaultValue={99} className={adminInput} />
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
        <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="isActive" defaultChecked className="rounded" /> Active
        </label>
        <div className="mt-4">
          <SaveButton>{addLabel}</SaveButton>
        </div>
      </form>
    </section>
  );
}
