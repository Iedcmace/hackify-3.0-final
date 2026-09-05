'use client'

import { useState } from 'react'
import { Menu, X, Home, Cpu, Clock, Image, HelpCircle, Users, Building2, Mail, FileText } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'HOME',       href: '/', icon: Home },
  { label: 'TRACKS',     href: '/#tracks', icon: Cpu },
  { label: 'TIMELINE',   href: '/#timeline', icon: Clock },
  { label: 'GALLERY',    href: '/#gallery', icon: Image },
  { label: 'FAQ',        href: '/#faq', icon: HelpCircle },
  { label: 'TEAM',       href: '/team', icon: Users },
  { label: 'SPONSORS',   href: '/sponsors', icon: Building2 },
  { label: 'NEWSLETTER', href: '/#newsletter', icon: FileText },
  { label: 'CONTACT',    href: '/#contact', icon: Mail },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    // Hide header if scrolling down, show if scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true)
      setOpen(false) // Close menu when hiding header
    } else {
      setHidden(false)
    }

    // Add blur/background only after scrolling past top
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-300"
    >
      <nav className="mx-auto flex max-w-[820px] w-full items-center justify-center px-2 py-3 sm:px-4 sm:py-4">
        
        {/* LEFT: Removed logos/text as requested. Keeping placeholder a tag to preserve layout structure. */}
        <Link href="/" className="sr-only" aria-label="Hackify home">Hackify home</Link>

        {/* CENTER: Desktop Navigation Links */}
        <ul className={`hidden items-center gap-3 rounded-full border px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-300 lg:flex xl:gap-5 ${isScrolled ? 'border-[#a4c875]/45 bg-[#050805]/85' : 'border-white/25 bg-black/50'}`}>
          {NAV_LINKS.map((link) => {
                      const Icon = link.icon
                      return (
                        <li key={link.label} className="group relative">
                          <a
                            href={link.href}
                            className="relative z-10 flex items-center gap-2 rounded-md px-2.5 py-1.5 font-sans text-[11px] font-semibold tracking-[0.10em] text-white/75 transition-colors hover:text-[#a4c875] xl:text-xs"
                          >
                            {/* Icon appears on hover — kept in DOM for layout but hidden until hover */}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#a4c875]"><Icon className="size-4" /></span>
                            <span className="sr-only">{link.label} icon</span>
                            <span className="ml-0">{link.label}</span>
                          </a>

                          {/* Hover rectangle outline — only visible on hover */}
                          <span className="pointer-events-none absolute inset-0 m-0 rounded-md border-2 border-transparent transition-all duration-200 group-hover:border-[#a4c875]"></span>
                        </li>
                      )
                    })}
        </ul>

        {/* RIGHT: Mobile Menu Toggle (Logo removed) */}
        <div className="absolute right-4 flex items-center gap-3 sm:right-6 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/55 p-2 text-white/80 shadow-lg backdrop-blur-md transition-colors hover:border-[#a4c875]/50 hover:text-[#a4c875] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN - Tactical glassmorphism style */}
      {open && (
        <div className="mx-4 mb-2 rounded-3xl border border-[#a4c875]/30 bg-[#0d140b]/95 p-3 shadow-[0_0_20px_rgba(164,200,117,0.1)] backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
                          const Icon = link.icon
                          return (
                            <li key={link.label} className="flex">
                              <a 
                                href={link.href} 
                                onClick={() => setOpen(false)} 
                                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-sans text-sm font-bold tracking-[0.12em] text-white/65 transition-colors hover:bg-[#a4c875]/10 hover:text-[#a4c875]"
                              >
                                <span className="text-[#a4c875]"><Icon className="size-4" /></span>
                                <span>{link.label}</span>
                              </a>
                            </li>
                          )
                        })}
          </ul>
        </div>
      )}
    </motion.header>
  )
}