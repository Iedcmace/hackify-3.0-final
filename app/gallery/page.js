'use client';
import React, { useEffect } from 'react';

export default function GalleryPage() {
  
  // Tactical hover interface sound trigger
  useEffect(() => {
    document.querySelectorAll('button, .tactical-card-container, a').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
        audio.volume = 0.05;
        audio.play().catch(() => {});
      });
    });
  }, []);

  // Surveillance Archive Data
  const images = [
    { id: 'CAM_01', location: 'MAIN_ARENA', timestamp: '10:45:22', src: '/image_1.jpeg' },
    { id: 'CAM_02', location: 'SYSTEM_OVERRIDE', timestamp: '14:12:05', src: '/image_2.jpeg' },
    { id: 'CAM_03', location: 'DATA_VAULT', timestamp: '23:59:10', src: '/image_3.jpeg' },
    { id: 'CAM_04', location: 'PERIMETER_SEC', timestamp: '02:15:44', src: '/image_4.jpeg' },
    { id: 'CAM_05', location: 'WAR_ROOM', timestamp: '09:30:12', src: '/image_5.jpeg' },
    { id: 'CAM_06', location: 'LOGISTICS_HUB', timestamp: '18:22:01', src: '/image_6.jpeg' },
  ];

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
          <a href="/gallery" className="text-[#ddc574] transition-colors tracking-widest border-b border-[#ddc574] pb-1">GALLERY</a>
          <a href="/team" className="hover:text-[#a69146] transition-colors tracking-widest">TEAM</a>
          <a href="/newsletter" className="hover:text-[#a69146] transition-colors tracking-widest">NEWSLETTER</a>
        </div>
        <button className="bg-[#a69146] text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#ddc574] transition-all font-mono-tech duration-300">
          ENLIST NOW
        </button>
      </nav>

      {/* Stitch Gallery Section Component */}
      <section className="pt-32 pb-24 px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Section */}
          <div className="border-l-4 border-[#a69146] pl-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#a69146] animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-stencil-military text-[#ddc574] tracking-tighter">
                SURVEILLANCE ARCHIVE
              </h2>
            </div>
            <p className="font-mono-tech text-[#cec6b4] max-w-2xl text-sm md:text-base leading-relaxed">
              Accessing classified records from Operation Hackify '25. Visual data logs of strategic engagements, rapid prototyping protocols, and late-night intelligence gathering.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="px-3 py-1 bg-[#1f2015] border border-[#a69146]/30 font-mono-tech text-[10px] text-[#a69146] uppercase tracking-widest">
                LIVE FEED: OFFLINE
              </div>
              <div className="px-3 py-1 bg-[#1f2015] border border-[#a69146]/30 font-mono-tech text-[10px] text-[#a69146] uppercase tracking-widest">
                ARCHIVE: SECURE
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <div 
                key={img.id}
                className="tactical-card-container relative group overflow-hidden border-4 border-[#3D301D] bg-[#1b1c11] cursor-crosshair"
                style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-[#0e0f05]">
                  <img 
                    src={img.src} 
                    alt={img.location}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800'; e.target.className = "w-full h-full object-cover grayscale opacity-30"; }}
                  />
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                </div>

                {/* HUD Labels */}
                <div className="p-4 flex justify-between items-end border-t-2 border-[#3D301D]">
                  <div className="font-mono-tech space-y-1">
                    <div className="text-[10px] text-[#a69146] uppercase tracking-[0.2em]">{img.id}</div>
                    <div className="text-sm font-bold text-[#e4e3d1] tracking-tight">{img.location}</div>
                  </div>
                  <div className="font-mono-tech text-[10px] text-[#a69146]/60 text-right">
                    REC {img.timestamp}
                  </div>
                </div>

                {/* Corner HUD Bracket Markers */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#a69146] opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#a69146] opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Internal Footer Decoration */}
          <div className="pt-12 flex justify-between items-center border-t border-[#a69146]/10">
            <div className="font-mono-tech text-[10px] text-[#cec6b4]/40 uppercase tracking-[0.3em]">
              System Status: Nominal // Data Integrity: 100%
            </div>
            <div className="font-mono-tech text-[10px] text-[#cec6b4]/40 uppercase tracking-[0.3em]">
              Encrypted Tunnel: 09-AF-2026
            </div>
          </div>
        </div>
      </section>

      {/* Global Comms Footer Layout */}
      <footer className="bg-[#0e0f05] border-t-2 border-white/10 py-16 px-8 relative z-10 mt-12">
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