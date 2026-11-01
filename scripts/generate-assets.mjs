/**
 * Asset generator for Technikraft portfolio
 * Generates: logo-header.svg/png, logo-sticker.svg, project placeholders, gallery placeholders
 * Run: node scripts/generate-assets.mjs
 */
import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const pub = join(root, "public")

function write(relPath, content) {
  const full = join(pub, relPath)
  writeFileSync(full, content, "utf8")
  console.log("  ✓ " + relPath)
}

// ──────────────────────────────────────────────
// COLOUR PALETTE (matches globals.css)
// ──────────────────────────────────────────────
const COCOA   = "#2d1a0e"   // deep cocoa text
const PEACH   = "#ffe8d0"   // peach/cream background
const YELLOW  = "#f5c842"   // sunshine yellow accent
const GREEN   = "#5a9e6f"   // green accent
const ROSE    = "#e87070"   // rose accent
const BLUE    = "#5b8ed6"   // blue accent

// ──────────────────────────────────────────────
// 1. HEADER LOGO  (SVG – replaces logo-header.png)
// ──────────────────────────────────────────────
const logoHeader = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 44" fill="none" width="220" height="44">
  <!-- Bracket icon -->
  <text x="2" y="33" font-family="'Courier New', monospace" font-size="30" font-weight="700" fill="${YELLOW}">&lt;/&gt;</text>
  <!-- Wordmark -->
  <text x="58" y="30" font-family="Georgia, serif" font-size="20" font-weight="700" fill="${COCOA}" letter-spacing="0.5">Techni</text>
  <text x="130" y="30" font-family="Georgia, serif" font-size="20" font-weight="700" fill="${YELLOW}" letter-spacing="0.5">kraft</text>
</svg>`
write("images/logo-header.svg", logoHeader)
// Also overwrite the PNG slot with an SVG copy (browsers accept SVG at .svg path, we'll also update content references)
write("images/logo-header-vector.svg", logoHeader)

// ──────────────────────────────────────────────
// 2. FOOTER STICKER LOGO  (circular badge)
// ──────────────────────────────────────────────
const logoSticker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" width="200" height="200">
  <!-- Outer ring -->
  <circle cx="100" cy="100" r="96" fill="${COCOA}" />
  <circle cx="100" cy="100" r="88" fill="none" stroke="${YELLOW}" stroke-width="2.5" stroke-dasharray="6 4" />
  <!-- Icon -->
  <text x="50%" y="88" text-anchor="middle" font-family="'Courier New', monospace" font-size="38" font-weight="700" fill="${YELLOW}">&lt;/&gt;</text>
  <!-- Brand name -->
  <text x="50%" y="118" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="700" fill="${PEACH}" letter-spacing="2">TECHNIKRAFT</text>
  <!-- Tagline arc text approximated as a line -->
  <text x="50%" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="${YELLOW}" letter-spacing="3">UYO · NIGERIA · OPEN TO THE WORLD</text>
</svg>`
write("images/logo-sticker.svg", logoSticker)

