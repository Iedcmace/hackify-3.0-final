'use client';
import React, { useEffect, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader'

export default function TeamPage() {
  const [openComm, setOpenComm] = useState(null);

  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.volume = 0.05;
    const handleHover = () => { audio.currentTime = 0; audio.play().catch(() => {}); };
    const elements = document.querySelectorAll('button, .tactical-card-container, a');
    elements.forEach(el => el.addEventListener('mouseenter', handleHover));
    return () => { elements.forEach(el => el.removeEventListener('mouseenter', handleHover)); };
  }, []);

  const team = [
    { id: 'ID-3301', name: 'CHRISTY CHRISTOPHER', role: 'LEAD', clearance: 'DELTA', division: 'OPERATIONS', contact: '+91 79943 76774', image: '/ChristyC.jpeg' },
    { id: 'ID-8822', name: 'SAMUEL M DILEEP', role: 'LEAD', clearance: 'SIGMA', division: 'CYBERSECURITY', contact: '+91 80752 58045', image: '/SamuelC.jpeg' },
    { id: 'ID-7731', name: 'GOPIKA M', role: 'LEAD', clearance: 'ALPHA', division: 'INFRASTRUCTURE', contact: '+91 75588 21825', image: '/GopikaC.jpeg' },
    { id: 'ID-8924', name: 'AMAL NARAYAN', role: 'LEAD', clearance: 'OMEGA', division: 'LOGISTICS', contact: '+91 90483 72356', image: '/AmalC.jpeg' },
    { id: 'ID-4411', name: 'ANIRUDH', role: 'LEAD', clearance: 'SIGMA', division: 'CYBERSECURITY', contact: '+91 79072 83190', image: '/AnirudhC.jpeg' },
  ];

  const webTeam = [
    { name: 'ESHA ALEX', role: 'WEB DEVELOPER', tag: 'Interface Architecture', image: '/EshaC.jpeg' },
    { name: 'APARNA SURESH', role: 'WEB DEVELOPER', tag: 'Visual Systems', image: '/AparnaC.jpg' },
    { name: 'NAYANA SURENDRAN', role: 'WEB DEVELOPER', tag: 'Design & Deployment', image: '/NayanaC.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-[#13140a] text-white font-mono relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />

      <SiteHeader />

      <section className="pt-32 pb-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">

          {/* Page Header */}
          <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#a4c875] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] font-bold">
                System Status: Operational
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#a4c875] tracking-tighter uppercase">
              Meet The Team
            </h2>
            <p className="text-[#cec6b4] text-xs sm:text-sm md:text-base uppercase tracking-widest max-w-2xl leading-relaxed">
              The minds behind HACKIFY '26 — organizers, leads, and builders driving the event from the ground up.
            </p>
          </div>

          <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] border-b border-[#a4c875]/10 pb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#a4c875]" /> Core Organizers
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member) => (
              <div key={member.id} className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11] p-6 sm:p-8 group transition-all duration-300 hover:bg-[#1f2015] cursor-crosshair" style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}>
                <div className="flex gap-4 items-center mb-6 sm:mb-8">
                  <div className="relative w-20 sm:w-24 h-20 sm:h-24 border border-[#3D301D] bg-[#0e0f05] overflow-hidden flex-shrink-0 shadow-[0_0_20px_rgba(164,200,117,0.10)]">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200'; e.target.className = "w-full h-full object-cover opacity-30"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#a4c875] font-bold text-xl sm:text-2xl bg-[#1b1c11]">{member.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#e4e3d1] leading-tight break-words">
                      <span className="text-[#a4c875] text-xs inline-block align-middle mr-2">●</span>
                      <span className="break-words whitespace-normal">{member.name}</span>
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>

                <button onClick={() => setOpenComm(openComm === member.id ? null : member.id)} className="w-full border border-[#a4c875]/30 py-3 text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.3em] hover:bg-[#a4c875] hover:text-[#0e0f05] transition-all flex items-center justify-center gap-2">
                  <span className="text-sm">✉</span> {openComm === member.id ? 'Close Channel' : 'Initiate Comm'}
                </button>

                {openComm === member.id && (
                  <div className="mt-4 border border-[#a4c875]/20 bg-[#0e0f05] px-3 sm:px-4 py-3 text-[10px] sm:text-[11px] text-[#a4c875] tracking-widest uppercase flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    <span className="text-[#a4c875]">📡</span> {member.contact}
                  </div>
                )}
                <div className="absolute top-3 left-3 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
                <div className="absolute bottom-3 right-3 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
              </div>
            ))}
          </div>

          {/* Web Support Section */}
          <div className="space-y-8 sm:space-y-10 pt-8">
            <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-3">
              <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-8 h-px bg-[#a4c875]" /> Digital Infrastructure
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#a4c875] tracking-tighter uppercase">
                Web Team
              </h3>
              <p className="text-[#cec6b4] text-xs sm:text-sm uppercase tracking-widest max-w-xl leading-relaxed">
                The team responsible for designing, building, and deploying the HACKIFY '26 digital experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {webTeam.map((person, index) => (
                <div key={index} className="relative bg-[#1b1c11] border border-[#3D301D] hover:border-[#a4c875]/40 transition-all duration-300 p-6 sm:p-8 flex flex-col items-center text-center group overflow-hidden rounded-md">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a4c875]/40 to-transparent" />
                  <div className="w-24 sm:w-32 h-32 sm:h-40 rounded-[50%] overflow-hidden border-2 border-[#a4c875]/40 group-hover:border-[#a4c875] transition-colors mb-4 sm:mb-6 flex-shrink-0 bg-[#0e0f05]" style={{ boxShadow: '0 0 24px rgba(216,255,122,0.15)' }}>
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    ) : null}
                    <div className={`${person.image ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-[#a4c875] font-bold text-2xl sm:text-3xl`}>{person.name.charAt(0)}</div>
                  </div>
                  <h4 className="font-bold text-[#e4e3d1] text-base sm:text-lg tracking-tight mb-1">{person.name}</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-widest mb-2">{person.role}</p>
                  <div className="w-8 h-px bg-[#a4c875]/30 my-2 sm:my-3" />
                  <p className="text-[8px] sm:text-[9px] text-[#cec6b4]/50 uppercase tracking-[0.2em]">{person.tag}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-30 border-t border-[#a4c875]/10 text-center sm:text-left">
            <div className="text-[8px] sm:text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Auth: LVL-5-CLEARANCE // SYSLOG: ACCESSED
            </div>
            <div className="text-[8px] sm:text-[10px] text-[#cec6b4] uppercase tracking-[0.3em]">
              Encryption: AES-256 GCM
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}