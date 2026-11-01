export type Education = {
  credential: string
  institution: string
  location: string
  period: string
  description: string
  certifications: string[]
  courses: string[]
}

export const education: Education[] = [
  {
    credential: "B.Eng in Computer Engineering (200 Level)",
    institution: "University of Uyo",
    location: "Uyo, Akwa Ibom State",
    period: "2024 - Present",
    description: "Foundational training in computer systems, digital logic, data structures, electronics, and hardware-software integration.",
    certifications: ["Computer Engineering Foundations", "Digital Systems Design"],
    courses: ["Digital Logic Design", "Computer Architecture", "Calculus & Engineering Mathematics", "Applied Physics", "Electronics Systems"],
  },
  {
    credential: "Full-Stack Web Development Certification",
    institution: "Tech Academy",
    location: "Nigeria",
    period: "2024 - 2025",
    description: "Comprehensive training in modern web engineering, spanning frontend frameworks, backend architecture, relational databases, and payment integration.",
    certifications: ["Certified Full Stack Developer (2025)", "Responsive Web Architecture"],
    courses: ["HTML5, CSS3 & Modern JavaScript", "PHP & MySQL Enterprise Systems", "React & Next.js Architecture", "Payment Gateway & API Integration", "Supabase & Cloud Services"],
  },
]

export const courses = [
  { name: "Full-Stack Web Development & Modern Architecture", platform: "Tech Academy", instructor: "Lead Instructor", year: "2025", url: "https://github.com/technikraft0-gif" },
  { name: "Next.js & React Full Mastery", platform: "Self-Guided & YouTube", instructor: "Engineering Community", year: "2024", url: "https://nextjs.org" },
  { name: "TypeScript & Scalable Backend Systems", platform: "Online Engineering Course", instructor: "Industry Mentors", year: "2024", url: "https://typescriptlang.org" },
]
