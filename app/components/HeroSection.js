'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FileText, X, Crosshair } from 'lucide-react'
import SiteHeader from './SiteHeader'

export default function HeroSection({ DevfolioButton, CountdownInline, launchDate }) {
  const [showBrief, setShowBrief] = useState(false)
  const heroRef = useRef(null)
  const [isInteractive, setIsInteractive] = useState(false)

  // Virtual Camera Normalized Coordinates (-1 to 1)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth camera inertia and settle
  const springConfig = { damping: 28, stiffness: 75, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Check if reduced motion is NOT preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (prefersReducedMotion) return

    // Make the scene interactive on hover-capable devices
    if (hasHover) {
      const interactiveTimeoutId = setTimeout(() => setIsInteractive(true), 0)

      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window
        const normX = ((e.clientX / innerWidth) - 0.5) * 2
        const normY = ((e.clientY / innerHeight) - 0.5) * 2
        mouseX.set(normX)
        mouseY.set(normY)
      }

      const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        clearTimeout(interactiveTimeoutId)
        window.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Touch fallback: enable parallax by tracking first touch point
    const touchInteractiveTimeout = setTimeout(() => setIsInteractive(true), 0)
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return
      const t = e.touches[0]
      const { innerWidth, innerHeight } = window
      const normX = ((t.clientX / innerWidth) - 0.5) * 2
      const normY = ((t.clientY / innerHeight) - 0.5) * 2
      mouseX.set(normX)
      mouseY.set(normY)
    }

    const handleTouchEnd = () => {
      // gently return to center
      mouseX.set(0)
      mouseY.set(0)
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      clearTimeout(touchInteractiveTimeout)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [mouseX, mouseY])

  // Virtual Camera Depth Multipliers for each 2.5D plane
  // Layer 0: Background (±3.5px)
  const bgTranslateX = useTransform(smoothX, [-1, 1], [-3.5, 3.5])
  const bgTranslateY = useTransform(smoothY, [-1, 1], [-2.5, 2.5])

  // Layer 1: Atmosphere & Light (±6px)
  const atmoTranslateX = useTransform(smoothX, [-1, 1], [-6, 6])
  const atmoTranslateY = useTransform(smoothY, [-1, 1], [-4.5, 4.5])

  // Layer 2: Cyber Decor / Technical HUD (±9px)
  const decorTranslateX = useTransform(smoothX, [-1, 1], [-9, 9])
  const decorTranslateY = useTransform(smoothY, [-1, 1], [-7, 7])

  // Layer 3: Tactical Soldier (±16px) - Most responsive foreground character
  const soldierTranslateX = useTransform(smoothX, [-1, 1], [-16, 16])
  const soldierTranslateY = useTransform(smoothY, [-1, 1], [-12, 12])

  // Layer 4: Content plane (±10px) - Gentle parallax keeping text legible
  const contentTranslateX = useTransform(smoothX, [-1, 1], [-10, 10])
  const contentTranslateY = useTransform(smoothY, [-1, 1], [-7, 7])

  // Layer 5: Foreground micro FX (±22px)
  const fgTranslateX = useTransform(smoothX, [-1, 1], [-22, 22])
  const fgTranslateY = useTransform(smoothY, [-1, 1], [-16, 16])

  // Subtle 3D virtual camera perspective tilt (±2.2 degrees)
  const cameraRotateX = useTransform(smoothY, [-1, 1], [2, -2])
  const cameraRotateY = useTransform(smoothX, [-1, 1], [-2.2, 2.2])

  // Scroll Parallax: Virtual camera moves through the scene
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const scrollBgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scrollSoldierY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const scrollContentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const scrollContentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scrollSoldierOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.05])
  const scrollSoldierScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  // Scroll indicator fades out immediately on scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0c08]"
    >
      <SiteHeader />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 0: ACTUAL BACKGROUND LAYER (01-background.jpeg)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-[-3%] z-0 h-[106%] w-[106%] select-none overflow-hidden"
        style={{
          x: isInteractive ? bgTranslateX : 0,
          y: isInteractive ? bgTranslateY : 0,
          translateY: scrollBgY,
        }}
      >
        <img
          src="/hero_bg/01-background.jpeg"
          alt=""
          role="presentation"
          className="size-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.75) contrast(1.04)' }}
        />
        {/* Very subtle edge transitions only at the very top/bottom boundaries to seamlessly meet navbar & tracks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0c08]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 1: ATMOSPHERIC LIGHTING & AMBIENT DEPTH                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] select-none"
        style={{
          x: isInteractive ? atmoTranslateX : 0,
          y: isInteractive ? atmoTranslateY : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        {/* Tactical green halo on LEFT behind soldier */}
        <div className="absolute left-[-5%] top-1/3 h-[700px] w-[600px] -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(164,200,117,0.18)_0%,rgba(164,200,117,0.06)_45%,transparent_70%)] blur-3xl lg:left-[0%]" />
        {/* Secondary subtle ambient fill on bottom right */}
        <div className="absolute bottom-8 right-8 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(164,200,117,0.05)_0%,transparent_70%)] blur-2xl" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 2: DECORATIVE CYBER ELEMENTS & TACTICAL HUD                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] select-none"
        style={{
          x: isInteractive ? decorTranslateX : 0,
          y: isInteractive ? decorTranslateY : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.35 }}
      >
        {/* Left-side military coordinate HUD watermark (near soldier) */}
        <div className="absolute left-8 top-32 hidden flex-col items-start gap-1 font-mono text-[9px] tracking-[0.25em] text-[#a4c875]/40 xl:flex">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#a4c875]/70 animate-pulse" />
            <span>OPERATIONAL // GRID 36-H</span>
          </div>
          <span className="text-white/25">LAT 10.054° N // LNG 76.620° E</span>
          <div className="mt-1 h-px w-24 bg-gradient-to-r from-[#a4c875]/40 to-transparent" />
        </div>

        {/* Diagonal signal slash lines — left side now */}
        <div className="absolute left-[36%] top-20 hidden h-64 w-px -rotate-45 bg-gradient-to-b from-transparent via-[#a4c875]/18 to-transparent lg:block" />
        <div className="absolute left-[40%] top-36 hidden h-48 w-px -rotate-45 bg-gradient-to-b from-transparent via-[#a4c875]/12 to-transparent lg:block" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 3: ACTUAL FOREGROUND SOLDIER LAYER (02-soldier.png)          */}
      {/* Positioned on the right matching 03-composite-reference.png        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── SOLDIER — LEFT side ─────────────────────────────────────────── */}
      {/* Desktop: occupies the left ~45% of viewport                       */}
      {/* Mobile: translucent backdrop, sits behind content                 */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-[-4%] sm:left-[-5%] md:left-[-3%] lg:left-[-1%] xl:left-[0%] 2xl:left-[1%] z-[3] flex items-end justify-start select-none overflow-visible"
        style={{
          x: isInteractive ? soldierTranslateX : 0,
          y: isInteractive ? soldierTranslateY : 0,
          translateY: scrollSoldierY,
          scale: scrollSoldierScale,
          opacity: scrollSoldierOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05, x: -60, y: 25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-end justify-start"
        >
          <img
            src="/hero_bg/02-soldier.png"
            alt=""
            role="presentation"
            className="h-[48vh] max-h-[520px] w-auto object-contain object-bottom opacity-20 sm:h-[62vh] sm:max-h-[660px] sm:opacity-38 md:h-[74vh] md:max-h-[760px] md:opacity-55 lg:h-[86vh] lg:max-h-[900px] lg:opacity-92 xl:h-[93vh] xl:max-h-[950px] 2xl:h-[96vh] 2xl:max-h-[1010px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 83%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 83%, transparent 98%)',
              filter: 'contrast(1.03)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 4: EXISTING HACKIFY CONTENT (Logo, Tagline, CTAs, Timer)     */}
      {/* Responsive layout with guaranteed readability on all devices       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── CONTENT — RIGHT side ─────────────────────────────────────────── */}
      {/* Desktop: ml-auto pushes block to right half, matching soldier left  */}
      <motion.div
        style={{
          x: isInteractive ? contentTranslateX : 0,
          y: isInteractive ? contentTranslateY : 0,
          translateY: scrollContentY,
          opacity: scrollContentOpacity,
          rotateX: isInteractive ? cameraRotateX : 0,
          rotateY: isInteractive ? cameraRotateY : 0,
          transformPerspective: 1200,
        }}
        className="relative z-[4] flex min-h-screen w-full flex-col items-center justify-start text-center transform-gpu px-4 pb-16 pt-20 sm:items-start sm:justify-center sm:px-10 sm:pb-24 sm:pt-20 sm:text-left lg:ml-auto lg:max-w-[55%] lg:pl-6 lg:pr-10 lg:pt-20 xl:max-w-[52%] xl:pr-14 2xl:max-w-[50%] 2xl:pr-20"
      >
        {/* Partner marks above the Hackify identity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex w-full max-w-[260px] items-center justify-between gap-4 sm:mb-5 sm:max-w-[390px] sm:gap-7 lg:max-w-[500px]"
        >
          <img src="/iedc-logo-transparent.png" alt="IEDC MACE" className="h-8 w-auto object-contain sm:h-11 lg:h-14" />
          <img src="/IIC.png" alt="Institution's Innovation Council" className="h-8 w-auto object-contain sm:h-11 lg:h-14" />
          <img src="/ksum-logo-transparent.png" alt="KSUM" className="h-8 w-auto object-contain sm:h-11 lg:h-14" />
        </motion.div>

        {/* Hackify Brand Logo */}
        <motion.img
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          src="/hackify-logo.svg"
          alt="Hackify 3.0"
          className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[420px] lg:max-w-[560px] h-auto object-contain drop-shadow-2xl"
        />

        {/* Tactical Tagline */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 font-heading text-[clamp(0.72rem,2.5vw,1.875rem)] font-black uppercase leading-tight tracking-[0.08em] drop-shadow-lg sm:mt-6 sm:gap-x-3 sm:tracking-widest"
        >
          <span className="text-[#FF8C00]">Defence</span>
          <span className="text-white/35">|</span>
          <span className="text-white">Aid</span>
          <span className="text-white/35">|</span>
          <span className="text-[#ef4444]">Rebuild</span>
        </motion.div>

        {/* CTA Buttons (Devfolio + Mission Brief) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.25, ease: 'easeOut' }}
          className="mt-7 sm:mt-9 flex w-full max-w-lg flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:items-start relative z-20"
        >
          {DevfolioButton && <DevfolioButton />}

          <button
            type="button"
            onClick={() => setShowBrief(true)}
            className="inline-flex h-[44px] w-full max-w-[312px] sm:w-[200px] cursor-pointer items-center justify-center gap-2 bg-black/60 border border-[#a4c875] font-sans text-xs sm:text-sm font-bold tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(164,200,117,0.6)] hover:bg-[#a4c875]/15 rounded-sm backdrop-blur-sm"
          >
            <FileText className="size-4 shrink-0 text-[#a4c875]" strokeWidth={1.8} />
            MISSION BRIEF
          </button>
        </motion.div>

        {/* Tactical Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.45, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 flex w-full justify-center sm:justify-start relative z-20 overflow-hidden"
        >
          {CountdownInline && <CountdownInline targetDate={launchDate} />}
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LAYER 5: FOREGROUND FX (HUD Bottom Prompt & Micro Depth Parallax)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── SCROLL-DOWN INDICATOR — fades on scroll ──────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-[5] flex flex-col items-center gap-2 select-none"
        style={{
          opacity: scrollHintOpacity,
          x: isInteractive ? fgTranslateX : 0,
          y: isInteractive ? fgTranslateY : 0,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <span className="font-mono text-[9px] tracking-[0.36em] text-gray-400 uppercase">Scroll to Explore</span>
        {/* Pulsing ring + bouncing chevron */}
        <div className="relative flex items-center justify-center">
          <motion.span
            className="absolute size-8 rounded-full border border-[#a4c875]/30"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute size-8 rounded-full border border-[#a4c875]/20"
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
          />
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative size-5 text-[#a4c875]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TACTICAL MISSION BRIEF MODAL                                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showBrief && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowBrief(false)} />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#a4c875]/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(164,200,117,0.15)] scrollbar-hide"
            style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}
          >
            <button
              type="button"
              onClick={() => setShowBrief(false)}
              className="absolute top-5 right-5 text-[#a4c875]/50 hover:text-[#a4c875] transition-colors cursor-pointer"
            >
              <X className="size-6" strokeWidth={2} />
            </button>

            <div className="flex items-center gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-5">
              <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center border border-[#a4c875]/30 bg-[#a4c875]/10">
                <Crosshair className="size-5 sm:size-6 text-[#a4c875] animate-[spin_4s_linear_infinite]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-[#a4c875] uppercase">Directive Details</h3>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#FF8C00] uppercase">Classified Info // Clearance 3</p>
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm leading-relaxed text-[#B8B8B8] text-left">
              <h4 className="text-[#E4E3D1] text-base sm:text-xl font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6 border-l-2 border-[#a4c875] pl-3">
                Hackify... Hack to Defy.
              </h4>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ INCOMING TRANSMISSION ]</span> It is back with another edition this year where creators, innovators, and any one of you can come to the front lane and pitch the idea which is worth for the battlefield.</p>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ THE SPRINT ]</span> The grueling 36 hours of battle, in and out, ending with a reign of your own creative territory—which is worth the struggle.</p>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ ELIGIBILITY ]</span> You being a fresh recruit or seasoned armed force doesn&apos;t matter, cause its your field to win.</p>
              <div className="my-6 bg-[#a4c875]/5 border border-[#a4c875]/20 p-4 rounded-sm">
                <p className="text-white text-xs sm:text-base font-bold tracking-widest uppercase">
                  <span className="text-[#FF8C00] mr-2">&gt;</span>Your objective is clear: <br className="sm:hidden mt-2" />
                  <span className="text-[#a4c875] sm:mt-1 inline-block">BUILD. OPTIMIZE. SURVIVE.</span>
                </p>
              </div>
              <p className="text-white/80 italic tracking-wide">Are you ready to defend your idea??? The field is waiting.</p>
              <div className="mt-8 pt-4 border-t border-white/10 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gray-500">
                <p>A 36-hour battlefield where YOU hack to defy.</p>
                <p className="mt-1">Proudly organized by IEDC MACE</p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 pt-5 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setShowBrief(false)}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#a4c875]/70 hover:text-[#a4c875] transition-colors cursor-pointer"
              >
                &gt; Acknowledge &amp; Close_
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
