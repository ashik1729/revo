"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { adminInput } from "@/components/admin/ui";

interface ImageUploaderProps {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
}

export default function ImageUploader({
  name,
  label,
  defaultValue = "",
  hint = "Upload a new image or keep/paste an existing URL.",
}: ImageUploaderProps) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpload = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      setValue(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="relative aspect-[16/10] bg-white">
          {value ? (
            <Image
              src={value}
              alt={label}
              fill
              unoptimized
              className="object-contain p-3"
              sizes="320px"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
              <ImagePlus className="h-8 w-8" />
              <p className="text-xs">No image selected</p>
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-slate-200 p-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0b1f5c] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#132a6e]">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
            {uploading ? "Uploading..." : "Upload image"}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              disabled={uploading}
              onChange={(event) => onUpload(event.target.files?.[0] || null)}
            />
          </label>

          <input
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="/api/media/uploads/..."
            className={adminInput}
          />
          <p className="text-xs text-slate-400">{hint}</p>
          {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
