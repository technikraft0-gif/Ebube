"use client"

import { ExternalLink } from "lucide-react"
import { Github } from "@/components/icons/brand"
import { projects } from "@/content"
import Image from "next/image"

export function Projects() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono">
      <div>
        <div className="text-amber-500 text-xs uppercase tracking-wider mb-1">// Production Deployments & Work</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Featured Projects</h1>
        <p className="text-sm text-gray-400 mt-1">A curated collection of web applications, platforms, and developer tooling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-[#0F1215] border-b border-[#232B33]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {project.live && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-400 backdrop-blur-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>LIVE</span>
                    </div>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-gray-300 font-mono border border-white/10 backdrop-blur-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white text-base font-bold group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 p-1 rounded hover:bg-amber-500/10 transition-colors"
                        title="View Live App"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                  {project.summary || project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 6).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-[#0F1215] border border-[#232B33] text-gray-300 px-2 py-0.5 rounded text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="text-[10px] text-amber-500 font-mono self-center">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-5 py-2.5 border-t border-[#232B33] bg-[#0F1215] text-[11px] text-emerald-400 flex items-center justify-between">
              <span>// production verified</span>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Launch demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
