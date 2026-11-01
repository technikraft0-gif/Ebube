import { getPortfolioContent } from "@/lib/portfolio-content"
import { supabaseStorageConfigured } from "@/lib/server/supabase"
import { listMedia } from "@/lib/server/media-repo"
import { MediaLibrary } from "./media-library"

export const metadata = { title: "Media & CV" }

export default async function MediaPage() {
  const [assets, content] = await Promise.all([listMedia(), getPortfolioContent()])
  return (
    <div className="admin-stack">
      <header className="admin-header"><div><p className="admin-eyebrow">Supabase Storage</p><h1 className="admin-title">Media & CV</h1></div></header>
      {supabaseStorageConfigured() ? null : <p className="admin-card admin-error">Supabase Storage isn’t configured yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.</p>}
      <MediaLibrary cv={content.profile.cv} assets={assets.map((asset) => ({ id: asset._id, url: asset.url, name: asset.name, resourceType: asset.resourceType, format: asset.format ?? "", bytes: asset.bytes ?? 0, width: asset.width, height: asset.height, createdAt: asset.createdAt.toISOString() }))} />
    </div>
  )
}
