"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

const ICONS = [
  (
    <svg key="1" className="w-8 h-8 text-[#009ADE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg key="2" className="w-8 h-8 text-[#009ADE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  (
    <svg key="3" className="w-8 h-8 text-[#009ADE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  (
    <svg key="4" className="w-8 h-8 text-[#009ADE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
];

export default function PlansWhyUsSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const dynamicAdvantages = useMemo(() => {
    const items = blogs.filter((b) => b.category?.toLowerCase().trim() === "plans");
    if (!items || items.length === 0) return [];

    return items.map((b) => ({
      title: b.title,
      description: b.content ? b.content.replace(/<[^>]*>?/gm, "") : "",
    }));
  }, [blogs]);

  if (dynamicAdvantages.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#111218] text-white py-24 md:py-32 overflow-hidden border-t border-white/10">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <Image
          src="/wave.svg"
          alt="Clean energy background graphic"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-50"
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
            CAPITAL ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Designed for institutional security, accessibility &amp; growth.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Our clean energy investment framework combines rigid risk mitigation with real-time financial transparency.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dynamicAdvantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-[#181a24]/90 border border-white/10 p-8 rounded-xl flex flex-col gap-4 hover:border-[#009ADE]/50 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="p-3 bg-[#009ADE]/10 border border-[#009ADE]/20 rounded-lg self-start group-hover:bg-[#009ADE]/20 transition-colors">
                {ICONS[idx % ICONS.length]}
              </div>
              <h3 className="text-lg font-black text-white leading-snug">
                {adv.title}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
