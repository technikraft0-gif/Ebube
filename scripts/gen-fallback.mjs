import fs from "node:fs"
import path from "node:path"

const seeds = [
  {
    slug: "how-i-built-a-langgraph-multi-agent-planner",
    coverAlt: "A coordinator node linked to five agent nodes, one flagged as the red-team agent",
    title: "How I built a LangGraph multi-agent planner",
    excerpt: "B4Build turns an AI product idea into a nine-phase build plan with five LangGraph nodes, a rule-based coordinator and a red-team agent that attacks the result.",
    tags: ["AI agents", "LangGraph", "FastAPI"],
    seoTitle: "How I Built a LangGraph Multi-Agent Planner",
    seoDescription: "Inside B4Build: five LangGraph nodes, a rule-based coordinator, a red-team agent, partial re-runs, SSE streaming and the AWS setup behind it.",
    publishedAt: "2026-10-20T02:00:00.000Z",
    featured: true,
  },
  {
    slug: "paystack-webhooks-done-right",
    coverAlt: "Two webhook envelopes passing a verified shield into a naira ledger",
    title: "Paystack webhooks done right",
    excerpt: "Verify the signature, re-verify the transaction, make recording idempotent, never retry provider calls and keep money in a ledger: the rules behind SureCova's payments.",
    tags: ["Payments", "Paystack", "NestJS"],
    seoTitle: "Paystack Webhooks Done Right: A Practical Guide",
    seoDescription: "How to verify Paystack webhooks, handle the redirect and webhook arriving twice, stay idempotent and keep money in a ledger, from SureCova.",
    publishedAt: "2026-10-20T02:01:00.000Z",
    featured: false,
  },
  {
    slug: "face-recognition-check-in-that-cant-be-fooled-by-a-photo",
    coverAlt: "A check-in kiosk tracking facial landmarks with a head-turn arrow, next to a rejected printed photo",
    title: "Face-recognition check-in that can't be fooled by a photo",
    excerpt: "How TimeWise stops a printed or on-screen photo from checking someone in: a random head-turn challenge measured from facial landmarks, not a buggy head-pose plugin.",
    tags: ["Computer vision", "SaaS", "Nigeria"],
    seoTitle: "Face Check-in That a Photo Can't Fool: Liveness",
    seoDescription: "How TimeWise blocks photo spoofing at a face-recognition kiosk with a random head-turn challenge measured from landmarks, plus the plugin bug behind it.",
    publishedAt: "2026-10-20T02:02:00.000Z",
    featured: false,
  },
  {
    slug: "hiring-a-remote-full-stack-developer-from-lagos",
    coverAlt: "A laptop between Nigeria and European clocks, with their working hours overlapping",
    title: "Hiring a remote full-stack developer from Nigeria: what to expect",
    excerpt: "What working with me looks like: four stages, 2 to 4 weeks for a website, 6 to 12 weeks for an MVP with payments, and a WAT (UTC+1) schedule that overlaps with Europe.",
    tags: ["Hiring", "Engineering", "Freelance"],
    seoTitle: "Hiring a Remote Full-Stack Developer from Nigeria",
    seoDescription: "Timelines, process, time zones and handover when you hire Ebube Udorie (Technikraft), a remote full-stack engineer in Uyo, Nigeria (WAT, UTC+1).",
    publishedAt: "2026-10-20T02:03:00.000Z",
    featured: false,
  },
]

const posts = seeds.map((s) => {
  const content = fs.readFileSync(path.join("scripts", "blog-posts", s.slug + ".md"), "utf8")
  const readingMinutes = Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 220))
  return {
    ...s,
    content,
    coverImage: "/images/blog/" + s.slug + ".png",
    status: "published",
    canonicalUrl: "",
    updatedAt: s.publishedAt,
    readingMinutes,
  }
})

const fileContent = `export type FallbackPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  coverAlt: string
  tags: string[]
  status: "draft" | "published"
  featured: boolean
  seoTitle: string
  seoDescription: string
  canonicalUrl: string
  publishedAt: string | null
  updatedAt: string
  readingMinutes: number
}

export const fallbackPosts: FallbackPost[] = ${JSON.stringify(posts, null, 2)};
`

fs.writeFileSync("src/content/fallback-posts.ts", fileContent, "utf8")
console.log("Successfully generated src/content/fallback-posts.ts with", posts.length, "posts")
