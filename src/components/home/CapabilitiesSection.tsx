"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CapabilityItem {
  title: string;
  description: string;
  details?: string;
}

const capabilities: CapabilityItem[] = [
  {
    title: "Origination and business development",
    description: "Focused on natural gas, storage, solar, and wind.",
    details: "Our origination team identifies strategic land parcels, secures long-term power purchase agreements, and builds pipeline growth options across renewable and conventional energy markets.",
  },
  {
    title: "Project development",
    description: "Site diligence, project management, permitting and interconnection",
    details: "Comprehensive site assessment, environmental permitting, community stakeholder engagement, and utility interconnection approvals to move projects smoothly from concept to construction.",
  },
  {
    title: "Engineering, procurement, and construction management",
    description: "Industry-leading technical services and construction management",
    details: "Direct oversight of equipment procurement, EPC contractor management, system design optimization, and safety protocol enforcement during facility construction.",
  },
  {
    title: "Capital markets",
    description: "Over $24 billion capital raised to finance over 450+ distinct projects",
    details: "Structuring tax equity, debt financing, and institutional capital syndication to optimize capital efficiency and risk-adjusted investor returns.",
  },
  {
    title: "Commercial operations",
    description: "In-house asset management and operations and maintenance",
    details: "24/7 real-time dispatch monitoring, predictive O&M maintenance, power marketing trading, and long-term asset value maximization.",
  },
];

export default function CapabilitiesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6 flex flex-col gap-12">
        
        {/* Top Header & Intro */}
        <div className="flex flex-col gap-5 max-w-4xl">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>HOW WE DELIVER</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1]">
            A leading independent clean power producer and developer
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-3xl pt-1">
            What sets us apart? At New Energy Holdings, we control all stages of the value chain, from greenfield development to decades of project operations. We operate one of the nation’s largest platforms across 27 states. And we have a proven ability to execute.
          </p>
        </div>

        {/* 5 Capability Rows */}
        <div className="flex flex-col border-t border-neutral-300 mt-4">
          {capabilities.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-neutral-300 transition-colors py-6 md:py-8 flex flex-col gap-3 cursor-pointer group"
                onClick={() => toggleItem(idx)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                  
                  {/* Left Column: Title (Cyan-Blue #009ADE) */}
                  <div className="md:w-5/12">
                    <h3 className="text-xl sm:text-2xl font-black text-[#009ADE] leading-tight tracking-tight group-hover:text-[#0082be] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Column: Summary Description */}
                  <div className="md:w-6/12">
                    <p className="text-xs sm:text-sm font-semibold text-neutral-700 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Circular Plus Icon */}
                  <div className="md:w-1/12 flex justify-end">
                    <button
                      className={`w-8 h-8 rounded-full bg-[#009ADE] text-white flex items-center justify-center font-black text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-[#0082be]" : "group-hover:scale-110"
                      }`}
                      aria-label="Toggle details"
                    >
                      +
                    </button>
                  </div>

                </div>

                {/* Expandable Details */}
                {isOpen && item.details && (
                  <div className="pt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                    {item.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Right CTA Button */}
        <div className="flex justify-end pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group"
          >
            <span>About New Energy Holdings</span>
            <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
