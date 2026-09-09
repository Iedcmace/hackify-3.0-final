'use client'

import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SiteFooter from './components/SiteFooter'
import {
  Menu, X, FileText, ChevronDown,
  Clock, Users, Crosshair,
  Wifi, Phone, Mail, Link, Share2,
  Cpu, Shield, Heart, Eye, Building2, Lightbulb
} from 'lucide-react'
import SiteHeader from './components/SiteHeader'
import Preloader from './components/Preloader'
import Gallery from './components/gallery'
import Newsletter from './components/Newsletter'
import HeroSection from './components/HeroSection'
import VenueSection from './components/VenueSection'
/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'TRACKS', href: '#tracks' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'REACH US', href: '#venue' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'SPONSORS', href: '#sponsors' },
  { label: 'TEAM', href: '#team' },
  { label: 'CONTACT', href: '#contact' },
]

const STATS = [
  { icon: Clock, title: '36 HOURS', subtitle: 'NON-STOP INNOVATION' },
  { icon: Users, title: 'NATIONAL LEVEL', subtitle: 'TOP TALENT. ONE STAGE.' },
  { icon: Crosshair, title: 'WAR-TECH', subtitle: 'PREDICT. PROTECT. REBUILD.' },
]

const LAUNCH_DATE = '2026-10-09T09:00:00.000+05:30'

/* New tracks — 7 sectors */
const tracks = [
  {
    icon: Cpu,
    title: 'Defence Tech',
    description:
      'Build next-generation tools at the intersection of AI and national security — autonomous systems, predictive threat modelling, and intelligent surveillance platforms designed for real-world defence applications.',
  },
  {
    icon: Shield,
    title: 'Cyber Defence',
    description:
      'Fortify critical infrastructure, secure communication protocols, and create resilient systems for high-risk digital environments.',
  },
  {
    icon: Heart,
    title: 'Humanitarian Aid',
    description:
      'Build supply chain logistics for rapid resource deployment and verified distribution tracking in disaster and crisis zones.',
  },
  {
    icon: Heart,
    title: 'Crisis Healthcare',
    description:
      'Design field-ready diagnostics, remote clinical support platforms, and AI-assisted triage systems that function reliably in resource-constrained emergency environments.',
  },
  {
    icon: Eye,
    title: 'Information Integrity',
    description:
      'Deepfake detection, truth-verification layers, and anti-misinformation tools for public trust and cognitive security.',
  },
  {
    icon: Building2,
    title: 'Reconstruction',
    description:
      'Engineer smart urban planning tools, heritage preservation technologies, and economic revitalization platforms that support communities in rebuilding after crisis or conflict.',
  },
  {
    icon: Lightbulb,
    title: 'Open Innovation',
    description:
      'Wildcard track for disruptive technologies that address unforeseen challenges in security, research, and humanitarian defence.',
  },
]


