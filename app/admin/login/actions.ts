"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  adminSessionCookieValue,
  getAdminPassword,
  getAdminUsername,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();

  if (!expectedPassword) {
    redirect(
      "/admin/login?error=" + encodeURIComponent("Admin credentials are not configured."),
    );
  }

  const usernameOk = username.toLowerCase() === expectedUsername.toLowerCase();
  const passwordOk = password === expectedPassword;

  if (!usernameOk || !passwordOk) {
    redirect(
      "/admin/login?error=" + encodeURIComponent("Incorrect username or password."),
    );
  }

  const jar = await cookies();
  jar.set(
    ADMIN_COOKIE_NAME,
    await adminSessionCookieValue(expectedUsername, expectedPassword),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    },
  );

  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
