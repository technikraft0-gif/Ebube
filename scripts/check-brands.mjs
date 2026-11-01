import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, "../public/icons/brands")

const slugs = [
  "javascript", "typescript", "react", "nextdotjs", "nodedotjs",
  "php", "mongodb", "postgresql", "docker", "redis",
  "git", "tailwindcss", "astro", "vercel", "express",
  "supabase", "amazonwebservices", "html5", "css", "python",
  "fastapi", "mysql", "laravel", "netlify", "googlecloud",
  "rust", "prisma", "nestjs", "materialui", "firebase",
  "cplusplus", "c"
]

console.log(`Checking ${slugs.length} brand icons in public/icons/brands/...\n`)
let missingCount = 0

for (const slug of slugs) {
  const filePath = path.join(brandsDir, `${slug}.svg`)
  if (!fs.existsSync(filePath)) {
    console.log(`❌ MISSING: ${slug}.svg`)
    missingCount++
  } else {
    const content = fs.readFileSync(filePath, "utf-8")
    // Check if SVG has width/height or viewBox
    const hasViewBox = content.includes("viewBox")
    const hasWidth = content.includes("width=")
    const hasHeight = content.includes("height=")
    console.log(`✓ ${slug}.svg (${content.length}b) [viewBox: ${hasViewBox}, w/h: ${hasWidth}/${hasHeight}]`)
  }
}

console.log(`\nFinished: ${slugs.length - missingCount}/${slugs.length} present.`)
