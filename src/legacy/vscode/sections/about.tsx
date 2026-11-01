"use client"

import Image from "next/image"
import { profile } from "@/content"
import { Code, CheckCircle, Award, Terminal } from "lucide-react"

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">// Profile & Background</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">About Ebube Udorie</h1>
        <p className="text-sm text-gray-400 font-mono mt-1">Full-Stack Engineer, App Developer & Technikraft Founder</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Definition Box */}
        <div className="lg:col-span-7 bg-[#15191E] border border-[#232B33] rounded-xl p-4 sm:p-5 shadow-xl font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#232B33] text-gray-400 text-xs">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>ebube-engineer.json</span>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed text-gray-300 overflow-x-auto">
            <code>
              <span className="text-[#3B82F6]">const</span> <span className="text-[#8B5CF6]">aboutEbube</span> = {"{\n"}
              {"  "}<span className="text-[#F59E0B]">name</span>: <span className="text-[#10B981]">"Ebube Udorie"</span>,{"\n"}
              {"  "}<span className="text-[#F59E0B]">alias</span>: <span className="text-[#10B981]">"Technikraft"</span>,{"\n"}
              {"  "}<span className="text-[#F59E0B]">role</span>: <span className="text-[#10B981]">"Full-Stack Engineer & App Developer"</span>,{"\n"}
              {"  "}<span className="text-[#F59E0B]">location</span>: <span className="text-[#10B981]">"Uyo, Akwa Ibom State, Nigeria"</span>,{"\n"}
              {"  "}<span className="text-[#F59E0B]">education</span>: <span className="text-[#10B981]">"B.Eng in Computer Engineering (200L), University of Uyo"</span>,{"\n"}
              {"  "}<span className="text-[#F59E0B]">experience</span>: [<span className="text-[#10B981]">"Full-Stack Developer Intern @ Springlight Technology (2025)"</span>],{"\n"}
              {"  "}<span className="text-[#F59E0B]">coreLanguages</span>: [<span className="text-[#10B981]">"TypeScript"</span>, <span className="text-[#10B981]">"JavaScript"</span>, <span className="text-[#10B981]">"Python"</span>, <span className="text-[#10B981]">"PHP"</span>, <span className="text-[#10B981]">"SQL"</span>, <span className="text-[#10B981]">"C/C++"</span>],{"\n"}
              {"  "}<span className="text-[#F59E0B]">frameworks</span>: [<span className="text-[#10B981]">"React"</span>, <span className="text-[#10B981]">"Next.js"</span>, <span className="text-[#10B981]">"FastAPI"</span>, <span className="text-[#10B981]">"Laravel"</span>, <span className="text-[#10B981]">"Express.js"</span>],{"\n"}
              {"  "}<span className="text-[#F59E0B]">databases</span>: [<span className="text-[#10B981]">"PostgreSQL"</span>, <span className="text-[#10B981]">"MySQL"</span>, <span className="text-[#10B981]">"MongoDB"</span>, <span className="text-[#10B981]">"Supabase"</span>, <span className="text-[#10B981]">"Redis"</span>],{"\n"}
              {"  "}<span className="text-[#F59E0B]">interests</span>: [<span className="text-[#10B981]">"Business Apps & SaaS"</span>, <span className="text-[#10B981]">"Developer Tooling & Web IDEs"</span>, <span className="text-[#10B981]">"Embedded Systems & CAD"</span>]{"\n"}
              {"}"};
            </code>
          </pre>
        </div>

        {/* Narrative & Photo Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden shadow-xl p-4">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#232B33] mb-4">
              <Image
                src="/images/me2.jpeg"
                alt="Ebube Udorie"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-mono">// Engineering Philosophy</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              I build complete digital solutions end to end for businesses, brands, and companies—ranging from custom e-commerce management platforms with sales and inventory tracking to cloud-native web applications.
            </p>
          </div>

          <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-4 space-y-2">
            <div className="text-xs font-mono font-semibold text-amber-500 uppercase">// Current Focus</div>
            <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
              <li>Computer Engineering at University of Uyo</li>
              <li>Production web apps & SaaS architectures</li>
              <li>High-performance APIs & payment gateways</li>
              <li>Hardware, embedded logic & solid modeling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md">
          <div className="text-amber-500 font-mono text-xs font-semibold mb-4">// Technical Strength</div>
          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1 text-gray-300">
                <span>React / Next.js / TypeScript</span>
                <span className="text-amber-400">95%</span>
              </div>
              <div className="w-full bg-[#232B33] rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-gray-300">
                <span>FastAPI / Node.js / PHP (Laravel)</span>
                <span className="text-emerald-400">90%</span>
              </div>
              <div className="w-full bg-[#232B33] rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-gray-300">
                <span>PostgreSQL / MongoDB / Supabase</span>
                <span className="text-blue-400">88%</span>
              </div>
              <div className="w-full bg-[#232B33] rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-gray-300">
                <span>Tailwind CSS / Material UI / UI-UX</span>
                <span className="text-purple-400">92%</span>
              </div>
              <div className="w-full bg-[#232B33] rounded-full h-2 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="text-emerald-400 font-mono text-xs font-semibold mb-3">// Experience Highlights</div>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3 rounded-lg bg-[#0F1215] border border-[#232B33]">
                <div className="font-semibold text-white">Full-Stack Developer Intern</div>
                <div className="text-amber-500 font-mono text-[11px]">Springlight Technology • 2025</div>
                <p className="mt-1 text-gray-400">
                  Engineered custom e-commerce management software with real-time stock and multi-branch sales tracking, plus browser IDE collaboration.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0F1215] border border-[#232B33]">
                <div className="font-semibold text-white">Independent Solutions & Products</div>
                <div className="text-emerald-400 font-mono text-[11px]">Technikraft • 2024 - Present</div>
                <p className="mt-1 text-gray-400">
                  Designing and deploying full-stack client web apps, billing systems, and custom administrative tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
