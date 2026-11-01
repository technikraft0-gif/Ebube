import { readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, "../src/content/journey.ts")
let content = readFileSync(filePath, "utf-8")

content = content.replace(
  /categories:\s*\["Reading",\s*"Engineering",\s*"Community"\]/,
  'categories: ["Engineering & Tech", "Hardware & Embedded Systems", "Solid Modeling & CAD", "AI & Intelligence"]'
)

content = content.replace(
  /category:\s*"READING",\s*title:\s*"Always an engineering book on the go\.",[\s\S]*?body:\s*".*?",/,
  `category: "ENGINEERING & READING", title: "Always an engineering book on the go.",\n      body: "Engineering books and technical literature are how I slow down and think systematically. Clean Code and Designing Data-Intensive Applications guide my software craftsmanship. Exploring Solid Modeling connects geometric precision with digital modeling, while AI Engineering, embedded microcontrollers, and computer organization keep my knowledge grounded from silicon to the cloud.",`
)

content = content.replace(
  /category:\s*"ACADEMICS & HARDWARE",\s*title:\s*"Engineering from silicon to the screen\.",[\s\S]*?body:\s*".*?",/,
  `category: "HARDWARE & EMBEDDED SYSTEMS", title: "Engineering from silicon to the screen.",\n      body: "Studying Computer Engineering at the University of Uyo gives me a deep appreciation for computing beneath the web abstraction. Understanding digital logic, processor architecture, embedded firmware, and solid CAD modeling makes me a much sharper engineer when building scalable systems and diagnosing performance bottlenecks.",`
)

writeFileSync(filePath, content, "utf-8")
console.log("journey.ts updated successfully")
