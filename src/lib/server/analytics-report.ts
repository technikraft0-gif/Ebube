import "server-only"
import { getSupabase, hasDatabase } from "./supabase"
import type { Visit } from "./analytics"

export type Count = { key: string; count: number }
export type Filters = { days: number; source?: string; sourceType?: string }

const since = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

export async function analyticsSummary(days = 7) {
  if (!hasDatabase()) return null
  try {
    const supabase = getSupabase()
    const fromDate = since(days)

    // Parallel counts
    const [viewsRes, sessionsRes, aiRes, cvRes, sourcesRes] = await Promise.all([
      supabase.from("analytics_visits").select("id", { count: "exact", head: true }).gte("created_at", fromDate).eq("bot", false),
      supabase.from("analytics_visits").select("id", { count: "exact", head: true }).gte("created_at", fromDate).eq("bot", false).eq("entry", true),
      supabase.from("analytics_visits").select("id", { count: "exact", head: true }).gte("created_at", fromDate).eq("bot", false).eq("source_type", "ai"),
      supabase.from("analytics_events").select("id", { count: "exact", head: true }).gte("created_at", fromDate).eq("type", "cv_download"),
      supabase.from("analytics_visits").select("source").gte("created_at", fromDate).eq("bot", false).eq("entry", true).limit(200),
    ])

    const views = viewsRes.count ?? 0
    const sessions = sessionsRes.count ?? 0
    const ai = aiRes.count ?? 0
    const cv = cvRes.count ?? 0

    // Compute top sources
    const sourceMap = new Map<string, number>()
    if (sourcesRes.data) {
      for (const row of sourcesRes.data) {
        const s = row.source || "Direct"
        sourceMap.set(s, (sourceMap.get(s) ?? 0) + 1)
      }
    }
    const topSources: Count[] = Array.from(sourceMap.entries())
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return { views, sessions, ai, cv, topSources }
  } catch (error) {
    console.error("[analytics-report] Summary error:", error)
    return null
  }
}

