import type { Project, ProjectCaseStudy } from "./projects"

/** Case studies written from each project's code, docs and history. Projects without one show a simpler page. */
export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  scholarium: {
    demo: false,
    summary: "Leading the development team building an all-in-one academic companion for university students and freshers: real-time live quizzes, personalized AI study assistance, AI PDF analysis with concept explanations, a mathematics solver, and campus navigation.",
    client: "Scholarium Team", role: "Team Lead & Full-Stack / Mobile Engineer",
    services: ["Flutter cross-platform mobile architecture", "Next.js web portal & admin dashboards", "AI/LLM integration (PDF analysis & math solver)", "Real-time quiz engine with WebSockets", "PostgreSQL database & offline sync"],
    metrics: [{ value: "AI-Powered", label: "PDF analysis & solver" }, { value: "Real-time", label: "Live quiz competitions" }, { value: "Cross-platform", label: "Mobile (Flutter) & Web" }, { value: "Freshers", label: "Onboarding & guidance" }],
    challenge: ["University students, especially freshers transitioning into higher education, face steep academic hurdles: complex lecture handouts, difficult mathematics coursework, high-pressure exams, and navigating sprawling campuses without structured guidance.", "Traditional study methods leave students studying in isolation without interactive feedback. We set out to build an intelligent, engaging academic companion that combines artificial intelligence with social, gamified study habits."],
    solution: ["I lead the engineering team developing Scholarium across mobile and web. We integrated an AI-driven document intelligence engine that parses course lecture PDFs, extracts fundamental theorems, and provides plain-language explanations with instant Q&A.", "To boost retention, we built a real-time multiplayer quiz engine where students compete across course topics. The platform also includes a step-by-step mathematical problem solver, campus course timetables, and offline-first synchronization using Flutter and PostgreSQL."],
    outcomes: ["Students can upload voluminous lecture PDFs and receive structured concept summaries with auto-generated test questions in seconds.", "The live quiz engine promotes active recall through healthy competition on campus leaderboards.", "Freshers gain immediate clarity on lecture venues, course requirements, and syllabus milestones."],
    architecture: {
      introduction: "A hybrid cross-platform architecture combining a responsive Flutter mobile client with a Next.js web portal, backed by a Node.js API and AI reasoning services.",
      pipeline: [{ label: "Flutter Mobile App", detail: "Cross-platform Android & iOS client" }, { label: "Next.js Web Portal", detail: "Student hub, study dashboard, docs" }, { label: "Node.js & FastAPI", detail: "Real-time WebSockets, auth, AI routing" }, { label: "PostgreSQL & Supabase", detail: "Course catalog, student profiles, quizzes" }, { label: "AI Reasoning Engine", detail: "PDF document parsing, math CAS solver" }],
      pillars: [
        { title: "AI Document Intelligence", icon: "performance", body: "Processes lecture PDFs chunk-by-chunk with semantic embeddings to answer course-specific questions with zero hallucination." },
        { title: "Real-time Synchronization", icon: "database", body: "WebSocket rooms orchestrate synchronized multiplayer quiz rounds with millisecond score updates and anti-cheat validation." },
        { title: "Offline-First Mobile UX", icon: "security", body: "Flutter local SQLite caching allows students to review study guides and class timetables even in low-connectivity lecture halls." },
        { title: "Team Leadership & Quality", icon: "testing", body: "Enforcing strict code review guidelines, automated linting, modular component architecture, and sprint delivery milestones." },
      ],
      access: { title: "In Active Development", body: "Currently leading active development with our team. Demos and architectural walk-throughs available upon request." },
    },
  },
  "mastery-lab": {
    demo: false,
    summary: "Designed and engineered an interactive, free learning system for developers mastering HTML and CSS: comprehensive documented lessons, live browser code editor, quizzes, and weekly competitive leaderboards.",
    client: "Mastery Lab", role: "Creator & Lead Engineer",
    services: ["Interactive browser code execution sandbox", "Live HTML/CSS preview engine", "Quiz evaluation & scoring system", "Global leaderboard & XP rewards", "Supabase authentication & database"],
    metrics: [{ value: "100% Free", label: "Developer education" }, { value: "Real-time", label: "In-browser live preview" }, { value: "Gamified", label: "Quizzes & Leaderboards" }, { value: "Structured", label: "Documented lesson paths" }],
    challenge: ["Beginning developers learning HTML and CSS often struggle with passive video tutorials where they don't write code immediately, or clunky local dev environments that frustrate them with setup errors before writing their first line of code.", "The goal was to build a streamlined, 100% free web platform that combines crystal-clear documentation with an instant, interactive code editor and motivational gamification."],
    solution: ["I engineered Mastery Lab as a modern Next.js and Supabase platform. Each lesson pairs concise, visual explanations with an interactive in-browser editor that renders live HTML/CSS updates side-by-side with automatic DOM validation.", "To make learning addictive, every completed challenge and quiz awards XP, automatically ranking students on a global leaderboard with weekly streaks and milestone badges."],
    outcomes: ["Aspiring developers write and test code directly in the browser with immediate visual and syntactic feedback.", "Structured progressive lessons guide learners from basic tags to advanced CSS Flexbox, Grid, and responsive UI.", "The competitive leaderboard and quiz system drastically improved student completion rates."],
    architecture: {
      introduction: "A fast, server-rendered Next.js application with client-side sandboxed code execution and Supabase PostgreSQL persistence.",
      pipeline: [{ label: "Next.js Frontend", detail: "Interactive split-screen editor & docs" }, { label: "Sandboxed Preview", detail: "Isolated iframe runner with CSS validation" }, { label: "Quiz & Scoring Engine", detail: "Automated test cases and XP calculation" }, { label: "Supabase DB & Auth", detail: "User progress, leaderboard rankings, streaks" }],
      pillars: [
        { title: "In-Browser Execution", icon: "performance", body: "Sandboxed iframe execution isolates student code while providing instant, hot-reloading visual feedback." },
        { title: "Gamification & Progress", icon: "database", body: "Supabase PostgreSQL tables track completed lessons, quiz scores, and XP with optimistic UI updates." },
        { title: "Accessible & Responsive", icon: "security", body: "Clean, distraction-free UI styled with Tailwind CSS, fully responsive across mobile phones, tablets, and desktops." },
        { title: "Zero Setup Friction", icon: "testing", body: "No installations, account barriers, or paywalls—students start coding within two seconds of landing on the site." },
      ],
      access: { title: "Free Platform", body: "Open to learners worldwide. Built and maintained with passion for developer education." },
    },
  },
  "springlight-commerce": {
    demo: false,
    summary: "Architected a custom enterprise management platform at Springlight Technology: multi-location stock tracking, real-time sales logging, automated low-inventory alerts, and business analytics.",
    client: "Springlight Technology", role: "Full-Stack Developer Intern",
    services: ["Custom inventory & stock management", "Transaction processing & receipt generation", "Sales analytics dashboard & charting", "PostgreSQL relational schemas", "Docker containerization"],
    metrics: [{ value: "10,000+", label: "SKUs supported" }, { value: "35%", label: "Faster inventory queries" }, { value: "Real-time", label: "Low stock alerts" }, { value: "Multi-store", label: "Location tracking" }],
    challenge: ["Managing inventory, cashier sales, and daily reconciliations across physical stores often relies on fragmented spreadsheets or generic software that fails to adapt to specific retail operational workflows.", "Springlight needed a custom, highly reliable management system that could prevent stock leakage, track product movements across multiple store locations, and give management real-time financial clarity."],
    solution: ["During my internship at Springlight Technology, I built this enterprise commerce management platform. I designed the relational PostgreSQL schema to enforce strict transaction atomicity and prevent double-counted inventory.", "I developed intuitive web dashboards for cashiers to register sales quickly, set up automatic threshold alerts when stock dips below safe levels, and created comprehensive visual reporting for daily profit and turnover."],
    outcomes: ["Cashiers record checkout transactions with instantaneous barcode/SKU search and receipt issuance.", "Inventory discrepancies decreased dramatically thanks to strict transactional ledger recording.", "Store managers gain single-click visual analytics of top-selling products, profit margins, and restocking requirements."],
    architecture: {
      introduction: "A production-grade web application with a Next.js interface, Node.js backend, and PostgreSQL database containerized with Docker.",
      pipeline: [{ label: "Next.js & Tailwind", detail: "Responsive cashier POS & manager dashboards" }, { label: "Express API", detail: "REST endpoints, auth, inventory transactions" }, { label: "PostgreSQL Database", detail: "Relational tables with foreign key constraints" }, { label: "Docker Deployment", detail: "Isolated containerized service deployment" }],
      pillars: [
        { title: "Data Integrity", icon: "database", body: "ACID-compliant PostgreSQL transactions ensure that every stock deduction is atomic and mathematically verified." },
        { title: "Operational Speed", icon: "performance", body: "Debounced product lookup and indexed database queries return inventory results in under 50ms." },
        { title: "Role-Based Access", icon: "security", body: "Separation of privileges between cashiers, inventory managers, and executive administrators." },
        { title: "Containerized Portability", icon: "testing", body: "Standardized Docker environment ensuring consistent behavior across local development and production servers." },
      ],
      access: { title: "Enterprise Internal Platform", body: "Built for internal commercial use at Springlight Technology. Architecture and engineering details available for review." },
    },
  },
  "venicio-boutique": {
    demo: false,
    summary: "Engineered an e-commerce platform for fashion brand Venicio Boutique: responsive apparel catalog, lookbooks, client-side cart, and Paystack checkout.",
    client: "Venicio Boutique", role: "Full-Stack Developer",
    services: ["Luxury editorial frontend design", "Product catalog & variant management", "Responsive shopping cart", "Paystack payment integration", "Admin order tracking"],
    metrics: [{ value: "Fast", label: "Sub-second catalog filter" }, { value: "Paystack", label: "Secure verified checkout" }, { value: "Mobile-first", label: "Editorial fashion UI" }, { value: "100%", label: "Custom design" }],
    challenge: ["Fashion brands require a distinctive visual identity that communicates luxury and craftsmanship, while simultaneously providing a friction-free, lightning-fast shopping cart and mobile checkout experience.", "Venicio Boutique needed an online home that reflected its bespoke apparel drops, managed product sizes and inventory counts, and accepted local and international card payments seamlessly."],
    solution: ["I designed and developed a bespoke e-commerce web application featuring high-contrast editorial typography, dynamic image galleries, and smooth category filtering.", "The shopping cart is implemented client-side with persistent storage, coupled to a verified Paystack checkout workflow that verifies webhook signatures on the backend before confirming orders."],
    outcomes: ["Shoppers browse seasonal apparel collections with fluid transitions and responsive mobile layouts.", "Secure, verified checkout via Paystack with automated customer order confirmations.", "Store administrators easily update drop inventory, prices, and high-resolution lookbook galleries."],
    architecture: {
      introduction: "A high-performance Next.js storefront styled with Tailwind CSS, backed by a Node.js API and verified Paystack webhook listener.",
      pipeline: [{ label: "Next.js Storefront", detail: "Editorial product catalog & cart" }, { label: "Tailwind CSS", detail: "Luxury responsive design system" }, { label: "Paystack Integration", detail: "Card, bank transfer, and USSD checkout" }, { label: "Order Management", detail: "Webhook verification & customer notifications" }],
      pillars: [
        { title: "Visual Elegance", icon: "performance", body: "Carefully calibrated typography, high-resolution imagery, and bespoke animations that elevate the brand." },
        { title: "Secure Transactions", icon: "security", body: "HMAC webhook verification and server-side payment reconciliation prevent fraudulent order tampering." },
        { title: "Cart Ergonomics", icon: "database", body: "Persistent local cart state ensures shoppers don't lose their selected items across sessions or page reloads." },
        { title: "Mobile Shopping", icon: "testing", body: "Touch-first navigation and bottom-sheet drawers optimized for mobile users who make up over 80% of traffic." },
      ],
      access: { title: "Client E-Commerce Project", body: "Custom fashion platform built for Venicio Boutique." },
    },
  },
}

