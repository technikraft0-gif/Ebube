export type ProjectVisual = { src: string; alt: string; caption: string; detail?: boolean; position?: string }
export type ProjectCaseStudy = {
  demo: boolean
  summary: string
  client: string
  role: string
  services: string[]
  metrics: { value: string; label: string }[]
  challenge: string[]
  solution: string[]
  outcomes: string[]
  architecture: {
    introduction: string
    pipeline: { label: string; detail: string }[]
    pillars: { title: string; body: string; icon: "database" | "performance" | "security" | "testing" }[]
    access: { title: string; body: string; actionLabel?: string }
  }
}
/** How the project was built: hard problems, decisions and what each choice gave up. */
export type ProjectEngineering = {
  challenges: { title: string; problem: string; solution: string }[]
  decisions: { title: string; why: string }[]
  tradeoffs: { choice: string; gained: string; cost: string }[]
}
export type Project = {
  slug: string
  title: string
  /** One line, used in cards, meta descriptions and llms.txt. */
  summary: string
  description: string
  category: string
  technologies: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  /** True when this is a client site that is in production. */
  live?: boolean
  featured?: boolean
  note?: string
  story?: string[]
  highlights?: string[]
  gallery?: ProjectVisual[]
  facts?: { label: string; value: string }[]
  caseStudy?: ProjectCaseStudy
  engineering?: ProjectEngineering
  referenceDemo?: boolean
}

export const projects: Project[] = [
  {
    slug: "scholarium",
    title: "Scholarium – University Academic & AI Study App",
    summary: "An academic app for university students and freshers featuring real-time quizzes, personalized AI study assistance, AI PDF analysis, and step-by-step math solver.",
    description:
      "Leading the engineering team on Scholarium, an all-in-one academic companion built to help university students (especially freshers) navigate campus life and excel academically. The platform provides real-time competitive quizzes, personalized AI study recommendations, deep PDF document analysis with instant concept breakdown, an automated mathematics solver, and campus navigation assistance.",
    category: "Academic & AI Platform",
    technologies: ["Flutter", "Dart", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/scholarium.svg",
    repoUrl: "https://github.com/technikraft0-gif/Ebube",
    featured: true,
  },
  {
    slug: "mastery-lab",
    title: "Mastery Lab – Interactive Web Learning System",
    summary: "A full learning platform for aspiring developers to master HTML and CSS for free, with documented lessons, interactive challenges, quizzes, and live leaderboards.",
    description:
      "Mastery Lab is a sophisticated, free developer education platform. It offers meticulously documented lessons on HTML and CSS fundamentals, in-browser live code execution with instant visual feedback, knowledge testing quizzes, and weekly competitive leaderboards that gamify the learning experience.",
    category: "EdTech & Web Platform",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Tailwind CSS"],
    image: "/projects/mastery-lab.svg",
    repoUrl: "https://github.com/technikraft0-gif",
    featured: true,
  },
  {
    slug: "springlight-commerce",
    title: "Springlight Commerce – Sales & Inventory Platform",
    summary: "A custom business management platform for real-time sales tracking, inventory control, and automated reporting.",
    description:
      "Engineered at Springlight Technology, this custom enterprise management application provides business operators with a unified dashboard for tracking transactions, monitoring stock levels across multiple locations, receiving low-inventory alerts, and generating detailed sales analytics.",
    category: "Business Application",
    technologies: ["TypeScript", "Next.js", "PHP", "PostgreSQL", "Tailwind CSS", "Express.js", "Docker"],
    image: "/projects/springlight-commerce.svg",
    repoUrl: "https://github.com/technikraft0-gif",
    featured: true,
  },
  {
    slug: "venicio-boutique",
    title: "Venicio Boutique – Luxury Fashion E-Commerce",
    summary: "A contemporary fashion e-commerce storefront with dynamic apparel catalog, product filtering, responsive lookbooks, and cart checkout.",
    description:
      "A custom e-commerce platform built for fashion brand Venicio Boutique. Features a high-fashion editorial aesthetic, responsive product galleries, interactive size and variant selection, client-side cart management, and seamless Paystack checkout integration.",
    category: "E-Commerce",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Paystack"],
    image: "/projects/venicio-boutique.svg",
    repoUrl: "https://github.com/technikraft0-gif",
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
