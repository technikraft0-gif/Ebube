"use client"

import { useState } from "react"
import { ArrowRight, Code, Cpu, Database, Layout, Lightbulb, Smartphone, Zap, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/content"

export function Services({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const [activeStep, setActiveStep] = useState<number | null>(1)

  const services = [
    {
      title: "Web Application Engineering",
      description: "Building production-grade, fast, and scalable full-stack web applications with React, Next.js, and TypeScript.",
      icon: <Code className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Custom Dashboards & Business SaaS",
      description: "Designing end-to-end management systems, real-time inventory tracking, and client portals tailored for business workflows.",
      icon: <Layout className="w-8 h-8 text-emerald-400" />,
    },
    {
      title: "API Architecture & Backend Systems",
      description: "Crafting resilient RESTful APIs, webhook pipelines, and distributed databases with FastAPI, Node.js, PHP/Laravel, and PostgreSQL.",
      icon: <Database className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Payment Systems & Fintech Integration",
      description: "Integrating seamless payment gateways (Paystack, Stripe) with automated ledger reconciliation and verified webhooks.",
      icon: <Zap className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Developer Tools & Cloud Infrastructure",
      description: "Developing browser-based IDEs, automated pipelines, Docker containerization, and modern cloud deployments on Vercel and AWS.",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: "Technical Consultation & Architecture",
      description: "Providing architectural roadmaps, code audits, database optimization, and scalable software structure design.",
      icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
    },
  ]

  const workProcess = [
    {
      step: 1,
      title: "Discovery & Alignment",
      description: "Understanding your operational goals, business model, user requirements, and timeline constraints.",
      command: 'init-project --scope="business-needs" --client="partner"',
      output: "> Discovery phase initiated. Scope, user personas, and target outcomes defined.",
    },
    {
      step: 2,
      title: "Architecture & Schema Design",
      description: "Establishing database schemas (PostgreSQL/MongoDB), API contracts, wireframes, and deployment strategy.",
      command: "plan-architecture --database=relational --auth=jwt --api=restful",
      output: "> Architecture verified. Scalable schema blueprints drafted.",
    },
    {
      step: 3,
      title: "Sprint Development",
      description: "Writing clean, maintainable, typed code across frontend interfaces and backend business logic.",
      command: "build --stack=nextjs,typescript,fastapi,postgresql --quality=production",
      output: "> Core modules developed with automated linting and type safety.",
    },
    {
      step: 4,
      title: "Testing & Hardening",
      description: "End-to-end testing, payment webhook verification, responsiveness audits, and performance tuning.",
      command: "audit --responsive --security --performance --e2e",
      output: "> All audit checks passed. Sub-second response benchmarks achieved.",
    },
    {
      step: 5,
      title: "Production Deployment",
      description: "Setting up production domains, SSL certificates, CI/CD pipelines, and database backups.",
      command: "deploy --env=production --cdn=active --monitoring=realtime",
      output: "> Deployed successfully to production environment.",
    },
    {
      step: 6,
      title: "Ongoing Support & Handover",
      description: "Providing thorough documentation, training, and ongoing technical maintenance.",
      command: "handover --docs=comprehensive --support=active",
      output: "> Documentation transferred. System operating reliably.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono">
      <div>
        <div className="text-amber-500 text-xs uppercase tracking-wider mb-1">// Capabilities & Services</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">What I Build & Deliver</h1>
        <p className="text-sm text-gray-400 mt-1">Full-stack software engineering tailored for businesses, brands, and startups.</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 hover:border-amber-500/40 transition-all shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-[#0F1215] border border-[#232B33] w-fit mb-3.5 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-white text-sm font-bold mb-2 group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Work Process Terminal */}
      <div>
        <div className="text-emerald-400 text-xs uppercase tracking-wider mb-1">// Workflow Lifecycle</div>
        <h2 className="text-xl font-bold text-white mb-4">Engineering Methodology</h2>

        <div className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden shadow-xl">
          <div className="bg-[#0F1215] px-4 py-2 border-b border-[#232B33] text-gray-300 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-amber-500" />
              <span>process-runner.sh</span>
            </div>
            <span className="text-[10px] text-gray-500">interactive</span>
          </div>

          <div className="p-4 sm:p-5 text-xs">
            {/* Step Selection Buttons */}
            <div className="flex flex-wrap gap-2 mb-5">
              {workProcess.map((step) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    activeStep === step.step
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-[#0F1215] border border-[#232B33] text-gray-300 hover:bg-white/10"
                  )}
                >
                  Phase {step.step}: {step.title.split(" ")[0]}
                </button>
              ))}
            </div>

            {activeStep && (
              <div className="space-y-4 bg-[#0F1215] border border-[#232B33] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                    {workProcess[activeStep - 1].step}
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold">{workProcess[activeStep - 1].title}</h3>
                    <p className="text-gray-300 text-xs mt-0.5">{workProcess[activeStep - 1].description}</p>
                  </div>
                </div>

                <div className="bg-[#090B0D] p-3 rounded-lg border border-[#232B33] font-mono text-xs space-y-1">
                  <div className="text-amber-400">
                    <span className="text-emerald-400 mr-2">$</span>
                    {workProcess[activeStep - 1].command}
                  </div>
                  <div className="text-gray-400">{workProcess[activeStep - 1].output}</div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    disabled={activeStep === 1}
                    className="px-3 py-1.5 rounded-lg bg-[#15191E] border border-[#232B33] text-gray-300 hover:bg-white/10 disabled:opacity-40 text-xs"
                  >
                    Previous Phase
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(workProcess.length, activeStep + 1))}
                    disabled={activeStep === workProcess.length}
                    className="px-3 py-1.5 rounded-lg bg-[#15191E] border border-[#232B33] text-amber-400 hover:bg-white/10 disabled:opacity-40 text-xs flex items-center gap-1"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="text-white font-bold text-base">Ready to build your digital product?</h3>
          <p className="text-gray-400 text-xs mt-1">Let's discuss requirements, timeline, and the best architectural stack.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => setActiveSection("Contact.jsx")}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors shadow-md"
          >
            Contact Me
          </button>
          <a
            href={profile.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>
  )
}
