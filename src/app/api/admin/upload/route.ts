import { getSession } from "@/lib/auth/admin"
import { uploadToStorage } from "@/lib/server/supabase"
import { recordMedia } from "@/lib/server/media-repo"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "library"

    if (!file) {
      return Response.json({ ok: false, error: "No file provided" }, { status: 400 })
    }

    const safeFolder = folder.replace(/[^a-z0-9_-]/gi, "").slice(0, 40) || "library"
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const storagePath = `${safeFolder}/${Date.now()}-${safeName}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const publicUrl = await uploadToStorage(buffer, storagePath, file.type)

    const isImage = file.type.startsWith("image/")
    const format = file.name.split(".").pop()?.toLowerCase() || ""

    await recordMedia({
      _id: storagePath,
      url: publicUrl,
      originalUrl: publicUrl,
      resourceType: isImage ? "image" : file.type === "application/pdf" ? "pdf" : "raw",
      format,
      bytes: file.size,
      folder: safeFolder,
      name: file.name,
      createdAt: new Date(),
    })

    return Response.json({ ok: true, url: publicUrl, name: file.name, path: storagePath })
  } catch (error) {
    console.error("[api/admin/upload] Upload error:", error)
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 })
  }
}
