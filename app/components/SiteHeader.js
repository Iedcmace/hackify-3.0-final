'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'TRACKS',     href: '/#tracks' },
  { label: 'TIMELINE',   href: '/#timeline' },
  { label: 'SPONSORS',   href: '/sponsors' },
  { label: 'GALLERY',    href: '/gallery' },
  { label: 'TEAM',       href: '/team' },
  { label: 'CONTACT',    href: '#contact' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        
        {/* LEFT: IEDC Logo + Hackify Title */}
        <a href="/" className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity">
          <img 
            src="/iedc-logo-transparent.png" 
            alt="IEDC Logo" 
            className="h-8 sm:h-10 w-auto object-contain" 
          />
          <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#a4c875] hidden sm:block">
            HACKIFY 3.O
          </span>
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

        {/* RIGHT: KSUM Logo + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Removed 'hidden sm:block' so it shows on mobile! */}
          <img 
            src="/ksum-logo-transparent.png" 
            alt="KSUM Logo" 
            className="h-8 sm:h-10 w-auto object-contain" 
          />
          
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

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="mx-4 mb-2 rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-4 backdrop-blur-xl lg:hidden">
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
    </header>
  )
}