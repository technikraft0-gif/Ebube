"use client"

/** Upload a file straight to Supabase Storage via our secure API route, recording it in the media library. */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const body = new FormData()
  body.append("file", file)
  body.append("folder", folder)

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
  })

  const result = await response.json()
  if (!response.ok || !result.ok) {
    throw new Error(result.error ?? "Upload failed")
  }

  return result.url
}
