'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
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
/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'TRACKS',     href: '#tracks'    },
  { label: 'TIMELINE',   href: '#timeline'  },
  { label: 'SPONSORS',   href: '/sponsors'  },
  { label: 'GALLERY',    href: '/gallery'   },
  { label: 'TEAM',       href: '/team'      },
  { label: 'CONTACT',    href: '#contact'   },
]

const STATS = [
  { icon: Clock,     title: '36 HOURS',       subtitle: 'NON-STOP INNOVATION'        },
  { icon: Users,     title: 'NATIONAL LEVEL', subtitle: 'TOP TALENT. ONE STAGE.'     },
  { icon: Crosshair, title: 'WAR-TECH',       subtitle: 'PREDICT. PROTECT. REBUILD.' },
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
    date: new Date('2026-10-01'), /* Oct 1-3 */
    isoStr: 'Oct 1 – 3, 2026',
  },
]

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HELPERS                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function getTimeLeft(target) {
  const diff    = Math.max(0, target - Date.now())
  const seconds = Math.floor(diff / 1000)
  return {
    days:    Math.floor(seconds / 86400),
    hours:   Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600)  / 60),
    seconds: seconds % 60,
  }
}

const pad = (n) => n.toString().padStart(2, '0')

/* Given the sorted event dates, return a 0-1 fill fraction
   representing how far through the overall timeline we are today */
