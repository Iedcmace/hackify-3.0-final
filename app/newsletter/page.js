'use client';
import React, { useEffect } from 'react';

export default function NewsletterPage() {
  
  // Tactical hover interface sound trigger
  useEffect(() => {
    document.querySelectorAll('button, input, a').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
        audio.volume = 0.05;
        audio.play().catch(() => {});
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#13140a] text-white font-mono relative overflow-x-hidden">
      {/* Fixed Matrix Grid Overlay Layer */}
      <div className="fixed inset-0 matrix-overlay pointer-events-none z-0 opacity-15" />

      {/* Atmospheric Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />
      
      {/* Global Tactical Header Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 rounded-lg border border-white/10 bg-[#13140a]/60 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
        <a href="/" className="flex flex-col leading-none hover:opacity-80 transition-opacity">
          <span className="font-stencil-military font-bold text-xl text-[#a69146] tracking-tighter">HACKIFY '26</span>
          <span className="text-[10px] uppercase tracking-widest text-[#a69146]/60 mt-0.5 font-mono-tech">3rd Edition</span>
        </a>
        <div className="hidden md:flex gap-8 text-xs font-bold font-mono-tech text-white/70">
          <a href="/#strategy" className="hover:text-[#a69146] transition-colors tracking-widest">STRATEGY</a>
          <a href="/#timeline" className="hover:text-[#a69146] transition-colors tracking-widest">TIMELINE</a>
          <a href="/#tracks" className="hover:text-[#a69146] transition-colors tracking-widest">TRACKS</a>
          <a href="/sponsors" className="hover:text-[#a69146] transition-colors tracking-widest">SPONSORS</a>
          <a href="/gallery" className="hover:text-[#a69146] transition-colors tracking-widest">GALLERY</a>
          <a href="/team" className="hover:text-[#a69146] transition-colors tracking-widest">TEAM</a>
          <a href="/newsletter" className="text-[#ddc574] transition-colors tracking-widest border-b border-[#ddc574] pb-1">NEWSLETTER</a>
        </div>
        <button className="bg-[#a69146] text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#ddc574] transition-all font-mono-tech duration-300">
          ENLIST NOW
        </button>
      </nav>

      {/* Stitch Newsletter Terminal Component */}
      <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 px-8 relative z-10">
        <div className="max-w-3xl w-full relative z-10">
          <div 
            className="relative border-4 border-[#3D301D] bg-[#1b1c11] p-12 md:p-16 group transition-all duration-500"
            style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
          >
            {/* HUD Header Labels */}
            <div className="absolute top-4 right-8 font-mono-tech text-[10px] text-[#a69146]/60 tracking-[0.3em] uppercase">
              ID: COMMS-99X
            </div>

            <div className="space-y-8">
              {/* Title Section */}
              <div className="space-y-2 border-l-4 border-[#a69146] pl-6">
                <h2 className="text-5xl md:text-6xl font-stencil-military text-[#ddc574] tracking-tighter">
                  INTEL FEED
                </h2>
                <p className="font-mono-tech text-[#a69146] text-xs uppercase tracking-[0.4em] font-bold">
                  Secure Encrypted Comms Channel
                </p>
              </div>

              {/* Description */}
              <p className="font-mono-tech text-[#cec6b4] text-sm md:text-base leading-relaxed max-w-xl">
                Subscribe to receive critical mission updates, drop coordinates, and technical briefings directly to your terminal.
              </p>

              {/* Input Form */}
              <form className="space-y-6 pt-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group/input">
                  <input 
                    type="email" 
                    placeholder="ENTER COMM-LINK (EMAIL)" 
                    className="w-full bg-[#0e0f05] border border-[#3D301D] px-6 py-4 font-mono-tech text-sm text-[#e4e3d1] placeholder:text-[#cec6b4]/30 focus:outline-none focus:border-[#a69146] transition-colors"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#a69146] group-focus-within/input:w-full transition-all duration-500" />
                </div>

                <div className="flex items-center gap-3 font-mono-tech text-[10px] text-[#a69146]/60 uppercase tracking-widest">
                  <div className="w-2 h-2 bg-[#a69146] animate-pulse rounded-sm" />
                  Awaiting Input...
                </div>

                <button className="w-full bg-[#a69146] hover:bg-[#ddc574] text-[#0e0f05] font-stencil-military text-xl py-5 transition-all duration-300 transform active:scale-[0.98] tracking-widest cursor-crosshair">
                  ESTABLISH CONNECTION
                </button>
              </form>
            </div>

            {/* Corner HUD Bracket Markers */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#a69146] opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#a69146] opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Internal Footer Decoration */}
          <div className="mt-8 flex justify-between items-center opacity-30">
            <div className="font-mono-tech text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Status: Ready
            </div>
            <div className="font-mono-tech text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Encryption: AES-256
            </div>
          </div>
        </div>
      </section>

      {/* Global Comms Footer Layout */}
      <footer className="bg-[#0e0f05] border-t-2 border-white/10 py-16 px-8 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div className="font-stencil-military font-bold text-2xl text-[#a69146] tracking-tighter">HACKIFY '26</div>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed font-mono-tech">
              Operated by IEDC MACE & KSUM.<br/>
              Encrypted Terminal ID: 09-AF-2026.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 font-mono-tech">
            <div>
              <h5 className="text-xs font-bold text-[#a69146] tracking-widest mb-4 uppercase">CONTACT LEADS</h5>
              <div className="text-xs space-y-2 text-white/60 uppercase">
                <p>Amal Narayan</p>
                <p>Gopika</p>
                <p>Christy</p>
                <p>Anirudh</p>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#a69146] tracking-widest mb-4 uppercase">SECURE CHANNELS</h5>
              <div className="text-xs space-y-2 text-white/60">
                <p className="lowercase">iedcmaceofficial@gmail.com</p>
                <p className="uppercase">IG / @iedcmace</p>
              </div>
            </div>
          </div>
          <div className="text-right font-mono-tech text-white/20 text-[10px] space-y-0.5">
            <p>SYS.STATUS: NOMINAL</p>
            <p>ENCRYPTION: AES-256 GCM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}