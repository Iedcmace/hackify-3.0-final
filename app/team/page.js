'use client';
import React, { useEffect, useRef, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { motion, useInView } from 'framer-motion';
import { Phone } from 'lucide-react';

const MemberCard = ({ member, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const showPhone = isHovered || isClicked;
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsClicked(!isClicked);
  
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col text-left group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
    >
      <div className="relative w-full aspect-square overflow-hidden mb-4 sm:mb-5 rounded-md">
        <div className="w-full h-full">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200';
              e.target.className = 'w-full h-full object-cover opacity-30';
            }}
          />
        </div>
        
        {/* Border overlay */}
        <div className="absolute inset-0 border-2 border-[#a4c875] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-md" />
        
        {member.contact && (
          <div 
            className="absolute bottom-3 left-3 z-20 flex items-center justify-center p-2.5 bg-black/70 backdrop-blur-md rounded-full cursor-pointer hover:bg-[#a4c875]/20 transition-all border border-white/10 hover:border-[#a4c875]/50 group/phone"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <Phone className="w-4 h-4 text-white group-hover/phone:text-[#a4c875] transition-colors" />
          </div>
        )}
      </div>

      <p className="text-[11px] sm:text-xs font-semibold text-[#a4c875]/70 mb-1 tracking-widest uppercase">
        {member.role || 'Organizer'}
      </p>
      <h3 className="font-bold text-base sm:text-lg md:text-xl text-white mb-2 tracking-wide">
        {member.name}
      </h3>
      
      <div className="h-6 flex items-center">
        {member.contact && showPhone && (
          <p className="text-sm text-[#cec6b4] font-mono animate-in fade-in zoom-in duration-200">
            {member.contact}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function TeamPage() {

  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.volume = 0.05;
    const handleHover = () => { audio.currentTime = 0; audio.play().catch(() => { }); };
    const elements = document.querySelectorAll('button, .tactical-card-container, a');
    elements.forEach(el => el.addEventListener('mouseenter', handleHover));
    return () => { elements.forEach(el => el.removeEventListener('mouseenter', handleHover)); };
  }, []);

  const team = [
    { id: 'ID-3301', name: 'CHRISTY CHRISTOPHER', role: 'LEAD', contact: '+91 79943 76774', image: '/ChristyC.jpeg' },
    { id: 'ID-8822', name: 'SAMUEL M DILEEP', role: 'LEAD', contact: '+91 80752 58045', image: '/SamuelC.jpeg' },
    { id: 'ID-7731', name: 'GOPIKA M', role: 'LEAD', contact: '+91 75588 21825', image: '/GopikaC.jpeg' },
    { id: 'ID-8924', name: 'AMAL NARAYAN', role: 'LEAD', contact: '+91 90483 72356', image: '/AmalC.jpeg' },
    { id: 'ID-4411', name: 'ANIRUDH', role: 'LEAD', contact: '+91 79072 83190', image: '/AnirudhC.jpeg' },
  ];

  const webTeam = [
    { id: 'WT-01', name: 'ESHA ALEX', role: 'WEB DEVELOPER', image: '/EshaC.jpeg' },
    { id: 'WT-02', name: 'APARNA SURESH', role: 'WEB DEVELOPER', image: '/AparnaC.jpg' },
    { id: 'WT-03', name: 'NAYANA SURENDRAN', role: 'WEB DEVELOPER', image: '/NayanaC.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-[#13140a] text-white font-mono relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />

      <SiteHeader />

      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-16">

          {/* Page Header */}
          <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#a4c875] tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(164,200,117,0.3)]">
              Meet The Team
            </h2>
            <p className="text-[#cec6b4] text-xs sm:text-sm md:text-base uppercase tracking-widest max-w-2xl leading-relaxed">
              Got questions before deploying to the hackathon? Establish a direct connection with our command operatives right here.
            </p>
          </div>

          {/* Core Organizers — centered, large heading */}
          <div className="text-center text-xl sm:text-3xl md:text-4xl font-bold text-[#a4c875] uppercase tracking-tight border-b border-[#a4c875]/10 pb-5">
            Core Organizers
          </div>

          {/* Team Grid — no cards, row 1: 3 members, row 2: left-aligned remainder */}
          <div className="max-w-6xl mx-auto px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-16 gap-x-8 md:gap-x-12">
              {team.slice(0, 3).map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>

            <hr className="my-12 sm:my-14 md:my-16 border-t border-[#a4c875]/15" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-16 gap-x-8 md:gap-x-12">
              {team.slice(3, 5).map((member, i) => (
                <MemberCard key={member.id} member={member} index={i + 3} />
              ))}
            </div>
          </div>

          {/* Web Team Section — no cards, flip-on-hover photo (GSAP) */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 pt-4 sm:pt-6 md:pt-8">
            <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-3">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#a4c875] tracking-tighter uppercase">
                Web Team
              </h3>
              <p className="text-[#cec6b4] text-xs sm:text-sm uppercase tracking-widest max-w-xl leading-relaxed">
                they created this website
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-16 gap-x-8 md:gap-x-12">
              {webTeam.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i + 5} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}