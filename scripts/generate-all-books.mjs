import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const booksDir = join(root, "public/images/books")

const books = [
  {
    slug: "clean-code",
    bg: ["#0f172a", "#1e293b"],
    accent: "#38bdf8",
    title: "Clean Code",
    subtitle: "A Handbook of Agile\nSoftware Craftsmanship",
    author: "Robert C. Martin",
    tag: "CODING",
    pattern: "code",
  },
  {
    slug: "solid-modeling",
    bg: ["#1c1917", "#292524"],
    accent: "#f97316",
    title: "Solid Modeling\n& CAD Design",
    subtitle: "Parametric Geometry\n& Finite Mechanics",
    author: "M. Mäntylä & Hoffmann",
    tag: "SOLID MODELING",
    pattern: "cad",
  },
  {
    slug: "ai-engineering",
    bg: ["#180828", "#2e1065"],
    accent: "#c084fc",
    title: "AI Engineering",
    subtitle: "Building Applications\nwith Foundation Models",
    author: "Chip Huyen",
    tag: "AI & ML",
    pattern: "neural",
  },
  {
    slug: "embedded-systems",
    bg: ["#062828", "#0f3e3e"],
    accent: "#2dd4bf",
    title: "Embedded Systems\n& Firmware",
    subtitle: "Real-Time Microcontrollers\n& Hardware Interfaces",
    author: "Elecia White",
    tag: "EMBEDDED",
    pattern: "embedded",
  },
  {
    slug: "computer-org",
    bg: ["#0d1117", "#161b22"],
    accent: "#4ade80",
    title: "Computer\nOrganization",
    subtitle: "The Hardware & Software\nArchitecture Interface",
    author: "Patterson & Hennessy",
    tag: "HARDWARE",
    pattern: "circuit",
  },
  {
    slug: "designing-data-intensive",
    bg: ["#172554", "#1e3a8a"],
    accent: "#fbbf24",
    title: "Designing\nData-Intensive Apps",
    subtitle: "Reliable, Scalable &\nMaintainable Systems",
    author: "Martin Kleppmann",
    tag: "TECH & DATA",
    pattern: "nodes",
  },
]

function makeCodePattern() {
  const lines = [
    "class SystemArchitecture {",
    "  constructor(spec) {",
    "    this.clean = true;",
    "  }",
    "  deploy(runtime) {",
    "    return runtime.verify();",
    "  }",
    "}",
  ]
  return lines
    .map(
      (line, i) =>
        `<text x="14" y="${64 + i * 16}" font-family="monospace" font-size="10" fill="currentColor" opacity="0.18">${line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</text>`
    )
    .join("\n")
}

function makeCADPattern() {
  // Isometric 3D solid cube wireframe and coordinate axes
  return `
    <g transform="translate(80, 105) scale(0.9)" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.25">
      <!-- 3D Cube -->
      <polygon points="0,-40 35,-20 0,0 -35,-20" fill="currentColor" fill-opacity="0.08" />
      <polygon points="0,0 35,-20 35,25 0,45" fill="currentColor" fill-opacity="0.14" />
      <polygon points="-35,-20 0,0 0,45 -35,25" fill="currentColor" fill-opacity="0.04" />
      <line x1="0" y1="0" x2="0" y2="45" />
      <line x1="0" y1="0" x2="35" y2="-20" />
      <line x1="0" y1="0" x2="-35" y2="-20" />
      <!-- Wireframe accents -->
      <circle cx="0" cy="0" r="3" fill="currentColor" />
      <circle cx="35" cy="-20" r="2.5" fill="currentColor" />
      <circle cx="-35" cy="-20" r="2.5" fill="currentColor" />
      <circle cx="0" cy="45" r="2.5" fill="currentColor" />
      <circle cx="0" cy="-40" r="2.5" fill="currentColor" />
      <!-- Construction lines -->
      <line x1="-55" y1="20" x2="55" y2="-20" stroke-dasharray="3,3" opacity="0.5" />
      <line x1="-55" y1="-20" x2="55" y2="20" stroke-dasharray="3,3" opacity="0.5" />
    </g>
  `
}

