"use client";

import React from "react";
import Image from "next/image";

export default function ContactHeroSection() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  const scrollToLocations = () => {
    const el = document.getElementById("contact-locations-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.6, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-neutral-900 text-white flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      
      {/* Background Image: solar.webp */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/solar.webp"
          alt="New Energy Holdings solar arrays"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 z-10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-[10px] md:px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
          
          {/* Left Column: Big Headline */}
          <div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
              Contact us
            </h1>
          </div>

          {/* Right Column: Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            
            {/* Button 1: Solid #009ADE with down arrow */}
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-between gap-6 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group cursor-pointer"
            >
              <div className="flex flex-col text-left leading-tight">
                <span>Send us a</span>
                <span>message</span>
              </div>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>

            {/* Button 2: Bordered outline button with down arrow */}
            <button
              onClick={scrollToLocations}
              className="inline-flex items-center justify-between gap-6 border-2 border-white bg-black/40 hover:bg-white hover:text-neutral-900 text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group cursor-pointer"
            >
              <div className="flex flex-col text-left leading-tight">
                <span>See our</span>
                <span>locations</span>
              </div>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>

          </div>

        </div>
      </div>

    </section>
  );
}