function getTimelineProgress() {
  const now   = Date.now()
  const start = TIMELINE_EVENTS[0].date.getTime()
  const end   = TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].date.getTime()
  if (now <= start) return 0
  if (now >= end)   return 1
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
  useEffect(() => {
    const oldScript = document.getElementById('devfolio-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'devfolio-script';
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      const currentScript = document.getElementById('devfolio-script');
      if (currentScript) currentScript.remove();
    }
  }, []);

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

  useEffect(() => {
    const updateCountdown = () => setTime(getTimeLeft(target))
    const timeoutId = setTimeout(updateCountdown, 0)
    const intervalId = setInterval(updateCountdown, 1000)
    return () => { clearTimeout(timeoutId); clearInterval(intervalId) }
  }, [target])

  const units = [
    { label: 'DAYS',    value: time?.days    },
    { label: 'HOURS',   value: time?.hours   },
    { label: 'MINUTES', value: time?.minutes },
    { label: 'SECONDS', value: time?.seconds },
  ]
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 animate-pulse rounded-full bg-[#FF8C00]" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-gray-400 uppercase">Countdown to Launch</span>
      </div>
      {/* Reduced gap on mobile so it doesn't overflow */}
      <div className="flex items-end gap-2 sm:gap-6">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-end gap-2 sm:gap-6">
            <div className="flex flex-col items-center">
              {/* Reduced mobile text size to 3xl */}
              <span className="font-heading text-3xl font-black tabular-nums text-[#E4E3D1] sm:text-5xl" style={{ textShadow: '0 0 20px rgba(164,200,117,0.4)' }}>
                {unit.value == null ? '--' : pad(unit.value)}
              </span>
              <span className="mt-0.5 font-mono text-[7px] sm:text-[8px] tracking-[0.22em] text-gray-500 uppercase">{unit.label}</span>
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="War-tech layout" className="size-full object-cover object-center" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>
      <SiteHeader />
      {/* Added pt-32 on mobile to ensure the header doesn't cover the top text */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-8 lg:pt-20">
        
        <p className="font-mono text-[9px] font-bold tracking-[0.4em] text-[#FF8C00] sm:text-xs drop-shadow-sm">
          IEDC MACE PRESENTS
        </p>
        
        {/* Adjusted mobile font size to text-[3.5rem] for better fitting */}
        <h1 className="mt-3 font-heading font-black leading-[0.92] tracking-tight text-[#a4c875] text-[3.5rem] sm:text-7xl lg:text-[6rem] xl:text-[7rem]" style={{ textShadow: '0 0 60px rgba(164,200,117,0.4)' }}>
          HACKIFY 3.O
        </h1>
        
        <p className="mt-3 font-heading text-base font-semibold tracking-[0.45em] text-[#E4E3D1] sm:text-2xl drop-shadow-md">
          HACK TO DEFY
        </p>
        
        {/* Swapped to flex-col on very small screens to prevent wrapping issues */}
        <div className="mt-5 flex flex-wrap justify-center gap-x-2 font-mono text-[9px] tracking-[0.07em] text-gray-400 sm:text-xs">
          <span><span className="text-[#FF8C00] font-bold text-base leading-none align-middle">&gt;</span> STATUS: 36-HR SPRINT</span>
          <span className="hidden sm:inline text-gray-600">{'//'}</span>
          <span>DIRECTIVE: PREDICT <span className="text-gray-600">|</span> PROTECT <span className="text-gray-600">|</span> REBUILD</span>
        </div>
        
        <div className="mt-9 flex w-full max-w-xs flex-col items-center gap-4">
          <DevfolioButton />
          
          <button
            onClick={() => setShowBrief(true)}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-black/50 border border-[#a4c875] font-sans text-xs sm:text-sm font-bold tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(164,200,117,0.6)] hover:bg-[#a4c875]/10"
            style={{ clipPath: 'polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)' }}
          >
            <FileText className="size-4 shrink-0 text-[#a4c875]" strokeWidth={1.8} />
            MISSION BRIEF
          </button>
        </div>
        
        <div className="mt-10 w-full"><CountdownInline targetDate={LAUNCH_DATE} /></div>
        <div className="mt-8 w-full"><StatCards /></div>
      </div>

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

          {/* Added max-h-[90vh] and overflow-y-auto to allow scrolling on small devices */}
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
              
              <p>
                <span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ INCOMING TRANSMISSION ]</span>
                It is back with another edition this year where creators, innovators, and any one of you can come to the front lane and pitch the idea which is worth for the battlefield.
              </p>
              
              <p>
                <span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ THE SPRINT ]</span>
                The grueling 36 hours of battle, in and out, ending with a reign of your own creative territory—which is worth the struggle.
              </p>
              
              <p>
                <span className="text-[#FF8C00] font-bold mr-2 block sm:inline">[ ELIGIBILITY ]</span>
                You being a fresh recruit or seasoned armed force doesn't matter, cause its your field to win.
              </p>
              
              <div className="my-6 bg-[#a4c875]/5 border border-[#a4c875]/20 p-4 rounded-sm">
                <p className="text-white text-xs sm:text-base font-bold tracking-widest uppercase">
                  <span className="text-[#FF8C00] mr-2">&gt;</span>Your objective is clear: <br className="sm:hidden mt-2" />
                  <span className="text-[#a4c875] sm:mt-1 inline-block">BUILD. OPTIMIZE. SURVIVE.</span>
                </p>
              </div>
              
              <p className="text-white/80 italic tracking-wide">
                Are you ready to defend your idea??? The field is waiting.
              </p>

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


function RegistrationPartnerSection() {
  return (
    <section id="sponsors" className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 bg-[#0f110b] border-t border-b border-white/10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tighter text-[#a4c875] uppercase sm:text-5xl md:text-7xl">
            Primary Sponsor
          </h2>
          <p className="text-[9px] uppercase tracking-[0.38em] text-[#a4c875] font-semibold sm:text-[10px]">
            PLATFORM SPONSOR & REGISTRATION PARTNER
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Devfolio
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-[#cec6b4] sm:text-base">
            DEVFOLIO is the official registration partner and platform sponsor for HACKIFY 3.O, managing team onboarding, registrations, and participant submissions with secure event workflow and seamless organizer support.
          </p>
        </div>

        <a
          href="https://devfolio.co/"
          target="_blank"
          rel="noreferrer noopener"
          className="group mx-auto block max-w-sm overflow-hidden rounded-3xl border border-[#a4c875]/20 bg-[#10130d] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#a4c875]/40"
        >
          <div className="flex items-center justify-center rounded-3xl bg-[#12160f] p-8 transition-colors duration-300 group-hover:bg-[#171d13]">
            {/* The exact image and alt text the bot needs */}
            <img
              src="/Devfolio_Logo-White.png"
              alt="Devfolio"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a4c875]">
              Visit the registration portal
            </p>
            <p className="mt-3 text-sm leading-6 text-[#d7d7c8]">
              Click the Devfolio logo to open the official registration website and submit your hackathon entry.
            </p>
          </div>
        </a>
      </div>
    </section>
  )
}
/* ─────────────────────────────────────────────────────────────────────────── */
/* TRACKS / STRATEGIC SECTORS — Tactical Grid with Framer Motion              */
/* ─────────────────────────────────────────────────────────────────────────── */
function TracksSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="tracks" className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8 bg-background">
      {/* Left-Aligned Section Header */}
      <div className="mb-16 text-left">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl uppercase">
          STRATEGIC SECTORS
        </h2>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-primary/60">
          Innovation Tracks
        </p>
      </div>

      {/* Grid Container */}
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6"
      >
        {tracks.map((track, i) => {
          const Icon = track.icon
          let spanClass = 'lg:col-span-3'
          if (i >= 4) spanClass = 'lg:col-span-2'

          return (
            <motion.div
              key={track.title}
              variants={cardVariants}
              className={`group relative ${spanClass}`}
            >
              <div className="absolute top-2 left-2 -z-10 h-full w-full bg-white transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="relative flex h-full flex-col overflow-hidden border border-white/20 bg-[#0a0a0a] p-6 transition-colors duration-300 group-hover:border-transparent">
                
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,#a4c875_360deg)] animate-[spin_3s_linear_infinite]" />
                  <div className="absolute inset-[1px] z-10 bg-[#0a0a0a]" />
                </div>

                <div className="relative z-20">
                  <div className="mb-6 flex items-center justify-between border-b border-white/20 pb-4">
                    <span className="bg-primary/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-primary border border-primary/20">
                      [ SECTOR {String(i + 1).padStart(2, '0')} ]
                    </span>
                    <Icon className="size-5 text-white/50 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>

                  <h3 className="mb-3 font-heading text-lg font-bold text-white uppercase tracking-wide">
                    {track.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#B8B8B8]">
                    {track.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
/* ─────────────────────────────────────────────────────────────────────────── */
/*  TIMELINE SECTION — vertical pipeline with animated liquid fill            */
/* ─────────────────────────────────────────────────────────────────────────── */
function TimelineSection() {
  const sectionRef  = useRef(null)
  const [inView, setInView]       = useState(false)
  const [fillPct, setFillPct]     = useState(0)
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
    <section id="timeline" ref={sectionRef} className="py-24 bg-[#111] border-y border-white/5 relative overflow-hidden">
      {/* Subtle radial bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(164,200,117,0.03)_0%,transparent_70%)]" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
       {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#a4c875] tracking-tight uppercase">Program Timeline</h2>
          <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-[#a4c875]/60 uppercase">Hackify 3.O</p>
          <p className="mt-3 text-[#B8B8B8] text-sm">MACE Kothamangalam · 36-Hour Offline Sprint · Oct 1–3, 2026</p>
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
                      opacity:    inView ? (isLeft ? 1 : 0.35) : 0,
                      transform:  inView ? 'translateX(0)' : 'translateX(-16px)',
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
                      opacity:    inView ? (!isLeft ? 1 : 0.35) : 0,
                      transform:  inView ? 'translateX(0)' : 'translateX(16px)',
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
              const nodePos    = i / (totalEvents - 1)
              const nodeActive = fillPct >= nodePos - 0.01
              const status     = getEventStatus(event)
              return (
                <div
                  key={event.id}
                  className="relative"
                  style={{
                    opacity:    inView ? 1 : 0,
                    transform:  inView ? 'translateX(0)' : 'translateX(-12px)',
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

      {/* Wrapping the site in overflow-hidden until it loads prevents weird jumping */}
      <div className={`min-h-screen bg-[#0d1009] text-white font-command relative overflow-x-hidden ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
        <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
        
        <HeroSection />
        <RegistrationPartnerSection />
        <TracksSection />
        <TimelineSection />
        <SiteFooter />
        <ScrollToTop />
      </div>
    </>
  )
}
