"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SustainabilityCommitmentSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Landowners Image */}
          <div className="lg:col-span-7 relative w-full">
            <div className="relative w-full aspect-[1.4/1] rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 group">
              <Image
                src="/images/landowners.jpg"
                alt="New Energy Holdings landowner partners and sustainable agriculture"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right Column: Title, Copy & CTA Button */}
          <div className="lg:col-span-5 flex flex-col gap-6 items-start">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
              Our commitment to sustainability
            </h2>

            <div className="flex flex-col gap-4 text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              <p>
                New Energy Holdings is committed to sustainability in all aspects of our operations and governance.
              </p>
              <p>
                We are guided by our operating principles and a robust framework of policies that ensure our actions are fair, balanced, and ethical.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group"
              >
                <span>Read our ESG Report</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
