"use client";

import React from "react";

export default function CorporateStructureSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Tag & Section Headline */}
        <div className="flex flex-col gap-5 max-w-4xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>CORPORATE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Our public affiliate and ownership structure
          </h2>
        </div>

        {/* 2-Column Balanced Text Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 text-sm sm:text-base font-medium text-neutral-700 leading-relaxed">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <p>
              New Energy Holdings, Inc. is one of the largest owners of clean energy generation assets in the U.S. Our portfolio comprises approximately 13.6 GW of gross capacity in 27 states, including approximately 10.8 GW of wind, solar and battery energy storage systems and approximately 2.8 GW of flexible dispatchable power generation providing critical grid reliability services.
            </p>
            <p>
              Through our diversified and primarily contracted clean energy portfolio, New Energy Holdings endeavors to provide its investors with stable and growing dividend income. New Energy Holdings, Inc.&apos;s common stock is traded on the New York Stock Exchange under the symbol NEH.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <p>
              New Energy Holdings Group owns a controlling interest in New Energy Holdings, Inc. and serves as its supporting sponsor, principally through the development of renewable energy projects crafted to be optimal investment candidates for New Energy Holdings, Inc. and also through the operation of renewable energy projects owned by New Energy Holdings, Inc. and also through the provision of administrative support services.
            </p>
            <p>
              New Energy Holdings Group is owned by Global Infrastructure Partners and TotalEnergies.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
