'use client'

import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SiteFooter from './components/SiteFooter'
import {
  Menu, X, FileText, ChevronDown,
  Clock, Users, Crosshair,
  Shield, Wifi, Heart, Eye, Building2, Lightbulb, Cpu,
  Phone, Mail, Link, Share2
} from 'lucide-react'
import SiteHeader from './components/SiteHeader'
import Preloader from './components/Preloader'
import Gallery from './components/gallery'
import Newsletter from './components/Newsletter'
import BasicScrollTest from './components/BasicScrollTest'
/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'TRACKS', href: '#tracks' },
  { label: 'TIMELINE', href: '#timeline' },
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

const LAUNCH_DATE = '2026-10-03T09:00:00.000Z'

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
    date: new Date('2026-08-17'), /* Aug 3rd week */
    isoStr: 'Aug 2026 — 3rd week',
  },
  {
    id: 'deadline',
    label: 'Registration Deadline',
    detail: 'Last date to submit your application',
    date: new Date('2026-09-08'), /* Sep 2nd week */
    isoStr: 'Sep 2026 — 2nd week',
  },
  {
    id: 'shortlist',
    label: 'Shortlisted Teams',
    detail: 'Selected teams notified',
    date: new Date('2026-09-22'), /* Sep 3rd week */
    isoStr: 'Sep 2026 — 3rd week',
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
      'Teams can consist of 2–4 members.',
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
  const diff = Math.max(0, target - Date.now())
  const seconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }
}

