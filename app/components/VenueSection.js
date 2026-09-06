'use client'

import React from 'react'
import { MapPin, ExternalLink, Bus, Train, Plane } from 'lucide-react'

export default function VenueSection() {
  const MAPS_URL = 'https://maps.app.goo.gl/2HVqv4X5WuALsgdH7'

  const transit = [
    {
      mode: 'By Bus',
      icon: Bus,
      info: 'Kothamangalam KSRTC Bus Stand',
      distance: '3 km',
    },
    {
      mode: 'By Train',
      icon: Train,
      info: 'Aluva Railway Station (AWY)',
      distance: '35 km',
    },
    {
      mode: 'By Air',
      icon: Plane,
      info: 'Cochin International Airport (COK)',
      distance: '32 km',
    },
  ]

  return (
    <section
      id="venue"
      className="relative z-10 w-full bg-[#070a06] py-16 md:py-24 border-t border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
            REACH US
          </h2>
        </div>

        {/* Venue Container */}
        <div className="rounded-xl border border-[#a4c875]/30 bg-[#0c1209]/90 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Stadium Visual */}
            <div className="lg:col-span-6">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-lg border border-white/15"
              >
                <img
                  src="/venue-stadium.jpg"
                  alt="Baselious Paulose Indoor Stadium, MACE Kothamangalam"
                  className="h-[220px] sm:h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-2 rounded bg-black/80 border border-[#a4c875] px-3.5 py-1.5 font-mono text-xs text-[#a4c875] uppercase">
                    <MapPin className="size-4" />
                    Open in Google Maps
                  </span>
                </div>
              </a>
            </div>

            {/* Venue Details & Transit */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-5">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wide text-white">
                  Baselious Paulose Indoor Stadium
                </h3>
                <p className="mt-1 font-sans text-sm text-gray-300">
                  Mar Athanasius College of Engineering (MACE)
                </p>
                <p className="font-sans text-xs text-gray-400">
                  Kothamangalam, Kerala 686666
                </p>
              </div>

              {/* Transit Info */}
              <div className="flex flex-col gap-2.5">
                {transit.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.mode}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-black/40 px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 text-[#a4c875] shrink-0" />
                        <span className="font-sans text-xs font-semibold text-white">
                          {item.mode}:
                        </span>
                        <span className="font-sans text-xs text-gray-300">
                          {item.info}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#a4c875] bg-[#a4c875]/10 border border-[#a4c875]/20 px-2 py-0.5 rounded shrink-0">
                        {item.distance}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Google Maps Button */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-full items-center justify-center gap-2.5 rounded bg-[#a4c875] text-[#0a0c08] font-heading text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#b8de85] hover:shadow-[0_0_25px_rgba(164,200,117,0.5)] cursor-pointer"
              >
                <MapPin className="size-4 shrink-0" strokeWidth={2.2} />
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
