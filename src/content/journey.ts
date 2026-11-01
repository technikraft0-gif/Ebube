import { profile } from "./profile"

export type OutsideStory = {
  id: string
  category: string
  title: string
  body: string
  image: string
  imageAlt: string
  imagePosition: string
  caption: string
  preview: boolean
  /** Show the bookshelf covers (from the hero) instead of the photo. */
  showBooks?: boolean
  link?: { label: string; href: string }
}

export const outsideContent = {
  kicker: "03 / WHEN THE LAPTOP CLOSES",
  title: "Beyond the IDE.",
  description: "What I’m up to when I’m not writing code: the engineering books on my desk, academic exploration in Computer Engineering, and collaborating with fellow developers.",
  previewLabel: "STORY PREVIEW",
  categories: ["Engineering & Tech", "Hardware & Embedded Systems", "Solid Modeling & CAD", "AI & Intelligence"],
  sideNote: "Continuous curiosity fuels great code.",
  booksLabel: "Books I study and keep nearby",
  stories: [
    {
      id: "reading", category: "ENGINEERING & READING", title: "Always an engineering book on the go.",
      body: "Engineering books and technical literature are how I slow down and think systematically. Clean Code and Designing Data-Intensive Applications guide my software craftsmanship. Exploring Solid Modeling connects geometric precision with digital modeling, while AI Engineering, embedded microcontrollers, and computer organization keep my knowledge grounded from silicon to the cloud.",
      image: "/images/gallery/ebube-laptop-book.jpeg", imageAlt: "Laptop open with VS Code and HTML CSS JS book on the desk", imagePosition: "50% 50%",
      caption: "The shelf so far, and the ones I’m exploring.", preview: false, showBooks: true,
    },
    {
      id: "engineering", category: "HARDWARE & EMBEDDED SYSTEMS", title: "Engineering from silicon to the screen.",
      body: "Studying Computer Engineering at the University of Uyo gives me a deep appreciation for computing beneath the web abstraction. Understanding digital logic, processor architecture, embedded firmware, and solid CAD modeling makes me a much sharper engineer when building scalable systems and diagnosing performance bottlenecks.",
      image: "/images/gallery/uniuyo-campus.jpg", imageAlt: "University of Uyo campus building — Computer Engineering faculty", imagePosition: "50% 40%",
      caption: "Bridging foundational engineering with modern web architecture.", preview: false,
    },
    {
      id: "building", category: "BUILDING & COLLABORATION", title: "Crafting real tools with other builders.",
      body: "From collaborating on a custom IDE to architecting e-commerce inventory backends at Springlight Technology, working with other engineers pushes me to elevate every commit. Discussing trade-offs, testing edge cases, and shipping functional software is where theory becomes impact.",
      image: "/images/gallery/ebube-book-keyboard.jpeg", imageAlt: "HTML CSS JS book on RGB gaming keyboard — coding setup", imagePosition: "50% 38%",
      caption: "Building together, shipping with confidence.", preview: false,
      link: { label: "Let's connect", href: `mailto:${profile.email}?subject=Project%20Collaboration` },
    },
  ] satisfies OutsideStory[],
}

export type Testimonial = {
  id: string
  perspective: string
  quote: string
  name: string
  role: string
  company: string
  companyLogo: string
  image: string
  tone: "cream" | "rose" | "yellow"
  paper: string
}

