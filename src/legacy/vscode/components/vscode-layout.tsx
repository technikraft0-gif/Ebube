"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  ChevronRight,
  FileCode,
  X,
  Code,
  Settings,
  Search,
  FileText,
  Mail,
  Briefcase,
  GraduationCap,
  Layers,
  MessageSquare,
  ImageIcon,
  Cpu,
  Menu,
  Terminal as TerminalIcon,
  Home,
  User,
  Wrench,
} from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/icons/brand"
import { cn } from "@/lib/utils"
import { profile } from "@/content"

interface VSCodeLayoutProps {
  children: React.ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
}

// VS Code themes
const themes = {
  "Technikraft Atelier (default)": {
    id: "technikraft-atelier",
    background: "#0F1215",
    foreground: "#E5E7EB",
    sidebarBackground: "#15191E",
    sidebarForeground: "#D1D5DB",
    activityBarBackground: "#0B0E11",
    activityBarForeground: "#F59E0B",
    tabActiveBackground: "#0F1215",
    tabInactiveBackground: "#181E25",
    statusBarBackground: "#D97706",
    statusBarForeground: "#FFFFFF",
    borderColor: "#232B33",
    accentBlue: "#3B82F6",
    accentGreen: "#10B981",
    accentOrange: "#F59E0B",
    accentPurple: "#8B5CF6",
  },
  "Dark+ (VS Code)": {
    id: "dark-plus",
    background: "#1E1E1E",
    foreground: "#D4D4D4",
    sidebarBackground: "#252526",
    sidebarForeground: "#CCCCCC",
    activityBarBackground: "#333333",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#1E1E1E",
    tabInactiveBackground: "#2D2D2D",
    statusBarBackground: "#007ACC",
    statusBarForeground: "#FFFFFF",
    borderColor: "#3C3C3C",
    accentBlue: "#569CD6",
    accentGreen: "#6A9955",
    accentOrange: "#CE9178",
    accentPurple: "#C586C0",
  },
  "Titanium Light": {
    id: "titanium-light",
    background: "#F7F6F2",
    foreground: "#14181B",
    sidebarBackground: "#EFECE6",
    sidebarForeground: "#2D343A",
    activityBarBackground: "#E3DFD5",
    activityBarForeground: "#14181B",
    tabActiveBackground: "#F7F6F2",
    tabInactiveBackground: "#E3DFD5",
    statusBarBackground: "#D97706",
    statusBarForeground: "#FFFFFF",
    borderColor: "#D8D4C8",
    accentBlue: "#1D4ED8",
    accentGreen: "#047857",
    accentOrange: "#B45309",
    accentPurple: "#6D28D9",
  },
  Monokai: {
    id: "monokai",
    background: "#272822",
    foreground: "#F8F8F2",
    sidebarBackground: "#2D2D2D",
    sidebarForeground: "#CCCCCC",
    activityBarBackground: "#333333",
    activityBarForeground: "#FFFFFF",
    tabActiveBackground: "#272822",
    tabInactiveBackground: "#3E3D32",
    statusBarBackground: "#D97706",
    statusBarForeground: "#FFFFFF",
    borderColor: "#3C3C3C",
    accentBlue: "#66D9EF",
    accentGreen: "#A6E22E",
    accentOrange: "#FD971F",
    accentPurple: "#AE81FF",
  },
  "Night Owl": {
    id: "night-owl",
    background: "#011627",
    foreground: "#D6DEEB",
    sidebarBackground: "#011627",
    sidebarForeground: "#D6DEEB",
    activityBarBackground: "#0B2942",
    activityBarForeground: "#D6DEEB",
    tabActiveBackground: "#0B2942",
    tabInactiveBackground: "#01111D",
    statusBarBackground: "#0B2942",
    statusBarForeground: "#D6DEEB",
    borderColor: "#122D42",
    accentBlue: "#82AAFF",
    accentGreen: "#22DA6E",
    accentOrange: "#F78C6C",
    accentPurple: "#C792EA",
  },
}