export async function analyticsReport(filters: Filters) {
  if (!hasDatabase()) {
    return {
      totals: { views: 0, visitors: 0, sessions: 0, avgDuration: 0, avgScroll: 0, returning: 0, aiSessions: 0 },
      daily: [],
      sourceTypes: [], sources: [], aiSources: [], referrers: [], pages: [], landing: [],
      countries: [], cities: [], devices: [], browsers: [], oses: [], campaigns: [], languages: [],
      events: [], cvBySource: [], projectClicks: [], outbound: [], crawlers: [], crawlerPages: [],
      recent: [],
    }
  }

  try {
    const supabase = getSupabase()
    const fromDate = since(filters.days)

    let query = supabase.from("analytics_visits").select("*").gte("created_at", fromDate).eq("bot", false)
    if (filters.source) query = query.eq("source", filters.source)
    if (filters.sourceType) query = query.eq("source_type", filters.sourceType)

    const { data: rows, error } = await query.order("created_at", { ascending: false }).limit(2000)
    if (error) throw error

    const visits = rows || []
    const visitorsSet = new Set<string>()
    const sessionsSet = new Set<string>()
    const dailyMap = new Map<string, { views: number; sessions: Set<string>; ai: number }>()
    const sourceMap = new Map<string, number>()
    const sourceTypeMap = new Map<string, number>()
    const countryMap = new Map<string, number>()
    const deviceMap = new Map<string, number>()
    const browserMap = new Map<string, number>()
    const pageMap = new Map<string, number>()

    let totalDuration = 0
    let durationCount = 0
    let totalScroll = 0
    let scrollCount = 0

    for (const v of visits) {
      visitorsSet.add(v.visitor_id)
      sessionsSet.add(v.session_id)

      const day = new Date(v.created_at).toISOString().slice(0, 10)
      if (!dailyMap.has(day)) {
        dailyMap.set(day, { views: 0, sessions: new Set(), ai: 0 })
      }
      const d = dailyMap.get(day)!
      d.views++
      d.sessions.add(v.session_id)
      if (v.source_type === "ai") d.ai++

      if (v.entry) {
        sourceMap.set(v.source, (sourceMap.get(v.source) ?? 0) + 1)
        sourceTypeMap.set(v.source_type, (sourceTypeMap.get(v.source_type) ?? 0) + 1)
        if (v.data?.country) countryMap.set(v.data.country, (countryMap.get(v.data.country) ?? 0) + 1)
        if (v.data?.device) deviceMap.set(v.data.device, (deviceMap.get(v.data.device) ?? 0) + 1)
        if (v.data?.browser) browserMap.set(v.data.browser, (browserMap.get(v.data.browser) ?? 0) + 1)
      }

      pageMap.set(v.path, (pageMap.get(v.path) ?? 0) + 1)

      if (v.data?.durationMs) {
        totalDuration += v.data.durationMs
        durationCount++
      }
      if (v.data?.scrollDepth) {
        totalScroll += v.data.scrollDepth
        scrollCount++
      }
    }

    const toCounts = (map: Map<string, number>, limit = 15): Count[] =>
      Array.from(map.entries())
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)

    const daily = Array.from(dailyMap.entries())
      .map(([day, val]) => ({ day, views: val.views, sessions: val.sessions.size, ai: val.ai }))
      .sort((a, b) => a.day.localeCompare(b.day))

    return {
      totals: {
        views: visits.length,
        visitors: visitorsSet.size,
        sessions: sessionsSet.size,
        avgDuration: durationCount > 0 ? Math.round(totalDuration / durationCount) : 0,
        avgScroll: scrollCount > 0 ? Math.round(totalScroll / scrollCount) : 0,
        returning: Math.max(0, visits.length - visitorsSet.size),
        aiSessions: visits.filter((v) => v.source_type === "ai" && v.entry).length,
      },
      daily,
      sourceTypes: toCounts(sourceTypeMap),
      sources: toCounts(sourceMap),
      aiSources: toCounts(new Map(visits.filter((v) => v.source_type === "ai" && v.entry).map((v) => [v.source, 1]))),
      referrers: [],
      pages: toCounts(pageMap),
      landing: toCounts(new Map(visits.filter((v) => v.entry).map((v) => [v.path, 1]))),
      countries: toCounts(countryMap),
      cities: [],
      devices: toCounts(deviceMap),
      browsers: toCounts(browserMap),
      oses: [],
      campaigns: [],
      languages: [],
      events: [],
      cvBySource: [],
      projectClicks: [],
      outbound: [],
      crawlers: [],
      crawlerPages: [],
      recent: visits.slice(0, 30).map((v) => ({
        sessionId: v.session_id,
        start: v.created_at,
        visitorId: v.visitor_id,
        source: v.source,
        sourceType: v.source_type,
        referrer: v.data?.referrer,
        utm: v.data?.utm,
        country: v.data?.country,
        city: v.data?.city,
        device: v.data?.device ?? "Desktop",
        browser: v.data?.browser,
        os: v.data?.os,
        language: v.data?.language,
        timezone: v.data?.timezone,
        pages: [{ path: v.path, at: v.created_at, durationMs: v.data?.durationMs }],
        totalMs: v.data?.durationMs ?? 0,
      })),
    }
  } catch (error) {
    console.error("[analytics-report] Report error:", error)
    return {
      totals: { views: 0, visitors: 0, sessions: 0, avgDuration: 0, avgScroll: 0, returning: 0, aiSessions: 0 },
      daily: [],
      sourceTypes: [], sources: [], aiSources: [], referrers: [], pages: [], landing: [],
      countries: [], cities: [], devices: [], browsers: [], oses: [], campaigns: [], languages: [],
      events: [], cvBySource: [], projectClicks: [], outbound: [], crawlers: [], crawlerPages: [],
      recent: [],
    }
  }
}

export type AnalyticsReport = Awaited<ReturnType<typeof analyticsReport>>
