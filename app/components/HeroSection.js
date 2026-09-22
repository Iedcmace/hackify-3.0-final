'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { FileText, X, Crosshair } from 'lucide-react'
import SiteHeader from './SiteHeader'

const WhatsAppIcon = ({ className = 'size-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function PrizePoolSticker() {
  const [displayAmount, setDisplayAmount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    setHasAnimated(true)
    const duration = 3000
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const nextValue = Math.round(eased * 100000)
      setDisplayAmount(nextValue)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setDisplayAmount(100000)
        setIsComplete(true)
      }
    }

    requestAnimationFrame(tick)
  }, [hasAnimated])

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 12, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center justify-center rounded-full bg-[#0b120b]/60 px-3 py-2.5 backdrop-blur-md shadow-[0_0_18px_rgba(164,200,117,0.12)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-4"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(164,200,117,0.18),transparent_65%)] blur-md" />
      <div className="relative flex items-baseline gap-2 sm:gap-3">
        <span className="font-mono-tech text-[8px] tracking-[0.22em] text-[#dfeec9]/90 uppercase sm:text-[9px]">
          Prize Pool
        </span>
        <span className={`prize-number ${isComplete ? 'prize-number--complete' : ''} font-heading text-lg leading-none tracking-[-0.06em] text-[#f3f8eb] sm:text-[1.55rem]`}>
          ₹{displayAmount.toLocaleString('en-IN')}
        </span>
      </div>
    </motion.div>
  )
}

// Animated Counter with Strict Final Value Completion Signal
const AnimatedCounter = ({ from = 0, to = 100000, duration = 2.5, onComplete }) => {
  const [count, setCount] = useState(from)
  const onCompleteRef = useRef(onComplete)
  const isCompletedRef = useRef(false)

  // Keep callback reference updated without restarting the animation effect
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let start = null
    let animationFrame

    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = (timestamp - start) / 1000
      const progress = Math.min(elapsed / duration, 1)

      // Cubic ease-out for smooth deceleration into target value
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(from + (to - from) * easeOut)

      setCount(current)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setCount(to)
        if (!isCompletedRef.current) {
          isCompletedRef.current = true
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
        }
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [from, to, duration])

  return <>{count.toLocaleString('en-IN')}</>
}

