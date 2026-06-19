'use client';
import React, { useEffect } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader'

export default function SponsorsPage() {

  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.volume = 0.05;

    const handleHover = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const elements = document.querySelectorAll('button, .tactical-card-container, a');
    elements.forEach(el => el.addEventListener('mouseenter', handleHover));

    return () => {
      elements.forEach(el => el.removeEventListener('mouseenter', handleHover));
    };
  }, []);

  const sponsors = [
    { id: 'KAL-01', name: 'KALKITECH', type: 'Grid systems collaborator delivering resilient energy architecture for event operations.', logo: '/KalkitechC.jpeg' },
    { id: 'ELE-02', name: 'ELECTRALYSYS', type: 'Power logistics specialist supplying steady energy flow for sustained activations.', logo: '/Electralysys.png' },
    { id: 'KSUM-03', name: 'KSUM', type: 'State platform partner amplifying innovation visibility and institutional reach.', logo: '/KSUMC.jpeg' },
    { id: 'KEY-06', name: 'KEYVALUE', type: 'Audience intelligence partner transforming data into sponsor opportunity.', logo: '/KeyValueC.jpeg' },
    { id: 'VIS-04', name: 'VISION DYNAMICS', type: 'Analytics partner adding precision visibility and event performance insight.', logo: '/VisionDynamics.jpeg' },
    { id: 'XYZ-05', name: '.XYZ', type: 'Digital sponsor extending brand access across developer communities.', logo: '/xyz.png' },
  ];
  
  const tiers = [
    {
      tier: '01',
      title: 'GOLD COMMAND',
      cost: '₹1,00,000 INR',
      benefits: ['Premium brand placement across main event visuals', 'Dedicated networking and sponsor spotlight', 'Exclusive mention in keynote announcements', 'Priority collaboration with core event partners']
    },
    {
      tier: '02',
      title: 'SILVER OPS',
      cost: '₹50,000 INR',
      benefits: ['Prominent logo placement in digital collateral', 'Participation in focused sponsor activations', 'Feature in event communication highlights']
    },
    {
      tier: '03',
      title: 'BRONZE SUPPORT',
      cost: '₹25,000 INR',
      benefits: ['Logo inclusion in sponsor roster', 'Visibility on event media', 'Invitation to closing recognition session']
    }
  ];

  return (
    <div className="min-h-screen bg-[#13140a] text-white font-mono relative overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(circle,rgba(216,255,122,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />

      <SiteHeader />

      {/* Reduced padding on mobile (px-4) */}
      <section className="pt-32 pb-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#a4c875] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] font-bold">
                System Status: Operational
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#a4c875] tracking-tighter uppercase">
              Strategic Sponsors
            </h1>
            <p className="text-[#cec6b4] text-xs sm:text-sm md:text-base uppercase tracking-widest max-w-2xl leading-relaxed">
              Trusted brands empowering HACKIFY '25 with strategic reach, platform visibility, and shared innovation impact.
            </p>
          </div>

          {/* Devfolio Card */}
          <div>
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#a4c875]" />
              Registration Partner
              <span className="w-8 h-px bg-[#a4c875]" />
            </div>

            <div
              className="tactical-card-container relative border-2 border-[#a4c875] bg-[#1b1c11] p-6 sm:p-10 group overflow-hidden"
              style={{ clipPath: 'polygon(28px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 28px)' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(164,200,117,0.08),transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-4 border-l-4 border-[#a4c875] opacity-60" />
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-4 border-r-4 border-[#a4c875] opacity-60" />

              <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center sm:items-start lg:items-center relative z-10">
                <div
                  className="flex-shrink-0 w-full lg:w-64 h-32 sm:h-44 border-2 border-[#a4c875]/40 bg-[#0e0f05] flex items-center justify-center overflow-hidden"
                  style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
                >
                  <img src="/DEVFOLIOC.jpeg" alt="DEVFOLIO LOGO" className="max-h-full max-w-full object-contain p-4" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="hidden w-full h-full items-center justify-center text-[#a4c875] font-bold text-2xl">DEVFOLIO</div>
                </div>

                <div className="space-y-4 flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-2 h-2 bg-[#a4c875] animate-pulse rounded-full" />
                    <span className="text-[8px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.5em] font-bold">Primary Registration</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-bold text-[#a4c875] tracking-tighter uppercase">Devfolio</h2>
                  <p className="text-xs sm:text-sm text-[#cec6b4] leading-relaxed sm:leading-7 max-w-2xl">
                    Devfolio is the official registration partner for HACKIFY '25, handling team onboarding, submission management, and participant communications.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 pt-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#a4c875]/60 font-mono">
                    <span>✦ Team Onboarding</span>
                    <span>✦ Submissions</span>
                    <span>✦ Comms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors Grid */}
          <div className="space-y-8">
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] border-b border-[#a4c875]/10 pb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#a4c875]" /> Official Sponsors
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              {sponsors.map((spon) => (
                <div key={spon.id} className="tactical-card-container relative border-2 border-[#3D301D] bg-[#1b1c11] p-6 sm:p-8 min-h-0 group transition-all duration-300 hover:bg-[#1f2015] hover:border-[#a4c875]/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(164,200,117,0.16)] cursor-pointer" style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}>
                  <div className="flex justify-between items-start mb-6 text-[9px] sm:text-[10px] text-[#a4c875]/50">
                    <span>ID: {spon.id}</span>
                  </div>

                  {/* Stacked on mobile, side-by-side on sm */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    <div className="w-24 sm:w-32 h-24 sm:h-32 border border-[#3D301D] bg-[#0f1005] flex items-center justify-center overflow-hidden flex-shrink-0 p-3 shadow-[inset_0_0_30px_rgba(164,200,117,0.08)]">
                      {spon.logo ? (
                        <img src={spon.logo} alt="logo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      ) : null}
                      <div className={`${spon.logo ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-[#a69146] font-bold text-xs sm:text-sm`}>
                        {spon.name.substring(0, 4)}
                      </div>
                    </div>
                    <div className="space-y-2 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#e4e3d1] tracking-tight break-words">{spon.name}</h3>
                      <p className="text-[10px] sm:text-[11px] text-[#a4c875] uppercase tracking-[0.2em] leading-relaxed break-words">{spon.type}</p>
                      <p className="text-[9px] sm:text-[10px] text-[#cec6b4] leading-relaxed max-w-xl whitespace-normal break-words">
                        {spon.name === 'KALKITECH' && 'Powered the event with resilient infrastructure and adaptive energy systems.'}
                        {spon.name === 'ELECTRALYSYS' && 'Delivered dependable power logistics for every stage of the festival experience.'}
                        {spon.name === 'KSUM' && 'Connected regional innovation channels with our event platform and audience.'}
                        {spon.name === 'KEYVALUE' && 'Provided audience insight that sharpened sponsorship relevance and visibility.'}
                        {spon.name === 'VISION DYNAMICS' && 'Supplied analytics clarity and performance intelligence across event operations.'}
                        {spon.name === '.XYZ' && 'Extended brand exposure through a strong digital sponsorship presence.'}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Tiers Grid */}
          <div className="space-y-8">
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] border-b border-[#a4c875]/10 pb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#a4c875]" /> Requisition Tiers
            </div>

            <div className="space-y-6">
              {tiers.map((tier) => (
                <div key={tier.tier} className="tactical-card-container relative border-4 border-[#3D301D] bg-[#1b1c11] p-6 sm:p-10 group hover:border-[#a4c875]/30 transition-colors" style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
                    <div className="space-y-1">
                      <div className="text-[9px] sm:text-[10px] text-[#a4c875] border border-[#a4c875]/30 px-2 py-0.5 inline-block mb-2 font-mono">
                        TIER {tier.tier}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-[#a4c875] tracking-tight">{tier.title}</h3>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[9px] sm:text-[10px] text-[#a4c875]/60 uppercase tracking-widest mb-1 font-mono">Requisition Cost</p>
                      <p className="text-2xl sm:text-3xl font-bold text-[#a4c875]">{tier.cost}</p>
                    </div>
                  </div>

                  {tier.benefits.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 sm:gap-y-4 border-t border-[#a4c875]/10 pt-6 sm:pt-8">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start sm:items-center gap-3 text-[10px] sm:text-xs text-[#cec6b4] font-mono leading-relaxed">
                          <span className="text-[#a4c875] mt-0.5 sm:mt-0">☑</span> {benefit}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-[#a4c875]/30 group-hover:border-[#a4c875] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Stacked mobile footer meta */}
          <div className="pt-12 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-30 border-t border-[#a4c875]/10 text-center sm:text-left">
            <div className="text-[8px] sm:text-[10px] text-[#cec6b4] uppercase tracking-[0.3em] font-mono">
              Auth: 09-AF-2026 // Status: Verified
            </div>
            <div className="text-[8px] sm:text-[10px] text-[#cec6b4] uppercase tracking-[0.3em] font-mono">
              Encryption: AES-256 GCM
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}