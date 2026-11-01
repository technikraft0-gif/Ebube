/**
 * Generates professional-looking project thumbnail images as PNGs
 * using SVG-to-PNG conversion via the browser's Blob/URL APIs baked into
 * an HTML file that Next.js can serve, OR simply writes high-quality SVGs
 * with realistic UI mockup content.
 *
 * Since we don't have canvas/puppeteer, we produce detailed SVG files that
 * look like real app screenshots — much better than the old placeholder SVGs.
 */

import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

// ─── Springlight Commerce Dashboard ────────────────────────────────────────
const springlightSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="barAmber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="750" fill="url(#bg)"/>

  <!-- Sidebar -->
  <rect x="0" y="0" width="220" height="750" fill="#0f172a"/>
  <rect x="0" y="0" width="220" height="750" fill="#1e293b" opacity="0.5"/>

  <!-- Sidebar Logo -->
  <rect x="20" y="20" width="180" height="48" rx="8" fill="#f59e0b" opacity="0.15"/>
  <text x="40" y="50" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#f59e0b">Springlight</text>
  <text x="40" y="65" font-family="system-ui,sans-serif" font-size="10" fill="#94a3b8">Commerce Manager</text>

  <!-- Sidebar Nav Items -->
  <rect x="12" y="90" width="196" height="36" rx="6" fill="#f59e0b" opacity="0.15"/>
  <rect x="20" y="103" width="4" height="10" rx="2" fill="#f59e0b"/>
  <text x="36" y="113" font-family="system-ui,sans-serif" font-size="13" fill="#f59e0b" font-weight="600">Dashboard</text>

  ${["Inventory", "Orders", "Customers", "Reports", "Settings"].map((item, i) => `
  <rect x="20" y="${140 + i * 44}" width="4" height="10" rx="2" fill="#475569" opacity="0.6"/>
  <text x="36" y="${152 + i * 44}" font-family="system-ui,sans-serif" font-size="13" fill="#94a3b8">${item}</text>
  `).join("")}

  <!-- Sidebar bottom user -->
  <circle cx="36" cy="706" r="16" fill="#334155"/>
  <text x="36" y="711" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#f59e0b">EU</text>
  <text x="58" y="703" font-family="system-ui,sans-serif" font-size="12" fill="#e2e8f0">Ebube Udorie</text>
  <text x="58" y="718" font-family="system-ui,sans-serif" font-size="10" fill="#64748b">Admin</text>

  <!-- Main content area -->
  <!-- Top bar -->
  <rect x="220" y="0" width="980" height="56" fill="#1e293b"/>
  <text x="240" y="34" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#f1f5f9">Overview</text>
  <text x="620" y="33" font-family="system-ui,sans-serif" font-size="12" fill="#64748b">November 2025</text>
  <rect x="900" y="14" width="120" height="28" rx="6" fill="#f59e0b"/>
  <text x="960" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#0f172a">+ New Order</text>
  <rect x="1040" y="14" width="36" height="28" rx="6" fill="#334155"/>
  <text x="1058" y="32" font-family="system-ui,sans-serif" font-size="14" fill="#94a3b8">&#9776;</text>

  <!-- KPI Cards -->
  ${[
    { label: "Total Revenue", value: "₦2,847,500", change: "+14.2%", up: true, x: 240 },
    { label: "Total Orders", value: "1,284", change: "+8.7%", up: true, x: 480 },
    { label: "In Stock", value: "3,942 items", change: "-2.1%", up: false, x: 720 },
    { label: "Active Customers", value: "847", change: "+22.4%", up: true, x: 960 },
  ].map(({ label, value, change, up, x }) => `
  <rect x="${x}" y="72" width="220" height="90" rx="10" fill="#1e293b" filter="url(#shadow)"/>
  <rect x="${x}" y="72" width="220" height="3" rx="2" fill="${up ? "#f59e0b" : "#ef4444"}"/>
  <text x="${x + 16}" y="102" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">${label}</text>
  <text x="${x + 16}" y="130" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#f1f5f9">${value}</text>
  <text x="${x + 16}" y="148" font-family="system-ui,sans-serif" font-size="11" fill="${up ? "#22c55e" : "#ef4444"}">${change} this month</text>
  `).join("")}

  <!-- Revenue Chart -->
  <rect x="240" y="178" width="580" height="240" rx="10" fill="#1e293b" filter="url(#shadow)"/>
  <text x="256" y="204" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Monthly Revenue</text>
  <text x="750" y="204" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Last 8 months</text>

  <!-- Chart bars -->
  ${[
    { h: 80, x: 280 }, { h: 110, x: 340 }, { h: 65, x: 400 },
    { h: 140, x: 460 }, { h: 100, x: 520 }, { h: 160, x: 580 },
    { h: 120, x: 640 }, { h: 170, x: 700 },
  ].map(({ h, x }, i) => `
  <rect x="${x}" y="${388 - h}" width="44" height="${h}" rx="4" fill="${i === 7 ? "url(#barGold)" : "url(#barAmber)"}" opacity="${i === 7 ? 1 : 0.6}"/>
  `).join("")}

  <!-- Chart labels -->
  ${["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((m, i) => `
  <text x="${302 + i * 60}" y="403" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#64748b">${m}</text>
  `).join("")}

  <!-- Grid lines -->
  ${[0, 1, 2, 3].map(i => `
  <line x1="260" y1="${248 + i * 40}" x2="780" y2="${248 + i * 40}" stroke="#334155" stroke-width="1"/>
  `).join("")}

  <!-- Inventory Panel -->
  <rect x="836" y="178" width="344" height="240" rx="10" fill="#1e293b" filter="url(#shadow)"/>
  <text x="852" y="204" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Top Products</text>

  ${[
    { name: "Premium Headphones", qty: "284 units", rev: "₦852,000", status: "In Stock" },
    { name: "USB-C Hub Pro", qty: "147 units", rev: "₦441,000", status: "Low Stock" },
    { name: "Wireless Keyboard", qty: "389 units", rev: "₦778,000", status: "In Stock" },
    { name: "Gaming Mouse RGB", qty: "62 units", rev: "₦186,000", status: "Low Stock" },
  ].map((item, i) => `
  <rect x="852" y="${218 + i * 46}" width="312" height="40" rx="6" fill="${i % 2 === 0 ? "#0f172a" : "transparent"}" opacity="0.5"/>
  <text x="868" y="${241 + i * 46}" font-family="system-ui,sans-serif" font-size="12" fill="#e2e8f0">${item.name}</text>
  <text x="868" y="${254 + i * 46}" font-family="system-ui,sans-serif" font-size="10" fill="#64748b">${item.qty}</text>
  <rect x="${1090}" y="${222 + i * 46}" width="60" height="18" rx="9" fill="${item.status === "In Stock" ? "#166534" : "#7f1d1d"}"/>
  <text x="${1120}" y="${234 + i * 46}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="${item.status === "In Stock" ? "#86efac" : "#fca5a5"}">${item.status}</text>
  `).join("")}

  <!-- Orders Table -->
  <rect x="240" y="432" width="940" height="280" rx="10" fill="#1e293b" filter="url(#shadow)"/>
  <text x="256" y="460" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Recent Orders</text>

  <!-- Table Header -->
  <rect x="240" y="470" width="940" height="32" fill="#0f172a" rx="4"/>
  ${["Order ID", "Customer", "Product", "Date", "Amount", "Status"].map((h, i) => `
  <text x="${270 + i * 156}" y="${491}" font-family="system-ui,sans-serif" font-size="11" fill="#64748b" font-weight="600">${h}</text>
  `).join("")}

  ${[
    { id: "#ORD-2841", cust: "Amaka Obi", prod: "USB-C Hub Pro", date: "Nov 12", amt: "₦9,000", status: "Paid", sc: "#166534", tc: "#86efac" },
    { id: "#ORD-2840", cust: "Chidi Nwosu", prod: "Gaming Mouse RGB", date: "Nov 12", amt: "₦3,000", status: "Pending", sc: "#713f12", tc: "#fde68a" },
    { id: "#ORD-2839", cust: "Fatima Bello", prod: "Headphones Pro", date: "Nov 11", amt: "₦15,000", status: "Paid", sc: "#166534", tc: "#86efac" },
    { id: "#ORD-2838", cust: "Emeka Eze", prod: "Wireless Keyboard", date: "Nov 11", amt: "₦8,000", status: "Shipped", sc: "#1e3a5f", tc: "#93c5fd" },
    { id: "#ORD-2837", cust: "Ngozi Adaeze", prod: "USB-C Hub Pro", date: "Nov 10", amt: "₦9,000", status: "Paid", sc: "#166534", tc: "#86efac" },
  ].map((row, i) => `
  <rect x="240" y="${502 + i * 38}" width="940" height="38" fill="${i % 2 === 0 ? "#0f172a" : "transparent"}" opacity="0.3"/>
  <text x="270" y="${526 + i * 38}" font-family="system-ui,sans-serif" font-size="12" fill="#94a3b8">${row.id}</text>
  <text x="426" y="${526 + i * 38}" font-family="system-ui,sans-serif" font-size="12" fill="#e2e8f0">${row.cust}</text>
  <text x="582" y="${526 + i * 38}" font-family="system-ui,sans-serif" font-size="12" fill="#94a3b8">${row.prod}</text>
  <text x="738" y="${526 + i * 38}" font-family="system-ui,sans-serif" font-size="12" fill="#64748b">${row.date}</text>
  <text x="894" y="${526 + i * 38}" font-family="system-ui,sans-serif" font-size="12" fill="#f1f5f9" font-weight="600">${row.amt}</text>
  <rect x="${1040}" y="${512 + i * 38}" width="62" height="18" rx="9" fill="${row.sc}"/>
  <text x="${1071}" y="${525 + i * 38}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="${row.tc}">${row.status}</text>
  `).join("")}
</svg>`

// ─── Web IDE Editor ────────────────────────────────────────────────────────
const webIdeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e2e"/>
      <stop offset="100%" stop-color="#181825"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="750" fill="url(#bg2)"/>

  <!-- Title bar -->
  <rect x="0" y="0" width="1200" height="32" fill="#11111b"/>
  <circle cx="20" cy="16" r="6" fill="#ff5f57"/>
  <circle cx="40" cy="16" r="6" fill="#ffbd2e"/>
  <circle cx="60" cy="16" r="6" fill="#28c840"/>
  <text x="600" y="21" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#6c7086">Web IDE — workspace</text>

  <!-- Tab bar -->
  <rect x="0" y="32" width="1200" height="36" fill="#1e1e2e"/>
  <rect x="220" y="32" width="160" height="36" fill="#1e1e2e" stroke="#cba6f7" stroke-width="0" rx="0"/>
  <rect x="220" y="32" width="160" height="3" fill="#cba6f7"/>
  <text x="230" y="54" font-family="monospace,sans-serif" font-size="12" fill="#cdd6f4">index.tsx</text>
  <rect x="380" y="32" width="150" height="36" fill="#11111b"/>
  <text x="390" y="54" font-family="monospace,sans-serif" font-size="12" fill="#6c7086">api/users.ts</text>
  <rect x="530" y="32" width="140" height="36" fill="#11111b"/>
  <text x="540" y="54" font-family="monospace,sans-serif" font-size="12" fill="#6c7086">schema.sql</text>
  <rect x="670" y="32" width="120" height="36" fill="#11111b"/>
  <text x="680" y="54" font-family="monospace,sans-serif" font-size="12" fill="#6c7086">README.md</text>

  <!-- Activity bar -->
  <rect x="0" y="32" width="48" height="718" fill="#11111b"/>
  ${["&#9679;", "&#9650;", "&#10685;", "&#9881;", "&#10064;"].map((icon, i) => `
  <text x="24" y="${90 + i * 56}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="${i === 0 ? "#cba6f7" : "#45475a"}">${icon}</text>
  `).join("")}

  <!-- File tree sidebar -->
  <rect x="48" y="68" width="172" height="682" fill="#181825"/>
  <text x="60" y="90" font-family="monospace,sans-serif" font-size="11" fill="#6c7086" font-weight="700">EXPLORER</text>

  ${[
    { name: "src", indent: 0, folder: true },
    { name: "components", indent: 1, folder: true },
    { name: "Button.tsx", indent: 2, folder: false },
    { name: "Modal.tsx", indent: 2, folder: false },
    { name: "pages", indent: 1, folder: true },
    { name: "index.tsx", indent: 2, folder: false, active: true },
    { name: "api", indent: 1, folder: true },
    { name: "users.ts", indent: 2, folder: false },
    { name: "public", indent: 0, folder: true },
    { name: "package.json", indent: 0, folder: false },
    { name: "tsconfig.json", indent: 0, folder: false },
    { name: ".env.local", indent: 0, folder: false },
  ].map((f, i) => `
  ${f.active ? `<rect x="48" y="${105 + i * 22}" width="172" height="22" fill="#cba6f7" opacity="0.15"/>` : ""}
  <text x="${64 + f.indent * 12}" y="${121 + i * 22}" font-family="monospace,sans-serif" font-size="11" fill="${f.active ? "#cba6f7" : f.folder ? "#89b4fa" : "#cdd6f4"}">${f.folder ? "▾ " : "  "}${f.name}</text>
  `).join("")}

  <!-- Code editor main area -->
  <rect x="220" y="68" width="720" height="490" fill="#1e1e2e"/>

  <!-- Line numbers -->
  <rect x="220" y="68" width="40" height="490" fill="#181825"/>

  <!-- Code lines -->
  ${[
    { ln: 1,  code: "import React, { useState, useEffect } from 'react'", color: "#cdd6f4" },
    { ln: 2,  code: "import { Editor } from '@monaco-editor/react'", color: "#cdd6f4" },
    { ln: 3,  code: "import { FileTree } from '@/components/FileTree'", color: "#cdd6f4" },
    { ln: 4,  code: "", color: "#cdd6f4" },
    { ln: 5,  code: "interface EditorProps {", color: "#89dceb" },
    { ln: 6,  code: "  projectId: string", color: "#cdd6f4" },
    { ln: 7,  code: "  language: 'typescript' | 'python' | 'sql'", color: "#cdd6f4" },
    { ln: 8,  code: "  onSave?: (code: string) => void", color: "#cdd6f4" },
    { ln: 9,  code: "}", color: "#89dceb" },
    { ln: 10, code: "", color: "#cdd6f4" },
    { ln: 11, code: "export default function WebIDE({ projectId }: EditorProps) {", color: "#cba6f7" },
    { ln: 12, code: "  const [files, setFiles] = useState<string[]>([])", color: "#cdd6f4" },
    { ln: 13, code: "  const [activeFile, setActiveFile] = useState('')", color: "#cdd6f4" },
    { ln: 14, code: "  const [content, setContent] = useState('')", color: "#cdd6f4" },
    { ln: 15, code: "", color: "#cdd6f4" },
    { ln: 16, code: "  useEffect(() => {", color: "#cba6f7" },
    { ln: 17, code: "    fetch(`/api/files?project=${projectId}`)", color: "#cdd6f4" },
    { ln: 18, code: "      .then(res => res.json())", color: "#a6e3a1" },
    { ln: 19, code: "      .then(data => setFiles(data.files))", color: "#a6e3a1" },
    { ln: 20, code: "  }, [projectId])", color: "#cba6f7" },
    { ln: 21, code: "", color: "#cdd6f4" },
    { ln: 22, code: "  const handleSave = async () => {", color: "#cba6f7" },
  ].map(({ ln, code, color }) => `
  <text x="228" y="${88 + ln * 20}" font-family="monospace,sans-serif" font-size="10" fill="#45475a">${ln}</text>
  <text x="268" y="${88 + ln * 20}" font-family="monospace,sans-serif" font-size="11" fill="${color}">${code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>
  `).join("")}

  <!-- Active line highlight -->
  <rect x="260" y="282" width="680" height="20" fill="#cba6f7" opacity="0.08"/>

  <!-- Cursor -->
  <rect x="570" y="284" width="2" height="16" fill="#f5c2e7" opacity="0.9"/>

  <!-- Right panel - terminal & output -->
  <rect x="940" y="68" width="260" height="490" fill="#11111b"/>
  <text x="952" y="90" font-family="monospace,sans-serif" font-size="11" fill="#6c7086">OUTLINE</text>
  ${[
    "EditorProps", "  projectId", "  language", "  onSave",
    "WebIDE (func)", "  files", "  activeFile", "  content",
    "  handleSave", "  handleRun"
  ].map((item, i) => `
  <text x="${item.startsWith(" ") ? 980 : 968}" y="${110 + i * 22}" font-family="monospace,sans-serif" font-size="11" fill="${item.includes("func") ? "#cba6f7" : item.startsWith(" ") ? "#89b4fa" : "#89dceb"}">${item.trim()}</text>
  `).join("")}

  <!-- Terminal panel at bottom -->
  <rect x="220" y="558" width="980" height="192" fill="#11111b"/>
  <rect x="220" y="558" width="980" height="28" fill="#181825"/>
  <text x="232" y="576" font-family="monospace,sans-serif" font-size="11" fill="#cba6f7">TERMINAL</text>
  <text x="310" y="576" font-family="monospace,sans-serif" font-size="11" fill="#45475a">PROBLEMS</text>
  <text x="390" y="576" font-family="monospace,sans-serif" font-size="11" fill="#45475a">OUTPUT</text>

  <text x="232" y="600" font-family="monospace,sans-serif" font-size="11" fill="#6c7086">~/projects/web-ide</text>
  <text x="232" y="620" font-family="monospace,sans-serif" font-size="11" fill="#a6e3a1">$ npm run dev</text>
  <text x="232" y="640" font-family="monospace,sans-serif" font-size="11" fill="#89b4fa">  ▲ Next.js 15.1.0</text>
  <text x="232" y="660" font-family="monospace,sans-serif" font-size="11" fill="#cdd6f4">  - Local:  http://localhost:3001</text>
  <text x="232" y="680" font-family="monospace,sans-serif" font-size="11" fill="#cdd6f4">  - Network: http://192.168.1.5:3001</text>
  <text x="232" y="700" font-family="monospace,sans-serif" font-size="11" fill="#a6e3a1">  ✓ Ready in 2.4s</text>
  <text x="232" y="726" font-family="monospace,sans-serif" font-size="11" fill="#f5c2e7">$ </text>
  <rect x="248" y="714" width="2" height="15" fill="#f5c2e7" opacity="0.8"/>

  <!-- Status bar -->
  <rect x="0" y="718" width="1200" height="32" fill="#cba6f7"/>
  <text x="56" y="738" font-family="monospace,sans-serif" font-size="11" fill="#1e1e2e">&#10003; TypeScript</text>
  <text x="180" y="738" font-family="monospace,sans-serif" font-size="11" fill="#1e1e2e">Ln 22, Col 34</text>
  <text x="1000" y="738" font-family="monospace,sans-serif" font-size="11" fill="#1e1e2e">UTF-8  LF  TypeScript  Web IDE</text>
</svg>`

writeFileSync(join(root, "public/projects/springlight-commerce.svg"), springlightSVG)
writeFileSync(join(root, "public/projects/web-ide.svg"), webIdeSVG)

console.log("✅ Project thumbnails generated:")
console.log("   public/projects/springlight-commerce.svg")
console.log("   public/projects/web-ide.svg")
