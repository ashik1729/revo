import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  isRemoteCmsAvailable,
  readCmsDocument,
  type CmsDocument,
} from "@/lib/cms-store";
import { defaultLocale, supportedLocales, type SiteLocale } from "@/lib/i18n";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ locale?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const locale = (params.locale && supportedLocales.includes(params.locale as SiteLocale)
    ? params.locale
    : defaultLocale) as SiteLocale;

  const doc: CmsDocument = await readCmsDocument();
  const cmsRemote = await isRemoteCmsAvailable();

  return <AdminDashboard locale={locale} doc={doc} cmsRemote={cmsRemote} />;
}
