'use client';
import React, { useEffect } from 'react';

export default function TeamPage() {
  
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

  const team = [
    { id: 'ID-8924', name: 'AMAL NARAYAN', role: 'LEAD STRATEGIST', clearance: 'OMEGA', division: 'LOGISTICS', status: 'DECRYPTING', image: '/team-1.jpg' },
    { id: 'ID-7731', name: 'GOPIKA', role: 'COMM. OFFICER', clearance: 'ALPHA', division: 'INFRASTRUCTURE', status: 'ONLINE', image: '/team-2.jpg' },
    { id: 'ID-2290', name: 'CHRISTY', role: 'LOGISTICS LEAD', clearance: 'DELTA', division: 'OPERATIONS', status: 'BUSY', image: '/team-3.jpg' },
    { id: 'ID-4411', name: 'ANIRUDH', role: 'TECH INTEL', clearance: 'SIGMA', division: 'CYBERSECURITY', status: 'ONLINE', image: '/team-4.jpg' }
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
          <a href="/gallery" className="hover:text-[#a69146] transition-colors tracking-widest">GALLERY</a>
          <a href="/team" className="text-[#ddc574] transition-colors tracking-widest border-b border-[#ddc574] pb-1">TEAM</a>
          <a href="/newsletter" className="hover:text-[#a69146] transition-colors tracking-widest">NEWSLETTER</a>
        </div>
        <button className="bg-[#a69146] text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#ddc574] transition-all font-mono-tech duration-300">
          ENLIST NOW
        </button>
      </nav>

      {/* Stitch Team Section Component */}
      <section className="pt-32 pb-24 px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header Section */}
          <div className="border-l-4 border-[#a69146] pl-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#a69146] animate-pulse" />
              <span className="font-mono-tech text-[10px] text-[#a69146] uppercase tracking-[0.4em] font-bold">
                System Status: Operational
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-stencil-military text-[#ddc574] tracking-tighter uppercase">
              Command Roster
            </h2>
            <p className="font-mono-tech text-[#cec6b4] text-sm md:text-base uppercase tracking-widest max-w-2xl leading-relaxed">
              Accessing core personnel database. Authorized Level 5 clearance required for directives.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div 
                key={member.id}
                className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11] p-8 group transition-all duration-300 hover:bg-[#1f2015] cursor-crosshair"
                style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
              >
                {/* Header Info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-4 items-center">
                     <div className="relative w-20 h-20 border border-[#3D301D] bg-[#0e0f05] overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200'; e.target.className = "w-full h-full object-cover opacity-30"; }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-xl font-stencil-military text-[#e4e3d1] flex items-center gap-2">
                          <span className="text-[#a69146] text-xs">●</span> {member.name}
                        </h3>
                        <p className="font-mono-tech text-[10px] text-[#a69146] uppercase tracking-widest">{member.role}</p>
                        <p className="font-mono-tech text-[9px] text-[#cec6b4]/40 uppercase tracking-tighter">Clearance: {member.clearance}</p>
                     </div>
                  </div>
                </div>

                {/* Stats / Meta */}
                <div className="space-y-4 font-mono-tech border-t border-[#3D301D] pt-6 mb-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-[#cec6b4]/40">Division:</span>
                    <span className="text-[#e4e3d1]">{member.division}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-[#cec6b4]/40">Status:</span>
                    <span className={member.status === 'ONLINE' ? 'text-[#a69146]' : 'text-[#ddc574] animate-pulse'}>{member.status}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full border border-[#a69146]/30 py-3 font-mono-tech text-[10px] text-[#a69146] uppercase tracking-[0.3em] hover:bg-[#a69146] hover:text-[#0e0f05] transition-all flex items-center justify-center gap-2">
                   <span className="text-sm">✉</span> Initiate Comm
                </button>

                {/* HUD Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
              </div>
            ))}

            {/* Recruit Card */}
            <div 
              className="tactical-card-container relative border-4 border-[#3D301D] border-dashed bg-transparent p-8 group flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity cursor-crosshair"
              style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
            >
               <div className="w-12 h-12 border border-[#a69146]/30 flex items-center justify-center mb-4 group-hover:bg-[#a69146]/10 transition-colors">
                  <span className="text-[#a69146] text-2xl font-bold">+</span>
               </div>
               <p className="font-stencil-military text-xl text-[#e4e3d1] mb-2 uppercase">Open Protocol</p>
               <p className="font-mono-tech text-[10px] text-[#cec6b4]/60 uppercase tracking-widest max-w-[180px]">
                 System requires additional operatives. Submit credentials for review.
               </p>
               <button className="mt-8 font-mono-tech text-[10px] text-[#a69146] underline underline-offset-4 uppercase tracking-[0.3em] hover:text-[#ddc574]">
                 Apply Now
               </button>

               <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
               <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
            </div>
          </div>

          {/* Internal Footer Meta */}
          <div className="pt-12 flex justify-between items-center opacity-30 border-t border-[#a69146]/10">
            <div className="font-mono-tech text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Auth: LVL-5-CLEARANCE // SYSLOG: ACCESSED
            </div>
            <div className="font-mono-tech text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Encryption: AES-256 GCM
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