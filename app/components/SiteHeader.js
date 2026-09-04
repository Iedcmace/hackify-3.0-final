'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'HOME',       href: '/' },
  { label: 'TRACKS',     href: '/#tracks' },
  { label: 'TIMELINE',   href: '/#timeline' },
  { label: 'GALLERY',    href: '/#gallery' },
  { label: 'FAQ',        href: '/#faq' },
  { label: 'TEAM',       href: '/team' },
  { label: 'SPONSORS',   href: '/sponsors' },
  { label: 'CONTACT',    href: '/#contact' },
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
      <nav className="mx-auto flex max-w-fit items-center justify-center px-3 py-3 sm:px-5 sm:py-4">
        
        {/* LEFT: Removed logos/text as requested. Keeping placeholder a tag to preserve layout structure. */}
        <Link href="/" className="sr-only" aria-label="Hackify home">Hackify home</Link>

        {/* CENTER: Desktop Navigation Links */}
        <ul className={`hidden items-center gap-6 rounded-full border px-6 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-300 lg:flex xl:gap-8 ${isScrolled ? 'border-[#a4c875]/45 bg-[#050805]/85' : 'border-white/25 bg-black/50'}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                className="font-sans text-xs font-semibold tracking-[0.16em] text-white/60 transition-colors hover:text-[#d8ff7a] xl:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
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
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  onClick={() => setOpen(false)} 
                  className="block rounded-md px-3 py-2.5 font-sans text-sm font-semibold tracking-[0.15em] text-white/55 transition-colors hover:bg-[#a4c875]/10 hover:text-[#a4c875]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  )
}