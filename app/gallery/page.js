'use client';
import React, { useEffect, useState, useRef } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader'

export default function GalleryPage() {
  const totalOriginalImages = 28;
  
  const [activeIndex, setActiveIndex] = useState(totalOriginalImages);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isResetting = useRef(false);

  useEffect(() => {
    document.querySelectorAll('button, .tactical-card-container, a').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
        audio.volume = 0.05;
        audio.play().catch(() => {});
      });
    });
  }, [activeIndex]);

  const baseImages = Array.from({ length: totalOriginalImages }, (_, i) => {
    const num = i + 1;
    const paddedId = num < 10 ? `0${num}` : num;
    
    const mockHours = String(10 + (num % 12)).padStart(2, '0');
    const mockMinutes = String((num * 7) % 60).padStart(2, '0');
    const mockSeconds = String((num * 13) % 60).padStart(2, '0');

    const locations = ['MAIN_ARENA', 'SYSTEM_OVERRIDE', 'DATA_VAULT', 'PERIMETER_SEC', 'WAR_ROOM', 'LOGISTICS_HUB'];
    const location = locations[i % locations.length];

    return {
      id: `CAM_${paddedId}`,
      location: location,
      timestamp: `${mockHours}:${mockMinutes}:${mockSeconds}`,
      src: `/image_${num}.jpg`
    };
  });

  const images = [...baseImages, ...baseImages, ...baseImages];

  useEffect(() => {
    if (isResetting.current) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    if (isResetting.current) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isResetting.current) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (activeIndex >= totalOriginalImages * 2) {
      isResetting.current = true;
      setIsTransitioning(false);
      setActiveIndex(activeIndex - totalOriginalImages);
    } else if (activeIndex < totalOriginalImages) {
      isResetting.current = true;
      setIsTransitioning(false);
      setActiveIndex(activeIndex + totalOriginalImages);
    }
  };

  useEffect(() => {
    if (!isTransitioning && isResetting.current) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
        isResetting.current = false;
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  const currentDisplayIndex = (activeIndex % totalOriginalImages) + 1;

  return (
    <div className="min-h-screen bg-[#0d1009] text-white font-mono relative overflow-x-hidden">
      <div className="fixed inset-0 matrix-overlay pointer-events-none z-0 opacity-10" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(148,188,141,0.06),rgba(148,188,141,0.02),rgba(148,188,141,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />
      
      <SiteHeader />

      {/* Reduced padding on mobile (px-4) */}
      <section className="pt-32 pb-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          
          <div className="border-l-4 border-[#a4c875] pl-4 sm:pl-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[#a4c875] animate-pulse shadow-[0_0_6px_#a4c875]" />
              {/* Reduced font size for mobile */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-stencil-military text-[#a4c875] tracking-tighter drop-shadow-[0_0_5px_rgba(164,200,117,0.4)]">
                SURVEILLANCE ARCHIVE
              </h2>
            </div>
            <p className="font-mono-tech text-[#c2ccb9] max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
              Accessing classified records from Operation Hackify '25. Visual data logs of strategic engagements, rapid prototyping protocols, and late-night intelligence gathering.
            </p>
            {/* Stack status badges on mobile to prevent overflow */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
              <div className="px-3 py-1 bg-[#141a0e] border border-[#a4c875]/30 font-mono-tech text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-widest inline-block text-center sm:text-left">
                STREAM STATUS: LOOP_ACTIVE ({currentDisplayIndex}/{totalOriginalImages})
              </div>
              <div className="px-3 py-1 bg-[#141a0e] border border-[#a4c875]/30 font-mono-tech text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-widest inline-block text-center sm:text-left">
                ARCHIVE: SECURE
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            <div 
              onTransitionEnd={handleTransitionEnd}
              className="flex gap-4 will-change-transform"
              style={{ 
                '--active-index': activeIndex,
                transform: 'translateX(calc(-1 * var(--active-index) * (var(--card-width, 85%) + 16px)))',
                transition: isTransitioning ? 'transform 850ms cubic-bezier(0.2, 1, 0.2, 1)' : 'none'
              }}
            >
              <style jsx>{`
                div {
                  --card-width: 85%;
                }
                @media (min-width: 768px) {
                  div { --card-width: 45%; }
                }
                @media (min-width: 1024px) {
                  div { --card-width: 31%; }
                }
              `}</style>

              {images.map((img, index) => {
                const isCurrentActive = index === activeIndex;
                return (
                  <div 
                    key={`${img.id}-${index}`}
                    className={`tactical-card-container group relative flex-shrink-0 w-[85%] md:w-[45%] lg:w-[31%] overflow-hidden border-4 bg-[#14190f] cursor-crosshair transition-all duration-500 ${
                      isCurrentActive 
                        ? 'border-[#a4c875] scale-[1.01] shadow-[0_0_20px_rgba(164,200,117,0.2)] z-20 opacity-100' 
                        : 'border-[#232b1a]/60 opacity-40 hover:opacity-80 hover:border-[#a4c875]/60'
                    }`}
                    style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}
                  >
                    <div className="relative w-full aspect-video h-40 sm:h-48 md:h-56 overflow-hidden bg-[#060804]">
                      
                      <img 
                        src={img.src} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-30 pointer-events-none transition-all duration-500 ease-out"
                      />

                      <img 
                        src={img.src} 
                        alt={img.location}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        onError={(e) => { 
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800'; 
                          e.currentTarget.className = "w-full h-full object-contain relative z-10 opacity-20 grayscale"; 
                        }}
                      />

                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(164,200,117,0.03),rgba(164,200,117,0.01),rgba(164,200,117,0.03))] bg-[length:100%_2px,3px_100%] opacity-30 z-20" />
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-75 transition-opacity duration-300 z-20">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 border border-dashed border-[#a4c875] rounded-full animate-spin [animation-duration:16s]" />
                        <div className="absolute w-6 sm:w-8 h-[1px] bg-[#a4c875]" />
                        <div className="absolute h-6 sm:h-8 w-[1px] bg-[#a4c875]" />
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 flex justify-between items-end border-t-2 border-[#232b1a] bg-[#060804]/95 transition-colors duration-300 group-hover:border-[#a4c875]/30">
                      <div className="font-mono-tech space-y-1">
                        <div className="text-[9px] sm:text-[10px] text-[#a4c875] uppercase tracking-[0.2em] font-bold">{img.id}</div>
                        <div className="text-xs sm:text-sm font-bold text-[#c2ccb9] tracking-tight group-hover:text-[#a4c875] transition-colors duration-300">{img.location}</div>
                      </div>
                      <div className="font-mono-tech text-[9px] sm:text-[10px] text-[#a4c875]/50 text-right font-bold transition-colors duration-300 group-hover:text-[#a4c875]/80">
                        REC {img.timestamp}
                      </div>
                    </div>

                    <div className="absolute top-2 left-2 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-[#a4c875] opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    <div className="absolute bottom-2 right-2 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-[#a4c875] opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  </div>
                );
              })}
            </div>

            {/* Centered interface buttons on mobile */}
            <div className="flex gap-3 justify-center sm:justify-end mt-6">
              <button 
                onClick={handlePrev}
                className="px-3 sm:px-4 py-2 bg-[#141a0e] hover:bg-[#a4c875] hover:text-black transition-all border border-[#a4c875]/30 text-[10px] sm:text-xs font-bold font-mono-tech text-[#a4c875] rounded-sm"
              >
                ◀ PREV
              </button>
              <button 
                onClick={handleNext}
                className="px-3 sm:px-4 py-2 bg-[#141a0e] hover:bg-[#a4c875] hover:text-black transition-all border border-[#a4c875]/30 text-[10px] sm:text-xs font-bold font-mono-tech text-[#a4c875] rounded-sm"
              >
                NEXT ▶
              </button>
            </div>
          </div>

          {/* Stacked terminal info on mobile */}
          <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#a4c875]/10 text-center sm:text-left">
            <div className="font-mono-tech text-[8px] sm:text-[10px] text-[#c2ccb9]/30 uppercase tracking-[0.3em]">
              System Status: Nominal // Fluid Full-Color Loop Stable
            </div>
            <div className="font-mono-tech text-[8px] sm:text-[10px] text-[#c2ccb9]/30 uppercase tracking-[0.3em]">
              Encrypted Tunnel: 09-AF-2026
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}