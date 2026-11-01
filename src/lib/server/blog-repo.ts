import "server-only"
import { unstable_cache } from "next/cache"
import { getSupabase, hasDatabase } from "./supabase"
import { fallbackPosts } from "@/content/fallback-posts"

export type PostStatus = "draft" | "published"

export type Post = {
  slug: string
  title: string
  excerpt: string
  /** Markdown. */
  content: string
  coverImage: string
  coverAlt: string
  tags: string[]
  status: PostStatus
  featured: boolean
  /** Overrides for search results and social cards; fall back to title/excerpt. */
  seoTitle: string
  seoDescription: string
  /** Set when the post was first published somewhere else (e.g. Dev.to). */
  canonicalUrl: string
  publishedAt: string | null
  updatedAt: string
  readingMinutes: number
}

export const BLOG_TAG = "blog-posts"

export const readingMinutes = (markdown: string) => Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 220))

export async function listPosts({ includeDrafts = false } = {}): Promise<Post[]> {
  if (!hasDatabase()) {
    const list = includeDrafts ? fallbackPosts : fallbackPosts.filter((p) => p.status === "published")
    return list.slice().sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
  }
  try {
    const supabase = getSupabase()
    let query = supabase.from("posts").select("data, status, published_at")
    if (!includeDrafts) {
      const now = new Date().toISOString()
      query = query.eq("status", "published").lte("published_at", now)
    }
    const { data, error } = await query.order("published_at", { ascending: false, nullsFirst: false })
    if (error) throw error
    if (!data || data.length === 0) {
      const list = includeDrafts ? fallbackPosts : fallbackPosts.filter((p) => p.status === "published")
      return list.slice().sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
    }
    return data.map((row) => row.data as Post)
  } catch (error) {
    console.error("[blog] Could not load posts:", error)
    return fallbackPosts
  }
}

export async function getPost(slug: string, { includeDrafts = false } = {}) {
  if (!hasDatabase()) {
    const found = fallbackPosts.find((p) => p.slug === slug)
    if (!found) return null
    if (!includeDrafts && (found.status !== "published" || !found.publishedAt)) return null
    return found
  }
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("posts").select("data, status, published_at").eq("slug", slug).maybeSingle()
    if (error) throw error
    if (!data) {
      return fallbackPosts.find((p) => p.slug === slug) || null
    }
    const post = data.data as Post
    if (!includeDrafts && (data.status !== "published" || !data.published_at || data.published_at > new Date().toISOString())) {
      return null
    }
    return post
  } catch (error) {
    console.error(`[blog] Error getting post ${slug}:`, error)
    return fallbackPosts.find((p) => p.slug === slug) || null
  }
}

const isDev = process.env.NODE_ENV === "development"

/** Published posts, cached for the public site and refreshed when the admin saves. */
export const getPublishedPosts = isDev ? () => listPosts() : unstable_cache(() => listPosts(), ["blog-posts"], { tags: [BLOG_TAG], revalidate: 3600 })
export const getPublishedPost = isDev ? (slug: string) => getPost(slug) : unstable_cache((slug: string) => getPost(slug), ["blog-post"], { tags: [BLOG_TAG], revalidate: 3600 })

export async function savePost(previousSlug: string | null, post: Post): Promise<Post> {
  const supabase = getSupabase()
  const now = new Date().toISOString()
  const doc: Post = {
    ...post,
    updatedAt: now,
    readingMinutes: readingMinutes(post.content),
    publishedAt: post.status === "published" ? post.publishedAt || now : post.publishedAt,
  }

  // Check slug uniqueness
  if (previousSlug !== post.slug) {
    const { data: existing } = await supabase.from("posts").select("slug").eq("slug", post.slug).maybeSingle()
    if (existing) throw new Error(`A post with the slug "${post.slug}" already exists`)
  }

  if (previousSlug && previousSlug !== post.slug) {
    await supabase.from("posts").delete().eq("slug", previousSlug)
  }

  const { error } = await supabase.from("posts").upsert({
    slug: post.slug,
    status: doc.status,
    published_at: doc.publishedAt,
    data: doc,
    updated_at: now,
  })
  if (error) throw error
  return doc
}

export async function deletePost(slug: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.from("posts").delete().eq("slug", slug)
  if (error) throw error
}
