"use client"

import React, { useEffect, useState, useRef } from "react"
import { Award, BarChart3, CheckCircle, Clock, Download, Layout, Sparkles, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { profile } from "@/content"

export function Hero() {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const fullText =
    "const engineer = {\n  name: 'Ebube Udorie',\n  alias: 'Technikraft',\n  title: 'Full-Stack Engineer & App Developer',\n  studying: 'Computer Engineering @ University of Uyo',\n  experience: 'Springlight Technology (2025)',\n  stack: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],\n  mission: 'Engineering reliable digital products with high rigor'\n};"

  useEffect(() => {
    setIsMounted(true)

    const startTypingTimeout = setTimeout(() => {
      setIsTyping(true)
      let i = 0

      typingIntervalRef.current = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1))
          i++
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current)
          }
        }
      }, 35)
    }, 400)

    return () => {
      clearTimeout(startTypingTimeout)
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  const stats = [
    {
      title: "Engineering Rigor",
      value: "Production",
      icon: <BarChart3 className="w-7 h-7" />,
      color: "#F59E0B",
    },
    {
      title: "Real-World Projects",
      value: "12+",
      icon: <Layout className="w-7 h-7" />,
      color: "#10B981",
    },
    {
      title: "Client Satisfaction",
      value: "100%",
      icon: <Award className="w-7 h-7" />,
      color: "#3B82F6",
    },
  ]

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-64 bg-[#15191E] border border-[#232B33] rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Header & Code Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for remote roles & freelance projects</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Hi, I'm <span className="text-amber-500">Ebube Udorie</span>
          </h1>

          <div className="text-base sm:text-lg text-gray-300 font-mono">
            <span className="text-emerald-400">&lt;</span>
            <span className="text-amber-400 font-semibold">FullStackEngineer</span>
            <span className="text-gray-400"> brand=</span>
            <span className="text-amber-300">"Technikraft"</span>
            <span className="text-emerald-400"> /&gt;</span>
          </div>

          {/* Code Window Box */}
          <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#232B33] text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono text-gray-300">engineer-profile.ts</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                ACTIVE
              </span>
            </div>

            <pre className="font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60">
              <code>
                {(() => {
                  const highlight = (typed: string) => {
                    return typed
                      .replace(/\b(const|let|var)\b/g, '<span class="text-[#3B82F6] font-semibold">$1</span>')
                      .replace(/\b(name|alias|title|studying|experience|stack|mission)\b/g, '<span class="text-[#F59E0B]">$1</span>')
                      .replace(/('Ebube Udorie'|'Technikraft'|'Full-Stack Engineer & App Developer'|'Computer Engineering @ University of Uyo'|'Springlight Technology \(2025\)'|'Engineering reliable digital products with high rigor'|'TypeScript'|'React'|'Next\.js'|'FastAPI'|'PostgreSQL'|'Docker')/g, '<span class="text-[#10B981] font-medium">$1</span>')
                      .replace(/(engineer)/g, '<span class="text-[#8B5CF6] font-semibold">$1</span>')
                  }
                  return <span dangerouslySetInnerHTML={{ __html: highlight(text) }} />
                })()}
                {isTyping && <span className="inline-block w-2 h-4 bg-amber-500 ml-0.5 animate-pulse" />}
              </code>
            </pre>

            <div className="pt-4 border-t border-[#232B33] flex flex-wrap gap-3 items-center">
              <a
                href={profile.cv}
                download="Ebube_Udorie_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold font-mono transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>

              <a
                href={profile.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232B33] hover:bg-[#2D3640] text-gray-200 text-xs font-semibold font-mono transition-all"
              >
                <span>Connect on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Portrait Photo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 sm:w-72 md:w-80 aspect-4/5 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group">
            <Image
              src="/images/hero/ebube-hero-portrait.jpeg"
              alt="Ebube Udorie — Full-Stack Engineer"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1215] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  Technikraft
                </span>
              </div>
              <h2 className="text-lg font-bold">Ebube Udorie</h2>
              <p className="text-xs text-gray-300 font-mono">Full-Stack Engineer & App Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-5 rounded-xl border border-[#232B33] bg-[#15191E] flex flex-col items-center text-center hover:border-amber-500/30 transition-all shadow-md"
          >
            <div
              className="p-2.5 rounded-lg mb-3"
              style={{
                backgroundColor: `${stat.color}1A`,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 font-mono">{stat.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
