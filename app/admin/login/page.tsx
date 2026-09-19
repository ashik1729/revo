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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1f5c] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <form
        action={loginAdmin}
        className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white p-8 shadow-2xl shadow-black/30"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
          Revo Trading
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0b1f5c]">Content Studio</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in with your admin username and password to manage the website.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}

        <label className="mt-6 block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">Username</span>
          <input
            type="text"
            name="username"
            required
            autoComplete="username"
            autoFocus
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </label>

        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#0b1f5c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#132a6e]"
        >
          Sign in to dashboard
        </button>
      </form>
    </main>
  );
}
