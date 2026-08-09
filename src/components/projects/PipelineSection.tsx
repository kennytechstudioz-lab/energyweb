"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PipelineTab {
  id: string;
  name: string;
  image: string;
  description: string;
  statNumber: string;
  statLabel: string;
}

const pipelineTabs: PipelineTab[] = [
  {
    id: "wind",
    name: "Wind energy",
    image: "/images/windenergy.webp",
    description:
      "New Energy Holdings is working in 23 states to bring reliable and low-cost clean energy to the grid.",
    statNumber: "6 GW",
    statLabel: "in wind development",
  },
  {
    id: "solar",
    name: "Solar energy",
    image: "/images/solarenergy.webp",
    description:
      "Our utility-scale solar projects provide zero-emission power, expanding energy independence and regional economic development.",
    statNumber: "18 GW",
    statLabel: "in solar development",
  },
  {
    id: "storage",
    name: "Energy storage",
    image: "/images/storageenergy.webp",
    description:
      "Next-generation battery storage systems ensure grid stability, firming renewable generation for 24/7 reliability.",
    statNumber: "6 GW",
    statLabel: "in storage development",
  },
];

export default function PipelineSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const current = pipelineTabs[activeTab];

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6 flex flex-col gap-12 md:gap-16">
        
        {/* Top Tag & Main Headline */}
        <div className="flex flex-col items-center gap-4 text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>PROGRESS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            We’re developing a 30 GW pipeline nationwide
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl">
            With one of the nation’s largest renewable energy pipelines, New Energy Holdings is leading the transition to reliable, low-cost clean energy.
          </p>
        </div>

        {/* Dynamic Content Area for Active Tab (2-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center min-h-[120px] max-w-3xl mx-auto w-full transition-all duration-300">
          
          {/* Left Column: Description Text */}
          <div className="md:col-span-7 flex items-center">
            <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Right Column: Key Metric Stat */}
          <div className="md:col-span-5 flex flex-col gap-1 justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#009ADE] tracking-tight leading-none">
              {current.statNumber}
            </span>
            <span className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
              {current.statLabel}
            </span>
          </div>

        </div>

        {/* 3 Clickable Circular Tab Triggers */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-3xl mx-auto w-full">
          {pipelineTabs.map((tab, idx) => {
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

                {/* Circular Photo with Gold Ring */}
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

                  {/* Tab Label */}
                  <span
                    className={`text-xs sm:text-sm font-bold transition-colors ${
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
