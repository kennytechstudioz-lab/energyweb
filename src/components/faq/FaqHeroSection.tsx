"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FaqHeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function FaqHeroSection({
  searchQuery,
  setSearchQuery,
}: FaqHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[65vh] bg-neutral-950 text-white flex flex-col justify-center overflow-hidden border-b border-white/10">
      
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/discussing.jpg"
          alt="New Energy Holdings Support and FAQ"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32 flex flex-col gap-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400">
          <Link href="/" className="hover:text-[#009ADE] transition-colors underline underline-offset-4">
            Home
          </Link>
          <span className="text-neutral-500">&gt;</span>
          <span className="text-[#009ADE] font-extrabold uppercase tracking-wider">FAQ</span>
        </div>

        <div className="flex flex-col gap-6 max-w-3xl">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#009ADE]/15 border border-[#009ADE]/30 text-[#009ADE] text-xs font-black uppercase tracking-[0.2em] self-start">
            <span className="w-2 h-2 rounded-full bg-[#009ADE]" />
            Knowledge Base &amp; Support
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Frequently Asked <span className="text-[#009ADE]">Questions</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
            Have questions about clean energy investments, account setup, daily yields, or capital withdrawals? Search our knowledge base or browse by category below.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-xl w-full mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic (e.g. withdrawal, yield, deposit, security)..."
              className="w-full bg-[#14161f]/90 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#009ADE] focus:ring-1 focus:ring-[#009ADE] transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
