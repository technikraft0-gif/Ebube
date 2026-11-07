export type FallbackPost = {
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

export const fallbackPosts: FallbackPost[] = [
  {
    slug: "building-scholarium-ai-academic-companion",
    coverAlt: "Scholarium mobile and web architecture diagram showing Flutter, WebSockets, and AI reasoning engine",
    title: "Building Scholarium: An AI-Powered Academic Companion",
    excerpt: "How I lead the engineering team building Scholarium — combining Flutter cross-platform mobile apps, real-time WebSocket live quizzes, and AI PDF lecture analysis.",
    tags: ["Flutter", "Mobile", "AI", "WebSockets", "Next.js"],
    seoTitle: "Building Scholarium: An AI-Powered Academic Companion for University Students",
    seoDescription: "Architecture breakdown of Scholarium: Flutter mobile app, real-time multiplayer quiz engine, AI PDF lecture analysis, and PostgreSQL data model.",
    publishedAt: "2026-10-25T08:00:00.000Z",
    featured: true,
    content: "University students, particularly freshers, face intense academic friction: massive lecture PDF handouts, complex mathematics courses, and fast-paced syllabi. Traditional study habits leave students isolated without instant feedback.\n\nAs Team Lead and Full-Stack / Mobile Engineer on Scholarium, I set out with our team to solve this using a multi-platform architecture built on Flutter, Next.js, and an AI document reasoning engine.\n\n## 1. Cross-Platform Mobile Experience with Flutter\n\nStudents need fast, responsive access on their Android and iOS devices inside lecture halls where connectivity is frequently unstable. We engineered the mobile app in Flutter with an offline-first SQLite synchronization layer.\n\n- Class timetables and downloaded lecture summaries remain instantly viewable offline.\n- When the device regains internet connection, local study records and quiz completions synchronize seamlessly with our PostgreSQL backend.\n\n## 2. Real-Time Multiplayer Quiz Engine\n\nActive recall is the most effective learning methodology. To make studying collaborative and competitive, we built a real-time multiplayer quiz system using WebSockets.\n\nStudents enter live subject rooms, answer timed multi-choice questions simultaneously, and receive immediate score updates on campus leaderboards.\n\n## 3. AI PDF Lecture Breakdown\n\nOne of our core features is an AI-driven document intelligence engine that analyzes voluminous lecture PDFs. It breaks down complex theorems into plain-language summaries and generates custom practice questions in seconds.\n\n## What's Next\n\nScholarium is currently in active development with our team. Demos and architectural walk-throughs are available on request.",
    coverImage: "/projects/scholarium.svg",
    status: "published",
    canonicalUrl: "",
    updatedAt: "2026-10-25T08:00:00.000Z",
    readingMinutes: 5,
  },
  {
    slug: "mastery-lab-interactive-learning-sandbox",
    coverAlt: "Split-screen in-browser code editor and live preview sandbox for Mastery Lab",
    title: "How I Built Mastery Lab: An Interactive HTML & CSS Learning Sandbox",
    excerpt: "Designing and engineering a 100% free web education platform with in-browser sandboxed code execution, real-time DOM validation, and competitive XP leaderboards.",
    tags: ["EdTech", "Next.js", "TypeScript", "Web Development"],
    seoTitle: "How I Built Mastery Lab: In-Browser HTML & CSS Learning Platform",
    seoDescription: "Inside Mastery Lab: sandboxed iframe execution, real-time DOM test runners, Supabase authentication, and gamified XP leaderboards.",
    publishedAt: "2026-10-22T10:00:00.000Z",
    featured: true,
    content: "When people learn web development, video tutorials often leave them passively watching rather than writing code. Setting up local dev environments creates friction before students even write their first HTML tag.\n\nI created Mastery Lab to remove all friction: a 100% free platform where developers learn HTML and CSS with concise documented lessons paired with an instant split-screen code editor.\n\n## Sandboxed In-Browser Execution\n\nThe editor isolates user HTML and CSS inside a secured iframe sandbox, streaming live visual previews as the student types. Automated test runners inspect the generated DOM tree against challenge specifications and award XP upon passing.\n\n## Gamification & Retention\n\nEvery lesson, challenge, and quiz awards experience points (XP). Supabase PostgreSQL tables track student progress and display weekly rankings on a global competitive leaderboard, dramatically increasing course completion rates.",
    coverImage: "/projects/mastery-lab.svg",
    status: "published",
    canonicalUrl: "",
    updatedAt: "2026-10-22T10:00:00.000Z",
    readingMinutes: 4,
  },
  {
    slug: "paystack-webhooks-done-right",
    coverAlt: "Two webhook envelopes passing a verified shield into a secure database ledger",
    title: "Paystack Webhooks Done Right in Production",
    excerpt: "Verify HMAC signatures over the raw payload body, ensure idempotent event processing, and keep money transactions in an atomic database ledger.",
    tags: ["Payments", "Paystack", "Security", "Node.js"],
    seoTitle: "Paystack Webhooks Done Right: Production Security & Idempotency",
    seoDescription: "A practical guide to securing Paystack webhooks: HMAC verification, idempotent transaction deduplication, and atomic PostgreSQL recording.",
    publishedAt: "2026-10-20T12:00:00.000Z",
    featured: false,
    content: "In production e-commerce and fintech applications like Venicio Boutique, handling payment webhooks correctly is the line between secure revenue and catastrophic fraud.\n\n## 1. Verify the Signature Over the Raw Body\n\nPaystack sends an `x-paystack-signature` header containing an HMAC-SHA512 hash computed using your secret key. You must compute the signature against the raw request buffer before JSON parsing:\n\n```ts\nimport { createHmac, timingSafeEqual } from \"node:crypto\"\n\nfunction verifyPaystackSignature(rawBody: Buffer, signature: string, secret: string): boolean {\n  const expected = createHmac(\"sha512\", secret).update(rawBody).digest(\"hex\")\n  return signature.length === expected.length &&\n    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))\n}\n```\n\n## 2. Enforce Idempotency\n\nPayment providers can retry webhook deliveries if your server acknowledges slowly. Always record the transaction reference inside an atomic database transaction. If the reference already exists, return HTTP 200 immediately without crediting or dispatching goods twice.\n\n## 3. Atomic Database Deductions\n\nIn retail and boutique storefronts, update product stock counts using atomic SQL decrement queries (`UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0`) rather than reading then writing, preventing inventory race conditions during flash sales.",
    coverImage: "/projects/venicio-boutique.svg",
    status: "published",
    canonicalUrl: "",
    updatedAt: "2026-10-20T12:00:00.000Z",
    readingMinutes: 4,
  },
  {
    slug: "hiring-a-remote-full-stack-developer-from-lagos",
    coverAlt: "Laptop displaying modern software architecture with clocks overlapping Nigeria and global time zones",
    title: "Working with a Remote Full-Stack Engineer from Nigeria: What to Expect",
    excerpt: "What working with me looks like: structured milestones, 2 to 4 weeks for web portals, 6 to 12 weeks for production MVPs, and a WAT (UTC+1) schedule that overlaps with Europe and the Americas.",
    tags: ["Engineering", "Remote Work", "Architecture"],
    seoTitle: "Working with Ebube Udorie (Technikraft) – Remote Full-Stack Engineer",
    seoDescription: "Timelines, process, time zones and collaboration when you work with Ebube Udorie (Technikraft), a remote full-stack and mobile engineer in Uyo, Nigeria (WAT, UTC+1).",
    publishedAt: "2026-10-20T02:03:00.000Z",
    featured: false,
    content: "When you hire me as a remote full-stack developer and app engineer from Nigeria, expect a prompt reply with clear architectural milestones and a build executed across four phases: discovery, technical planning, iterative development, and production deployment.\n\n## Who You're Working With\n\nI'm Ebube Udorie, also known as Technikraft, a Full-Stack Engineer and App Developer based in Uyo, Nigeria. I own products from relational database schemas and scalable APIs to fluid, responsive user interfaces and cloud deployment. I combine formal engineering training in Computer Engineering at the University of Uyo with proven delivery across Next.js, React, Node.js, Flutter, TypeScript, C++, PostgreSQL, and Supabase.\n\n## Flagship Projects\n\n- **Scholarium:** University academic companion and mobile app featuring real-time multiplayer quizzes, AI PDF analysis, and step-by-step mathematics solver.\n- **Mastery Lab:** Interactive, 100% free web learning system for developers to master HTML & CSS with live code previews and competitive leaderboards.\n- **Springlight Commerce:** Custom enterprise management platform with real-time sales logging, inventory control, and automated financial analytics.\n- **Venicio Boutique:** Luxury fashion e-commerce storefront with verified Paystack checkout and responsive lookbooks.\n\n## Time Zones and Availability\n\nNigeria operates on West Africa Time (WAT, UTC+1):\n- **UK and Europe:** Complete overlap with your regular working day.\n- **US East Coast:** 4 to 5 hours of working overlap every afternoon.\n- **Global:** Regular synchronous syncs combined with clear asynchronous documentation.\n\nI work remotely with teams and founders worldwide on engineering contracts, product builds, and technical leadership roles.",
    coverImage: "/projects/scholarium.svg",
    status: "published",
    canonicalUrl: "",
    updatedAt: "2026-10-20T02:03:00.000Z",
    readingMinutes: 4,
  },
]
