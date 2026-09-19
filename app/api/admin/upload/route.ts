import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { buildMediaKey, getMediaBucket } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = await getMediaBucket();
  if (!bucket) {
    return NextResponse.json(
      { error: "Media storage is not configured on this environment." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP, GIF, or SVG images are allowed." },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 8 MB." },
      { status: 400 },
    );
  }

  const key = buildMediaKey(file.name);
  const buffer = await file.arrayBuffer();

  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  const url = `/api/media/${key}`;
  return NextResponse.json({ url, key });
}
