export type SkillGroup = { name: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  { name: "Frontend & Mobile", skills: ["TypeScript", "Next.js", "React", "Flutter", "Dart", "Tailwind CSS", "Material UI", "JavaScript", "HTML5", "CSS3"] },
  { name: "Backend & Systems", skills: ["Node.js", "Express", "C++", "FastAPI", "Python", "PHP", "Laravel", "REST APIs", "C"] },
  { name: "Databases & Cloud", skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Redis", "Docker", "AWS", "Vercel", "Netlify", "Firebase"] },
  { name: "Solutions & Architecture", skills: ["System Architecture", "AI Integration", "Payment Systems", "Custom Dashboards", "UI/UX Implementation", "Git"] },
]

export const allSkills = skillGroups.flatMap((group) => group.skills)

export const skillIcons: Record<string, string> = {
  React: "color/react-native",
  "Next.js": "fluency/nextjs",
  TypeScript: "color/typescript",
  JavaScript: "color/javascript",
  Flutter: "color/flutter",
  Dart: "color/dart",
  HTML: "color/html-5--v1",
  HTML5: "color/html-5--v1",
  CSS: "color/css3",
  CSS3: "color/css3",
  "Tailwind CSS": "color/tailwindcss",
  "Material UI": "color/material-ui",
  "Node.js": "color/nodejs",
  Express: "ios-filled/express-js",
  MongoDB: "color/mongodb",
  PostgreSQL: "color/postgreesql",
  MySQL: "color/mysql-logo",
  Supabase: "color/supabase",
  Firebase: "color/firebase",
  Laravel: "color/laravel",
  Git: "color/git",
  Vercel: "ios-filled/vercel",
  Netlify: "color/netlify",
  "Google Cloud": "color/google-cloud",
  Figma: "color/figma--v1",
  Cloudinary: "color/cloudinary",
  Docker: "color/docker",
  AWS: "color/amazon-web-services",
  Redis: "color/redis",
  Python: "color/python",
  Rust: "color/rust-programming-language",
  C: "color/c-programming",
  "C++": "color/c-plus-plus-logo",
  FastAPI: "color/fastapi",
}
