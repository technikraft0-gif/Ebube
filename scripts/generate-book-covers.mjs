/**
 * Generates professional engineering/tech book cover SVGs for the bookshelf section.
 * These are stylised representations, not copyright-infringing reproductions.
 */
import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const booksDir = join(root, "public/images/books")

const books = [
  {
    filename: "clean-code.webp",
    // We'll output as SVG, rename to match expected webp path
    svgName: "clean-code.svg",
    bg: ["#1a1a2e", "#16213e"],
    accent: "#e94560",
    title: "Clean Code",
    subtitle: "A Handbook of Agile\nSoftware Craftsmanship",
    author: "Robert C. Martin",
    tag: "ENGINEERING",
    pattern: "code",
  },
  {
    svgName: "pragmatic-programmer.svg",
    bg: ["#0f3460", "#16213e"],
    accent: "#e94560",
    title: "The Pragmatic\nProgrammer",
    subtitle: "Your Journey to\nMastery",
    author: "Thomas & Hunt",
    tag: "CRAFT",
    pattern: "grid",
  },
  {
    svgName: "designing-data-intensive.svg",
    bg: ["#1b1b2f", "#162447"],
    accent: "#f5a623",
    title: "Designing\nData-Intensive\nApplications",
    subtitle: "The Big Ideas Behind\nReliable, Scalable Systems",
    author: "Martin Kleppmann",
    tag: "SYSTEMS",
    pattern: "nodes",
  },
  {
    svgName: "ai-engineering.svg",
    bg: ["#0a0a1a", "#1a0533"],
    accent: "#7c3aed",
    title: "AI Engineering",
    subtitle: "Building Applications\nwith Foundation Models",
    author: "Chip Huyen",
    tag: "AI / ML",
    pattern: "neural",
  },
  {
    svgName: "computer-org.svg",
    bg: ["#0d1117", "#1c2128"],
    accent: "#3fb950",
    title: "Computer\nOrganization\n& Design",
    subtitle: "The Hardware/Software\nInterface",
    author: "Patterson & Hennessy",
    tag: "HARDWARE",
    pattern: "circuit",
  },
]

function makeCodePattern() {
  const lines = [
    "function build(app) {",
    "  const stack = compile(app)",
    "  return stack.deploy()",
    "}",
    "",
    "class CleanCode {",
    "  refactor() { ... }",
    "}",
  ]
  return lines.map((line, i) =>
    `<text x="16" y="${60 + i * 18}" font-family="monospace" font-size="11" fill="currentColor" opacity="0.12">${line.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>`
  ).join("\n")
}

function makeGridPattern() {
  let s = ""
  for (let x = 0; x < 160; x += 20) {
    s += `<line x1="${x}" y1="0" x2="${x}" y2="240" stroke="currentColor" stroke-width="0.5" opacity="0.08"/>`
  }
  for (let y = 0; y < 240; y += 20) {
    s += `<line x1="0" y1="${y}" x2="160" y2="${y}" stroke="currentColor" stroke-width="0.5" opacity="0.08"/>`
  }
  return s
}

function makeNodesPattern() {
  const nodes = [[30, 40], [120, 30], [80, 90], [140, 110], [30, 130], [90, 160], [50, 200]]
  const edges = [[0,2],[1,2],[2,3],[2,4],[3,5],[4,5],[5,6]]
  let s = ""
  edges.forEach(([a,b]) => {
    s += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="currentColor" stroke-width="1" opacity="0.15"/>`
  })
  nodes.forEach(([x,y]) => {
    s += `<circle cx="${x}" cy="${y}" r="4" fill="currentColor" opacity="0.2"/>`
  })
  return s
}

function makeNeuralPattern() {
  const layers = [[30, [40, 80, 120, 160]], [80, [55, 95, 135]], [130, [70, 110, 150]]]
  let s = ""
  for (let l = 0; l < layers.length - 1; l++) {
    const [x1, ys1] = layers[l]
    const [x2, ys2] = layers[l + 1]
    ys1.forEach(y1 => ys2.forEach(y2 => {
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="0.8" opacity="0.1"/>`
    }))
  }
  layers.forEach(([x, ys]) => {
    ys.forEach(y => {
      s += `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"/>`
    })
  })
  return s
}

function makeCircuitPattern() {
  return `
    <path d="M20 50 H60 V80 H100 M100 80 V120 H140" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <circle cx="60" cy="80" r="4" fill="currentColor" opacity="0.15"/>
    <circle cx="100" cy="80" r="4" fill="currentColor" opacity="0.15"/>
    <rect x="70" y="100" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12"/>
    <path d="M30 160 H70 V140 H110 V170 H150" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <circle cx="70" cy="140" r="4" fill="currentColor" opacity="0.15"/>
    <rect x="90" y="130" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12"/>
    <path d="M20 200 H50 M50 200 V220 M50 200 V180 H90" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <circle cx="50" cy="200" r="3" fill="currentColor" opacity="0.12"/>
  `
}

const patterns = {
  code: makeCodePattern,
  grid: makeGridPattern,
  nodes: makeNodesPattern,
  neural: makeNeuralPattern,
  circuit: makeCircuitPattern,
}

books.forEach(book => {
  const titleLines = book.title.split("\n")
  const subtitleLines = book.subtitle.split("\n")
  const patternFn = patterns[book.pattern]

  const titleY = 64
  const titleLineH = 17
  const subtitleStart = titleY + titleLines.length * titleLineH + 10

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 240" width="160" height="240">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${book.bg[0]}"/>
      <stop offset="100%" stop-color="${book.bg[1]}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="white" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="160" height="240" fill="url(#bg)"/>

  <!-- Pattern overlay (colour inherits from accent) -->
  <g color="${book.accent}">
    ${patternFn()}
  </g>

  <!-- Spine strip -->
  <rect x="0" y="0" width="6" height="240" fill="${book.accent}" opacity="0.9"/>

  <!-- Shine -->
  <rect x="6" y="0" width="30" height="240" fill="url(#shine)"/>

  <!-- Tag pill -->
  <rect x="14" y="16" width="${book.tag.length * 7 + 10}" height="16" rx="8" fill="${book.accent}" opacity="0.2"/>
  <text x="19" y="28" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="${book.accent}" letter-spacing="1">${book.tag}</text>

  <!-- Title -->
  ${titleLines.map((line, i) => `<text x="14" y="${titleY + i * titleLineH}" font-family="system-ui,sans-serif" font-size="${13 - (titleLines.length > 2 ? 1 : 0)}" font-weight="800" fill="#ffffff">${line}</text>`).join("\n  ")}

  <!-- Subtitle -->
  ${subtitleLines.map((line, i) => `<text x="14" y="${subtitleStart + i * 13}" font-family="system-ui,sans-serif" font-size="9" fill="${book.accent}" opacity="0.85">${line}</text>`).join("\n  ")}

  <!-- Divider line -->
  <line x1="14" y1="210" x2="146" y2="210" stroke="${book.accent}" stroke-width="0.5" opacity="0.4"/>

  <!-- Author -->
  <text x="14" y="226" font-family="system-ui,sans-serif" font-size="9" fill="#ffffff" opacity="0.6">${book.author}</text>

  <!-- Bottom corner accent -->
  <circle cx="148" cy="228" r="18" fill="${book.accent}" opacity="0.08"/>
</svg>`

  writeFileSync(join(booksDir, book.svgName), svg)
  console.log(`✅ Generated ${book.svgName}`)
})

console.log("\nAll book covers generated in public/images/books/")
console.log("Note: Files are SVG (the component accepts any image format Next.js supports)")
