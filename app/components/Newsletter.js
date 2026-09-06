'use client'
import { useEffect, useRef } from 'react'

/* Mobile-only step badges */
const FLOW_STEPS = ['ENLIST.', 'GET BRIEFED.', 'DEPLOY FIRST.']

/* ── Desktop only: animated zigzag flow ───────────────────── */
function ZigzagFlow() {
  return (
    <div className="relative hidden lg:block w-[240px] h-[300px] shrink-0">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 240 300"
        fill="none"
      >
        <path
          d="M120 45 C 195 45, 195 115, 120 145 C 45 175, 45 240, 120 260"
          stroke="#a4c875"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="6 7"
          strokeLinecap="round"
        />
      </svg>

      {FLOW_STEPS.map((step, i) => (
        <div
          key={step}
          className="absolute w-[195px] rounded-2xl border border-[#a4c875]/20 bg-[#16210f] px-5 py-3.5 shadow-[0_0_20px_rgba(164,200,117,0.08)]"
          style={{ top: [0, 115, 233][i], left: [0, 45, 0][i] }}
        >
          <span className="font-heading text-sm font-bold uppercase tracking-wide text-[#E4E3D1]">
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Mobile-only: horizontal step row ────────────────────── */
function MobileSteps() {
  return (
    <div className="flex lg:hidden w-full items-center justify-center gap-2 mb-5">
      {FLOW_STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="font-heading text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#a4c875] bg-[#a4c875]/10 border border-[#a4c875]/30 px-2.5 py-1 rounded">
            {step}
          </span>
          {i < FLOW_STEPS.length - 1 && (
            <span className="text-[#a4c875]/30 text-xs">›</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Newsletter() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Stop the form from loading twice in React strict mode
    if (containerRef.current.children.length > 0) return

    // Fallback input shown while the external kit loads
    const fallback = document.createElement('div')
    fallback.className = 'newsletter-fallback-wrap w-full'
    fallback.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
        <input aria-label="email" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(164,200,117,0.25);padding:10px 14px;color:#fff;font-family:monospace;font-size:12px;outline:none;" placeholder="ENTER EMAIL ADDRESS..." />
        <button style="width:100%;background:#a4c875;color:#0a0c08;font-weight:700;font-family:monospace;font-size:11px;letter-spacing:3px;padding:11px;text-transform:uppercase;cursor:pointer;">ENLIST</button>
      </div>
    `
    containerRef.current.appendChild(fallback)

    const script = document.createElement('script')
    script.src = 'https://iedc-mace.kit.com/6fa16b58f5/index.js'
    script.setAttribute('data-uid', '6fa16b58f5')
    script.async = true

    // Once kit injects the real form, remove fallback
    const observer = new MutationObserver(() => {
      if (containerRef.current && containerRef.current.children.length > 1) {
        const fw = containerRef.current.querySelector('.newsletter-fallback-wrap')
        if (fw) fw.remove()
        observer.disconnect()
      }
    })
    observer.observe(containerRef.current, { childList: true })

    containerRef.current.appendChild(script)
  }, [])

  return (
    <section
      id="newsletter"
      className="w-full py-14 md:py-20 bg-[#0d1009] border-t border-[#a4c875]/20 relative z-10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">

          {/* Desktop zigzag sidebar */}
          <ZigzagFlow />

          {/* Main card */}
          <div className="w-full min-w-0">
            {/* Heading */}
            <div className="mb-5 text-center lg:text-left">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#a4c875]">
                Request Intel
              </h3>
              <p className="mt-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#a4c875]/60">
                Hackify 3.O // Field Updates
              </p>
            </div>

            {/* Mobile step row */}
            <MobileSteps />

            {/* Kit form wrapper — key trick: overflow-x-auto + max-w-full keeps form from blowing out on small screens */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#a4c875]/25 bg-[#081009]/80 shadow-[0_0_40px_rgba(164,200,117,0.10)]">
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#a4c875]/70 via-transparent to-[#a4c875]/40" />

              {/*
                The kit form has `min-width="400 ..."` attributes that make it overflow on mobile.
                We use a scale-down technique: the inner div is allowed to be its natural width,
                but we clip it. On xs screens we add extra horizontal padding so the form
                can breathe without the page scrolling.
              */}
              <div
                className="w-full overflow-x-auto"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div
                  ref={containerRef}
                  className="w-full min-w-0"
                  style={{ minHeight: 140 }}
                />
              </div>
            </div>

            {/* Mobile note */}
            <p className="mt-3 text-center lg:text-left font-mono text-[9px] sm:text-[10px] text-[#a4c875]/40 uppercase tracking-widest">
              Scroll horizontally if the form overflows on small screens
            </p>
          </div>
        </div>
      </div>

      {/*
        Inject a global style to force the external kit form to be
        100% wide and remove its own internal horizontal padding on mobile
      */}
      <style>{`
        .formkit-form[data-uid="6fa16b58f5"] {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
        }
        .formkit-form[data-uid="6fa16b58f5"] [data-style="minimal"] {
          padding: 20px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        @media (max-width: 480px) {
          .formkit-form[data-uid="6fa16b58f5"] [data-style="minimal"] {
            padding: 16px 14px !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-header h2 {
            font-size: 20px !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-subheader p {
            font-size: 12px !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-fields {
            flex-direction: column !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-field,
          .formkit-form[data-uid="6fa16b58f5"] .formkit-submit {
            flex: 1 0 100% !important;
            min-width: 0 !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-input {
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .formkit-form[data-uid="6fa16b58f5"] .formkit-submit button {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}