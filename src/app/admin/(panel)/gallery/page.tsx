import { supabaseStorageConfigured } from "@/lib/server/supabase"
import { getSection } from "@/lib/server/content-repo"
import { listMedia } from "@/lib/server/media-repo"
import { GalleryManager } from "./gallery-manager"

export const metadata = { title: "Photo gallery" }

export default async function GalleryAdminPage() {
  const [{ value, edited, updatedAt }, assets] = await Promise.all([getSection("gallery"), listMedia()])
  return (
    <div className="admin-stack">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Supabase Storage</p>
          <h1 className="admin-title">Photo gallery</h1>
          <p className="admin-muted">Every photo here shows on <a className="admin-link" href="/gallery" target="_blank">/gallery</a>. Tick “In hero” to also show it in the homepage photo card (the first 7 ticked appear there).</p>
        </div>
        <span className={`admin-badge ${edited ? "admin-badge-accent" : ""}`}>{edited ? "Edited in admin" : "Original content"}</span>
      </header>
      {supabaseStorageConfigured() ? null : <p className="admin-card admin-error">Supabase Storage isn’t configured yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.</p>}
      <GalleryManager key={updatedAt?.toISOString() ?? "original"} initial={JSON.parse(JSON.stringify(value))}
        library={assets.filter((asset) => asset.resourceType === "image").map((asset) => ({ url: asset.url, name: asset.name }))} />
    </div>
  )
}
