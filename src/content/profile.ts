export const profile = {
  name: "Ebube Udorie",
  alternateName: "Technikraft",
  jobTitle: "Full-Stack Engineer & App Developer",
  headline: "I’m a Full-Stack Engineer and App Developer building production-grade web applications, interactive learning platforms, AI study tools, and e-commerce systems.",
  /** One-paragraph summary. Search and AI engines quote this, so keep it factual and specific. */
  summary:
    "I am Ebube Udorie (Technikraft), a Full-Stack Engineer and App Developer based in Uyo, Akwa Ibom State, Nigeria. I lead the engineering of innovative digital products—from Scholarium (an AI-powered academic app for university students) and Mastery Lab (an interactive HTML & CSS learning platform with quizzes and leaderboards) to enterprise business platforms like Springlight Commerce and modern fashion e-commerce for Venicio Boutique. My technical stack spans Next.js, React, Node.js, TypeScript, Flutter, C++, Python, PHP, PostgreSQL, Supabase, Redis, and Docker. I am available for remote roles, contract development, and technical collaborations.",
  bio: [
    "I’m Ebube Udorie (Technikraft), a Full-Stack Engineer and App Developer based in Uyo, Nigeria. I specialize in building end-to-end digital solutions—ranging from interactive learning systems and AI study companions to enterprise management dashboards and bespoke e-commerce platforms.",
    "Currently pursuing a Computer Engineering degree at the University of Uyo, I combine engineering fundamentals with hands-on product leadership. I am currently leading the engineering team behind Scholarium, a multi-faceted academic application designed to help university students and freshers navigate school smoothly with real-time quizzes, personalized AI study assistants, AI PDF analysis, and step-by-step mathematics solvers.",
    "I also built and launched Mastery Lab, an interactive, free learning system equipped with structured documentation, quizzes, live leaderboards, and code challenges to help aspiring developers master HTML and CSS. During my internship at Springlight Technology, I engineered Springlight Commerce, a comprehensive sales and inventory tracking platform.",
    "Whether developing cross-platform mobile apps with Flutter, writing low-level routines in C++, or building full-stack web architectures with Next.js, Node.js, and Supabase, I prioritize clean codebases, thoughtful UI/UX, and reliable software that solves real problems.",
  ],
  location: { city: "Uyo", region: "Akwa Ibom State", country: "Nigeria", countryCode: "NG" },
  email: "emmanuelchibuikeudorie@gmail.com",
  phone: "+234 816 702 5308",
  availableForWork: true,
  photo: "/images/me2.jpeg",
  photoAlt: "/images/me3.jpeg",
  /** Header logo. */
  logo: "/images/logo-header.svg",
  /** Die-cut sticker in the footer. Upload a PNG with a transparent background. */
  stickerLogo: "/images/logo-sticker.svg",
  cv: "/ebube-udorie-cv.pdf",
  experience: [
    { role: "Team Lead & Lead Developer", organization: "Scholarium", start: "2025", end: "Present" },
    { role: "Full-Stack Developer Intern", organization: "Springlight Technology", start: "2025", end: "2025" },
  ],
  interests: ["Interactive learning systems & EdTech", "AI-assisted academic tools", "Mobile app development with Flutter", "E-commerce & payment gateways", "Low-level & systems engineering with C++"],
  links: {
    github: "https://github.com",
    x: "https://x.com",
    xHandle: "@technikraft",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/2348167025308",
  },
} as const

export const sameAs = [profile.links.github, profile.links.x]
