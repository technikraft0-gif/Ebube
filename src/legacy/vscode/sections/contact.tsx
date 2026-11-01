"use client"

import type React from "react"
import { sendContactMessage } from "@/lib/contact"
import { useState } from "react"
import { Mail, Send, MessageSquare, Terminal, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { Github, Linkedin, Twitter } from "@/components/icons/brand"
import { profile } from "@/content"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "$ init technikraft-contact",
    "> Terminal ready. Send message or initiate direct connection.",
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setCommandHistory((prev) => [
      ...prev,
      `$ send-message --from="${formData.name}" --email="${formData.email}"`,
      "> Transmitting message to Ebube Udorie...",
    ])

    try {
      const message = await sendContactMessage(formData)
      setCommandHistory((prev) => [...prev, `> ✓ ${message}`])
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setCommandHistory((prev) => [
        ...prev,
        `> ✗ Error: ${error instanceof Error ? error.message : "Transmission failed. Please use WhatsApp."}`,
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1">// Direct Communication</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Get In Touch</h1>
        <p className="text-sm text-gray-400 font-mono mt-1">Have a project, freelance contract, or full-time opportunity?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-xl">
          <div className="flex items-center text-amber-500 font-mono text-xs font-semibold mb-4 gap-2">
            <Mail className="w-4 h-4" />
            <span>message-dispatch.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-1.5">
                name: <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#0F1215] border border-[#232B33] rounded-lg px-3 py-2.5 text-gray-200 focus:outline-hidden focus:border-amber-500 transition-colors"
                placeholder="Your Name / Company"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1.5">
                email: <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0F1215] border border-[#232B33] rounded-lg px-3 py-2.5 text-gray-200 focus:outline-hidden focus:border-amber-500 transition-colors"
                placeholder="client@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-1.5">
                message_payload: <span className="text-amber-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#0F1215] border border-[#232B33] rounded-lg px-3 py-2.5 text-gray-200 focus:outline-hidden focus:border-amber-500 transition-colors"
                placeholder="Tell me about your project scope, timeline, and goals..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
            </button>
          </form>
        </div>

        {/* Live Terminal */}
        <div className="lg:col-span-5 bg-[#0F1215] border border-[#232B33] rounded-xl flex flex-col h-[380px] shadow-xl overflow-hidden font-mono text-xs">
          <div className="bg-[#15191E] px-4 py-2 border-b border-[#232B33] text-gray-300 font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>bash - contact@technikraft</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#232B33]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {commandHistory.map((line, index) => (
              <div
                key={index}
                className={
                  line.startsWith("> ✓")
                    ? "text-emerald-400 font-semibold"
                    : line.startsWith("> ✗")
                    ? "text-rose-400 font-semibold"
                    : line.startsWith(">")
                    ? "text-amber-400"
                    : "text-gray-300"
                }
              >
                {line}
              </div>
            ))}
            <div className="flex items-center text-gray-400">
              <span className="text-emerald-400 mr-2">technikraft@studio:~$</span>
              <span className="w-2 h-4 bg-amber-500 animate-pulse"></span>
            </div>
          </div>

          <div className="bg-[#15191E] px-4 py-1.5 border-t border-[#232B33] text-[10px] text-gray-400 flex items-center justify-between">
            <span>Uyo, Nigeria (WAT)</span>
            <span className="text-emerald-400">● Online</span>
          </div>
        </div>
      </div>

      {/* Social & WhatsApp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp Card */}
        <a
          href={profile.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/30 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">Instant Chat</div>
            <div className="text-base font-bold text-white group-hover:text-emerald-300">WhatsApp Direct</div>
            <div className="text-xs text-gray-400">{profile.phone}</div>
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${profile.email}`}
          className="p-5 rounded-xl border border-amber-500/40 bg-amber-950/20 hover:bg-amber-900/30 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 font-semibold uppercase">Email Inbox</div>
            <div className="text-base font-bold text-white group-hover:text-amber-300">Direct Message</div>
            <div className="text-xs text-gray-400 truncate max-w-[200px] sm:max-w-xs">{profile.email}</div>
          </div>
        </a>
      </div>
    </div>
  )
}
