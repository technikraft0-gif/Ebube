"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { HeroLogo } from "@/content/home"

export function PortraitScene({ src, alt, logos }: { src: string; alt: string; logos: readonly HeroLogo[] }) {
  const scene = useRef<HTMLDivElement>(null)
  const elements = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const root = scene.current
    if (!root) return
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let visible = false
    let width = root.clientWidth
    let height = root.clientHeight
    let lastTime = 0
    let clock = 0
    let strength = 0
    const positions = logos.map(() => ({ x: 0, y: 0, scale: 1 }))

    function animate(time: number) {
      if (!visible || reducedMotion.matches) return
      const delta = Math.min(time - (lastTime || time), 40)
      lastTime = time
      clock += delta
      const smoothing = 1 - Math.exp(-delta / 120)
      strength += ((pointer.current.active ? 1 : 0) - strength) * smoothing

      // Autonomous continuous orbital wave traveling around the hero portrait
      const orbitTime = clock * 0.0011
      const autoWaveX = width * 0.5 + Math.cos(orbitTime) * (width * 0.36) + Math.sin(orbitTime * 0.5) * (width * 0.08)
      const autoWaveY = height * 0.44 + Math.sin(orbitTime * 1.3) * (height * 0.30) + Math.cos(orbitTime * 0.7) * (height * 0.06)

      logos.forEach((logo, index) => {
        const element = elements.current[index]
        if (!element) return
        const phase = index * 2.39996
        const depth = logo.depth || 1

        // Autonomous continuous floating drift (multi-frequency harmonic oscillation)
        const driftX = Math.sin(clock * 0.0013 * depth + phase) * 12 + Math.cos(clock * 0.0006 + phase * 1.4) * 6
        const driftY = Math.cos(clock * 0.0010 * depth + phase) * 15 + Math.sin(clock * 0.0005 + phase * 0.8) * 7

        // Dynamic dangling rotation
        const rotateDeg = Math.sin(clock * 0.0014 * depth + phase) * 11 + Math.cos(clock * 0.0008 + phase) * 6

        // Base coordinates for this asteroid
        const x = width * logo.x / 100 + driftX
        const y = height * logo.y / 100 + driftY

        // Autonomous wave influence (continuous pop-up ripple across all asteroids)
        const waveDx = x - autoWaveX
        const waveDy = y - autoWaveY
        const waveDist = Math.hypot(waveDx, waveDy)
        const waveRadius = Math.min(width * 0.46, 165)
        const waveInfluence = Math.exp(-(waveDist * waveDist) / (waveRadius * waveRadius))
        const waveBulge = Math.sin(waveInfluence * Math.PI / 2)

        // Interactive pointer influence (enhances further when hovered)
        const pointerDx = x - pointer.current.x
        const pointerDy = y - pointer.current.y
        const pointerDist = Math.hypot(pointerDx, pointerDy)
        const pointerRadius = Math.min(width * 0.42, 155)
        const pointerInfluence = Math.exp(-(pointerDist * pointerDist) / (pointerRadius * pointerRadius)) * strength
        const pointerBulge = Math.sin(pointerInfluence * Math.PI / 2)

        // Autonomous breathing scale pop + wave swell + interactive hover pop
        const breath = Math.sin(clock * 0.0019 * depth + phase * 1.5) * 0.12
        const targetScale = 1 + breath + waveBulge * 0.26 + pointerBulge * 0.32

        // Combined push displacement
        const pushWaveX = (waveDx / Math.max(waveDist, 1)) * 22 * waveBulge
        const pushWaveY = (waveDy / Math.max(waveDist, 1)) * 22 * waveBulge
        const pushPointerX = (pointerDx / Math.max(pointerDist, 1)) * 28 * pointerBulge
        const pushPointerY = (pointerDy / Math.max(pointerDist, 1)) * 28 * pointerBulge

        const targetX = driftX + pushWaveX + pushPointerX
        const targetY = driftY + pushWaveY + pushPointerY

        const position = positions[index]
        position.x += (targetX - position.x) * smoothing
        position.y += (targetY - position.y) * smoothing
        position.scale += (targetScale - position.scale) * smoothing

        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotateDeg}deg) scale(${position.scale})`
      })
      frame = requestAnimationFrame(animate)
    }

    function syncAnimation() {
      cancelAnimationFrame(frame)
      lastTime = 0
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(animate)
      else if (reducedMotion.matches) elements.current.forEach(element => element?.style.removeProperty("transform"))
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation() })
    const resize = new ResizeObserver(() => { width = root.clientWidth; height = root.clientHeight })
    observer.observe(root)
    resize.observe(root)
    reducedMotion.addEventListener("change", syncAnimation)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); reducedMotion.removeEventListener("change", syncAnimation) }
  }, [logos])

  return (
    <div ref={scene} className="hero-portrait-scene" onPointerMove={event => {
      const bounds = event.currentTarget.getBoundingClientRect()
      pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true }
    }} onPointerLeave={() => { pointer.current.active = false }} onPointerCancel={() => { pointer.current.active = false }}>
      <Image className="hero-portrait" src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 470px, 38vw" preload />
      <div className="hero-logo-field" aria-hidden="true">
        {logos.map((logo, index) => <span className="hero-asteroid" key={logo.slug} ref={element => { elements.current[index] = element }} style={{ left: `${logo.x}%`, top: `${logo.y}%`, width: logo.size, height: logo.size }}>
          <Image src={`/icons/brands/${logo.slug}.svg`} alt="" width={logo.size} height={logo.size} />
        </span>)}
      </div>
    </div>
  )
}
