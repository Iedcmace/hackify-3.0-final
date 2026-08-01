'use client';
import React, { useEffect, useRef } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';

function ParallaxMarquee({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    
    // Add scroll velocity to the movement
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    
    baseX.set(baseX.get() + moveBy)
  })

  // Wrap utility function
  function wrap(min, max, v) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-8" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  )
}

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
    { id: 'KEY-06', name: 'KEYVALUE', type: 'Audience intelligence partner transforming data into sponsor opportunity.', logo: '/keyvalue.jpeg' },
    { id: 'VIS-04', name: 'VISION DYNAMICS', type: 'Analytics partner adding precision visibility and event performance insight.', logo: '/VisionDynamics.jpeg' },
    { id: 'XYZ-05', name: '.XYZ', type: 'Digital sponsor extending brand access across developer communities.', logo: '/xyz.png' },
  ];
  
  const tiers = [
    {
      tier: '01',
      title: 'GOLD',
      cost: '₹1,00,000',
      benefits: [
        'Partnership title and premium event branding',
        'Merchandise with company logo',
        'Exclusive student interaction session',
        'Attendee information access (with consent)',
        'Sponsor speaker slot + product launch opportunity',
        'Website, social media, poster, badge, and virtual background visibility',
        'Internship/hiring access'
      ]
    },
    {
      tier: '02',
      title: 'SILVER',
      cost: '₹50,000',
      benefits: [
        'Logo visibility on posters, website, and virtual backgrounds',
        'Recognition at opening/closing ceremony',
        'Product/service marketing and pre-event publicity',
        'Sponsor speaker presence',
        'Event attendance access',
        'Internship/hiring opportunity'
      ]
    },
    {
      tier: '03',
      title: 'BRONZE',
      cost: '₹25,000',
      benefits: [
        'Logo presence on website, banners, and social media',
        'Announcement during pre-events',
        'Event attendance access',
        'Internship/hiring opportunity'
      ]
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#a4c875] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(164,200,117,0.4)]">
              Strategic Sponsors
            </h1>
            <p className="text-[#cec6b4] text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] max-w-3xl leading-relaxed lg:whitespace-nowrap">
              Trusted partners accelerating innovation at HACKIFY 3.0.
            </p>
          </div>

         {/* Devfolio Card */}
          <div>
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.12em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#a4c875]" />
              Devfolio
              <span className="w-8 h-px bg-[#a4c875]" />
            </div>

            <div
              className="tactical-card-container relative border border-[#a4c875]/20 bg-[#12130d] p-4 sm:p-6 group overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#a4c875]/40 hover:shadow-[0_20px_60px_rgba(164,200,117,0.16)]"
              style={{ clipPath: 'polygon(28px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 28px)' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(164,200,117,0.08),transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-4 border-l-4 border-[#a4c875] opacity-60" />
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-4 border-r-4 border-[#a4c875] opacity-60" />

              <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center sm:items-start lg:items-center relative z-10">
                <a
                  href="https://devfolio.co/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-shrink-0 w-44 lg:w-56 h-28 sm:h-32 border border-transparent bg-gradient-to-tr from-[#0b0c05] to-[#222418] flex items-center justify-center overflow-hidden rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)] transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                  style={{ clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)' }}
                >
                  <img 
                    src="/devfolio.png" 
                    alt="Devfolio" 
                    className="max-h-full max-w-full object-contain p-3" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} 
                  />
                  <div className="hidden w-full h-full items-center justify-center text-[#a4c875] font-bold text-xl">DEVFOLIO</div>
                </a>

                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-2 h-2 bg-[#a4c875] animate-pulse rounded-full" />
                    <span className="text-[10px] sm:text-[12px] text-[#a4c875] font-bold">Devfolio</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#a4c875] tracking-tighter uppercase">Devfolio</h2>
                  <p className="text-xs sm:text-sm text-[#cec6b4] leading-relaxed sm:leading-6 max-w-xl">
                    <strong>Official registration partner powering HACKIFY '26.</strong>
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2 text-[9px] sm:text-[10px] text-[#a4c875]/80 font-mono">
                    <span>✦ Team Registration</span>
                    <span>✦ Project Submission</span>
                    <span>✦ Participant Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors Infinite Marquee */}
          <div className="-mx-4 sm:-mx-8">
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] border-b border-[#a4c875]/10 pb-4 flex items-center gap-3 px-4 sm:px-8 mb-8">
              <span className="w-8 h-px bg-[#a4c875]" /> Past Sponsors
            </div>

            <ParallaxMarquee baseVelocity={-2}>
              {sponsors.map((spon) => (
                <div key={spon.id} className="relative bg-transparent p-4 flex items-center justify-center shrink-0 w-[200px] sm:w-[250px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#1b1c11] border border-[#a4c875]/20 flex items-center justify-center p-2 shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-110 hover:border-[#a4c875]/60 hover:shadow-[0_0_25px_rgba(164,200,117,0.3)] cursor-pointer">
                      {spon.logo ? (
                        <img src={spon.logo} alt={spon.name} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div className="text-[#a69146] font-bold">{spon.name.substring(0,3)}</div>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#e4e3d1] text-center">{spon.name}</div>
                  </div>
                </div>
              ))}
            </ParallaxMarquee>
          </div>


          {/* Tiers Grid */}
          <div className="space-y-8">
            <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.4em] border-b border-[#a4c875]/10 pb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#a4c875]" /> Sponsorship Tiers
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
          
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
