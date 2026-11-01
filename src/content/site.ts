/**
 * Site-wide settings. Set NEXT_PUBLIC_SITE_URL in Vercel when you move to a custom domain.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://technikraft.vercel.app").replace(/\/$/, ""),
  name: "Ebube Udorie (Technikraft)",
  locale: "en_US",
  themeColor: "#F7F6F2",
  googleSiteVerification: "",
  /** Bing Webmaster Tools "msvalidate.01" code. Bing's index feeds ChatGPT search, Copilot and DuckDuckGo. */
  bingSiteVerification: "",
  /** IndexNow key (Bing, Yandex, Seznam…). The matching file is public/<key>.txt; run `npm run seo:indexnow` after a deploy. */
  indexNowKey: "4b0d1fe1c3782e62957219c31498f5fd",
  /** Bump this when you update content so sitemaps and llms.txt report a fresh date. */
  lastUpdated: "2026-10-30",
} as const

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString()
