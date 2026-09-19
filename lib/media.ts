import { getCloudflareContext } from "@opennextjs/cloudflare";

export type MediaBucket = {
  put(
    key: string,
    value: ArrayBuffer | ReadableStream | string | Blob | null,
    options?: {
      httpMetadata?: { contentType?: string; cacheControl?: string };
    },
  ): Promise<unknown>;
  get(key: string): Promise<{
    body: ReadableStream | null;
    httpMetadata?: { contentType?: string };
    writeHttpMetadata?: (headers: Headers) => void;
  } | null>;
};

export async function getMediaBucket(): Promise<MediaBucket | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return ((env as { MEDIA_BUCKET?: MediaBucket }).MEDIA_BUCKET ?? null) as MediaBucket | null;
  } catch {
    return null;
  }
}

export function sanitizeUploadFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function buildMediaKey(filename: string) {
  const safe = sanitizeUploadFilename(filename || "image");
  const stamp = Date.now().toString(36);
  const rand = crypto.randomUUID().slice(0, 8);
  return `uploads/${stamp}-${rand}-${safe}`;
}