const pad = (n) => n.toString().padStart(2, '0')

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

    setMounted(true)

  }, [])



  useEffect(() => {

    if (!mounted) return



    // Use setTimeout to ensure the DOM is fully painted before loading the SDK

    const timeoutId = setTimeout(() => {

      const oldScript = document.getElementById('devfolio-script');

      if (oldScript) oldScript.remove();



      const script = document.createElement('script');

      script.id = 'devfolio-script';

      script.src = 'https://apply.devfolio.co/v2/sdk.js';

      script.async = true;

      script.defer = true;

      document.body.appendChild(script);

    }, 0)



    return () => {

      clearTimeout(timeoutId)

      const currentScript = document.getElementById('devfolio-script');

      if (currentScript) currentScript.remove();

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
  const target = new Date(targetDate).getTime()
  const [time, setTime] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateCountdown = () => setTime(getTimeLeft(target))
    const timeoutId = setTimeout(updateCountdown, 0)
    const intervalId = setInterval(updateCountdown, 1000)
    return () => { clearTimeout(timeoutId); clearInterval(intervalId) }
  }, [target])

  if (!mounted) return null

  const units = [
    { label: 'DAYS', value: time?.days },
    { label: 'HOURS', value: time?.hours },
    { label: 'MINUTES', value: time?.minutes },
    { label: 'SECONDS', value: time?.seconds },
  ]

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 animate-pulse rounded-full bg-[#FF8C00]" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-gray-400 uppercase">[ TGT DEPLOYMENT: OCT 09, 2026 // 0900 HRS ]</span>
      </div>
      {/* Reduced gap on mobile so it doesn't overflow */}
      <div className="flex items-end gap-2 sm:gap-6">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-end gap-2 sm:gap-6">
            <div className="flex flex-col items-start">
              <div className="relative overflow-hidden h-[36px] sm:h-[48px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="font-heading text-3xl font-black tabular-nums text-[#E4E3D1] sm:text-5xl block"
                    style={{ textShadow: '0 0 20px rgba(164,200,117,0.4)', lineHeight: 1 }}
                  >
                    {unit.value == null ? '--' : pad(unit.value)}
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
/* HERO SECTION                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [showBrief, setShowBrief] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Mind-blowing parallax and 3D transformations
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25])

  // Spring physics for smoother feel
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scaleText, { stiffness: 100, damping: 30 })

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-[url('/hero-bg.webp')] bg-[length:auto_100%] sm:bg-cover bg-[center_top] sm:bg-center bg-no-repeat perspective-1000">

      <SiteHeader />

      {/* 📐 Changed to items-start and text-left for the tactical HUD alignment */}
      <motion.div
        style={{
          y: yText,
          scale: springScale,
          opacity: opacityText,
          rotateX: springRotateX,
          transformPerspective: 1200
        }}
        className="relative z-10 flex min-h-screen w-full max-w-7xl flex-col items-start justify-center px-4 pb-24 pt-32 text-left sm:px-8 lg:px-12 lg:pt-20 transform-gpu mr-auto"
      >

        <motion.img
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          src="/hackify-logo.svg"
          alt="Hackify 3.0"
          className="w-full max-w-[280px] sm:max-w-[450px] lg:max-w-[600px] h-auto object-contain drop-shadow-2xl"
        />

        {/* 🎨 Highlighted theme with typewriter effect */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="mt-6 font-heading text-xl sm:text-3xl font-black tracking-widest uppercase drop-shadow-lg inline-block whitespace-nowrap"
        >
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Predict</span>
          <span className="mx-3 text-white/30">|</span>
          <span className="text-[#FF8C00]">Protect</span>
          <span className="mx-3 text-white/30">|</span>
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Rebuild</span>
        </motion.div>

        {/* 🖱️ Buttons aligned left and stacked dynamically */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-9 flex w-full max-w-lg flex-col items-start gap-4 sm:flex-row"
        >
          <DevfolioButton />

          <button
            onClick={() => setShowBrief(true)}
            className="inline-flex h-[44px] w-full max-w-[312px] sm:w-[200px] cursor-pointer items-center justify-center gap-2 bg-black/50 border border-[#a4c875] font-sans text-xs sm:text-sm font-bold tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(164,200,117,0.6)] hover:bg-[#a4c875]/10 rounded-sm"
          >
            <FileText className="size-4 shrink-0 text-[#a4c875]" strokeWidth={1.8} />
            MISSION BRIEF
          </button>
        </motion.div>

        {/* ⏱️ Timer aligned to the left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex w-full justify-start"
        >
          <CountdownInline targetDate={LAUNCH_DATE} />
        </motion.div>


      </motion.div>

      <div className="absolute inset-x-0 bottom-4 z-10 hidden flex-col items-center gap-1 lg:flex">
        <span className="font-mono text-[9px] tracking-[0.32em] text-gray-500 uppercase">Scroll to Explore</span>
        <ChevronDown className="size-4 animate-bounce text-[#a4c875]/70" strokeWidth={2} />
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/* TACTICAL MISSION BRIEF MODAL                                              */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {showBrief && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowBrief(false)} />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#a4c875]/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(164,200,117,0.15)] scrollbar-hide"
            style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}
          >
            <button
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
              <p><span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ ELIGIBILITY ]</span> You being a fresh recruit or seasoned armed force doesn't matter, cause its your field to win.</p>
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
                onClick={() => setShowBrief(false)}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#a4c875]/70 hover:text-[#a4c875] transition-colors cursor-pointer"
              >
                &gt; Acknowledge & Close_
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* TRACKS / STRATEGIC SECTORS — Grid Layout                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
function TracksSection() {
  return (
    <section id="tracks" className="relative w-full bg-[#050505] py-24 sm:py-32 border-y border-[#a4c875]/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">

        {/* Section Header */}
        <div className="mb-16 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl uppercase drop-shadow-[0_0_20px_rgba(164,200,117,0.3)]">
            STRATEGIC SECTORS
          </h2>
          <p className="mt-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/60">
            Innovation Tracks
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-2">
          {tracks.map((track, i) => {
            const Icon = track.icon
            // If it's the last track (7th) and total is odd, make it span full width on desktop
            const isLastOdd = i === tracks.length - 1 && tracks.length % 2 !== 0;

            return (
              <div
                key={track.title}
                className={`group relative flex flex-col overflow-hidden border-2 border-white/10 bg-black/60 backdrop-blur-sm p-8 sm:p-10 transition-all duration-300 hover:border-[#a4c875] hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(164,200,117,0.15)] ${isLastOdd ? 'md:col-span-2' : ''}`}
              >
                <div className="relative z-20 flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                      <span className="bg-primary/10 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-primary border border-primary/20 rounded-sm">
                        [ SECTOR {String(i + 1).padStart(2, '0')} ]
                      </span>
                      <Icon className="size-8 sm:size-10 text-white/40 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    <h3 className="mb-4 font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide group-hover:text-[#a4c875] transition-colors duration-300">
                      {track.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#B8B8B8]">
                      {track.description}
                    </p>
                  </div>

                  <div className="font-mono text-[10px] sm:text-xs text-primary/30 uppercase tracking-widest text-right mt-8">
                    // {String(i + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#a4c875] tracking-tight uppercase">Program Timeline</h2>
          <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-[#a4c875]/60 uppercase">Hackify 3.O</p>
          <p className="mt-3 text-[#B8B8B8] text-sm">MACE Kothamangalam · 36-Hour Offline Sprint · Oct 9–11, 2026</p>
        </div>

        {/* ── DESKTOP: vertical pipeline ─────────────────────────────────── */}
        <div className="hidden sm:block relative">
          {/* Track line — background */}
          <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-white/8 rounded-full" />

          {/* Animated fill overlay */}
          <div
            className="absolute left-[calc(50%-1px)] top-0 w-0.5 rounded-full bg-gradient-to-b from-[#a4c875] to-[#a4c875]/40 transition-none"
            style={{ height: `${fillPct * 100}%` }}
          />

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
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[#a4c875]/60 uppercase mb-0.5">{event.isoStr}</p>
                        <h4 className={`text-base font-bold mb-1 ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                        <p className="text-[#B8B8B8] text-xs leading-relaxed">{event.detail}</p>
                      </>
                    )}
                  </div>

                  {/* Centre node */}
                  <div className="relative z-10 flex shrink-0 size-14 items-center justify-center">
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${nodeActive ? 'border-[#a4c875]' : 'border-white/15'}`} />
                    {/* Fill */}
                    <div className={`size-5 rounded-full transition-all duration-700 ${nodeActive ? 'bg-[#a4c875] shadow-[0_0_14px_rgba(164,200,117,0.6)]' : 'bg-white/10'}`} />
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
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[#a4c875]/60 uppercase mb-0.5">{event.isoStr}</p>
                        <h4 className={`text-base font-bold mb-1 ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                        <p className="text-[#B8B8B8] text-xs leading-relaxed">{event.detail}</p>
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
          {/* Track line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/8 rounded-full" />
          <div className="absolute left-3 top-2 w-0.5 rounded-full bg-[#a4c875]/70" style={{ height: `${fillPct * 100}%` }} />

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
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#a4c875]/60 uppercase mb-0.5">{event.isoStr}</p>
                  <h4 className={`text-sm font-bold mb-0.5 ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                  <p className="text-[#B8B8B8] text-xs leading-relaxed">{event.detail}</p>
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
  const [openIndex, setOpenIndex] = useState(null)
  const faqRef = useRef(null)
  const isInView = useInView(faqRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, rotateX: 45 },
    visible: {
      opacity: 1,
      x: 0,
      rotateX: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 }
    },
  }

  return (
    <section id="faq" ref={faqRef} className="relative overflow-hidden border-y border-[#a4c875]/10 bg-transparent py-24 perspective-1000">

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="w-full">
          <div className="space-y-8 w-full">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-3xl font-black uppercase tracking-[0.24em] text-[#a4c875] sm:text-4xl drop-shadow-[0_0_15px_rgba(164,200,117,0.3)]">
                FAQs
              </h2>
              <p className="mt-4 font-sans text-sm leading-6 text-white/75 sm:text-base max-w-2xl mx-auto">
                Everything you need to know before the mission begins — from registration and team rules to venue logistics and event flow.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-3"
            >
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index

                return (
                  <motion.div
                    variants={itemVariants}
                    key={item.question}
                    className="faq-card overflow-hidden rounded-[1rem] border border-[#a4c875]/25 bg-[#081009]/80 shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-250 hover:border-[#a4c875]/40 transform-gpu"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-3 px-3 py-2 text-left sm:gap-4 sm:px-4 sm:py-3 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="min-w-0 flex-1 font-stencil-military text-[12px] font-semibold uppercase tracking-[0.16em] text-[#dfe5be] sm:text-sm">
                        {item.question}
                        <span className="faq-cursor text-[#a4c875]" />
                      </span>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-base font-bold transition-all duration-200 ${isOpen ? 'border-[#a4c875] bg-[#a4c875]/15 text-[#a4c875] rotate-45' : 'border-[#a4c875]/30 bg-transparent text-[#a4c875]/85 group-hover:border-[#a4c875] group-hover:bg-[#a4c875]/10 group-hover:text-[#eaf0cc]'}`}>
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#a4c875]/10 px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
                            <p className="font-sans text-sm leading-5 text-[#d9e6c4] sm:text-sm sm:leading-6">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

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

  // ... your existing audio hover effect useEffect goes here ...

  return (
    <>
      {/* This handles the smooth fade-out when the loader finishes */}
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen text-white font-command relative overflow-x-hidden ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
        <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />

        <HeroSection />
        <TracksSection />
        <TimelineSection />
        <Gallery />
        <BasicScrollTest />
        <FAQSection />
        <Newsletter />
        <SiteFooter />
        <ScrollToTop />
      </div>
    </>
  )
}

