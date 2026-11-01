import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { heroLogos } from "../src/content/home.ts"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brandsDir = path.join(__dirname, "../public/icons/brands")

console.log(`Checking ${heroLogos.length} hero logos in ${brandsDir}...\n`)

const missing = []
const invalid = []

for (const logo of heroLogos) {
  const filePath = path.join(brandsDir, `${logo.slug}.svg`)
  if (!fs.existsSync(filePath)) {
    missing.push(logo)
    console.log(`❌ MISSING: ${logo.name} -> ${logo.slug}.svg`)
    continue
  }
  const content = fs.readFileSync(filePath, "utf-8")
  if (!content.includes("<svg") || !content.includes("</svg>")) {
    invalid.push({ ...logo, reason: "No valid svg tag" })
    console.log(`⚠️ INVALID SVG: ${logo.name} (${logo.slug}.svg)`)
  } else if (content.length < 50) {
    invalid.push({ ...logo, reason: `Too short: ${content.length} bytes` })
    console.log(`⚠️ TOO SHORT: ${logo.name} (${logo.slug}.svg) - ${content.length} bytes`)
  } else {
    console.log(`✓ OK: ${logo.name} (${logo.slug}.svg, ${content.length} bytes)`)
  }
}

console.log("\nSummary:")
console.log(`Total: ${heroLogos.length}`)
console.log(`Missing: ${missing.length}`)
console.log(`Invalid: ${invalid.length}`)
