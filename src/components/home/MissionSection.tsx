"use client";

import React from "react";

interface MetricItem {
  tag: string;
  value: string;
  description: string;
}

const metrics: MetricItem[] = [
  {
    tag: "PORTFOLIO",
    value: "450+",
    description: "Projects in our operating fleet",
  },
  {
    tag: "IMPACT",
    value: "35",
    description: "States where we develop or operate projects",
  },
  {
    tag: "SCALE",
    value: "14 GW",
    description: "Gross operating capacity (we own 11 GW)",
  },
  {
    tag: "TRUST",
    value: "900",
    description: "Landowners hosting our projects",
  },
  {
    tag: "PARTNERSHIP",
    value: "$92M",
    description: "Investment in local communities each year",
  },
  {
    tag: "TEAM",
    value: "1000+",
    description: "Employees who make it all possible",
  },
];

export default function MissionSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 border-b border-neutral-100 overflow-hidden">
      
      {/* Full-width Split Background Layer (60% left / 40% right) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-7 bg-white" />
        <div className="lg:col-span-5 bg-[#f8fafc] border-l border-neutral-100/80" />
      </div>

      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column (60% width): Large Mission Headline */}
          <div className="lg:col-span-7 bg-white px-[10px] md:px-8 py-16 sm:py-24 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.12] tracking-tight max-w-2xl">
              Our mission is{" "}
              <span className="text-[#009ADE]">
                to make clean, competitive, and reliable energy.
              </span>
            </h2>
          </div>

          {/* Right Column (40% width): Metrics Area */}
          <div className="lg:col-span-5 bg-[#f8fafc] px-[10px] md:px-8 py-12 sm:py-16 flex flex-col justify-center">
            <div className="flex flex-col">
              {metrics.map((item, index) => (
                <div
                  key={index}
                  className={`py-4 sm:py-5 flex flex-row items-center justify-between gap-4 ${
                    index !== metrics.length - 1 ? "border-b border-neutral-200/70" : ""
                  }`}
                >
                  {/* Left Side: Tag + Number (51px) */}
                  <div className="flex flex-col gap-0.5 min-w-[130px] sm:min-w-[150px]">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <span className="text-[38px] sm:text-[51px] font-black text-[#009ADE] tracking-tight leading-none">
                      {item.value}
                    </span>
                  </div>

                  {/* Right Side: Description Text (16px) */}
                  <div className="flex-1 text-left">
                    <p className="text-[14px] sm:text-[16px] font-semibold text-neutral-700 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
