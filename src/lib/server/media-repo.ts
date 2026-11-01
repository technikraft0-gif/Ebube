import "server-only"
import { getSupabase, hasDatabase } from "./supabase"

export type MediaAsset = {
  _id: string
  url: string
  originalUrl: string
  resourceType: string
  format?: string
  bytes?: number
  width?: number
  height?: number
  folder: string
  name: string
  createdAt: Date
}

export async function recordMedia(asset: MediaAsset) {
  if (!hasDatabase()) return
  const supabase = getSupabase()
  const { error } = await supabase.from("media").upsert({
    id: asset._id,
    url: asset.url,
    name: asset.name,
    folder: asset.folder,
    resource_type: asset.resourceType,
    data: {
      originalUrl: asset.originalUrl,
      format: asset.format,
      bytes: asset.bytes,
      width: asset.width,
      height: asset.height,
    },
    created_at: asset.createdAt.toISOString(),
  })
  if (error) {
    console.error("[media-repo] Error recording media:", error)
    throw error
  }
}

export async function listMedia(limit = 200): Promise<MediaAsset[]> {
  if (!hasDatabase()) return []
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false }).limit(limit)
    if (error) throw error
    if (!data) return []
    return data.map((row) => ({
      _id: row.id,
      url: row.url,
      originalUrl: row.data?.originalUrl || row.url,
      resourceType: row.resource_type || "image",
      format: row.data?.format,
      bytes: row.data?.bytes,
      width: row.data?.width,
      height: row.data?.height,
      folder: row.folder || "",
      name: row.name,
      createdAt: new Date(row.created_at),
    }))
  } catch (error) {
    console.error("[media-repo] Error listing media:", error)
    return []
  }
}

export async function removeMedia(id: string): Promise<MediaAsset | null> {
  if (!hasDatabase()) return null
  try {
    const supabase = getSupabase()
    const { data } = await supabase.from("media").select("*").eq("id", id).maybeSingle()
    if (!data) return null
    await supabase.from("media").delete().eq("id", id)
    return {
      _id: data.id,
      url: data.url,
      originalUrl: data.data?.originalUrl || data.url,
      resourceType: data.resource_type || "image",
      format: data.data?.format,
      bytes: data.data?.bytes,
      width: data.data?.width,
      height: data.data?.height,
      folder: data.folder || "",
      name: data.name,
      createdAt: new Date(data.created_at),
    }
  } catch (error) {
    console.error("[media-repo] Error deleting media:", error)
    return null
  }
}
