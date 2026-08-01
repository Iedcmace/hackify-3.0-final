'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0d140b]/80 backdrop-blur-xl border-b border-[#a4c875]/20 shadow-[0_4px_30px_rgba(164,200,117,0.1)]' : 'bg-transparent border-transparent'}`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        
        {/* LEFT: Removed logos/text as requested. Keeping placeholder a tag to preserve layout structure. */}
        <a href="/" className="flex items-center gap-2 sm:gap-4 hover:opacity-80 transition-opacity">
        </a>

        {/* CENTER: Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                className="font-sans text-sm font-semibold tracking-[0.15em] text-white/55 transition-colors hover:text-[#a4c875]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT: Mobile Menu Toggle (Logo removed) */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-white/20 p-1.5 sm:p-2 text-white/80 hover:text-[#a4c875] hover:border-[#a4c875]/50 transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN - Tactical glassmorphism style */}
      {open && (
        <div className="mx-4 mb-2 rounded-xl border border-[#a4c875]/30 bg-[#0d140b]/90 p-4 backdrop-blur-xl lg:hidden shadow-[0_0_20px_rgba(164,200,117,0.1)]">
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