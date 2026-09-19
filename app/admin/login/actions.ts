"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  adminSessionCookieValue,
  getAdminPassword,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = getAdminPassword();

  if (!expected) {
    redirect(
      "/admin/login?error=" + encodeURIComponent("Admin password is not configured."),
    );
  }

  if (password !== expected) {
    redirect("/admin/login?error=" + encodeURIComponent("Incorrect password."));
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, await adminSessionCookieValue(expected), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
