import { NextResponse } from "next/server";
import { getMediaBucket } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ key: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { key: parts } = await context.params;
  const key = parts.map(decodeURIComponent).join("/");

  if (!key || key.includes("..")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const bucket = await getMediaBucket();
  if (!bucket) {
    return NextResponse.json({ error: "Media storage unavailable" }, { status: 503 });
  }

  const object = await bucket.get(key);
  if (!object || !object.body) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const headers = new Headers();
  const contentType = object.httpMetadata?.contentType || "application/octet-stream";
  headers.set("content-type", contentType);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new NextResponse(object.body, { headers });
}
