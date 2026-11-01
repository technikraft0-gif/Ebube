"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MessageSquare,
  Users,
  Code,
  Palette,
  Smartphone,
  Search,
  ShoppingCart,
  Wrench,
  Type,
  Terminal,
  Database,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/icons/brand"
import Image from "next/image"
import Link from "next/link"
import { sendContactMessage } from "@/lib/contact"
import { profile, projects, education, site } from "@/content"

export default function ClientPortfolio() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] font-sans text-[#14181B] selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <ProcessSection />
        <EducationSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [userType, setUserType] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("portfolioUserType") || "client" : "client"
  )

  const handleSwitch = (type: string) => {
    setUserType(type)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioUserType", type)
      window.location.reload()
    }
  }

  const navLinks = ["Home", "About", "Services", "Skills", "Projects", "Process", "Contact"]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E3DFD5] shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-3.5">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#14181B] p-2 flex items-center justify-center border border-[#232B33] shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-bold text-amber-500 font-mono text-sm">EU</span>
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-[#14181B] block">Ebube Udorie</span>
              <span className="text-[11px] text-[#5A646E] font-mono block">Technikraft • Studio</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#5A646E] hover:text-[#D97706] transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* View Switcher Dropdown */}
            <div className="relative hidden sm:block">
              <button
                className="px-3.5 py-1.5 bg-[#14181B] text-white hover:bg-[#2D343A] rounded-full text-xs font-medium shadow-xs transition-all flex items-center gap-2 border border-[#2D343A]"
                onClick={() => setOpen((prev) => !prev)}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{userType === "developer" ? "Developer View" : "Client View"}</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-[#FFFFFF] border border-[#E3DFD5] rounded-xl shadow-xl z-50 overflow-hidden py-1">
                  <button
                    className={`block w-full text-left px-4 py-2.5 text-xs transition-colors ${
                      userType === "client" ? "bg-amber-500/10 text-[#D97706] font-bold" : "text-[#5A646E] hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      handleSwitch("client")
                      setOpen(false)
                    }}
                  >
                    Client View (Overview)
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2.5 text-xs transition-colors ${
                      userType === "developer" ? "bg-amber-500/10 text-[#D97706] font-bold" : "text-[#5A646E] hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      handleSwitch("developer")
                      setOpen(false)
                    }}
                  >
                    Developer View (VS Code)
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#14181B] bg-white border border-[#E3DFD5] rounded-xl p-2 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenu((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenu && (
          <div className="md:hidden mt-3 bg-white rounded-2xl border border-[#E3DFD5] p-4 shadow-xl space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#5A646E] hover:text-[#14181B] hover:bg-[#F7F6F2] transition-colors"
                  onClick={() => setMobileMenu(false)}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#E3DFD5] space-y-2">
              <span className="text-[11px] font-semibold text-[#5A646E] uppercase tracking-wider block px-1">
                Display Mode
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                    userType === "client" ? "bg-[#D97706] text-white" : "bg-[#F7F6F2] text-[#5A646E]"
                  }`}
                  onClick={() => {
                    handleSwitch("client")
                    setMobileMenu(false)
                  }}
                >
                  Client View
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                    userType === "developer" ? "bg-[#D97706] text-white" : "bg-[#F7F6F2] text-[#5A646E]"
                  }`}
                  onClick={() => {
                    handleSwitch("developer")
                    setMobileMenu(false)
                  }}
                >
                  Dev View (IDE)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#D97706] text-xs font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Engineer & App Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14181B] leading-tight">
              Building dependable digital products with{" "}
              <span className="text-[#D97706] underline decoration-amber-500/30 underline-offset-8">
                engineering rigor.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5A646E] leading-relaxed max-w-2xl">
              I am Ebube Udorie (Technikraft), based in Uyo, Nigeria. I engineer production-grade web applications,
              custom enterprise management dashboards, SaaS systems, and reliable API services for forward-thinking brands and businesses.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#14181B] hover:bg-[#2D343A] shadow-md hover:shadow-lg transition-all gap-2"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3.5 rounded-full text-sm font-semibold text-[#14181B] bg-white border border-[#E3DFD5] hover:bg-gray-50 shadow-xs transition-all gap-2"
              >
                <span>Discuss a Project</span>
              </a>

              <a
                href={profile.cv}
                download="Ebube_Udorie_CV.pdf"
                className="inline-flex items-center px-5 py-3.5 rounded-full text-sm font-semibold text-[#D97706] bg-amber-500/10 hover:bg-amber-500/20 transition-all gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-sm aspect-4/5 rounded-3xl overflow-hidden border-4 border-white shadow-2xl group">
              <Image
                src="/images/hero/ebube-hero-portrait.jpeg"
                alt="Ebube Udorie"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181B]/90 via-[#14181B]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs uppercase font-mono tracking-wider text-emerald-300 font-semibold">
                    Available for Work
                  </span>
                </div>
                <h3 className="text-xl font-bold">Ebube Udorie</h3>
                <p className="text-xs text-gray-300 font-mono">Computer Engineering @ UNIUYO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: "12+", label: "Completed Projects", detail: "Web apps, dashboards & APIs" },
    { value: "100%", label: "Client Satisfaction", detail: "On-time delivery & clear communication" },
    { value: "Production", label: "Engineering Standard", detail: "TypeScript, PostgreSQL & Docker" },
    { value: "WAT (UTC+1)", label: "Timezone Overlap", detail: "Seamless European & global collaboration" },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFD5] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] tracking-tight">{stat.value}</div>
                <div className="text-sm font-bold text-[#14181B]">{stat.label}</div>
                <div className="text-xs text-[#5A646E]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <Image src="/images/me2.jpeg" alt="Ebube Udorie" fill className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider block mb-1">
                Behind the Code
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
                About Ebube Udorie
              </h2>
            </div>

            <p className="text-base text-[#5A646E] leading-relaxed">
              I began my engineering journey driven by a fascination with how robust digital systems operate under real-world constraints. Today, pursuing my Computer Engineering degree at the University of Uyo, I bridge foundational theory with practical product execution.
            </p>

            <p className="text-base text-[#5A646E] leading-relaxed">
              During my engineering work at Springlight Technology, I built custom e-commerce management platforms that handled sales, multi-warehouse inventory, and automated analytics. Whether designing reactive interfaces in React and Tailwind or structuring ACID-compliant databases in PostgreSQL, I focus on software that performs predictably and delivers business value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E3DFD5] space-y-1">
                <div className="font-bold text-sm text-[#14181B]">Full-Stack Ownership</div>
                <p className="text-xs text-[#5A646E]">
                  From UI mockups and database modeling to cloud deployment and API security.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3DFD5] space-y-1">
                <div className="font-bold text-sm text-[#14181B]">Scalable Architecture</div>
                <p className="text-xs text-[#5A646E]">
                  TypeScript, typed API contracts, caching layers, and containerized workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-6 h-6 text-[#D97706]" />,
      title: "Web Application Development",
      description: "Custom, interactive, and high-performance web applications built with Next.js, React, and TypeScript.",
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-[#10B981]" />,
      title: "E-Commerce & Management Dashboards",
      description: "Comprehensive retail management software with sales tracking, inventory control, and multi-branch metrics.",
    },
    {
      icon: <Database className="w-6 h-6 text-[#3B82F6]" />,
      title: "Backend & API Architecture",
      description: "Resilient server-side solutions using FastAPI, Node.js, PHP/Laravel, and relational databases.",
    },
    {
      icon: <Palette className="w-6 h-6 text-[#8B5CF6]" />,
      title: "UI/UX & Interactive Design",
      description: "Crafting intuitive, responsive design systems using Tailwind CSS and modern component libraries.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#F59E0B]" />,
      title: "Developer Tools & Cloud Deployments",
      description: "Browser IDE tooling, Docker containerization, and zero-downtime deployment setups.",
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#D97706]" />,
      title: "Maintenance, Security & Scaling",
      description: "Auditing existing systems, tuning database queries, securing API endpoints, and refactoring legacy code.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white border-y border-[#E3DFD5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
            Services & Solutions
          </h2>
          <p className="text-sm text-[#5A646E]">
            End-to-end software development services tailored for founders, businesses, and growing companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-7 rounded-3xl bg-[#F7F6F2] border border-[#E3DFD5] hover:border-amber-500/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E3DFD5] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#14181B] mb-2 group-hover:text-[#D97706] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A646E] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const stackCategories = [
    {
      category: "Frontend & Interfaces",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "HTML5/CSS3"],
    },
    {
      category: "Backend & Systems",
      skills: ["Python", "FastAPI", "Node.js", "Express.js", "PHP", "Laravel", "C/C++", "Rust"],
    },
    {
      category: "Databases & Cloud",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Redis", "Docker", "AWS", "Vercel"],
    },
    {
      category: "Specialized Engineering",
      skills: ["RESTful APIs", "Payment Gateways", "Webhooks", "Embedded Systems", "CAD & Solid Modeling", "Git"],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
            Tools & Technologies
          </h2>
          <p className="text-sm text-[#5A646E]">
            A proven stack chosen for dependability, maintainability, and rapid product velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackCategories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E3DFD5] shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#14181B] pb-2 border-b border-[#E3DFD5] font-mono">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-[#F7F6F2] border border-[#E3DFD5] text-xs font-medium text-[#14181B]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white border-y border-[#E3DFD5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-sm text-[#5A646E] max-w-md">
            Real products built to solve commercial and technical problems, from business software to developer tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-[#F7F6F2] rounded-3xl overflow-hidden border border-[#E3DFD5] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.live && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live In Production</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono text-[#D97706] font-semibold uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#14181B] group-hover:text-[#D97706] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A646E] line-clamp-3 leading-relaxed">
                    {project.summary || project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E3DFD5] text-[11px] text-[#5A646E]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E3DFD5]/60 mt-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:underline"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-[#5A646E] font-mono">Case study documented</span>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5A646E] hover:text-[#14181B] transition-colors"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Requirements",
      desc: "Defining clear business objectives, target audience, key workflows, and technical constraints.",
    },
    {
      num: "02",
      title: "Architecture & Wireframing",
      desc: "Modeling database schemas, outlining API contracts, and establishing intuitive user journeys.",
    },
    {
      num: "03",
      title: "Iterative Build",
      desc: "Shipping functional increments with regular client previews and strict type safety.",
    },
    {
      num: "04",
      title: "Launch & Ongoing Support",
      desc: "Stress-testing, deploying to high-availability infrastructure, and continuous maintenance.",
    },
  ]

  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
            A Clear Path from Idea to Launch
          </h2>
          <p className="text-sm text-[#5A646E]">
            Every project follows a disciplined engineering workflow to eliminate surprises and guarantee on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E3DFD5] shadow-xs space-y-3 relative">
              <span className="text-3xl font-extrabold text-[#D97706]/30 font-mono block">{step.num}</span>
              <h3 className="font-bold text-base text-[#14181B]">{step.title}</h3>
              <p className="text-xs text-[#5A646E] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="py-20 bg-white border-y border-[#E3DFD5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
              Qualifications
            </span>
            <h2 className="text-3xl font-extrabold text-[#14181B]">Education & Training</h2>
          </div>

          <div className="space-y-6">
            {education.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#F7F6F2] border border-[#E3DFD5] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-bold text-base text-[#14181B]">{item.credential}</h3>
                  <span className="text-xs font-mono text-[#D97706] font-semibold">{item.period}</span>
                </div>
                <div className="text-xs text-[#5A646E] font-medium">
                  {item.institution} • {item.location}
                </div>
                <p className="text-xs text-[#5A646E] leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.courses.map((crs, cIdx) => (
                    <span key={cIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#E3DFD5] text-[11px] text-[#5A646E]">
                      {crs}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const response = await sendContactMessage(formData)
      setStatus(response || "Thank you! Your message has been sent successfully.")
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Something went wrong. Please reach out via WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider block mb-1">
                Let's Connect
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14181B] tracking-tight">
                Start a Conversation
              </h2>
            </div>

            <p className="text-base text-[#5A646E] leading-relaxed">
              Whether you need a custom e-commerce management system, a full-stack web application, or an experienced engineer to join your project, I am ready to collaborate.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={profile.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-[#E3DFD5] hover:border-emerald-500/50 flex items-center gap-4 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-emerald-600 uppercase">Instant Message</div>
                  <div className="font-bold text-[#14181B]">WhatsApp Direct</div>
                  <div className="text-xs text-[#5A646E]">{profile.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-2xl bg-white border border-[#E3DFD5] hover:border-amber-500/50 flex items-center gap-4 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#D97706] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-[#D97706] uppercase">Email Inquiries</div>
                  <div className="font-bold text-[#14181B]">{profile.email}</div>
                  <div className="text-xs text-[#5A646E]">Replies within 24 hours</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DFD5] shadow-lg">
            <h3 className="text-lg font-bold text-[#14181B] mb-4">Send a Direct Message</h3>

            {status && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-[#14181B] font-medium mb-4">
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14181B] mb-1.5 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Samuel Okon"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2] border border-[#E3DFD5] text-sm text-[#14181B] focus:outline-hidden focus:border-[#D97706] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14181B] mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="samuel@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2] border border-[#E3DFD5] text-sm text-[#14181B] focus:outline-hidden focus:border-[#D97706] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14181B] mb-1.5 uppercase tracking-wide">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your product requirements, desired timeline, and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F6F2] border border-[#E3DFD5] text-sm text-[#14181B] focus:outline-hidden focus:border-[#D97706] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#14181B] hover:bg-[#2D343A] disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: "What types of software projects do you take on?",
      a: "I specialize in custom business management platforms (sales, inventory, reporting), SaaS products, modern corporate web applications, and backend APIs with payment integration.",
    },
    {
      q: "What is your typical turnaround time?",
      a: "A marketing website or client portal usually spans 2 to 4 weeks. A full custom SaaS MVP or management platform with payments typically takes 6 to 10 weeks depending on complexity.",
    },
    {
      q: "How do we handle communication and time zones?",
      a: "I work on West Africa Time (WAT, UTC+1), which has a strong overlap with European working hours and convenient check-in windows for North American clients. I communicate via WhatsApp, Slack, email, and weekly video demos.",
    },
    {
      q: "Do you offer post-launch support?",
      a: "Yes. Every project includes post-launch testing, documentation transfer, and maintenance retainers for continuous feature delivery and security updates.",
    },
  ]

  return (
    <section className="py-20 bg-white border-t border-[#E3DFD5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#D97706] uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#14181B]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F7F6F2] border border-[#E3DFD5] space-y-2">
                <h3 className="font-bold text-base text-[#14181B]">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-[#5A646E] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#14181B] text-white py-12 border-t border-[#232B33]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#232B33]">
          <div>
            <div className="font-bold text-lg text-white">Ebube Udorie</div>
            <div className="text-xs text-gray-400 font-mono">Technikraft • Full-Stack Engineer</div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#232B33] text-gray-300 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#232B33] text-gray-300 hover:text-white transition-colors"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>© {new Date().getFullYear()} Ebube Udorie. All rights reserved.</div>
          <div>Uyo, Akwa Ibom State, Nigeria</div>
        </div>
      </div>
    </footer>
  )
}
