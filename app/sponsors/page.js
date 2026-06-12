'use client';
import React, { useEffect } from 'react';

export default function SponsorsPage() {
  
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

  const sponsors = [
    { id: 'KAL-01', name: 'KALKITECH', type: 'Grid Infrastructure Provider', logo: '/logo-kalkitech.png' },
    { id: 'ELE-02', name: 'ELECTRALYSYS', type: 'Primary energy grid and hardware logistics sponsor.', logo: '/logo-ele.png', active: true },
    { id: 'KSUM-03', name: 'KSUM', type: 'State Operational Support', logo: '/logo-ksum.png' },
    { id: 'VIS-04', name: 'VISION DYNAMICS', type: 'Surveillance & Analytics', logo: '/logo-vision.png' },
    { id: 'XYZ-05', name: '.XYZ', type: 'Digital Territory Provider', logo: '/logo-xyz.png' },
  ];

  const tiers = [
    {
      tier: '01',
      title: 'GOLD COMMAND',
      cost: '$5,000 / 4L INR',
      benefits: ['Prime Logo Placement (All HUDs)', 'Direct Comms Access to Top 10 Squads', 'Dedicated Tactical Track', 'Physical Booth Setup (Command Center)']
    },
    {
      tier: '02',
      title: 'SILVER OPS',
      cost: '$2,500 / 2L INR',
      benefits: ['Secondary Logo Placement', 'API / Tool Integration']
    },
    {
      tier: '03',
      title: 'BRONZE SUPPORT',
      cost: '$1,000 / 80K INR',
      benefits: []
    }
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
          <a href="/sponsors" className="text-[#ddc574] transition-colors tracking-widest border-b border-[#ddc574] pb-1">SPONSORS</a>
          <a href="/gallery" className="hover:text-[#a69146] transition-colors tracking-widest">GALLERY</a>
          <a href="/team" className="hover:text-[#a69146] transition-colors tracking-widest">TEAM</a>
          <a href="/newsletter" className="hover:text-[#a69146] transition-colors tracking-widest">NEWSLETTER</a>
        </div>
        <button className="bg-[#a69146] text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#ddc574] transition-all font-mono-tech duration-300">
          ENLIST NOW
        </button>
      </nav>

      {/* Stitch Sponsors Section Component */}
      <section className="pt-32 pb-24 px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h2 className="text-5xl md:text-6xl font-stencil-military text-[#ddc574] tracking-tighter flex items-center gap-4">
                <span className="opacity-80">☢</span> TACTICAL ASSETS || REQUISITION
              </h2>
              <div className="font-mono-tech text-[10px] text-[#a69146]/60 tracking-[0.3em] uppercase md:ml-auto">
                SEC: SPON-AUTH-09 // TERMINAL_ID: 9942
              </div>
            </div>
            <p className="font-mono-tech text-[#cec6b4] max-w-3xl text-sm md:text-base leading-relaxed border-l-2 border-[#a69146]/30 pl-6">
              Command authorization required for asset deployment. Current strategic partners supplying infrastructure, logistics, and operational capital for HACKIFY '26.
            </p>
          </div>

          {/* Classified Tier // Strategic Partners */}
          <div className="space-y-8">
            <div className="font-mono-tech text-xs text-[#a69146] uppercase tracking-[0.4em] border-b border-[#a69146]/10 pb-4">
              | CLASSIFIED TIER // STRATEGIC PARTNERS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((spon) => (
                <div 
                  key={spon.id}
                  className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11] p-8 group transition-all duration-300 hover:bg-[#1f2015] cursor-crosshair"
                  style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
                >
                  <div className="flex justify-between items-start mb-6 font-mono-tech text-[10px] text-[#a69146]/40">
                    <span>ID: {spon.id}</span>
                    {spon.active && <span className="text-[#a69146] animate-pulse">■ ACTIVE LINK</span>}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#0e0f05] border border-[#3D301D] flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      {/* Placeholder for Sponsor Logo */}
                      <span className="font-stencil-military text-xl text-[#a69146]">{spon.name.substring(0, 4)}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-stencil-military text-2xl text-[#e4e3d1]">{spon.name}</h3>
                      <p className="font-mono-tech text-[10px] text-[#a69146] uppercase tracking-widest">{spon.type}</p>
                    </div>
                  </div>

                  {/* HUD Brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Requisition Tiers // Asset Allocation */}
          <div className="space-y-8">
            <div className="font-mono-tech text-xs text-[#a69146] uppercase tracking-[0.4em] border-b border-[#a69146]/10 pb-4">
              | REQUISITION TIERS // ASSET ALLOCATION
            </div>
            <div className="space-y-6">
              {tiers.map((tier) => (
                <div 
                  key={tier.tier}
                  className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11] p-10 group"
                  style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="space-y-1">
                      <div className="font-mono-tech text-[10px] text-[#a69146] border border-[#a69146]/30 px-2 py-0.5 inline-block mb-2">TIER {tier.tier}</div>
                      <h3 className="font-stencil-military text-4xl text-[#ddc574] tracking-tight">{tier.title}</h3>
                    </div>
                    <div className="text-left md:text-right mt-4 md:mt-0">
                      <p className="font-mono-tech text-[10px] text-[#a69146]/60 uppercase tracking-widest mb-1">Requisition Cost</p>
                      <p className="font-stencil-military text-3xl text-[#ddc574]">{tier.cost}</p>
                    </div>
                  </div>

                  {tier.benefits.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 border-t border-[#a69146]/10 pt-8">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 font-mono-tech text-xs text-[#cec6b4]">
                          <span className="text-[#a69146]">☑</span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* HUD Brackets */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#a69146]/30 group-hover:border-[#a69146] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Meta Decoration */}
          <div className="pt-12 flex justify-between items-center opacity-30 border-t border-[#a69146]/10">
            <div className="font-mono-tech text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Auth: 09-AF-2026 // Status: Verified
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