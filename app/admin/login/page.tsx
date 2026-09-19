import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAdmin } from "@/app/admin/login/actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form action={loginAdmin} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Revo Trading</p>
        <h1 className="mt-2 text-2xl font-bold text-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage website content in English and Arabic.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}

        <label className="mt-6 block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#132a6e]"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
