"use client";

import React from "react";
import Image from "next/image";

export default function ProjectShowcaseSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-12 md:py-20 overflow-hidden border-b border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Main Showcase Image Card */}
        <div className="relative w-full aspect-[16/9] max-h-[720px] rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 group">
          <Image
            src="/images/discussing.jpg"
            alt="New Energy Holdings project development leadership team in the field"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Professional Image Caption */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 px-1">
          <p className="text-xs sm:text-sm font-semibold text-neutral-600 leading-relaxed max-w-4xl">
            <span className="font-extrabold text-neutral-900 mr-1.5">In the field:</span>
            New Energy Holdings project development leadership team discussing site interconnection, environmental diligence, and community alignment during greenfield development.
          </p>
          <span className="text-[11px] font-black text-[#009ADE] uppercase tracking-wider flex-shrink-0">
            Site Operations
          </span>
        </div>

      </div>
    </section>
  );
}
