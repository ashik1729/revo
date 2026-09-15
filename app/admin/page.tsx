import Link from "next/link";
import type { Prisma, SiteTranslation } from "@prisma/client";
import { db } from "@/lib/db";
import { defaultLocale, localeNames, supportedLocales, type SiteLocale } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import {
  deleteNavItem,
  deleteProduct,
  deleteService,
  saveSiteSettings,
  saveSiteTranslation,
  upsertNavItem,
  upsertProduct,
  upsertService,
} from "@/app/admin/actions";

type AdminPageProps = {
  searchParams: Promise<{ locale?: string }>;
};

function sectionClassName() {
  return "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";
}

function inputClassName() {
  return "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const locale = (params.locale && supportedLocales.includes(params.locale as SiteLocale)
    ? params.locale
    : defaultLocale) as SiteLocale;

  const content = await getSiteContent(locale);
  let dbReady = true;
  let translation: SiteTranslation | null = null;
  let navItems: Prisma.NavItemGetPayload<{ include: { translations: true } }>[] = [];
  let products: Prisma.ProductGetPayload<{ include: { translations: true } }>[] = [];
  let services: Prisma.ServiceGetPayload<{ include: { translations: true } }>[] = [];

  try {
    [translation, navItems, products, services] = await Promise.all([
      db.siteTranslation.findUnique({ where: { locale } }),
      db.navItem.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
      db.product.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
      db.service.findMany({ include: { translations: true }, orderBy: { orderIndex: "asc" } }),
    ]);
  } catch {
    dbReady = false;
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <section className="rounded-xl bg-navy p-6 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.18em] text-blue-200">Revo Content Console</p>
          <h1 className="mt-2 text-2xl font-bold">Website Management</h1>
          <p className="mt-1 text-sm text-blue-100">
            Manage homepage content, menu, products, and services for each language.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {supportedLocales.map((item) => (
              <Link
                key={item}
                href={`/admin?locale=${item}`}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                  item === locale ? "bg-white text-navy" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {localeNames[item]}
              </Link>
            ))}
          </div>
        </section>

        {!dbReady && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            Database is not connected. Add `DATABASE_URL`, then run `npm run db:migrate` and
            `npm run db:seed`.
          </section>
        )}

        <section className={sectionClassName()}>
          <h2 className="text-lg font-semibold text-slate-900">Company Info</h2>
          <form action={saveSiteSettings} className="mt-4 grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="locale" value={locale} />
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Company name</span>
              <input name="companyName" defaultValue={content.company.name} className={inputClassName()} required />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Address</span>
              <input name="address" defaultValue={content.company.address} className={inputClassName()} required />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Phone</span>
              <input name="phone" defaultValue={content.company.phone} className={inputClassName()} required />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Email</span>
              <input name="email" defaultValue={content.company.email} className={inputClassName()} required />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-700">WhatsApp number (digits only)</span>
              <input name="whatsapp" defaultValue={content.company.whatsapp} className={inputClassName()} required />
            </label>
            <div className="sm:col-span-2">
              <button className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Save Company Info
              </button>
            </div>
          </form>
        </section>

        <section className={sectionClassName()}>
          <h2 className="text-lg font-semibold text-slate-900">Localized Content ({localeNames[locale]})</h2>
          <form action={saveSiteTranslation} className="mt-4 grid gap-4">
            <input type="hidden" name="locale" value={locale} />
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Tagline</span>
              <input
                name="tagline"
                defaultValue={translation?.tagline ?? content.company.tagline}
                className={inputClassName()}
                required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Hero eyebrow</span>
              <input
                name="heroEyebrow"
                defaultValue={translation?.heroEyebrow ?? content.hero.eyebrow}
                className={inputClassName()}
                required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Hero headline</span>
              <input
                name="heroHeadline"
                defaultValue={translation?.heroHeadline ?? content.hero.headline}
                className={inputClassName()}
                required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Hero subheadline</span>
              <textarea
                name="heroSubheadline"
                defaultValue={translation?.heroSubheadline ?? content.hero.subheadline}
                className={inputClassName()}
                rows={3}
                required
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Hero CTA label</span>
                <input
                  name="heroCtaLabel"
                  defaultValue={translation?.heroCtaLabel ?? content.hero.ctaLabel}
                  className={inputClassName()}
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Hero CTA href</span>
                <input
                  name="heroCtaHref"
                  defaultValue={translation?.heroCtaHref ?? content.hero.ctaHref}
                  className={inputClassName()}
                  required
                />
              </label>
            </div>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">About title</span>
              <input
                name="aboutTitle"
                defaultValue={translation?.aboutTitle ?? content.about.title}
                className={inputClassName()}
                required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">About description</span>
              <textarea
                name="aboutDescription"
                defaultValue={translation?.aboutDescription ?? content.about.description}
                className={inputClassName()}
                rows={3}
                required
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Products section title</span>
                <input
                  name="productsSectionTitle"
                  defaultValue={translation?.productsSectionTitle ?? content.productsSectionTitle}
                  className={inputClassName()}
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Services section title</span>
                <input
                  name="servicesSectionTitle"
                  defaultValue={translation?.servicesSectionTitle ?? content.servicesSectionTitle}
                  className={inputClassName()}
                  required
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Contact title</span>
                <input
                  name="contactTitle"
                  defaultValue={translation?.contactTitle ?? "Contact Us"}
                  className={inputClassName()}
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-700">Contact description</span>
                <input
                  name="contactDescription"
                  defaultValue={translation?.contactDescription ?? "Get in touch for quotes and inquiries."}
                  className={inputClassName()}
                  required
                />
              </label>
            </div>
            <div>
              <button className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Save Locale Content
              </button>
            </div>
          </form>
        </section>

        <section className={sectionClassName()}>
          <h2 className="text-lg font-semibold text-slate-900">Menu Items ({localeNames[locale]})</h2>
          <div className="mt-4 space-y-4">
            {navItems.map((item) => {
              const localeLabel =
                item.translations.find((entry) => entry.locale === locale)?.label ||
                item.translations[0]?.label ||
                "";

              return (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <form action={upsertNavItem} className="grid gap-3 sm:grid-cols-4">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="navId" value={item.id} />
                    <label className="text-xs">
                      <span className="mb-1 block font-medium text-slate-700">Label</span>
                      <input name="label" defaultValue={localeLabel} className={inputClassName()} required />
                    </label>
                    <label className="text-xs">
                      <span className="mb-1 block font-medium text-slate-700">Href</span>
                      <input name="href" defaultValue={item.href} className={inputClassName()} required />
                    </label>
                    <label className="text-xs">
                      <span className="mb-1 block font-medium text-slate-700">Order</span>
                      <input
                        type="number"
                        name="orderIndex"
                        defaultValue={item.orderIndex}
                        className={inputClassName()}
                      />
                    </label>
                    <label className="flex items-center gap-2 self-end text-xs">
                      <input type="checkbox" name="isActive" defaultChecked={item.isActive} />
                      Active
                    </label>
                    <button className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black">
                      Save
                    </button>
                  </form>
                  <form action={deleteNavItem} className="mt-2">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="navId" value={item.id} />
                    <button className="text-xs font-semibold text-red-600 hover:text-red-700">
                      Delete menu item
                    </button>
                  </form>
                </div>
              );
            })}

            <form action={upsertNavItem} className="rounded-lg border border-dashed border-slate-300 p-4">
              <input type="hidden" name="locale" value={locale} />
              <p className="mb-2 text-sm font-semibold text-slate-700">Add menu item</p>
              <div className="grid gap-3 sm:grid-cols-4">
                <input name="label" placeholder="Label" className={inputClassName()} required />
                <input name="href" placeholder="#section" className={inputClassName()} required />
                <input type="number" name="orderIndex" defaultValue={99} className={inputClassName()} />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isActive" defaultChecked /> Active
                </label>
              </div>
              <button className="mt-3 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Add Menu Item
              </button>
            </form>
          </div>
        </section>

        <section className={sectionClassName()}>
          <h2 className="text-lg font-semibold text-slate-900">Products ({localeNames[locale]})</h2>
          <div className="mt-4 space-y-4">
            {products.map((item) => {
              const localeEntry =
                item.translations.find((entry) => entry.locale === locale) || item.translations[0];
              return (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <form action={upsertProduct} className="grid gap-3">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="itemId" value={item.id} />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input name="title" defaultValue={localeEntry?.title} className={inputClassName()} required />
                      <input name="icon" defaultValue={item.icon} className={inputClassName()} required />
                      <input type="number" name="orderIndex" defaultValue={item.orderIndex} className={inputClassName()} />
                    </div>
                    <textarea
                      name="description"
                      defaultValue={localeEntry?.description}
                      rows={2}
                      className={inputClassName()}
                      required
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="isActive" defaultChecked={item.isActive} /> Active
                    </label>
                    <button className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black">
                      Save
                    </button>
                  </form>
                  <form action={deleteProduct} className="mt-2">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="itemId" value={item.id} />
                    <button className="text-xs font-semibold text-red-600 hover:text-red-700">
                      Delete product
                    </button>
                  </form>
                </div>
              );
            })}

            <form action={upsertProduct} className="rounded-lg border border-dashed border-slate-300 p-4">
              <input type="hidden" name="locale" value={locale} />
              <p className="mb-2 text-sm font-semibold text-slate-700">Add product</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <input name="title" placeholder="Product title" className={inputClassName()} required />
                <input name="icon" placeholder="BedDouble" className={inputClassName()} required />
                <input type="number" name="orderIndex" defaultValue={99} className={inputClassName()} />
              </div>
              <textarea
                name="description"
                placeholder="Product description"
                rows={2}
                className={`${inputClassName()} mt-3`}
                required
              />
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" name="isActive" defaultChecked /> Active
              </label>
              <button className="mt-3 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Add Product
              </button>
            </form>
          </div>
        </section>

        <section className={sectionClassName()}>
          <h2 className="text-lg font-semibold text-slate-900">Services ({localeNames[locale]})</h2>
          <div className="mt-4 space-y-4">
            {services.map((item) => {
              const localeEntry =
                item.translations.find((entry) => entry.locale === locale) || item.translations[0];
              return (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <form action={upsertService} className="grid gap-3">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="itemId" value={item.id} />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input name="title" defaultValue={localeEntry?.title} className={inputClassName()} required />
                      <input name="icon" defaultValue={item.icon} className={inputClassName()} required />
                      <input type="number" name="orderIndex" defaultValue={item.orderIndex} className={inputClassName()} />
                    </div>
                    <textarea
                      name="description"
                      defaultValue={localeEntry?.description}
                      rows={2}
                      className={inputClassName()}
                      required
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="isActive" defaultChecked={item.isActive} /> Active
                    </label>
                    <button className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black">
                      Save
                    </button>
                  </form>
                  <form action={deleteService} className="mt-2">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="itemId" value={item.id} />
                    <button className="text-xs font-semibold text-red-600 hover:text-red-700">
                      Delete service
                    </button>
                  </form>
                </div>
              );
            })}

            <form action={upsertService} className="rounded-lg border border-dashed border-slate-300 p-4">
              <input type="hidden" name="locale" value={locale} />
              <p className="mb-2 text-sm font-semibold text-slate-700">Add service</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <input name="title" placeholder="Service title" className={inputClassName()} required />
                <input name="icon" placeholder="Building2" className={inputClassName()} required />
                <input type="number" name="orderIndex" defaultValue={99} className={inputClassName()} />
              </div>
              <textarea
                name="description"
                placeholder="Service description"
                rows={2}
                className={`${inputClassName()} mt-3`}
                required
              />
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" name="isActive" defaultChecked /> Active
              </label>
              <button className="mt-3 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Add Service
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
