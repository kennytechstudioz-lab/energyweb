"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ValueTab {
  id: string;
  name: string;
  image: string;
  quote: string;
  statNumber: string;
  statLabel: string;
}

const valueTabs: ValueTab[] = [
  {
    id: "quality",
    name: "Quality",
    image: "/images/wind.webp",
    quote:
      "We build to last: our projects, our partnerships, our people, and our business.",
    statNumber: "450+",
    statLabel: "projects in our operating fleet",
  },
  {
    id: "respect",
    name: "Respect",
    image: "/images/worker.webp",
    quote:
      "We consider perspectives from all directions, value backgrounds of all kinds, strive to understand through new lenses, and communicate thoughtfully.",
    statNumber: "25%",
    statLabel: "of employees are actively involved in our inclusion groups",
  },
  {
    id: "possibility",
    name: "Possibility",
    image: "/images/crane.webp",
    quote:
      "We seek to realize the potential in our people, our partners, and our projects.",
    statNumber: "900",
    statLabel: "landowners hosting our projects",
  },
];

export default function RootedInValuesSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const current = valueTabs[activeTab];

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6 flex flex-col gap-16 md:gap-20">
        
        {/* Main Section Headline (Centered) */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Profoundly rooted in values
          </h2>
        </div>

        {/* Dynamic Content Area for Active Tab (2-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center min-h-[140px] max-w-4xl mx-auto w-full transition-all duration-300">
          
          {/* Left Column: Descriptive Quote */}
          <div className="md:col-span-6 flex items-center">
            <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
              {current.quote}
            </p>
          </div>

          {/* Right Column: Key Metric Stat */}
          <div className="md:col-span-6 flex flex-col gap-1.5 justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#009ADE] tracking-tight leading-none">
              {current.statNumber}
            </span>
            <span className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 leading-tight">
              {current.statLabel}
            </span>
          </div>

        </div>

        {/* 3 Clickable Value Tabs with Indicator Bars & Circular Photos */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-4xl mx-auto w-full">
          {valueTabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className="flex flex-col items-start gap-6 cursor-pointer group select-none"
              >
                {/* Top Active / Inactive Indicator Line */}
                <div
                  className={`w-full h-[3.5px] rounded-full transition-colors duration-300 ${
                    isActive ? "bg-[#009ADE]" : "bg-neutral-200 group-hover:bg-neutral-300"
                  }`}
                />

                {/* Circular Photo with Accent Ring */}
                <div className="flex flex-col items-start gap-3">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#eab308] overflow-hidden relative shadow-sm transition-transform duration-300 ${
                      isActive ? "scale-105 ring-4 ring-[#009ADE]/20" : "group-hover:scale-105"
                    }`}
                  >
                    <Image
                      src={tab.image}
                      alt={tab.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Tab Title */}
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isActive ? "text-neutral-900 font-black" : "text-neutral-600 group-hover:text-neutral-900"
                    }`}
                  >
                    {tab.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
