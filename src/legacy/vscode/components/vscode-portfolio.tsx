"use client"

import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { VSCodeLayout } from "./vscode-layout"
import { LoadingPlaceholder } from "./loading-placeholder"
import { Modal } from "./modal"
import ClientPortfolio from "./client-portfolio"
import { projects } from "@/content"
import { Code, Briefcase, Sparkles } from "lucide-react"

// Import components with SSR enabled but with loading states
const Hero = dynamic(() => import("../sections/hero").then((mod) => mod.Hero), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const About = dynamic(() => import("../sections/about").then((mod) => mod.About), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Skills = dynamic(() => import("../sections/skills").then((mod) => mod.Skills), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Services = dynamic(() => import("../sections/services").then((mod) => mod.Services), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Education = dynamic(() => import("../sections/education").then((mod) => mod.Education), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Projects = dynamic(() => import("../sections/projects").then((mod) => mod.Projects), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const ImageGallery = dynamic(() => import("../sections/image-gallery").then((mod) => mod.ImageGallery), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

const Contact = dynamic(() => import("../sections/contact").then((mod) => mod.Contact), {
  loading: () => <LoadingPlaceholder height="600px" />,
})

interface VSCodePortfolioProps {
  initialSection?: string
}

export function VSCodePortfolio({ initialSection = "Home.jsx" }: VSCodePortfolioProps) {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isMounted, setIsMounted] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const galleryImages = projects.map((project) => ({
    src: project.image,
    alt: `${project.title} screenshot`,
    caption: project.title,
  }))

  useEffect(() => {
    setIsMounted(true)
    const storedType = typeof window !== "undefined" ? localStorage.getItem("portfolioUserType") : null
    if (storedType) {
      setUserType(storedType)
    } else {
      setShowModal(true)
    }
  }, [])

  const handleUserType = (type: string) => {
    setUserType(type)
    localStorage.setItem("portfolioUserType", type)
    setShowModal(false)
  }

  if (!isMounted) {
    return (
      <div className="h-screen w-full bg-[#0F1215] flex items-center justify-center">
        <div className="text-white text-center space-y-3 font-mono">
          <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-sm font-semibold tracking-wide text-gray-300">Initializing Technikraft Studio...</div>
        </div>
      </div>
    )
  }

  if (showModal) {
    return (
      <Modal>
        <div className="p-6 sm:p-8 bg-[#15191E] border border-[#232B33] rounded-2xl text-center max-w-md w-full shadow-2xl font-mono">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs mb-4 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technikraft Experience</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
            Welcome to Ebube Udorie's Space
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 font-sans">
            Choose how you would like to explore this portfolio:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => handleUserType("developer")}
              className="p-4 rounded-xl bg-[#0F1215] border border-[#232B33] hover:border-amber-500 hover:bg-amber-500/10 transition-all text-left group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 text-amber-500 group-hover:scale-105 transition-transform">
                <Code className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Dev View</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">
                Interactive VS Code IDE with code files, tabs, terminal, and syntax themes.
              </p>
            </button>

            <button
              onClick={() => handleUserType("client")}
              className="p-4 rounded-xl bg-[#0F1215] border border-[#232B33] hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 text-emerald-400 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Client View</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">
                Clean, business-focused showcase with case studies, testimonials, and services.
              </p>
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  if (userType === "client") {
    return <ClientPortfolio />
  }

  return (
    <VSCodeLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      <Suspense fallback={<LoadingPlaceholder height="600px" />}>
        {activeSection === "Home.jsx" && <Hero />}
        {activeSection === "AboutMe.jsx" && <About />}
        {activeSection === "Skills.jsx" && <Skills />}
        {activeSection === "Services.jsx" && <Services setActiveSection={setActiveSection} />}
        {activeSection === "Education.jsx" && <Education />}
        {activeSection === "Projects.jsx" && <Projects />}
        {activeSection === "Gallery.jsx" && <ImageGallery images={galleryImages} />}
        {activeSection === "Contact.jsx" && <Contact />}
      </Suspense>
    </VSCodeLayout>
  )
}
