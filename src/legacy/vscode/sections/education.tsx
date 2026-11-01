"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronRight, GraduationCap, BookOpen, MessageSquare, Terminal } from "lucide-react"
import { profile } from "@/content"

export function Education() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    education: true,
    courses: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const education = [
    {
      degree: "B.Eng in Computer Engineering (200 Level)",
      institution: "University of Uyo",
      location: "Uyo, Akwa Ibom State, Nigeria",
      period: "2024 - Present",
      description:
        "Foundational training in computer systems, digital logic design, computer architecture, data structures, electronic circuits, and hardware-software co-design.",
      certifications: ["Computer Engineering Foundations", "Digital Systems Architecture"],
      courses: [
        "Digital Logic Design",
        "Computer Architecture",
        "Engineering Mathematics & Calculus",
        "Applied Physics & Circuit Theory",
        "Electronics Systems",
      ],
    },
    {
      degree: "Full-Stack Web Development Certification",
      institution: "Tech Academy",
      location: "Nigeria",
      period: "2024 - 2025",
      description:
        "Rigorous training in modern distributed software engineering, frontend component architectures, relational database modeling, RESTful APIs, and payment systems.",
      certifications: ["Certified Full Stack Developer", "Responsive Web Architecture"],
      courses: [
        "HTML5, Modern CSS & JavaScript (ESNext)",
        "PHP & MySQL Enterprise Systems",
        "React & Next.js Architecture",
        "Payment Gateway Integration (Paystack/Stripe)",
        "Supabase & Cloud Data Services",
      ],
    },
    {
      degree: "Self-Guided Engineering & Applied Projects",
      institution: "Independent & Open Source",
      location: "Online",
      period: "2023 - Present",
      description:
        "Self-guided mastery of modern web architecture, Python/FastAPI, Docker containerization, cloud deployment, and embedded microcontrollers.",
      certifications: ["Production Web Application Deployment"],
      courses: [
        "TypeScript & Scalable Backend Systems",
        "FastAPI & Modern Python Frameworks",
        "Docker Containerization & CI/CD",
        "Solid Modeling & CAD Integration",
      ],
    },
  ]

  const courses = [
    {
      name: "Next.js & React 19 Full Mastery",
      platform: "Engineering Community & YouTube",
      instructor: "Industry Specialists",
      completionDate: "2024 - 2025",
    },
    {
      name: "TypeScript: The Complete Production Guide",
      platform: "Online Engineering Workshops",
      instructor: "Senior Engineers",
      completionDate: "2024",
    },
    {
      name: "Enterprise Database Systems: PostgreSQL & MongoDB",
      platform: "Tech Academy",
      instructor: "Lead Database Engineer",
      completionDate: "2024",
    },
    {
      name: "FastAPI & Microservices Architecture",
      platform: "Self-Guided Deep Dive",
      instructor: "Open Source Ecosystem",
      completionDate: "2025",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono">
      <div>
        <div className="text-amber-500 text-xs uppercase tracking-wider mb-1">// Academic & Applied Learning</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Education & Credentials</h1>
        <p className="text-sm text-gray-400 mt-1">Foundations in computer engineering, modern web platforms, and continuous technical growth.</p>
      </div>

      <div className="space-y-6">
        {/* Formal Education */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden shadow-xl">
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            onClick={() => toggleSection("education")}
          >
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 text-amber-500 mr-2.5" />
              <span className="text-white font-bold text-sm">Formal Education & Academies</span>
            </div>
            {expandedSections.education ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.education && (
            <div className="p-4 sm:p-6 border-t border-[#232B33] space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#232B33]"></div>
                  <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-[#15191E]"></div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base">{edu.degree}</h3>
                      <div className="text-amber-400 text-xs mt-0.5">
                        {edu.institution} • <span className="text-gray-400">{edu.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-emerald-400 text-xs mt-1 sm:mt-0">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs leading-relaxed mb-3">{edu.description}</p>

                  <div className="mb-2">
                    <span className="text-gray-400 text-xs">Certifications / Focus: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {edu.certifications.map((cert, cIndex) => (
                        <span key={cIndex} className="bg-[#0F1215] text-amber-300 border border-[#232B33] px-2 py-0.5 rounded text-[11px]">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs">Key Coursework: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {edu.courses.map((course, crsIndex) => (
                        <span key={crsIndex} className="bg-[#0F1215] text-emerald-300 border border-[#232B33] px-2 py-0.5 rounded text-[11px]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specialized Courses */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden shadow-xl">
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            onClick={() => toggleSection("courses")}
          >
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-emerald-400 mr-2.5" />
              <span className="text-white font-bold text-sm">Specialized Technical Courses</span>
            </div>
            {expandedSections.courses ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.courses && (
            <div className="p-4 sm:p-6 border-t border-[#232B33]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-[#0F1215] border border-[#232B33] rounded-lg p-3.5 space-y-1.5">
                    <h4 className="text-white font-bold text-xs sm:text-sm">{course.name}</h4>
                    <div className="text-gray-400 text-xs">{course.platform}</div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-amber-400">
                      <span>{course.instructor}</span>
                      <span className="text-emerald-400">{course.completionDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-white font-bold text-sm">Questions regarding academic background or technical training?</div>
          <div className="text-gray-400 text-xs mt-0.5">Reach out directly to discuss qualifications and project requirements.</div>
        </div>
        <a
          href={profile.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