export const testimonialsContent = {
  background: "/images/testimonials/pinboard-brown.webp",
  kicker: "04 / THE PEOPLE SIDE OF THE WORK",
  title: ["Good work.", "Good people."],
  description: "A little perspective from the people on the other side of the project.",
  previewLabel: "TESTIMONIAL PREVIEW",
  previewNote: "Quotes from teams and clients I collaborate with.",
  quotePlaceholder: "Their words. Their experience. Their perspective.",
  namePlaceholder: "Name to be added",
  rolePlaceholder: "Role",
  contact: { label: "Let’s work together", href: "#contact" },
  valuesLabel: "BUILT WITH PEOPLE, FOR PEOPLE",
  values: ["Clear communication", "Shared ownership", "Thoughtful delivery"],
  items: [
    { id: "springlight", perspective: "At Springlight Technology", company: "Springlight Technology", companyLogo: "/images/testimonials/logos/springlight.svg", quote: "Ebube brought tremendous energy and analytical clarity to our projects. Whether structuring the database models for our e-commerce management system or collaborating on our custom IDE, he consistently writes clean, reliable code and seeks to understand the full picture.", name: "Engineering Team", role: "Springlight Technology", image: "", tone: "yellow", paper: "/images/about/note-sunshine.png" },
    { id: "client", perspective: "A business client’s perspective", company: "Business Client", companyLogo: "", quote: "Ebube is attentive, communicates clearly, and doesn't overwhelm you with unnecessary jargon. He delivered our dashboard with exact inventory calculations and responsive charts ahead of schedule.", name: "Client", role: "Operations Lead", image: "", tone: "cream", paper: "/images/testimonials/note-cream.png" },
  ] as Testimonial[],
}

export const capabilitiesContent = {
  kicker: "05 / FROM DATABASE MODELS TO RESPONSIVE UI",
  title: ["One engineer.", "The complete product."],
  description: "Modern products require intuitive user interfaces, reliable backend APIs, structured relational or document storage, and seamless payment collection. I connect all these disciplines to deliver cohesive solutions.",
  linkLabel: "Discuss your project",
  supportingLabel: "AND THE DISCIPLINES THAT MAKE IT ROBUST",
  items: [
    {
      id: "frontend", number: "01", label: "FRONTEND & RESPONSIVE UI", title: "Interfaces users love to navigate.",
      description: "Fast, responsive, and accessible web interfaces built with Next.js, React, and Astro, styled cleanly with Tailwind CSS and Material UI.",
      details: ["Next.js & React single-page and server-rendered apps", "Astro content and high-speed marketing portals", "Responsive layout engineering with Tailwind & Material UI"],
      note: "Clarity in every click.", icon: "frontend", tone: "yellow",
      tools: [{ name: "React", icon: "react" }, { name: "Next.js", icon: "nextdotjs" }, { name: "TypeScript", icon: "typescript" }, { name: "Tailwind CSS", icon: "tailwindcss" }, { name: "Material UI", icon: "materialui" }, { name: "Astro", icon: "astro" }],
    },
    {
      id: "backend", number: "02", label: "BACKEND, APIS & DATA", title: "Rock-solid infrastructure underneath.",
      description: "Performant REST APIs and services built with Express.js, FastAPI, or PHP, backed by PostgreSQL, MongoDB, Supabase, and Redis caching.",
      details: ["Express.js & FastAPI backend architectures", "Relational and NoSQL schemas (PostgreSQL, MongoDB, MySQL)", "Authentication, session handling, and Redis caching"],
      note: "Good foundations go a long way.", icon: "backend", tone: "green",
      tools: [{ name: "Node.js", icon: "nodedotjs" }, { name: "MongoDB", icon: "mongodb" }, { name: "PostgreSQL", icon: "postgresql" }, { name: "FastAPI", icon: "fastapi" }, { name: "Laravel", icon: "laravel" }, { name: "MySQL", icon: "mysql" }],
    },
    {
      id: "dashboards", number: "03", label: "BUSINESS DASHBOARDS & PAYMENTS", title: "Tools that power daily operations.",
      description: "Custom management consoles for inventory, sales analytics, customer records, and payment integration with Paystack or Stripe.",
      details: ["Sales & inventory tracking platforms", "Verified payment gateways & webhook handlers", "Docker containerization & cloud deployment on Vercel and AWS"],
      note: "Useful, precise, and dependable.", icon: "ai", tone: "rose",
      tools: [{ name: "Docker", icon: "docker" }, { name: "Vercel", icon: "vercel" }, { name: "AWS", icon: "aws" }, { name: "Git", icon: "git" }],
    },
  ],
}
