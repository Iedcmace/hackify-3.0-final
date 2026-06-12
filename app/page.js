'use client';
import React, { useEffect } from 'react';

export default function LandingPage() {
  
  // Tactical hover interface sound trigger
  useEffect(() => {
    document.querySelectorAll('button, .tactical-card-container').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
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
        <div className="flex flex-col leading-none">
          <span className="font-stencil-military font-bold text-xl text-[#a69146] tracking-tighter">HACKIFY '26</span>
          <span className="text-[10px] uppercase tracking-widest text-[#a69146]/60 mt-0.5 font-mono-tech">3rd Edition</span>
        </div>
        
        {/* Unlocked Navigation Links */}
        <div className="hidden lg:flex gap-6 text-sm font-mono-tech text-[#cec6b4]">
          <a href="#tracks" className="hover:text-[#ddc574] transition-colors tracking-widest">TRACKS</a>
          <a href="#timeline" className="hover:text-[#ddc574] transition-colors tracking-widest">TIMELINE</a>
          <a href="/sponsors" className="hover:text-[#ddc574] transition-colors tracking-widest">SPONSORS</a>
          <a href="/gallery" className="hover:text-[#ddc574] transition-colors tracking-widest font-bold text-[#ddc574]">GALLERY</a>
          <a href="/team" className="hover:text-[#ddc574] transition-colors tracking-widest">TEAM</a>
          <a href="/newsletter" className="hover:text-[#ddc574] transition-colors tracking-widest">NEWSLETTER</a>
        </div>

        <button className="bg-[#a69146] text-black px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#ddc574] transition-all font-mono-tech duration-300">
          ENLIST NOW
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
{/* Hero Background Soldier Image Layer */}
        <div className="absolute inset-0 z-0 flex items-center justify-center"> {/* 👈 CHANGED z-[-1] to z-0 here! */}
          <div 
            className="absolute w-full h-full opacity-40" 
            style={{ 
              backgroundImage: `url('/hero-bg.png')`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* Radar Sweeper HUD Layout */}
        <div className="absolute w-[75vw] h-[75vw] max-w-[500px] max-h-[500px] pointer-events-none border border-[#a69146]/20 rounded-full overflow-hidden opacity-30">
          <div className="w-full h-full radar-sweep-effect filter blur-sm" />
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-[#a69146] font-mono-tech tracking-[0.5em] text-xs font-bold uppercase mb-4 animate-pulse">36-Hour National Sprint</p>
          <h1 className="text-6xl md:text-9xl font-stencil-military font-black tracking-widest text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            HACKIFY '26
          </h1>
          <p className="text-md md:text-xl text-[#a69146]/80 font-mono-tech tracking-[0.3em] font-bold uppercase pt-2">
            WARTECH: PREDICT, PROTECT & REBUILD
          </p>
          <div className="flex gap-4 justify-center pt-10 font-mono-tech">
            <button className="border-2 border-[#a69146] bg-[#a69146]/10 px-8 py-4 font-bold text-sm hover:bg-[#a69146] hover:text-black transition-all duration-300">REGISTER NOW</button>
            <button className="border-2 border-white/20 bg-white/5 px-8 py-4 font-bold text-sm hover:bg-white/10 transition-all duration-300">MISSION BRIEF</button>
          </div>
        </div>
      </section>

      {/* Strategic Sectors Balanced 2-Column Grid */}
      <section id="tracks" className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 border-l-4 border-[#a69146] pl-6">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-[#a69146]">STRATEGIC SECTORS</h2>
          <p className="text-white/60 text-sm mt-1">Operational tracks for Hackify '26 deployment.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tracks.map((track, i) => (
            <div 
              key={i} 
              className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11]/80 p-8 group transition-all duration-300 hover:bg-[#1b1c11] hover:-translate-y-1"
              style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
            >
              {/* Corner HUD Markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#a69146]/40 group-hover:border-[#a69146] transition-colors" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#a69146]/40 group-hover:border-[#a69146] transition-colors" />
              
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#a69146]/10 text-[#a69146] rounded-sm border border-[#a69146]/30 font-mono-tech text-xs font-bold">
                  TRK_0{i+1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono-tech">{track.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{track.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operation Timeline Section */}
      <section id="timeline" className="py-24 bg-[#0e0f05] border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto text-center px-8 relative z-10">
          <h2 className="text-4xl font-bold text-[#a69146] mb-2 tracking-widest">OPERATION TIMELINE</h2>
          <p className="text-white/40 text-xs mb-20 tracking-widest font-mono-tech">MISSION COORDINATES: 10.05°N, 76.62°E</p>
          
          <div className="relative">
            {/* Core Pipeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-[#a69146]/20" />
            
            <div className="space-y-16">
              {events.map((event, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? 'pr-16 md:pr-24 text-right' : 'pl-16 md:pl-24 text-left'}`}>
                    <span className="text-[#a69146] font-bold text-sm font-mono-tech">{event.date}</span>
                    <h4 className="text-xl font-bold text-white uppercase">{event.title}</h4>
                    <p className="text-white/40 text-sm mt-1">{event.sub}</p>
                  </div>
                  {/* Stable CSS Node Pin */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-[#a69146] bg-[#13140a] shadow-[0_0_10px_rgba(166,145,70,0.5)] flex items-center justify-center z-10 rotate-45">
                    <div className="w-1.5 h-1.5 bg-[#a69146]" />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Comms Footer Layout */}
      <footer className="bg-[#0e0f05] border-t-2 border-white/10 py-16 px-8 relative z-10">
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

const tracks = [
  { title: "Conflict Intelligence", description: "Develop predictive models using satellite telemetry, social sentiment, and historical data to forecast flashpoints and escalation cycles." },
  { title: "Cyber Defence", description: "Fortify critical infrastructure against state-sponsored digital incursions and secure communication protocols for high-threat environments." },
  { title: "Humanitarian Aid", description: "Blockchain-enabled supply chain logistics for rapid resource deployment and verified distribution tracking in disaster zones." },
  { title: "Civilian Safety", description: "Decentralized evacuation networks, real-time safe-zone mapping, and early warning systems for vulnerable populations." },
  { title: "Battlefield MedTech", description: "Field-deployable diagnostic systems, remote surgical tele-presence, and AI-assisted triage for combat environments." },
  { title: "Propaganda Combat", description: "Deepfake detection, truth-verification layers, and anti-misinformation tools for cognitive security in modern info-warfare." },
  { title: "Post-War Reconstruction", description: "Smart urban planning for war-torn areas, heritage preservation tech, and economic revitalization platforms for post-conflict recovery." },
  { title: "Open Innovation", description: "Wildcard track for disruptive technologies that address unforeseen challenges in global security and humanitarian defense." }
];

const events = [
  { date: "SEP 08", title: "BASE CAMP", sub: "Registration Abstract Submission" },
  { date: "OCT 06", title: "INTELLIGENCE GATHERING", sub: "Registration Closes" },
  { date: "OCT 10", title: "TARGET SELECTION", sub: "Top 20 Shortlisted Teams" },
  { date: "OCT 16 - 18", title: "BATTLE COMMENCES", sub: "36-Hour Offline Hackathon" },
  { date: "OCT 18", title: "MISSION ACCOMPLISHED", sub: "Winner Announcement" }
];