export default function HeroSection({ DevfolioButton, CountdownInline, launchDate }) {
  const [showBrief, setShowBrief] = useState(false)
  const [isCounterFinished, setIsCounterFinished] = useState(false)
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (prefersReducedMotion) return

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
  }, [mouseX, mouseY])

  // Parallax translation curves
  const bgTranslateX = useTransform(smoothX, [-1, 1], [-3.5, 3.5])
  const bgTranslateY = useTransform(smoothY, [-1, 1], [-2.5, 2.5])
  const atmoTranslateX = useTransform(smoothX, [-1, 1], [-6, 6])
  const atmoTranslateY = useTransform(smoothY, [-1, 1], [-4.5, 4.5])
  const decorTranslateX = useTransform(smoothX, [-1, 1], [-9, 9])
  const decorTranslateY = useTransform(smoothY, [-1, 1], [-7, 7])
  const soldierTranslateX = useTransform(smoothX, [-1, 1], [-16, 16])
  const soldierTranslateY = useTransform(smoothY, [-1, 1], [-12, 12])
  const contentTranslateX = useTransform(smoothX, [-1, 1], [-10, 10])
  const contentTranslateY = useTransform(smoothY, [-1, 1], [-7, 7])
  const fgTranslateX = useTransform(smoothX, [-1, 1], [-22, 22])
  const fgTranslateY = useTransform(smoothY, [-1, 1], [-16, 16])
  const cameraRotateX = useTransform(smoothY, [-1, 1], [2, -2])
  const cameraRotateY = useTransform(smoothX, [-1, 1], [-2.2, 2.2])

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
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0c08]"
    >
      <SiteHeader />

      {/* LAYER 0: BACKGROUND */}
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0c08]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent" />
      </motion.div>

      {/* LAYER 1: ATMOSPHERE */}
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
        <div className="absolute left-[-5%] top-1/3 h-[700px] w-[600px] -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(164,200,117,0.18)_0%,rgba(164,200,117,0.06)_45%,transparent_70%)] blur-3xl lg:left-[0%]" />
        <div className="absolute bottom-8 right-8 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(164,200,117,0.05)_0%,transparent_70%)] blur-2xl" />
      </motion.div>

      {/* LAYER 2: DECOR */}
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
        <div className="absolute left-[36%] top-20 hidden h-64 w-px -rotate-45 bg-gradient-to-b from-transparent via-[#a4c875]/18 to-transparent lg:block" />
        <div className="absolute left-[40%] top-36 hidden h-48 w-px -rotate-45 bg-gradient-to-b from-transparent via-[#a4c875]/12 to-transparent lg:block" />
      </motion.div>

      {/* LAYER 3: FOREGROUND SOLDIER */}
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

      {/* LAYER 4: CONTENT */}
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
        {/* Partner Logos */}
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

        <div className="flex w-full max-w-[560px] flex-col items-center">
          {/* Tactical Tagline */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex w-full max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-heading text-[clamp(0.72rem,2.5vw,1.875rem)] font-black uppercase leading-tight tracking-[0.08em] drop-shadow-lg sm:mt-6 sm:gap-x-3 sm:tracking-widest"
          >
            <span className="text-[#FF8C00]">Defence</span>
            <span className="text-white/35">|</span>
            <span className="text-white">Aid</span>
            <span className="text-white/35">|</span>
            <span className="text-[#ef4444]">Rebuild</span>
          </motion.div>

          <p className="mt-3 w-full text-center font-heading text-[13px] font-extrabold uppercase tracking-[0.16em] text-white sm:mt-4 sm:text-[13px] sm:tracking-[0.2em]">
            In Collaboration with the Indian Navy
          </p>

          {/* ELEGANT PRIZE COUNTER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-4 sm:mt-6 flex flex-col items-center justify-center w-full"
          >
            {/* Header Tag */}
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.32em] text-[#a4c875]">
                // TOTAL PRIZE POOL
              </span>
              <span className="relative flex size-2">
                <span className="relative inline-flex size-2 rounded-full bg-[#a4c875]" />
              </span>
            </div>

            {/* SUBTLE PRIZE COUNTER TEXT */}
            <motion.div
              animate={{
                filter: isCounterFinished
                  ? 'drop-shadow(0 0 16px rgba(164,200,117,0.45))'
                  : 'drop-shadow(0 0 0px transparent)',
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#a4c875] via-[#ffffff] to-[#a4c875] bg-clip-text text-transparent">
                ₹<AnimatedCounter from={0} to={100000} duration={2.5} onComplete={() => setIsCounterFinished(true)} />
              </span>
            </motion.div>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.25, ease: 'easeOut' }}
            className="mt-7 sm:mt-9 flex w-full max-w-[620px] flex-wrap items-center justify-center gap-3 sm:gap-3.5 relative z-20"
          >
            {DevfolioButton && <DevfolioButton />}

            <button
              type="button"
              onClick={() => setShowBrief(true)}
              className="inline-flex h-[44px] px-5 sm:px-6 cursor-pointer items-center justify-center gap-2 bg-black/60 border border-[#a4c875] font-sans text-xs sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(164,200,117,0.6)] hover:bg-[#a4c875]/15 rounded-sm backdrop-blur-sm shrink-0"
            >
              <FileText className="size-4 shrink-0 text-[#a4c875]" strokeWidth={1.8} />
              MISSION BRIEF
            </button>

            <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
              <a
                href="https://chat.whatsapp.com/KBMZS0UZAX1H5i9kbMJiCW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[44px] px-5 sm:px-6 cursor-pointer items-center justify-center gap-2.5 rounded-sm border border-[#d8ff7a] bg-gradient-to-r from-[#718e45] via-[#a4c875] to-[#718e45] font-sans text-xs sm:text-sm font-bold tracking-[0.18em] text-[#0a0c08] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(164,200,117,0.6)] shrink-0"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-[#0a0c08]" />
                JOIN OUR COMMUNITY
              </a>
              <PrizePoolSticker />
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.45, ease: 'easeOut' }}
            className="relative z-20 mt-8 flex w-full justify-center overflow-hidden sm:mt-10"
          >
            {CountdownInline && <CountdownInline targetDate={launchDate} />}
          </motion.div>
        </div>
      </motion.div>

      {/* LAYER 5: FOREGROUND SCROLL HINT */}
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

      {/* TACTICAL MISSION BRIEF MODAL */}
      {showBrief && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowBrief(false)} />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-[#0a0a0a] border border-[#a4c875]/40 p-6 pb-8 sm:p-10 shadow-[0_0_50px_rgba(164,200,117,0.15)] scrollbar-hide"
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
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-[#a4c875] uppercase">Mission Brief</h3>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#FF8C00] uppercase">Hackify 3.0 // 36-Hour Hackathon</p>
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm leading-relaxed text-[#B8B8B8] text-left">
              <h4 className="text-[#E4E3D1] text-base sm:text-xl font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6 border-l-2 border-[#a4c875] pl-3">
                Hackify... Hack to Defy.
              </h4>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ INCOMING TRANSMISSION ]</span> Hackify returns for another edition — a call to every builder, strategist, and first-time coder to step onto the front lines and turn an idea into a weapon against real-world threats.</p>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ THE MISSION ]</span> 36 hours. Three fronts — Defence, Aid, Rebuild. You&apos;ll build systems that guard the front lines, deliver relief when it matters most, and reconstruct what&apos;s been lost. No safe zones, no shortcuts — just your team and the clock.</p>
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ ELIGIBILITY ]</span> Whether you&apos;re a first-year recruit or a battle-tested coder, the field doesn&apos;t check your rank — only your readiness to fight for your idea.</p>
              <div className="my-6 bg-[#a4c875]/5 border border-[#a4c875]/20 p-4 rounded-sm">
                <p className="text-white text-[clamp(0.68rem,2.5vw,1rem)] font-bold leading-relaxed tracking-[0.1em] uppercase">
                  <span className="mr-2">&gt;</span>YOUR OBJECTIVE IS CLEAR: DEFENCE AID REBUILD.
                  <span className="mt-2 block text-[clamp(0.62rem,2.2vw,0.9rem)] leading-relaxed tracking-[0.08em] text-[#a4c875]">
                    THEME: BLUEPRINT FOR PEACE: POWERING DEFENCE, PROTECTING LIVES, REBUILDING NATIONS.
                  </span>
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