function makeNeuralPattern() {
  const layers = [
    [24, [45, 80, 115, 150]],
    [80, [55, 95, 135]],
    [136, [65, 105, 145]],
  ]
  let s = ""
  for (let l = 0; l < layers.length - 1; l++) {
    const [x1, ys1] = layers[l]
    const [x2, ys2] = layers[l + 1]
    ys1.forEach((y1) =>
      ys2.forEach((y2) => {
        s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="0.8" opacity="0.16"/>`
      })
    )
  }
  layers.forEach(([x, ys]) => {
    ys.forEach((y) => {
      s += `<circle cx="${x}" cy="${y}" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>`
    })
  })
  return s
}

function makeEmbeddedPattern() {
  // Microcontroller chip with pins and traces
  return `
    <g transform="translate(45, 65)" stroke="currentColor" fill="none" opacity="0.25">
      <!-- IC Package -->
      <rect x="15" y="15" width="40" height="40" rx="3" fill="currentColor" fill-opacity="0.12" stroke-width="1.5" />
      <circle cx="23" cy="23" r="2" fill="currentColor" />
      <text x="35" y="38" font-family="monospace" font-size="8" fill="currentColor" text-anchor="middle">MCU</text>
      <!-- IC Pins -->
      ${[0, 1, 2, 3].map(i => `
        <line x1="${5}" y1="${23 + i * 8}" x2="15" y2="${23 + i * 8}" stroke-width="1.2" />
        <line x1="${55}" y1="${23 + i * 8}" x2="65" y2="${23 + i * 8}" stroke-width="1.2" />
        <line x1="${23 + i * 8}" y1="${5}" x2="${23 + i * 8}" y2="15" stroke-width="1.2" />
        <line x1="${23 + i * 8}" y1="${55}" x2="${23 + i * 8}" y2="65" stroke-width="1.2" />
      `).join("")}
      <!-- Board traces -->
      <path d="M5 31 H-20 V70 H30 V90" stroke-width="1" />
      <path d="M65 39 H85 V60 H50" stroke-width="1" />
      <circle cx="-20" cy="70" r="2" fill="currentColor" />
      <circle cx="30" cy="90" r="2" fill="currentColor" />
    </g>
  `
}

function makeCircuitPattern() {
  return `
    <g stroke="currentColor" stroke-width="1" fill="none" opacity="0.22">
      <path d="M15 50 H55 V80 H95 M95 80 V120 H135" />
      <circle cx="55" cy="80" r="3.5" fill="currentColor" />
      <circle cx="95" cy="80" r="3.5" fill="currentColor" />
      <rect x="68" y="98" width="18" height="10" rx="2" fill="currentColor" fill-opacity="0.1" />
      <path d="M25 155 H65 V135 H105 V165 H145" />
      <circle cx="65" cy="135" r="3.5" fill="currentColor" />
      <circle cx="105" cy="165" r="3.5" fill="currentColor" />
      <path d="M15 195 H45 V215 M45 195 V175 H85" />
      <circle cx="45" cy="195" r="3" fill="currentColor" />
    </g>
  `
}

function makeNodesPattern() {
  const nodes = [
    [25, 45],
    [125, 35],
    [75, 85],
    [135, 115],
    [25, 125],
    [85, 155],
    [45, 195],
    [120, 190],
  ]
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [5, 6],
    [5, 7],
  ]
  let s = ""
  edges.forEach(([a, b]) => {
    s += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="currentColor" stroke-width="1.2" opacity="0.2"/>`
  })
  nodes.forEach(([x, y]) => {
    s += `<circle cx="${x}" cy="${y}" r="4" fill="currentColor" opacity="0.35"/>`
  })
  return s
}

const patterns = {
  code: makeCodePattern,
  cad: makeCADPattern,
  neural: makeNeuralPattern,
  embedded: makeEmbeddedPattern,
  circuit: makeCircuitPattern,
  nodes: makeNodesPattern,
}

books.forEach((book) => {
  const titleLines = book.title.split("\n")
  const subtitleLines = book.subtitle.split("\n")
  const patternFn = patterns[book.pattern]

  const titleY = 62
  const titleLineH = 17
  const subtitleStart = titleY + titleLines.length * titleLineH + 8

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 240" width="160" height="240">
  <defs>
    <linearGradient id="bg-${book.slug}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${book.bg[0]}"/>
      <stop offset="100%" stop-color="${book.bg[1]}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="white" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="160" height="240" fill="url(#bg-${book.slug})"/>

  <!-- Pattern overlay -->
  <g color="${book.accent}">
    ${patternFn()}
  </g>

  <!-- Book Spine highlight -->
  <rect x="0" y="0" width="7" height="240" fill="${book.accent}" opacity="0.85"/>
  <rect x="7" y="0" width="28" height="240" fill="url(#shine)"/>

  <!-- Tag pill -->
  <rect x="15" y="16" width="${book.tag.length * 6.5 + 12}" height="16" rx="8" fill="${book.accent}" opacity="0.22"/>
  <text x="21" y="27.5" font-family="system-ui,sans-serif" font-size="8.5" font-weight="700" fill="${book.accent}" letter-spacing="0.5">${book.tag}</text>

  <!-- Title -->
  ${titleLines
    .map(
      (line, i) =>
        `<text x="15" y="${titleY + i * titleLineH}" font-family="system-ui,sans-serif" font-size="${
          titleLines.length > 2 ? 11.5 : 13
        }" font-weight="800" fill="#ffffff">${line}</text>`
    )
    .join("\n  ")}

  <!-- Subtitle -->
  ${subtitleLines
    .map(
      (line, i) =>
        `<text x="15" y="${subtitleStart + i * 12}" font-family="system-ui,sans-serif" font-size="8.5" fill="${book.accent}" opacity="0.9">${line}</text>`
    )
    .join("\n  ")}

  <!-- Bottom divider & Author -->
  <line x1="15" y1="208" x2="145" y2="208" stroke="${book.accent}" stroke-width="0.75" opacity="0.35"/>
  <text x="15" y="224" font-family="system-ui,sans-serif" font-size="8.5" font-weight="500" fill="#ffffff" opacity="0.7">${book.author}</text>
  <circle cx="145" cy="223" r="3" fill="${book.accent}" opacity="0.6"/>
</svg>`

  // Write both .svg and .webp so both paths work
  writeFileSync(join(booksDir, `${book.slug}.svg`), svg)
  writeFileSync(join(booksDir, `${book.slug}.webp`), svg)
  console.log(`✅ Generated ${book.slug}.svg & .webp`)
})
