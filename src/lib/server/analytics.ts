import "server-only"
import { createHash, randomUUID } from "node:crypto"
import { UAParser } from "ua-parser-js"
import { getSupabase, hasDatabase } from "./supabase"
import { classifySource, detectCrawler, hostOf, type SourceType } from "@/lib/traffic-sources"

export type Visit = {
  _id: string
  visitorId: string
  sessionId: string
  path: string
  title?: string
  query?: string
  referrer?: string
  referrerHost?: string
  source: string
  sourceType: SourceType
  utm?: { source?: string; medium?: string; campaign?: string; term?: string; content?: string }
  entry: boolean
  country?: string
  region?: string
  city?: string
  device: string
  browser?: string
  os?: string
  screen?: string
  language?: string
  timezone?: string
  ipHash?: string
  durationMs?: number
  scrollDepth?: number
  bot?: boolean
  createdAt: Date
}

export type SiteEvent = { _id: string; type: string; visitorId?: string; sessionId?: string; path?: string; target?: string; label?: string; source?: string; country?: string; createdAt: Date }
export type Crawl = { _id: string; bot: string; ai: boolean; path: string; userAgent: string; createdAt: Date }

function geo(headers: Headers) {
  const decode = (value: string | null) => (value ? decodeURIComponent(value) : undefined)
  return {
    country: headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? undefined,
    region: decode(headers.get("x-vercel-ip-country-region")),
    city: decode(headers.get("x-vercel-ip-city")),
  }
}

function ipHash(headers: Headers) {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip")
  if (!ip) return undefined
  const day = new Date().toISOString().slice(0, 10)
  return createHash("sha256").update(`${process.env.ANALYTICS_SALT || process.env.ADMIN_SESSION_SECRET || ""}:${day}:${ip}`).digest("hex").slice(0, 24)
}

function device(userAgent: string) {
  const result = new UAParser(userAgent).getResult()
  const type = result.device.type === "mobile" ? "Mobile" : result.device.type === "tablet" ? "Tablet" : "Desktop"
  return { device: type, browser: result.browser.name, os: result.os.name }
}

function isAutomated(headers: Headers) {
  return Boolean(detectCrawler(headers.get("user-agent"))) || /headless/i.test(headers.get("sec-ch-ua") ?? "")
}

const text = (value: unknown, max = 300) => (typeof value === "string" && value ? value.slice(0, max) : undefined)

export type PageviewInput = {
  visitorId?: string; sessionId?: string; path?: string; title?: string; query?: string; referrer?: string; entry?: boolean
  screen?: string; language?: string; timezone?: string
}

export async function recordPageview(request: Request, input: PageviewInput) {
  if (!hasDatabase()) return null
  const userAgent = request.headers.get("user-agent") ?? ""
  if (isAutomated(request.headers)) return null

  try {
    const supabase = getSupabase()
    const params = new URLSearchParams(input.query ?? "")
    const utm = {
      source: text(params.get("utm_source"), 100), medium: text(params.get("utm_medium"), 100), campaign: text(params.get("utm_campaign"), 150),
      term: text(params.get("utm_term"), 150), content: text(params.get("utm_content"), 150),
    }
    const utmTags = Object.fromEntries(Object.entries(utm).filter(([, value]) => value))
    const hasUtm = Object.keys(utmTags).length > 0
    const siteHost = hostOf(request.url)
    const referrer = text(input.referrer, 500)
    const { source, type } = classifySource({ referrer, utmSource: utm.source ?? params.get("ref") ?? params.get("source"), utmMedium: utm.medium, siteHost })

    const sessionId = text(input.sessionId, 64) ?? "unknown"
    let entry = Boolean(input.entry)
    if (!entry) {
      const { data: existing } = await supabase.from("analytics_visits").select("id").eq("session_id", sessionId).limit(1)
      entry = !existing || existing.length === 0
    }

    const id = randomUUID()
    const visitData = {
      title: text(input.title, 200),
      query: text(input.query, 500),
      referrer,
      referrerHost: hostOf(referrer) || undefined,
      utm: hasUtm ? utmTags : undefined,
      ...geo(request.headers),
      ...device(userAgent),
      screen: text(input.screen, 20),
      language: text(input.language, 20),
      timezone: text(input.timezone, 60),
      ipHash: ipHash(request.headers),
    }

    await supabase.from("analytics_visits").insert({
      id,
      visitor_id: text(input.visitorId, 64) ?? "unknown",
      session_id: sessionId,
      path: text(input.path, 300) ?? "/",
      source,
      source_type: type,
      entry,
      bot: false,
      data: visitData,
      created_at: new Date().toISOString(),
    })

    return id
  } catch (error) {
    console.error("[analytics] Record pageview error:", error)
    return null
  }
}

export async function recordLeave(viewId: string, durationMs: number, scrollDepth: number) {
  if (!hasDatabase()) return
  try {
    const supabase = getSupabase()
    const duration = Math.max(0, Math.min(Math.round(durationMs), 1000 * 60 * 60))
    const scroll = Math.max(0, Math.min(100, Math.round(scrollDepth)))
    const { data } = await supabase.from("analytics_visits").select("data").eq("id", viewId).maybeSingle()
    if (data) {
      const updated = { ...(data.data || {}), durationMs: duration, scrollDepth: scroll }
      await supabase.from("analytics_visits").update({ data: updated }).eq("id", viewId)
    }
  } catch (error) {
    console.error("[analytics] Record leave error:", error)
  }
}

export async function recordEvent(request: Request, input: { type: string; visitorId?: string; sessionId?: string; path?: string; target?: string; label?: string }) {
  if (!hasDatabase()) return
  if (isAutomated(request.headers)) return
  try {
    const supabase = getSupabase()
    let source: string | undefined
    if (input.sessionId) {
      const { data } = await supabase.from("analytics_visits").select("source").eq("session_id", input.sessionId).eq("entry", true).maybeSingle()
      source = data?.source
    }
    const { country } = geo(request.headers)
    await supabase.from("analytics_events").insert({
      id: randomUUID(),
      type: input.type,
      data: {
        visitorId: input.visitorId,
        sessionId: input.sessionId,
        path: input.path,
        target: input.target,
        label: input.label,
        source,
        country,
      },
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[analytics] Record event error:", error)
  }
}

export async function recordCrawl(pathname: string, userAgent: string) {
  void pathname
  void userAgent
}
