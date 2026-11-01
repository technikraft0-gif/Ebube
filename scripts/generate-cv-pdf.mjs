import fs from "fs"

function createPdf() {
  const objects = []
  
  function addObject(content) {
    objects.push(content)
    return objects.length // 1-indexed object number
  }

  // Text stream
  let stream = ""
  
  // Helpers
  const escapeText = (t) => t.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
  
  function drawText(text, x, y, size = 10, font = "/F1", color = [0.07, 0.09, 0.15]) {
    stream += `q ${color.join(" ")} rg BT ${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapeText(text)}) Tj ET Q\n`
  }
  
  function drawLine(x1, y1, x2, y2, width = 1, color = [0.85, 0.47, 0.02]) {
    stream += `q ${color.join(" ")} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S Q\n`
  }
  
  function drawRect(x, y, w, h, color = [0.95, 0.96, 0.98]) {
    stream += `q ${color.join(" ")} rg ${x} ${y} ${w} ${h} re f Q\n`
  }

  // A4 dimensions: 595.28 x 841.89
  const width = 595.28
  const height = 841.89
  const left = 45
  const right = width - 45
  let curY = height - 48

  // --- Header ---
  drawText("EBUBE UDORIE", left, curY, 20, "/F2", [0.06, 0.09, 0.16])
  drawText("WAT (UTC+1) · Uyo, Nigeria", right - 130, curY + 6, 8.5, "/F1", [0.39, 0.45, 0.55])
  drawText("Available for Remote & Contract", right - 130, curY - 5, 8.5, "/F2", [0.06, 0.09, 0.16])
  curY -= 16

  drawText("FULL-STACK ENGINEER & APP DEVELOPER · TECHNIKRAFT", left, curY, 10, "/F2", [0.85, 0.47, 0.02])
  curY -= 15

  // Contacts
  const contacts = "Email: emmanuelchibuikeudorie@gmail.com  |  Phone: +234 816 702 5308  |  GitHub: Technikraft  |  X: @technikraft"
  drawText(contacts, left, curY, 8.2, "/F1", [0.28, 0.35, 0.45])
  curY -= 10

  // Amber divider
  drawLine(left, curY, right, curY, 1.8, [0.85, 0.47, 0.02])
  curY -= 18

  // --- Executive Summary ---
  drawText("EXECUTIVE SUMMARY", left, curY, 10, "/F2", [0.06, 0.09, 0.16])
  drawLine(left, curY - 3, right, curY - 3, 0.6, [0.88, 0.91, 0.94])
  curY -= 15

  const summaryLines = [
    "Disciplined, business-focused Full-Stack Engineer & App Developer with proven experience engineering end-to-end digital",
    "products, interactive learning platforms, enterprise management dashboards, and cross-platform mobile apps. Proficient in taking",
    "software from initial database schema and API architecture to responsive user interfaces and cloud deployment. Combines formal",
    "Computer Engineering training at the University of Uyo with hands-on delivery across Next.js, Flutter, TypeScript, C++, Python,",
    "Node.js, PostgreSQL, Supabase, and Docker."
  ]
  for (const line of summaryLines) {
    drawText(line, left, curY, 8.8, "/F1", [0.2, 0.25, 0.33])
    curY -= 12
  }
  curY -= 6

  // --- Technical Skills Matrix ---
  drawText("TECHNICAL SKILLS MATRIX", left, curY, 10, "/F2", [0.06, 0.09, 0.16])
  drawLine(left, curY - 3, right, curY - 3, 0.6, [0.88, 0.91, 0.94])
  curY -= 15

  const skills = [
    ["Languages:", "TypeScript, JavaScript (ES6+), Dart, Python, C++, PHP, SQL, HTML5, CSS3"],
    ["Frontend & Mobile:", "Next.js (App Router), React, Flutter, React Native, Tailwind CSS, Material UI, Responsive Design"],
    ["Backend & APIs:", "Node.js, Express.js, FastAPI, RESTful APIs, WebSockets, Background Jobs (BullMQ), Caddy"],
    ["Databases & Cloud:", "PostgreSQL, Supabase, Redis, MongoDB, MySQL, Docker, Docker Compose, AWS, Vercel"],
    ["Architecture & DX:", "Git / GitHub, CI/CD, AI Integration, Paystack Payments, UI/UX Implementation, Clean Code"],
  ]
  for (const [cat, val] of skills) {
    drawText(cat, left, curY, 8.8, "/F2", [0.06, 0.09, 0.16])
    drawText(val, left + 115, curY, 8.8, "/F1", [0.2, 0.25, 0.33])
    curY -= 13
  }
  curY -= 5

  // --- Professional Experience ---
  drawText("PROFESSIONAL EXPERIENCE", left, curY, 10, "/F2", [0.06, 0.09, 0.16])
  drawLine(left, curY - 3, right, curY - 3, 0.6, [0.88, 0.91, 0.94])
  curY -= 15

  // Scholarium
  drawText("Team Lead & Lead Developer", left, curY, 9.5, "/F2", [0.06, 0.09, 0.16])
  drawText("·  Scholarium", left + 145, curY, 9, "/F2", [0.85, 0.47, 0.02])
  drawText("2025 – Present | Remote / Uyo", right - 130, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 13

  const scholariumBullets = [
    "• Leading the engineering team building Scholarium, an academic app designed to help university students and freshers navigate school.",
    "• Architected cross-platform mobile app in Flutter and web portal in Next.js, featuring real-time multiplayer competitive quizzes.",
    "• Built AI document intelligence pipelines parsing lecture PDFs into structured concept summaries and verified math problem solvers.",
    "• Engineered WebSocket room coordinators for synchronized leaderboards and offline-first SQLite sync for low-connectivity halls.",
  ]
  for (const b of scholariumBullets) {
    drawText(b, left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
    curY -= 11.5
  }
  curY -= 4

  // Springlight Technology
  drawText("Full-Stack Developer Intern", left, curY, 9.5, "/F2", [0.06, 0.09, 0.16])
  drawText("·  Springlight Technology", left + 135, curY, 9, "/F2", [0.85, 0.47, 0.02])
  drawText("Jan 2025 – Dec 2025 | Uyo, Nigeria", right - 150, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 13

  const springlightBullets = [
    "• Collaborated on Springlight Commerce, an enterprise platform handling cashier sales, stock inventory, and multi-store tracking.",
    "• Designed PostgreSQL relational schemas with row-level locking to guarantee atomic deductions and prevent stock leakage.",
    "• Developed real-time low-inventory alerts and executive reporting dashboards with dynamic profit and turnover analytics.",
    "• Maintained strict TypeScript typings and clean component modularity across production codebases.",
  ]
  for (const b of springlightBullets) {
    drawText(b, left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
    curY -= 11.5
  }
  curY -= 4

  // Freelance
  drawText("Full-Stack Engineer (Contract / Freelance)", left, curY, 9.5, "/F2", [0.06, 0.09, 0.16])
  drawText("·  Technikraft", left + 205, curY, 9, "/F2", [0.85, 0.47, 0.02])
  drawText("2024 – Present | Remote", right - 110, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 13

  const freelanceBullets = [
    "• Built custom e-commerce web applications, management portals, and educational software for businesses and brands.",
    "• Implemented cryptographic Paystack webhook verification, idempotent payment handling, and automated transaction receipts.",
    "• Consistently achieved 95+ Google Lighthouse scores through optimized Next.js server components and asset compression.",
  ]
  for (const b of freelanceBullets) {
    drawText(b, left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
    curY -= 11.5
  }
  curY -= 6

  // --- Key Engineering Projects ---
  drawText("FEATURED ENGINEERING PROJECTS", left, curY, 10, "/F2", [0.06, 0.09, 0.16])
  drawLine(left, curY - 3, right, curY - 3, 0.6, [0.88, 0.91, 0.94])
  curY -= 15

  // Mastery Lab
  drawText("Mastery Lab — Interactive Web Learning System", left, curY, 9.5, "/F2", [0.06, 0.09, 0.16])
  drawText("Next.js, React, TypeScript, Supabase, Tailwind CSS", right - 220, curY, 8.2, "/F1", [0.39, 0.45, 0.55])
  curY -= 12
  drawText("• Built a 100% free developer learning platform for mastering HTML & CSS with live code previews and DOM validation.", left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
  curY -= 11.5
  drawText("• Engineered interactive quizzes, XP rewards, and global competitive leaderboards using Supabase persistence.", left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
  curY -= 14

  // Venicio Boutique
  drawText("Venicio Boutique — Luxury Fashion E-Commerce", left, curY, 9.5, "/F2", [0.06, 0.09, 0.16])
  drawText("Next.js, React, TypeScript, Paystack, Tailwind CSS", right - 215, curY, 8.2, "/F1", [0.39, 0.45, 0.55])
  curY -= 12
  drawText("• Designed and developed a contemporary fashion e-commerce store with editorial lookbooks, cart, and variant selectors.", left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
  curY -= 11.5
  drawText("• Integrated verified Paystack card/transfer checkout with automated server-side order confirmation webhooks.", left + 8, curY, 8.5, "/F1", [0.2, 0.25, 0.33])
  curY -= 16

  // --- Education & Academic Background ---
  drawText("EDUCATION & TRAINING", left, curY, 10, "/F2", [0.06, 0.09, 0.16])
  drawLine(left, curY - 3, right, curY - 3, 0.6, [0.88, 0.91, 0.94])
  curY -= 14

  drawText("Bachelor of Engineering (B.Eng.) in Computer Engineering", left, curY, 9, "/F2", [0.06, 0.09, 0.16])
  drawText("In View", right - 40, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 11
  drawText("University of Uyo, Akwa Ibom State, Nigeria", left, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 14

  drawText("Professional Diploma in Full-Stack Web Development", left, curY, 9, "/F2", [0.06, 0.09, 0.16])
  drawText("2023 – 2024", right - 55, curY, 8.5, "/F1", [0.39, 0.45, 0.55])
  curY -= 11
  drawText("Springlight Tech Academy, Uyo, Nigeria", left, curY, 8.5, "/F1", [0.39, 0.45, 0.55])

  // Content Stream object
  const contentStreamBytes = Buffer.from(stream, "utf-8")
  const contentObjId = addObject(`<< /Length ${contentStreamBytes.length} >>\nstream\n${stream}\nendstream`)

  // Font objects
  const f1Id = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`)
  const f2Id = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`)

  // Page object
  const pageObjId = addObject(`<< /Type /Page /Parent 4 0 R /MediaBox [0 0 ${width} ${height}] /Contents ${contentObjId} 0 R /Resources << /Font << /F1 ${f1Id} 0 R /F2 ${f2Id} 0 R >> >> >>`)

  // Pages object
  const pagesObjId = addObject(`<< /Type /Pages /Kids [${pageObjId} 0 R] /Count 1 >>`)

  // Catalog object
  const catalogObjId = addObject(`<< /Type /Catalog /Pages ${pagesObjId} 0 R >>`)

  // Assemble PDF file
  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n"
  const offsets = [0]
  
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "utf-8"))
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf-8")
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObjId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, "utf-8")
}

const pdfBuffer = createPdf()
fs.writeFileSync("public/ebube-udorie-cv.pdf", pdfBuffer)
console.log("Successfully generated public/ebube-udorie-cv.pdf. Bytes:", pdfBuffer.length)
