import "server-only"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/** True when Supabase is configured. Without it the site falls back to files in src/content. */
export const hasDatabase = () => Boolean(
  (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
)

export const supabaseStorageConfigured = () => hasDatabase()

export const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "portfolio"

let clientInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  if (!url || !key) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment.")
  }
  if (!clientInstance) {
    clientInstance = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return clientInstance
}

/** Upload a file buffer directly to Supabase Storage and return its permanent public CDN URL. */
export async function uploadToStorage(buffer: Buffer | Uint8Array, path: string, contentType?: string): Promise<string> {
  const supabase = getSupabase()
  const cleanPath = path.replace(/^\/+/, "")
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(cleanPath, buffer, {
    contentType: contentType || "application/octet-stream",
    upsert: true,
  })
  if (error) {
    console.error("[supabase-storage] Upload failed:", error)
    throw new Error(`Upload failed: ${error.message}`)
  }
  const { data: publicData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)
  return publicData.publicUrl
}

/** Delete a file from Supabase Storage by its bucket-relative path. */
export async function deleteFromStorage(path: string): Promise<void> {
  const supabase = getSupabase()
  const cleanPath = path.replace(/^\/+/, "")
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([cleanPath])
  if (error) {
    console.error("[supabase-storage] Delete failed:", error)
  }
}