export function VSCodeLayout({ children, activeSection, setActiveSection }: VSCodeLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<string>("Technikraft Atelier (default)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMaximized, setIsMaximized] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const defaultTheme = themes["Technikraft Atelier (default)"]
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    setTheme(themes[currentTheme as keyof typeof themes] || defaultTheme)
  }, [currentTheme, defaultTheme])

  useEffect(() => {
    setIsMounted(true)

    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      if (isMobileView) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev)
  }, [])

  const sections = [
    { id: "Home.jsx", label: "Home.tsx", icon: <FileCode className="w-4 h-4 text-amber-500" /> },
    { id: "AboutMe.jsx", label: "AboutEbube.tsx", icon: <FileCode className="w-4 h-4 text-emerald-400" /> },
    { id: "Skills.jsx", label: "TechStack.tsx", icon: <FileCode className="w-4 h-4 text-blue-400" /> },
    { id: "Services.jsx", label: "Services.tsx", icon: <FileCode className="w-4 h-4 text-violet-400" /> },
    { id: "Education.jsx", label: "Education.tsx", icon: <FileCode className="w-4 h-4 text-cyan-400" /> },
    { id: "Projects.jsx", label: "Projects.tsx", icon: <FileCode className="w-4 h-4 text-amber-400" /> },
    { id: "Gallery.jsx", label: "Gallery.tsx", icon: <FileCode className="w-4 h-4 text-rose-400" /> },
    { id: "Contact.jsx", label: "Contact.tsx", icon: <FileCode className="w-4 h-4 text-emerald-300" /> },
  ]

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, url: profile.links.github, label: "GitHub" },
    { icon: <Twitter className="w-4 h-4" />, url: profile.links.x, label: "X (Twitter)" },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      url: profile.links.whatsapp,
      label: "WhatsApp",
    },
    { icon: <Mail className="w-4 h-4" />, url: `mailto:${profile.email}`, label: "Email" },
  ]

  // Dropdown state for switching views
  const [openDropdown, setOpenDropdown] = React.useState(false)
  const [userType, setUserType] = React.useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("portfolioUserType") || "developer" : "developer"
  )

  const handleSwitch = (type: string) => {
    setUserType(type)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioUserType", type)
      window.location.reload()
    }
  }

  const handleSelectSection = (id: string) => {
    setActiveSection(id)
    setIsMobileDrawerOpen(false)
  }

  // Server-side rendering fallback
  if (!isMounted) {
    return (
      <div className="h-screen w-full bg-[#0F1215] text-[#E5E7EB] flex flex-col font-mono text-sm">
        <div className="flex items-center justify-between h-9 px-3 border-b border-[#232B33] bg-[#0B0E11]">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2 mr-3">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <span className="text-xs text-amber-500 font-medium">Technikraft Studio — Ebube Udorie</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden p-4 bg-[#0F1215]">{children}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen font-mono text-sm transition-colors duration-200 select-none",
        isMaximized
          ? "fixed inset-0 z-50"
          : "border border-[#232B33] rounded-xl shadow-2xl mx-auto my-4 max-w-[1280px] h-[100vh] overflow-hidden"
      )}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
      }}
    >
      {/* Window Controls Bar */}
      <div
        className="flex items-center justify-between h-10 px-3 border-b shrink-0 transition-colors"
        style={{ borderColor: theme.borderColor, backgroundColor: theme.activityBarBackground }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity" title="Close" />
            <button
              className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity"
              onClick={toggleMaximize}
              title="Maximize / Restore"
            />
            <button className="w-3 h-3 rounded-full bg-[#27C93F] hover:opacity-80 transition-opacity" title="Minimize" />
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide" style={{ color: theme.accentOrange }}>
              Technikraft Studio
            </span>
            <span className="text-xs opacity-50 hidden md:inline">• Ebube Udorie</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theme selector */}
          <select
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            className="text-xs px-2 py-1 rounded focus:outline-hidden border transition-colors cursor-pointer"
            style={{
              backgroundColor: theme.sidebarBackground,
              borderColor: theme.borderColor,
              color: theme.foreground,
            }}
          >
            {Object.keys(themes).map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>

          {/* View switcher */}
          <div className="relative">
            <button
              className="px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 focus:outline-hidden transition-all shadow-xs"
              style={{
                backgroundColor: theme.accentOrange,
                color: "#FFFFFF",
              }}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <span>{userType === "developer" ? "Dev View" : "Client View"}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown && (
              <div
                className="absolute right-0 mt-1 w-36 border shadow-xl rounded-md z-50 overflow-hidden py-1"
                style={{
                  backgroundColor: theme.sidebarBackground,
                  borderColor: theme.borderColor,
                }}
              >
                <button
                  className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    userType === "client" ? "bg-amber-500 text-white font-semibold" : "hover:bg-white/10"
                  }`}
                  onClick={() => {
                    handleSwitch("client")
                    setOpenDropdown(false)
                  }}
                >
                  Client View
                </button>
                <button
                  className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    userType === "developer" ? "bg-amber-500 text-white font-semibold" : "hover:bg-white/10"
                  }`}
                  onClick={() => {
                    handleSwitch("developer")
                    setOpenDropdown(false)
                  }}
                >
                  Developer View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Activity Bar (Desktop) */}
        <div
          className="w-12 shrink-0 hidden md:flex flex-col items-center py-3 border-r transition-colors"
          style={{ backgroundColor: theme.activityBarBackground, borderColor: theme.borderColor }}
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2.5 rounded mb-2 transition-all hover:bg-white/10",
              isSidebarOpen && "border-l-2"
            )}
            style={{
              borderColor: theme.accentOrange,
              color: isSidebarOpen ? theme.accentOrange : theme.activityBarForeground,
            }}
            title="Explorer"
          >
            <FileText className="w-5 h-5" />
          </button>

          <button
            className="p-2.5 rounded mb-2 hover:bg-white/10 transition-colors"
            title="Projects"
            onClick={() => setActiveSection("Projects.jsx")}
            style={{ color: activeSection === "Projects.jsx" ? theme.accentOrange : theme.activityBarForeground }}
          >
            <Briefcase className="w-5 h-5" />
          </button>

          <button
            className="p-2.5 rounded mb-2 hover:bg-white/10 transition-colors"
            title="Services"
            onClick={() => setActiveSection("Services.jsx")}
            style={{ color: activeSection === "Services.jsx" ? theme.accentOrange : theme.activityBarForeground }}
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            className="p-2.5 rounded mb-2 hover:bg-white/10 transition-colors"
            title="Education"
            onClick={() => setActiveSection("Education.jsx")}
            style={{ color: activeSection === "Education.jsx" ? theme.accentOrange : theme.activityBarForeground }}
          >
            <GraduationCap className="w-5 h-5" />
          </button>

          <button
            className="p-2.5 rounded mb-2 hover:bg-white/10 transition-colors"
            title="Gallery"
            onClick={() => setActiveSection("Gallery.jsx")}
            style={{ color: activeSection === "Gallery.jsx" ? theme.accentOrange : theme.activityBarForeground }}
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <div className="mt-auto flex flex-col items-center space-y-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:bg-white/15 transition-colors opacity-75 hover:opacity-100"
                title={link.label}
              >
                {React.cloneElement(link.icon, {
                  className: "w-4 h-4",
                  style: { color: theme.activityBarForeground },
                })}
              </a>
            ))}
          </div>
        </div>

        {/* Sidebar (Desktop) */}
        {isSidebarOpen && (
          <div
            className="w-60 border-r shrink-0 hidden md:flex flex-col transition-colors"
            style={{ backgroundColor: theme.sidebarBackground, borderColor: theme.borderColor }}
          >
            <div
              className="p-3 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between"
              style={{ color: theme.sidebarForeground }}
            >
              <span>Explorer</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">
                EBUBE-UDORIE
              </span>
            </div>

            <div className="p-2">
              <div
                className="flex items-center mb-1.5 text-xs font-semibold px-2 py-1 rounded"
                style={{ color: theme.sidebarForeground }}
              >
                <ChevronRight className="w-3.5 h-3.5 mr-1" />
                <span className="tracking-wide">SRC / PORTFOLIO</span>
              </div>

              <ul className="space-y-1 pl-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center space-x-2 px-2.5 py-1.5 rounded text-left transition-colors text-xs",
                        activeSection === section.id
                          ? "bg-amber-500/20 text-white font-medium border-l-2 border-amber-500"
                          : "hover:bg-white/5 opacity-80 hover:opacity-100"
                      )}
                      style={{
                        color: activeSection === section.id ? "#FFFFFF" : theme.sidebarForeground,
                      }}
                    >
                      {section.icon}
                      <span className="truncate">{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto p-3 border-t" style={{ borderColor: theme.borderColor }}>
              <div
                className="flex items-center mb-2 text-xs font-semibold"
                style={{ color: theme.sidebarForeground }}
              >
                <ChevronRight className="w-3.5 h-3.5 mr-1" />
                <span>CONNECT</span>
              </div>

              <ul className="space-y-1 pl-2">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-2 py-1 rounded text-xs hover:bg-white/10 transition-colors"
                      style={{ color: theme.sidebarForeground }}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Mobile Slide-over Drawer */}
        {isMobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <div
              className="relative w-4/5 max-w-xs h-full flex flex-col p-4 z-50 shadow-2xl animate-in slide-in-from-left duration-200"
              style={{
                backgroundColor: theme.sidebarBackground,
                borderColor: theme.borderColor,
                color: theme.foreground,
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b mb-3" style={{ borderColor: theme.borderColor }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-bold text-xs uppercase tracking-wider">Project Files</span>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 rounded hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-semibold text-amber-500 mb-2 uppercase tracking-wide">
                Ebube Udorie • Technikraft
              </div>

              <ul className="space-y-1.5 flex-1 overflow-y-auto">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleSelectSection(section.id)}
                      className={cn(
                        "w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-left text-xs transition-all",
                        activeSection === section.id
                          ? "bg-amber-500 text-white font-semibold shadow-md"
                          : "hover:bg-white/10 opacity-90"
                      )}
                    >
                      {section.icon}
                      <span className="truncate">{section.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t mt-auto space-y-2" style={{ borderColor: theme.borderColor }}>
                <div className="text-[10px] uppercase font-semibold text-gray-400">Direct Links</div>
                <div className="grid grid-cols-5 gap-1 py-1">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                      title={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 pb-16 md:pb-0">
          {/* Tabs bar */}
          <div
            className="flex items-center h-10 border-b overflow-x-auto scrollbar-none shrink-0"
            style={{ borderColor: theme.borderColor, backgroundColor: theme.tabInactiveBackground }}
          >
            {/* Mobile drawer toggle pill inside tabs bar */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden flex items-center gap-1.5 h-full px-3 border-r bg-amber-500 text-white text-xs font-semibold shrink-0"
              style={{ borderColor: theme.borderColor }}
              title="Open File Explorer"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Files</span>
            </button>

            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "h-full px-3.5 py-1.5 flex items-center space-x-2 border-r shrink-0 text-xs transition-all",
                  activeSection === section.id
                    ? "font-semibold border-t-2"
                    : "opacity-70 hover:opacity-100 hover:bg-white/5"
                )}
                style={{
                  borderRightColor: theme.borderColor,
                  borderTopColor: activeSection === section.id ? theme.accentOrange : "transparent",
                  backgroundColor:
                    activeSection === section.id ? theme.tabActiveBackground : "transparent",
                  color: activeSection === section.id ? theme.foreground : theme.sidebarForeground,
                }}
              >
                {section.icon}
                <span>{section.label}</span>
                {activeSection === section.id && (
                  <X className="w-3 h-3 ml-2 opacity-50 hover:opacity-100" />
                )}
              </button>
            ))}
          </div>

          {/* Editor Workspace */}
          <div
            className="flex-1 overflow-auto p-4 sm:p-6"
            style={{ backgroundColor: theme.background }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (App-like IDE Dock) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 h-14 border-t z-30 flex items-center justify-around px-2 shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: `${theme.activityBarBackground}F2`,
          borderColor: theme.borderColor,
        }}
      >
        <button
          onClick={() => setActiveSection("Home.jsx")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] transition-all",
            activeSection === "Home.jsx" ? "text-amber-500 font-bold scale-105" : "text-gray-400 opacity-80"
          )}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveSection("AboutMe.jsx")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] transition-all",
            activeSection === "AboutMe.jsx" ? "text-amber-500 font-bold scale-105" : "text-gray-400 opacity-80"
          )}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>About</span>
        </button>

        <button
          onClick={() => setActiveSection("Skills.jsx")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] transition-all",
            activeSection === "Skills.jsx" ? "text-amber-500 font-bold scale-105" : "text-gray-400 opacity-80"
          )}
        >
          <Cpu className="w-4 h-4 mb-0.5" />
          <span>Skills</span>
        </button>

        <button
          onClick={() => setActiveSection("Projects.jsx")}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] transition-all",
            activeSection === "Projects.jsx" ? "text-amber-500 font-bold scale-105" : "text-gray-400 opacity-80"
          )}
        >
          <Briefcase className="w-4 h-4 mb-0.5" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] text-amber-400 bg-amber-500/15"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>Explorer</span>
        </button>
      </div>

      {/* Desktop Status Bar */}
      <div
        className="hidden md:flex items-center justify-between h-6 px-3 text-[11px] shrink-0 font-medium"
        style={{ backgroundColor: theme.statusBarBackground, color: theme.statusBarForeground }}
      >
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            main
          </span>
          <span>•</span>
          <span>TypeScript JSX (React 19)</span>
          <span>•</span>
          <span>Ebube Udorie @ Technikraft</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>Uyo, NG (WAT UTC+1)</span>
        </div>
      </div>
    </div>
  )
}