/* Timeline events with actual ISO dates for progress calculation */
const TIMELINE_EVENTS = [
  {
    id: 'registration',
    label: 'Registration Opens',
    detail: 'Applications open on Devfolio',
    date: new Date('2026-09-10'), /* Sep 10 */
    isoStr: 'Sept 10, 2026',
  },
  {
    id: 'deadline',
    label: 'Registration Deadline',
    detail: 'Last date to submit your application',
    date: new Date('2026-09-20'), /* Sep 20 */
    isoStr: 'Sept 20, 2026',
  },
  {
    id: 'shortlist',
    label: 'Shortlisted Teams',
    detail: 'Selected teams notified',
    date: new Date('2026-09-27'), /* Sep 27 */
    isoStr: 'Sept 27, 2026',
  },
  {
    id: 'hackathon',
    label: 'Hackathon',
    detail: '36-hour offline sprint at MACE Kothamangalam',
    date: new Date('2026-10-09'), /* Oct 9-11 */
    isoStr: 'Oct 9 – 11, 2026',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What is Hackify 3.0?',
    answer:
      'Hackify 3.0 is the third edition of the flagship 36-hour national-level hackathon organized by IEDC MACE, bringing together innovators to solve real-world challenges through technology.',
  },
  {
    question: 'Who can participate?',
    answer:
      'Students from any recognized college or university are eligible to participate.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'No. Participation in Hackify 3.0 is completely free.',
  },
  {
    question: 'How will teams be shortlisted?',
    answer:
      'Teams will be shortlisted based on the quality of their submitted abstract, problem statement, innovation, feasibility, and relevance to the selected track.',
  },
  {
    question: 'Where can I contact the organizers?',
    answer:
      'For queries, participants can reach out through the official Hackify 3.0 communication channels and contact details provided on the event page.',
  },
  {
    question: 'Will accommodation and food be provided?',
    answer:
      'Details regarding accommodation and meals will be communicated to shortlisted participants before the event.',
  },
  {
    question: 'Do we need to have a working prototype before the hackathon?',
    answer:
      'No. Participants may start with an idea, research, or an existing prototype. However, significant development should take place during the hackathon.',
  },
  {
    question: 'What is the team size limit?',
    answer:
      'Teams can consist of 1–4 members.',
  },
  {
    question: 'What should we bring to the venue?',
    answer:
      'Participants should bring their laptops, chargers, college ID cards, and any project-specific hardware they intend to use.',
  },
  {
    question: 'Is Hackify 3.0 exclusively a hardware hackathon?',
    answer:
      'No. Hackify 3.0 welcomes both hardware and software-based solutions. Teams may develop software, hardware, or hybrid solutions, provided they align with the selected track and address a relevant problem statement.',
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HELPERS                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function getTimeLeft(target) {
  if (!target || isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const diff = Math.max(0, target - Date.now())
  const seconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }
}

const pad = (n) => (typeof n === 'number' && !isNaN(n) ? n.toString().padStart(2, '0') : '00')

/* Given the sorted event dates, return a 0-1 fill fraction
   representing how far through the overall timeline we are today */
function getTimelineProgress() {
  const now = Date.now()
  const start = TIMELINE_EVENTS[0].date.getTime()
  const end = TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].date.getTime()
  if (now <= start) return 0
  if (now >= end) return 1
  return (now - start) / (end - start)
}

function getEventStatus(event) {
  const now = Date.now()
  if (now >= event.date.getTime() + 86400000) return 'done'      // past
  if (Math.abs(now - event.date.getTime()) < 86400000 * 7) return 'current' // within a week
  return 'upcoming'
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DEVFOLIO BUTTON                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */
function DevfolioButton() {

  const [mounted, setMounted] = useState(false)



  useEffect(() => {
    const mountedTimeoutId = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(mountedTimeoutId)
  }, [])



  useEffect(() => {

    if (!mounted) return



    // Use setTimeout to ensure the DOM is fully painted before loading the SDK

    const timeoutId = setTimeout(() => {

      if (!document.getElementById('devfolio-script')) {
        const script = document.createElement('script');
        script.id = 'devfolio-script';
        script.src = 'https://apply.devfolio.co/v2/sdk.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }

    }, 0)



    return () => {

      clearTimeout(timeoutId)

    }

  }, [mounted])



  if (!mounted) return null



  return (

    <div

      className="flex w-full max-w-[312px] cursor-pointer justify-center transition-transform duration-200 hover:-translate-y-0.5"

      style={{ colorScheme: 'light' }}

    >

      <div

        className="apply-button"

        data-hackathon-slug="hackify-3"

        data-button-theme="dark-inverted"

        style={{ height: '44px', width: '312px' }}

      ></div>

    </div>

  )

}


/* ─────────────────────────────────────────────────────────────────────────── */
/* COUNTDOWN                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function CountdownInline({ targetDate }) {
  const target = targetDate ? new Date(targetDate).getTime() : 0
  const [time, setTime] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setTime(getTimeLeft(target))
      setMounted(true)
    })
    const intervalId = setInterval(() => {
      setTime(getTimeLeft(target))
    }, 1000)
    return () => {
      cancelAnimationFrame(frameId)
      clearInterval(intervalId)
    }
  }, [target])

  if (!mounted || !time) return null

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINUTES', value: time.minutes },
    { label: 'SECONDS', value: time.seconds },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-1.5 text-center">
        <span className="size-1.5 animate-pulse rounded-full bg-[#FF8C00]" />
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.28em] text-gray-400 uppercase">[ TGT DEPLOYMENT: OCT 09, 2026 // 0900 HRS ]</span>
      </div>
      {/* Reduced gap on mobile so it doesn't overflow */}
      <div className="flex items-end gap-2 sm:gap-6">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-end gap-2 sm:gap-6">
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden h-[36px] sm:h-[48px] min-w-[44px] sm:min-w-[64px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${unit.label}-${unit.value}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="font-heading text-3xl font-black tabular-nums text-[#E4E3D1] sm:text-5xl block"
                    style={{ textShadow: '0 0 20px rgba(164,200,117,0.4)', lineHeight: 1 }}
                  >
                    {pad(unit.value)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-0.5 font-mono text-[7px] sm:text-[8px] tracking-[0.22em] text-gray-500 uppercase pl-1">{unit.label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-3 sm:mb-4 font-heading text-xl font-bold text-[#a4c875]/40 sm:text-3xl" aria-hidden="true">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  STAT CARDS                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function StatCards() {
  return (
    // Added mx-auto right here to center it!
    <div className="mx-auto grid w-full max-w-xl grid-cols-1 divide-y divide-[#a4c875]/20 rounded-xl border border-[#a4c875]/30 bg-black/40 backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {STATS.map((stat) => (
        <div key={stat.title} className="flex items-center justify-center gap-3 px-4 py-3">
          <stat.icon className="size-5 shrink-0 text-[#FF8C00]" strokeWidth={1.5} />
          <div className="flex flex-col leading-tight text-left">
            <span className="font-heading text-[11px] font-bold tracking-wide text-[#E4E3D1]">{stat.title}</span>
            <span className="font-sans text-[9px] tracking-[0.12em] text-gray-400">{stat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
/* ─────────────────────────────────────────────────────────────────────────── */
/* TRACKS / STRATEGIC SECTORS — Grid Layout                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
function TracksSection() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const cardsY = useTransform(scrollYProgress, [0, 1], [10, -10])

  const revealVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.97 },
    visible: (index = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section id="tracks" ref={sectionRef} className="relative w-full overflow-hidden border-y border-[#a4c875]/20 bg-[#050505] py-24 sm:py-32">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 h-[calc(100%+4rem)] opacity-50"
        style={reduceMotion ? undefined : { y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(164,200,117,0.07),transparent_42%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#3D4128_1px,transparent_1px)] [background-size:32px_32px]" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">

        {/* Section Header */}
        <motion.div
          className="relative z-10 mb-16 text-left"
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl uppercase drop-shadow-[0_0_20px_rgba(164,200,117,0.3)]">
            STRATEGIC SECTORS
          </h2>
          <p className="mt-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/60">
            Innovation Tracks
          </p>
        </motion.div>

        {/* Tracks Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-2">
          {tracks.map((track, i) => {
            const Icon = track.icon
            // If it's the last track (7th) and total is odd, make it span full width on desktop
            const isLastOdd = i === tracks.length - 1 && tracks.length % 2 !== 0;

            return (
              <motion.div
                key={track.title}
                custom={i + 1}
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                style={reduceMotion ? undefined : { y: cardsY }}
                className={`group relative ${isLastOdd ? 'md:col-span-2' : ''}`}
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col overflow-hidden border border-white/15 bg-black/60 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-500 group-hover:border-[#a4c875]/80 group-hover:bg-[#081009]/75 group-hover:shadow-[0_8px_30px_rgba(164,200,117,0.1)] sm:p-10"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px origin-left scale-x-0 bg-[#a4c875] opacity-40 transition-[transform,opacity] duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-90" />
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-0 top-4 w-px bg-[#a4c875]/0 transition-colors duration-500 group-hover:bg-[#a4c875]/55" />

                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-12 bg-white/5"
                      initial={{ x: '-180%' }}
                      whileInView={{ x: '420%' }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.9, delay: i * 0.09 + 0.2, ease: 'easeOut' }}
                    />
                  )}

                  <div className="relative z-20 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="bg-primary/10 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-primary border border-primary/20 rounded-sm">
                        [ SECTOR {String(i + 1).padStart(2, '0')} ]
                      </span>
                        <Icon className="size-8 text-white/40 transition-colors duration-300 group-hover:text-primary sm:size-10" strokeWidth={1.5} />
                      </div>

                      <h3 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-white transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-[#a4c875] sm:text-3xl">
                        {track.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-8 text-right font-mono text-[10px] uppercase tracking-widest text-primary/30 sm:text-xs">
                      {'// '}{String(i + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



/* ─────────────────────────────────────────────────────────────────────────── */
/*  TIMELINE SECTION — vertical pipeline with animated liquid fill            */
/* ─────────────────────────────────────────────────────────────────────────── */
function TimelineSection() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [fillPct, setFillPct] = useState(0)
  const [progress] = useState(() => getTimelineProgress()) /* 0-1 actual calendar progress */

  /* Intersection observer — trigger animation when section enters viewport */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* Animate fill from 0 → real progress once in view */
  useEffect(() => {
    if (!inView) return
    let raf
    let current = 0
    const target = progress
    const step = () => {
      current = Math.min(current + 0.008, target)
      setFillPct(current)
      if (current < target) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, progress])

  const totalEvents = TIMELINE_EVENTS.length

  return (
    <section id="timeline" ref={sectionRef} className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">
      {/* Subtle radial bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(164,200,117,0.03)_0%,transparent_70%)]" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-[#a4c875] sm:text-5xl">Program Timeline</h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.35em] text-[#a4c875]/60 sm:text-sm">Hackify 3.O</p>
          <p className="mt-4 text-base text-[#B8B8B8] sm:text-lg">MACE Kothamangalam · 36-Hour Offline Sprint · Oct 9–11, 2026</p>
        </div>

        {/* ── DESKTOP: vertical pipeline ─────────────────────────────────── */}
        <div className="hidden sm:block relative">
          {/* Layered rail: the dark shell and inset highlight give the timeline a pipe-like depth. */}
          <div className="absolute bottom-0 left-1/2 top-0 w-4 -translate-x-1/2 rounded-full border border-[#a4c875]/25 bg-[#090d08] shadow-[inset_3px_0_0_rgba(255,255,255,0.05),inset_-3px_0_0_rgba(0,0,0,0.8),0_0_18px_rgba(0,0,0,0.65)]" />
          <div className="absolute bottom-1 left-1/2 top-1 z-[1] w-1.5 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute left-0 top-0 w-full rounded-full bg-[#d8ff7a] shadow-[0_0_12px_rgba(216,255,122,0.7)] transition-none"
              style={{ height: `${fillPct * 100}%` }}
            />
          </div>
          <div className="absolute bottom-0 left-[calc(50%-5px)] top-0 z-[2] w-px bg-white/15" />

          <div className="relative space-y-0">
            {TIMELINE_EVENTS.map((event, i) => {
              const status = getEventStatus(event)
              const isLeft = i % 2 === 0
              /* Node position along the track (0-1) */
              const nodePos = i / (totalEvents - 1)
              const nodeActive = fillPct >= nodePos - 0.01

              return (
                <div
                  key={event.id}
                  className="relative flex items-center"
                  style={{ minHeight: '120px' }}
                >
                  {/* Left content */}
                  <div
                    className="w-[calc(50%-28px)] pr-6 text-right"
                    style={{
                      opacity: inView ? (isLeft ? 1 : 0.35) : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                      transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
                    }}
                  >
                    {isLeft && (
                      <>
                        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[#a4c875]/60 sm:text-sm">{event.isoStr}</p>
                        <h4 className={`mb-1 text-lg font-bold ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                        <p className="text-sm leading-relaxed text-[#B8B8B8]">{event.detail}</p>
                      </>
                    )}
                  </div>

                  {/* Centre node */}
                  <div className="relative z-10 flex size-16 shrink-0 items-center justify-center">
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${nodeActive ? 'border-[#a4c875]' : 'border-white/15'}`} />
                    {/* Fill */}
                    <div className={`size-6 rounded-full transition-all duration-700 ${nodeActive ? 'bg-[#d8ff7a] shadow-[0_0_14px_rgba(216,255,122,0.7)]' : 'bg-white/10'}`} />
                    {/* Pulse for current event */}
                    {status === 'current' && nodeActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#a4c875]/50 animate-ping" />
                    )}
                  </div>

                  {/* Right content */}
                  <div
                    className="w-[calc(50%-28px)] pl-6 text-left"
                    style={{
                      opacity: inView ? (!isLeft ? 1 : 0.35) : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(16px)',
                      transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
                    }}
                  >
                    {!isLeft && (
                      <>
                        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[#a4c875]/60 sm:text-sm">{event.isoStr}</p>
                        <h4 className={`mb-1 text-lg font-bold ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                        <p className="text-sm leading-relaxed text-[#B8B8B8]">{event.detail}</p>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE: simplified vertical list ─────────────────────────── */}
        <div className="sm:hidden relative pl-8">
          {/* Mobile pipe keeps the same layered depth and date-based fill. */}
          <div className="absolute bottom-2 left-[6px] top-2 w-3 rounded-full border border-[#a4c875]/25 bg-[#090d08] shadow-[inset_2px_0_0_rgba(255,255,255,0.05),inset_-2px_0_0_rgba(0,0,0,0.8)]" />
          <div className="absolute bottom-3 left-[10px] top-3 z-[1] w-1 overflow-hidden rounded-full bg-white/10">
            <div className="absolute left-0 top-0 w-full rounded-full bg-[#d8ff7a] shadow-[0_0_10px_rgba(216,255,122,0.65)]" style={{ height: `${fillPct * 100}%` }} />
          </div>
          <div className="absolute bottom-2 left-[8px] top-2 z-[2] w-px bg-white/15" />

          <div className="space-y-10">
            {TIMELINE_EVENTS.map((event, i) => {
              const nodePos = i / (totalEvents - 1)
              const nodeActive = fillPct >= nodePos - 0.01
              const status = getEventStatus(event)
              return (
                <div
                  key={event.id}
                  className="relative"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-12px)',
                    transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
                  }}
                >
                  {/* Node dot */}
                  <div className={`absolute -left-[25px] top-1 size-4 rounded-full border-2 transition-colors duration-500 ${nodeActive ? 'border-[#a4c875] bg-[#a4c875]' : 'border-white/20 bg-transparent'}`}>
                    {status === 'current' && nodeActive && (
                      <div className="absolute inset-0 rounded-full border border-[#a4c875]/50 animate-ping" />
                    )}
                  </div>
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a4c875]/60">{event.isoStr}</p>
                  <h4 className={`mb-1 text-base font-bold ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                  <p className="text-sm leading-relaxed text-[#B8B8B8]">{event.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  NEWSLETTER SECTION                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section id="newsletter" className="relative overflow-hidden border-b border-white/5 bg-[#050505] py-24">
      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-[#a4c875] sm:text-3xl">
            Intercept Updates
          </h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#a4c875]/60">
            Newsletter Sync // Stay Encrypted
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-md">
          <div
            className="flex flex-col gap-3 p-2 bg-black/40 border border-white/10 sm:flex-row sm:items-center"
            style={{ clipPath: 'polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)' }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER RECRUIT EMAIL..."
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-transparent px-4 py-3 font-mono text-xs tracking-wider text-white placeholder-gray-600 focus:outline-none disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="inline-flex h-11 items-center justify-center bg-[#a4c875] px-6 font-mono text-xs font-bold tracking-widest text-black transition-all duration-300 hover:bg-[#a4c875]/80 disabled:bg-gray-700 disabled:text-gray-400 shrink-0 uppercase cursor-pointer"
              style={{ clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)' }}
            >
              {status === 'loading' ? 'SYNCING...' : status === 'success' ? 'SECURED' : 'SUBSCRIBE_'}
            </button>
          </div>
        </form>

        {/* Status Alerts */}
        <div className="mt-4 h-6 font-mono text-[11px] tracking-wide">
          {status === 'success' && (
            <span className="text-[#a4c875]">&gt; ACCESS GRANTED. YOU HAVE BEEN ADDED TO THE INTEL NETWORK.</span>
          )}
          {status === 'error' && (
            <span className="text-[#FF8C00]">&gt; ERROR: UPLINK FAILED. PLEASE TRY AGAIN.</span>
          )}
        </div>

      </div>
    </section>
  )
}
/* ─────────────────────────────────────────────────────────────────────────── */
/* FAQ SECTION                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const faqRef = useRef(null)
  const isInView = useInView(faqRef, { once: true, amount: 0.1 })
  const reduceMotion = useReducedMotion()

  const revealVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: (index = 0) => ({
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const activeItem = FAQ_ITEMS[activeIndex]

  return (
    <section id="faq" ref={faqRef} className="relative overflow-hidden border-y border-[#a4c875]/10 bg-transparent py-24">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={revealVariants}
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 border-l-2 border-[#a4c875] pl-5 sm:mb-16 sm:pl-7"
        >
          <h2 className="mt-3 font-heading text-3xl font-black uppercase tracking-[0.12em] text-[#a4c875] sm:text-5xl">
            Mission Briefing
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-white/70 sm:text-base">
            Everything you need to know before the mission begins — from registration and team rules to venue logistics and event flow.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <nav aria-label="Frequently asked questions" className="space-y-1">
            {FAQ_ITEMS.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <motion.button
                  key={item.question}
                  type="button"
                  variants={revealVariants}
                  custom={index + 1}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-controls="faq-answer-panel"
                  className={`group relative flex w-full items-start gap-4 border-b border-white/10 px-3 py-4 text-left transition-[background-color,border-color,transform] duration-500 ease-out sm:px-4 sm:py-5 ${isActive ? 'bg-[#091109] border-[#a4c875]/50' : 'hover:translate-x-1 hover:border-[#a4c875]/35 hover:bg-[#081009]/60'}`}
                >
                  <span className={`mt-0.5 min-w-8 font-mono text-xs tracking-[0.18em] transition-colors duration-500 ${isActive ? 'text-[#d8ff7a]' : 'text-[#a4c875]/45 group-hover:text-[#a4c875]'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-stencil-military text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-500 sm:text-sm ${isActive ? 'text-[#eaf0cc]' : 'text-[#dfe5be]/70 group-hover:text-[#eaf0cc]'}`}>
                    {item.question}
                  </span>
                  <span className={`absolute bottom-0 left-0 top-0 w-0.5 origin-bottom bg-[#a4c875] transition-transform duration-500 ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
                </motion.button>
              )
            })}
          </nav>

          <motion.div
            id="faq-answer-panel"
            variants={revealVariants}
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative min-h-[240px] border border-[#a4c875]/25 bg-[#071008]/80 p-6 sm:min-h-[280px] sm:p-9"
          >
            <span aria-hidden="true" className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-[#a4c875]/70" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-[#a4c875]/35" />
            <div className="mb-8 flex items-center justify-between border-b border-[#a4c875]/15 pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a4c875]/65 sm:text-xs">
              <span>Answer</span>
              <span>Node {String(activeIndex + 1).padStart(2, '0')}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-heading text-xl font-bold uppercase tracking-[0.08em] text-[#eaf0cc] sm:text-2xl">
                  {activeItem.question}
                </h3>
                <p className="mt-6 font-sans text-base leading-7 text-[#d9e6c4] sm:text-lg sm:leading-8">
                  {activeItem.answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SCROLL TO TOP BUTTON                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:right-8"
      aria-label="Scroll to top"
    >
      <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
      </svg>
    </button>
  )
}
/* ─────────────────────────────────────────────────────────────────────────── */
/* UNIFIED TACTICAL FOOTER                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────── */
/* PAGE ROOT                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded || !window.location.hash) return

    const scrollToHash = () => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start' })
    }

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHash)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [isLoaded])

  // ... your existing audio hover effect useEffect goes here ...

  return (
    <>
      {/* This handles the smooth fade-out when the loader finishes */}
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen text-white font-command relative overflow-x-hidden ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
        <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />

        <HeroSection
          DevfolioButton={DevfolioButton}
          CountdownInline={CountdownInline}
          launchDate={LAUNCH_DATE}
        />
        <TracksSection />
        <TimelineSection />
        <Gallery />
        <FAQSection />
        <VenueSection />
        <Newsletter />
        <SiteFooter />
        <ScrollToTop />
      </div>
    </>
  )
}