// ──────────────────────────────────────────────
// 3. PROJECT CARD THUMBNAILS
// ──────────────────────────────────────────────
function projectCard(title, subtitle, accent, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none" width="800" height="500">
  <!-- Background -->
  <rect width="800" height="500" fill="${COCOA}" rx="12"/>
  <!-- Subtle grid lines -->
  ${Array.from({length:10}, (_,i) => `<line x1="${i*90}" y1="0" x2="${i*90}" y2="500" stroke="${accent}" stroke-opacity="0.07" />`).join("")}
  ${Array.from({length:7}, (_,i) => `<line x1="0" y1="${i*80}" x2="800" y2="${i*80}" stroke="${accent}" stroke-opacity="0.07" />`).join("")}
  <!-- Accent bar -->
  <rect x="0" y="0" width="800" height="6" fill="${accent}" rx="0"/>
  <!-- Corner bracket decoration -->
  <text x="32" y="80" font-family="'Courier New', monospace" font-size="48" fill="${accent}" opacity="0.25">{</text>
  <text x="730" y="420" font-family="'Courier New', monospace" font-size="48" fill="${accent}" opacity="0.25">}</text>
  <!-- Central icon -->
  <circle cx="400" cy="210" r="70" fill="${accent}" opacity="0.12"/>
  <text x="400" y="232" text-anchor="middle" font-family="'Courier New', monospace" font-size="54" fill="${accent}">${icon}</text>
  <!-- Title -->
  <text x="400" y="316" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" fill="white" letter-spacing="0.5">${title}</text>
  <!-- Subtitle -->
  <text x="400" y="350" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="${accent}" letter-spacing="1" opacity="0.9">${subtitle}</text>
  <!-- Bottom bar -->
  <rect x="0" y="460" width="800" height="40" fill="${accent}" opacity="0.08"/>
  <text x="32" y="484" font-family="'Courier New', monospace" font-size="11" fill="${accent}" opacity="0.7">TECHNIKRAFT ·  BUILT BY EBUBE UDORIE</text>
</svg>`
}

write("projects/springlight-commerce.svg", projectCard(
  "Springlight Commerce",
  "SALES & INVENTORY MANAGEMENT PLATFORM",
  YELLOW, "▦"
))

write("projects/web-ide.svg", projectCard(
  "WebIDE",
  "BROWSER-BASED DEVELOPMENT ENVIRONMENT",
  BLUE, "⌨"
))

// ──────────────────────────────────────────────
// 4. HERO PORTRAIT PLACEHOLDER
//    (shown until user drops their cutout PNG)
// ──────────────────────────────────────────────
const heroCutout = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" fill="none" width="600" height="900">
  <rect width="600" height="900" fill="none"/>
  <!-- Silhouette shape -->
  <ellipse cx="300" cy="220" rx="110" ry="120" fill="${COCOA}" opacity="0.15"/>
  <rect x="170" y="320" width="260" height="360" rx="40" fill="${COCOA}" opacity="0.12"/>
  <!-- Code decorations -->
  <text x="30" y="500" font-family="'Courier New', monospace" font-size="13" fill="${YELLOW}" opacity="0.45">const ebube = {</text>
  <text x="30" y="522" font-family="'Courier New', monospace" font-size="13" fill="${PEACH}" opacity="0.35">  role: 'Engineer',</text>
  <text x="30" y="544" font-family="'Courier New', monospace" font-size="13" fill="${GREEN}" opacity="0.35">  builds: 'everything'</text>
  <text x="30" y="566" font-family="'Courier New', monospace" font-size="13" fill="${YELLOW}" opacity="0.45">}</text>
  <!-- Name -->
  <text x="300" y="760" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${COCOA}" opacity="0.35" letter-spacing="3">EBUBE UDORIE</text>
  <text x="300" y="790" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${YELLOW}" opacity="0.5" letter-spacing="5">TECHNIKRAFT</text>
</svg>`
write("images/hero/ebube-cutout-placeholder.svg", heroCutout)

// ──────────────────────────────────────────────
// 5. ABOUT SECTION EDITORIAL PORTRAIT FRAME
// ──────────────────────────────────────────────
const editorialFrame = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600" fill="none" width="480" height="600">
  <rect width="480" height="600" rx="16" fill="${PEACH}"/>
  <!-- Photo frame -->
  <rect x="40" y="40" width="400" height="440" rx="12" fill="${COCOA}" opacity="0.07"/>
  <rect x="40" y="40" width="400" height="440" rx="12" fill="none" stroke="${COCOA}" stroke-width="1.5" stroke-opacity="0.2"/>
  <!-- Initials badge -->
  <circle cx="240" cy="260" r="80" fill="${COCOA}"/>
  <text x="240" y="283" text-anchor="middle" font-family="Georgia, serif" font-size="52" font-weight="700" fill="${YELLOW}">EU</text>
  <!-- Name line -->
  <text x="240" y="540" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="${COCOA}" letter-spacing="4">EBUBE UDORIE</text>
  <text x="240" y="562" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${YELLOW}" letter-spacing="5">TECHNIKRAFT</text>
</svg>`
write("images/about/ebube-portrait-frame.svg", editorialFrame)

// ──────────────────────────────────────────────
// 6. VIDEO POSTER PLACEHOLDER
// ──────────────────────────────────────────────
const videoPoster = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" fill="none" width="960" height="540">
  <rect width="960" height="540" fill="${COCOA}"/>
  <!-- Scanline effect -->
  ${Array.from({length:27}, (_,i) => `<line x1="0" y1="${i*20}" x2="960" y2="${i*20}" stroke="white" stroke-opacity="0.02" />`).join("")}
  <!-- Play button -->
  <circle cx="480" cy="270" r="60" fill="${YELLOW}" opacity="0.9"/>
  <polygon points="468,248 468,292 508,270" fill="${COCOA}"/>
  <!-- Label -->
  <text x="480" y="358" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="white" opacity="0.7" letter-spacing="3">EBUBE UDORIE — BUILDING &amp; TESTING</text>
  <text x="480" y="384" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${YELLOW}" opacity="0.6" letter-spacing="5">TECHNIKRAFT</text>
</svg>`
write("images/about/building-video-poster.svg", videoPoster)
write("images/about/building-video-full-poster.svg", videoPoster)

// ──────────────────────────────────────────────
// 7. GALLERY SLIDESHOW PLACEHOLDER IMAGES
// ──────────────────────────────────────────────
const galleryCards = [
  { file: "ebube-at-desk.svg",       label: "Focused at the desk.",        accent: YELLOW },
  { file: "ebube-building.svg",      label: "Building something real.",    accent: GREEN  },
  { file: "ebube-testing.svg",       label: "Testing the edge cases.",     accent: BLUE   },
  { file: "ebube-university.svg",    label: "Computer Engineering, Uniuyo.", accent: ROSE },
  { file: "ebube-collaboration.svg", label: "Shipping with the team.",     accent: YELLOW },
]

function galleryPlaceholder(label, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" width="800" height="600">
  <rect width="800" height="600" fill="${COCOA}"/>
  <rect x="0" y="0" width="800" height="4" fill="${accent}"/>
  <circle cx="400" cy="270" r="90" fill="${accent}" opacity="0.1"/>
  <text x="400" y="290" text-anchor="middle" font-family="'Courier New', monospace" font-size="64" fill="${accent}" opacity="0.4">📸</text>
  <text x="400" y="390" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="white" opacity="0.6">${label}</text>
  <text x="400" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${accent}" opacity="0.5" letter-spacing="4">EBUBE UDORIE · TECHNIKRAFT</text>
</svg>`
}

for (const { file, label, accent } of galleryCards) {
  write("images/gallery/" + file, galleryPlaceholder(label, accent))
}

// ──────────────────────────────────────────────
// 8. TESTIMONIALS LOGO PLACEHOLDER
// ──────────────────────────────────────────────
function companyLogo(name, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60" fill="none" width="160" height="60">
  <rect width="160" height="60" rx="8" fill="${PEACH}"/>
  <text x="80" y="38" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="700" fill="${color}" letter-spacing="1">${name}</text>
</svg>`
}

write("images/testimonials/logos/springlight.svg", companyLogo("Springlight", COCOA))
write("images/testimonials/logos/technikraft.svg", companyLogo("Technikraft", YELLOW))

console.log("\n✅ All assets generated successfully!")
