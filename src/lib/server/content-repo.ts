import "server-only"
import { getSupabase, hasDatabase } from "./supabase"
import { contentSections, defaultProjects, type ContentSectionKey, type ContentSectionValues, type StoredProject } from "@/lib/content-sections"

/** All sections, with database copies where they exist and file defaults otherwise. */
export async function loadSections(): Promise<ContentSectionValues> {
  const values = Object.fromEntries(Object.entries(contentSections).map(([key, section]) => [key, section.defaults])) as ContentSectionValues
  if (!hasDatabase()) return values
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("content").select("id, data")
    if (error) throw error
    if (data) {
      for (const row of data) {
        if (Object.hasOwn(values, row.id)) {
          ;(values as Record<string, unknown>)[row.id] = row.data
        }
      }
    }
  } catch (error) {
    console.error("[content] Falling back to file content:", error)
  }
  return values
}

export async function getSection<K extends ContentSectionKey>(key: K): Promise<{ value: ContentSectionValues[K]; edited: boolean; updatedAt?: Date }> {
  if (!hasDatabase()) {
    return { value: contentSections[key].defaults as ContentSectionValues[K], edited: false }
  }
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("content").select("data, updated_at").eq("id", key).maybeSingle()
    if (error) throw error
    if (data?.data) {
      return { value: data.data as ContentSectionValues[K], edited: true, updatedAt: data.updated_at ? new Date(data.updated_at) : undefined }
    }
  } catch (error) {
    console.error(`[content] Could not load section ${key}:`, error)
  }
  return { value: contentSections[key].defaults as ContentSectionValues[K], edited: false }
}

export async function saveSection(key: ContentSectionKey, data: unknown) {
  const supabase = getSupabase()
  const { error } = await supabase.from("content").upsert({
    id: key,
    data,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

/** Drop the database copy so the section goes back to the file defaults. */
export async function resetSection(key: ContentSectionKey) {
  const supabase = getSupabase()
  const { error } = await supabase.from("content").delete().eq("id", key)
  if (error) throw error
}

/** Projects in display order. Hidden projects are included only when asked (admin). */
export async function loadProjects({ includeHidden = false } = {}): Promise<StoredProject[]> {
  if (!hasDatabase()) return defaultProjects
  try {
    const supabase = getSupabase()
    let query = supabase.from("projects").select("data, order_num, hidden").order("order_num", { ascending: true })
    if (!includeHidden) {
      query = query.neq("hidden", true)
    }
    const { data, error } = await query
    if (error) throw error
    if (!data || data.length === 0) return defaultProjects
    return data.map((row) => row.data as StoredProject)
  } catch (error) {
    console.error("[content] Falling back to file projects:", error)
    return defaultProjects
  }
}

/** Copy the file projects into the database the first time projects are edited. */
export async function ensureProjectsSeeded() {
  if (!hasDatabase()) return
  try {
    const supabase = getSupabase()
    const { count, error: countErr } = await supabase.from("projects").select("slug", { count: "exact", head: true })
    if (countErr) throw countErr
    if (count && count > 0) return

    const now = new Date().toISOString()
    const rows = defaultProjects.map((project, index) => ({
      slug: project.slug,
      data: { ...project, order: index, updatedAt: now },
      order_num: index,
      hidden: Boolean(project.hidden),
      updated_at: now,
    }))
    const { error: insertErr } = await supabase.from("projects").upsert(rows)
    if (insertErr) throw insertErr
  } catch (error) {
    console.error("[content] Could not seed default projects:", error)
  }
}

export async function getProject(slug: string) {
  await ensureProjectsSeeded()
  if (!hasDatabase()) {
    return defaultProjects.find((p) => p.slug === slug) ?? null
  }
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("projects").select("data").eq("slug", slug).maybeSingle()
    if (error) throw error
    if (data?.data) return data.data as StoredProject
  } catch (error) {
    console.error(`[content] Error getting project ${slug}:`, error)
  }
  return defaultProjects.find((p) => p.slug === slug) ?? null
}

/** Create (previousSlug null) or update a project. Changing the slug moves the document. */
export async function saveProject(previousSlug: string | null, project: StoredProject) {
  await ensureProjectsSeeded()
  const supabase = getSupabase()
  const now = new Date().toISOString()

  // Verify slug availability
  const checkSlug = async (s: string) => {
    const { data } = await supabase.from("projects").select("slug").eq("slug", s).maybeSingle()
    return Boolean(data)
  }

  let order = project.order
  if (previousSlug === null) {
    if (await checkSlug(project.slug)) {
      throw new Error(`A project with the slug "${project.slug}" already exists`)
    }
    const { data: lastRows } = await supabase.from("projects").select("order_num").order("order_num", { ascending: false }).limit(1)
    order = ((lastRows?.[0]?.order_num ?? -1) + 1)
  } else if (previousSlug !== project.slug) {
    if (await checkSlug(project.slug)) {
      throw new Error(`A project with the slug "${project.slug}" already exists`)
    }
    await supabase.from("projects").delete().eq("slug", previousSlug)
  }

  const doc: StoredProject = { ...project, order: order ?? 0, updatedAt: now }
  const { error } = await supabase.from("projects").upsert({
    slug: project.slug,
    data: doc,
    order_num: doc.order ?? 0,
    hidden: Boolean(doc.hidden),
    updated_at: now,
  })
  if (error) throw error
}

export async function deleteProject(slug: string) {
  await ensureProjectsSeeded()
  const supabase = getSupabase()
  const { error } = await supabase.from("projects").delete().eq("slug", slug)
  if (error) throw error
}

export async function reorderProjects(slugs: string[]) {
  await ensureProjectsSeeded()
  const supabase = getSupabase()
  await Promise.all(slugs.map(async (slug, index) => {
    const { data } = await supabase.from("projects").select("data").eq("slug", slug).maybeSingle()
    if (data?.data) {
      const updatedData = { ...(data.data as StoredProject), order: index }
      await supabase.from("projects").update({ order_num: index, data: updatedData }).eq("slug", slug)
    }
  }))
}