/** The user's supplied reference, isolated from Ebube's actual project collection. */
export const caseStudyPreview: Project = {
  slug:"rentium",title:"Rentium",category:"Reference layout demo",referenceDemo:true,
  summary:"Built and scaled a subscription-based virtual identity and infrastructure platform supporting 457+ paying customers with sub-second authentication, verification, and subscription management.",
  description:"Layout preview using the Rentium case-study content supplied as a reference. This is not a project or performance claim by Ebube Udorie.",
  image:"/images/case-study-demo/rentium.webp", liveUrl:"https://rentiumsms.online/",
  technologies:["Next.js","Node.js","Redis","BullMQ","Supabase","PostgreSQL","JWT","Jest","Supertest"],
  gallery:[{src:"/images/case-study-demo/rentium.webp",alt:"Rentium screenshot supplied as a case-study reference",caption:"Reference screenshot supplied for the Rentium layout demo."}],
  caseStudy:{
    demo:true,
    summary:"Built and scaled a subscription-based virtual identity and infrastructure platform supporting 457+ paying customers with sub-second authentication, verification, and subscription management.",
    client:"Rentium Infrastructure",role:"Founder & Lead Full Stack Engineer",
    services:["Identity Infrastructure","Supabase & Node.js","Payment Billing Engine","SMS API Integration","Rate Limiting & Security"],
    metrics:[{value:"457+",label:"Paying Customers"},{value:"< 1.2s",label:"Verification Speed"},{value:"99.9%",label:"Uptime"},{value:"Global",label:"Markets Served"}],
    challenge:["Managing scalable virtual identity verifications and SMS dispatching with sub-second delivery rates while maintaining strict fraud prevention and handling rapid subscription growth."],
    solution:["Architected a high-concurrency Node.js and Next.js engine with Redis payload caching, automated multi-tier subscription billing, robust JWT authentication, and resilient webhook integration with SMS API partners."],
    outcomes:["Successfully scaled platform to 457+ active paying subscribers within months of launch.","Achieved sub-second OTP and verification code delivery through optimized queue workers.","Zero security breaches across all authentication and payment transaction workflows."],
    architecture:{
      introduction:"Architected for high availability, transactional consistency, and predictable latency under load.",
      pipeline:[{label:"Client (Next.js PWA)",detail:"Product interface"},{label:"Edge Proxy & Rate Limiter",detail:"Request boundary"},{label:"Node.js API Workers",detail:"Application execution"},{label:"Redis BullMQ Message Queue",detail:"Asynchronous dispatch"},{label:"Supabase / PostgreSQL (ACID)",detail:"Transactional persistence"},{label:"Carrier SMS Partner Webhooks",detail:"Delivery integrations"}],
      pillars:[
        {title:"Database & Data Integrity",icon:"database",body:"PostgreSQL schema with connection pooling, automated B-tree indexing on user identity keys, and row-level security (RLS) policies ensuring tenant isolation."},
        {title:"Concurrency & Latency",icon:"performance",body:"BullMQ job queues on Redis processing parallel SMS dispatch jobs asynchronously without blocking the Node.js event loop during peak verification traffic."},
        {title:"Auth, Security & Compliance",icon:"security",body:"Rotating JWT auth tokens, Token-Bucket algorithm rate limiting per IP/session, and SHA-256 payload verification on inbound partner webhooks."},
        {title:"Testing & Automated CI/CD",icon:"testing",body:"Comprehensive integration testing with Jest & Supertest covering auth, checkout subscription webhooks, and OTP expiration lifecycles."},
      ],
      access:{title:"Proprietary Commercial Architecture",body:"Live production system with proprietary IP. System design, queue workers, and database benchmarks are documented here for technical evaluation.",actionLabel:"Test Live Production"},
    },
  },
}
