"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExploreProjectsSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Title, Copy & CTA Button */}
          <div className="lg:col-span-5 flex flex-col gap-6 items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
              Explore all our projects
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              View our portfolio of hundreds of operating and development solar, wind, and storage projects across the country.
            </p>

            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group"
              >
                <span>View the interactive map</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview Image */}
          <div className="lg:col-span-7 relative w-full">
            <div className="relative w-full aspect-[1.4/1] rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 group">
              <Image
                src="/images/interactivemap3.jpg"
                alt="New Energy Holdings nationwide project locations map"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
