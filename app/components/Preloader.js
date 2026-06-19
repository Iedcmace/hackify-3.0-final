'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────────────────── */
/* TACTICAL SYSTEM BOOT PRELOADER                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function Preloader({ onLoaded }) {
  useEffect(() => {
    // 1. Force a minimum animation time (2.5 seconds) to show off the boot sequence
    const minTime = new Promise(resolve => setTimeout(resolve, 2500))
    
    // 2. Wait for the browser to finish loading all images and assets
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', resolve)
      }
    })

    // 3. When BOTH the timer and the browser loading are done, trigger the exit!
    Promise.all([minTime, windowLoad]).then(() => {
      onLoaded()
    })
  }, [onLoaded])

  return (
    <motion.div
      key="preloader"
      // Smoothly scales up and fades into a blur when exiting
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0d1009] overflow-hidden"
    >
      {/* Background Matrix & Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(164,200,117,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(164,200,117,0.06),rgba(164,200,117,0.02),rgba(164,200,117,0.06))] bg-[length:100%_2px,3px_100%] z-0" />

      <div className="relative flex size-40 sm:size-48 items-center justify-center z-10">
        {/* Outer Radar Ring Animation */}
        <motion.svg 
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Faint Background Track */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.05" />
          
          {/* Glowing Animated Loading Bar */}
          <motion.circle 
            cx="50" cy="50" r="48" 
            fill="none" 
            stroke="#a4c875" 
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(164,200,117,0.5))' }}
          />
        </motion.svg>

        {/* Center IEDC Logo (Using your transparent PNG!) */}
        <motion.img 
          src="/iedc-logo-transparent.png" 
          alt="IEDC Logo"
          className="size-20 sm:size-24 object-contain relative z-10"
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Boot Sequence Text */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1.2 }}
        className="mt-12 flex flex-col items-center gap-3 text-center z-10 px-4"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cyber Orange Blip */}
          <span className="size-1.5 sm:size-2 bg-[#FF8C00] animate-pulse shadow-[0_0_8px_#FF8C00]" />
          <span className="font-heading text-xs sm:text-sm font-bold tracking-[0.3em] sm:tracking-[0.4em] text-[#a4c875] uppercase">
            Initializing War-Tech Systems...
          </span>
        </div>
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#c2ccb9]/50 uppercase">
          Loading Assets // Securing Connection
        </span>
      </motion.div>
    </motion.div>
  )
}