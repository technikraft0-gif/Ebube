"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, X, Maximize2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageGalleryProps {
  title?: string
  images: {
    src: string
    alt: string
    caption?: string
  }[]
}

export function ImageGallery({ title = "Project Showcase Gallery", images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowLeft") {
          goToPrevious()
        } else if (e.key === "ArrowRight") {
          goToNext()
        } else if (e.key === "Escape") {
          toggleFullscreen()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, goToPrevious, goToNext, toggleFullscreen, isMounted])

  if (!isMounted || !images.length) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-64 bg-[#15191E] border border-[#232B33] rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono">
      <div>
        <div className="text-amber-500 text-xs uppercase tracking-wider mb-1">// Visual Artifacts</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        <p className="text-sm text-gray-400 mt-1">Screenshots and interface previews from deployed products.</p>
      </div>

      <div className="bg-[#15191E] border border-[#232B33] rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-[#0F1215] px-4 py-2.5 border-b border-[#232B33] text-gray-300 text-xs font-semibold flex items-center justify-between">
          <span className="truncate max-w-xs sm:max-w-md">
            {images[currentIndex]?.alt || `Image ${currentIndex + 1} of ${images.length}`}
          </span>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[11px] text-amber-500 font-mono">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded hover:bg-white/10 text-gray-300 transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-[#090B0D]">
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-lg overflow-hidden border border-[#232B33] bg-[#0F1215]">
            <Image
              src={images[currentIndex]?.src || "/images/placeholder.svg"}
              alt={images[currentIndex]?.alt || "Gallery Image"}
              fill
              className="object-contain"
              priority
            />

            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/10 transition-all shadow-lg"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/10 transition-all shadow-lg"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {images[currentIndex]?.caption && (
            <div className="mt-3 text-center text-xs text-gray-400 font-mono">
              {images[currentIndex].caption}
            </div>
          )}

          {/* Thumbnails row */}
          <div className="flex gap-2 overflow-x-auto mt-4 pt-2 pb-1 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all",
                  currentIndex === idx
                    ? "border-amber-500 scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
            <span className="text-sm font-bold font-mono">{images[currentIndex]?.alt}</span>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 my-4 flex items-center justify-center">
            <Image
              src={images[currentIndex]?.src || "/images/placeholder.svg"}
              alt={images[currentIndex]?.alt || "Gallery Image"}
              fill
              className="object-contain"
            />
            <button
              onClick={goToPrevious}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 font-mono py-2">
            Image {currentIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
