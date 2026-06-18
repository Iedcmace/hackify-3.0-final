'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SiteFooter from './components/SiteFooter'
import {
  Menu, X, FileText, ChevronDown,
  Clock, Users, Crosshair,
  Shield, Wifi, Heart, Eye, Building2, Lightbulb, Cpu,
  Phone, Mail, Link, Share2
} from 'lucide-react'
const WhatsAppIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
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
/* NAVBAR                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-heading text-2xl font-black tracking-tight text-primary sm:text-3xl">HACKIFY 3.O</span>
          <span className="mt-1 font-mono text-[10px] tracking-[0.35em] text-primary/50">3RD EDITION</span>
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="font-sans text-sm font-semibold tracking-[0.15em] text-white/55 transition-colors hover:text-primary">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-4 mb-2 rounded-xl border border-border bg-card/95 p-4 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 font-sans text-sm font-semibold tracking-[0.15em] text-white/55 transition-colors hover:bg-primary/10 hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  STAT CARDS                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function StatCards() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 divide-y divide-primary/20 rounded-xl border border-primary/25 bg-black/30 backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {STATS.map((stat) => (
        <div key={stat.title} className="flex items-center justify-center gap-3 px-4 py-3">
          <stat.icon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-[11px] font-bold tracking-wide text-primary">{stat.title}</span>
            <span className="font-sans text-[9px] tracking-[0.12em] text-white/40">{stat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  COUNTDOWN                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
function CountdownInline({ targetDate }) {
  const target = new Date(targetDate).getTime()
  const [time, setTime] = useState(null)

  useEffect(() => {
    const updateCountdown = () => setTime(getTimeLeft(target))
    const timeoutId = setTimeout(updateCountdown, 0)
    const intervalId = setInterval(updateCountdown, 1000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
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
        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-primary/60 uppercase">Countdown to Launch</span>
      </div>
      <div className="flex items-end gap-3 sm:gap-6">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-end gap-3 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-heading text-4xl font-black tabular-nums text-primary sm:text-5xl" style={{ textShadow: '0 0 22px rgba(216,255,122,0.55)' }}>
                {unit.value == null ? '--' : pad(unit.value)}
              </span>
              <span className="mt-0.5 font-mono text-[8px] tracking-[0.22em] text-primary/45 uppercase">{unit.label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-4 font-heading text-2xl font-bold text-primary/25 sm:text-3xl" aria-hidden="true">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HERO SECTION                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
/* HERO SECTION                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="War-tech layout" className="size-full object-cover object-center" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>
      <Navbar />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-8 lg:pt-20">
        <p className="font-mono text-[10px] font-semibold tracking-[0.4em] text-orange-500/80 sm:text-xs">IEDC MACE PRESENTS</p>
        
        {/* Hackify 3.0 stays in the original primary color! */}
        <h1 className="mt-3 font-heading font-black leading-[0.92] tracking-tight text-primary text-6xl sm:text-7xl lg:text-[6rem] xl:text-[7rem]" style={{ textShadow: '0 0 60px rgba(216,255,122,0.4)' }}>
          HACKIFY 3.O
        </h1>
        
        <p className="mt-3 font-heading text-lg font-semibold tracking-[0.45em] text-orange-400 sm:text-2xl">HACK TO DEFY</p>
        
        <p className="mt-5 font-mono text-[10px] tracking-[0.07em] text-orange-400/80 sm:text-xs">
          <span className="text-orange-500">&gt;</span>{' '}STATUS: 36-HR NATIONAL SPRINT&nbsp;
          <span className="text-orange-500/50">{'//'}</span>&nbsp;DIRECTIVE: PREDICT&nbsp;
          <span className="text-orange-500/50">|</span>&nbsp;PROTECT&nbsp;
          <span className="text-orange-500/50">|</span>&nbsp;REBUILD
        </p>
        
        {/* Cleaned CTA Container for proper alignment */}
        <div className="mt-9 flex w-full max-w-xs flex-col items-center gap-4">
          <DevfolioButton />
          <a
            href="#brief"
            className="inline-flex h-12 w-full items-center justify-center gap-2 bg-primary font-sans text-sm font-bold tracking-[0.22em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            style={{ clipPath: 'polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)', boxShadow: '0 0 28px rgba(216,255,122,0.3)' }}
          >
            <FileText className="size-4 shrink-0" strokeWidth={1.8} />
            MISSION BRIEF
          </a>
        </div>
        
        <div className="mt-10"><CountdownInline targetDate={LAUNCH_DATE} /></div>
        <div className="mt-8"><StatCards /></div>
      </div>
      <div className="absolute inset-x-0 bottom-4 z-10 hidden flex-col items-center gap-1 lg:flex">
        <span className="font-mono text-[9px] tracking-[0.32em] text-primary/45 uppercase">Scroll to Explore</span>
        <ChevronDown className="size-4 animate-bounce text-primary/55" strokeWidth={2} />
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
                  <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,#D8FF7A_360deg)] animate-[spin_3s_linear_infinite]" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,255,122,0.03)_0%,transparent_70%)]" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
       {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#D8FF7A] tracking-tight uppercase">Program Timeline</h2>
          <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-[#D8FF7A]/60 uppercase">Hackify 3.O</p>
          <p className="mt-3 text-[#B8B8B8] text-sm">MACE Kothamangalam · 36-Hour Offline Sprint · Oct 1–3, 2026</p>
        </div> 

        {/* ── DESKTOP: vertical pipeline ─────────────────────────────────── */}
        <div className="hidden sm:block relative">
          {/* Track line — background */}
          <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-white/8 rounded-full" />

          {/* Animated fill overlay */}
          <div
            className="absolute left-[calc(50%-1px)] top-0 w-0.5 rounded-full bg-gradient-to-b from-[#D8FF7A] to-[#D8FF7A]/40 transition-none"
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
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[#D8FF7A]/60 uppercase mb-0.5">{event.isoStr}</p>
                        <h4 className={`text-base font-bold mb-1 ${nodeActive ? 'text-white' : 'text-white/40'}`}>{event.label}</h4>
                        <p className="text-[#B8B8B8] text-xs leading-relaxed">{event.detail}</p>
                      </>
                    )}
                  </div>

                  {/* Centre node */}
                  <div className="relative z-10 flex shrink-0 size-14 items-center justify-center">
                    {/* Outer ring */}
                    <div className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${nodeActive ? 'border-[#D8FF7A]' : 'border-white/15'}`} />
                    {/* Fill */}
                    <div className={`size-5 rounded-full transition-all duration-700 ${nodeActive ? 'bg-[#D8FF7A] shadow-[0_0_14px_rgba(216,255,122,0.6)]' : 'bg-white/10'}`} />
                    {/* Pulse for current event */}
                    {status === 'current' && nodeActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#D8FF7A]/50 animate-ping" />
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
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[#D8FF7A]/60 uppercase mb-0.5">{event.isoStr}</p>
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
          <div className="absolute left-3 top-2 w-0.5 rounded-full bg-[#D8FF7A]/70" style={{ height: `${fillPct * 100}%` }} />

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
                  <div className={`absolute -left-[25px] top-1 size-4 rounded-full border-2 transition-colors duration-500 ${nodeActive ? 'border-[#D8FF7A] bg-[#D8FF7A]' : 'border-white/20 bg-transparent'}`}>
                    {status === 'current' && nodeActive && (
                      <div className="absolute inset-0 rounded-full border border-[#D8FF7A]/50 animate-ping" />
                    )}
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#D8FF7A]/60 uppercase mb-0.5">{event.isoStr}</p>
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
function Footer() {
  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/10 py-20 px-5 sm:px-8 relative z-10 flex flex-col items-center text-center">
      
      {/* Tactical Header */}
      <div className="mb-12">
        <span className="font-heading text-3xl font-black tracking-widest text-primary">HACKIFY 3.O</span>
        <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-primary/50 uppercase">
          End of Transmission
        </p>
      </div>

      {/* Comms Grid (Leads & Mail) */}
      <div className="mb-10 flex flex-col sm:flex-row gap-8 sm:gap-16 font-mono text-xs text-[#B8B8B8]">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-primary/70 uppercase tracking-widest border-b border-primary/20 pb-1 mb-1">Lead_01</span>
          <span className="text-white">Amal Narayan</span>
          <a href="tel:+919048372356" className="hover:text-primary transition-colors">+91 9048372356</a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-primary/70 uppercase tracking-widest border-b border-primary/20 pb-1 mb-1">Lead_02</span>
          <span className="text-white">Gopika</span>
          <a href="tel:+917558821825" className="hover:text-primary transition-colors">+91 7558821825</a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-primary/70 uppercase tracking-widest border-b border-primary/20 pb-1 mb-1">Comms_Net</span>
          <span className="text-white">Official Mail</span>
          <a href="mailto:iedcmaceofficial@gmail.com" className="hover:text-primary transition-colors">iedcmaceofficial@gmail.com</a>
        </div>
      </div>

      {/* Circled Social Icons */}
      <div className="flex gap-4 mb-12">
        {[
          { icon: InstagramIcon, href: 'https://www.instagram.com/iedcmace?igsh=MTUwdWRvMG53dnd2eg==' },
          { icon: WhatsAppIcon, href: 'https://chat.whatsapp.com/D56kFH0cq0k1ZawfH2Owy1?s=cl&p=a&ilr=1' },
          { icon: LinkedinIcon, href:   'https://www.linkedin.com/company/iedc-mace' },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:-translate-y-1 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(216,255,122,0.2)]"
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* System Status Footnote */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
          Operated by IEDC MACE & KSUM
        </p>
        <p className="font-mono text-[8px] text-primary/20 tracking-widest uppercase">
          SYS.STATUS: NOMINAL // RESEARCH MODE: ACTIVE
        </p>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PAGE ROOT                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  useEffect(() => {
    const els      = document.querySelectorAll('button, .tactical-card-container')
    const handlers = []
    els.forEach((el) => {
      const h = () => {
        const a = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3')
        a.volume = 0.05
        a.play().catch(() => {})
      }
      el.addEventListener('mouseenter', h)
      handlers.push([el, h])
    })
    return () => handlers.forEach(([el, h]) => el.removeEventListener('mouseenter', h))
  }, [])

  return (
    <div className="min-h-screen bg-[#111111] text-white font-command relative overflow-x-hidden">
      <div className="fixed inset-0 matrix-overlay pointer-events-none z-0 opacity-20" />
      <HeroSection />
      <TracksSection />
      <TimelineSection />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
