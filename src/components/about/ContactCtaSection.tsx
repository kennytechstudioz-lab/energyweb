"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContactCtaSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-24 md:py-32 overflow-hidden border-b border-neutral-200">
      
      {/* Background Wave Graphic */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/wave.svg"
          alt="Clean energy wave contours"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-70"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[10px] md:px-6">
        <div className="flex flex-col gap-6 max-w-3xl items-start">
          
          {/* Tag */}
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>CONTACT</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Get in touch
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-2xl">
            Whether you’re a landowner interested in hosting a project, energy buyer shopping for long-term power contracts, equipment supplier, or someone else interested in working with New Energy Holdings, we’d love to hear from you.
          </p>

          {/* CTA Button (#009ADE) */}
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group"
            >
              <span>Contact us</span>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
