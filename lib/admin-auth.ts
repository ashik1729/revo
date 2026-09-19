import { cookies } from "next/headers";

const COOKIE_NAME = "revo_admin_session";

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export async function adminSessionCookieValue(password: string) {
  return sha256Hex(`revo-admin:${password}`);
}

export async function isAdminAuthenticated() {
  const password = getAdminPassword();
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = await adminSessionCookieValue(password);
  return safeEqual(token, expected);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
