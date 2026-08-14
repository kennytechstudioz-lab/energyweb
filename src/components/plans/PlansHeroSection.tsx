"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PlansHeroSection() {
  const scrollToPlans = () => {
    const el = document.getElementById("investment-plans-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("profit-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-neutral-950 text-white flex flex-col justify-center overflow-hidden border-b border-white/10">
      
      {/* Background Hero Image with Deep Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/solarenergy.webp"
          alt="New Energy Holdings Clean Energy Investment Portfolios"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 md:py-36 flex flex-col gap-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400">
          <Link href="/" className="hover:text-[#009ADE] transition-colors underline underline-offset-4">
            Home
          </Link>
          <span className="text-neutral-500">&gt;</span>
          <span className="text-[#009ADE] font-extrabold uppercase tracking-wider">Investment Plans</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headlines & Subtext */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#009ADE]/15 border border-[#009ADE]/30 text-[#009ADE] text-xs font-black uppercase tracking-[0.2em] self-start">
              <span className="w-2 h-2 rounded-full bg-[#009ADE] animate-ping" />
              Structured Capital Portfolios
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Accelerate your capital with <span className="text-[#009ADE]">clean energy</span> yields.
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              Allocate directly into operational utility-scale solar, wind, and battery storage reserves. Earn predictable daily yields backed by real-world renewable energy infrastructure.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToPlans}
                className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-8 rounded transition-all group cursor-pointer shadow-lg shadow-[#009ADE]/20"
              >
                <span>View Plans &amp; Tranches</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>

              <button
                onClick={scrollToCalculator}
                className="inline-flex items-center justify-between gap-4 border-2 border-white/80 bg-white/5 hover:bg-white hover:text-neutral-950 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-8 rounded transition-all group cursor-pointer backdrop-blur-sm"
              >
                <span>Calculate Returns</span>
                <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5] flex-shrink-0" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>

          </div>

          {/* Right Column: Key Feature Highlights Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#12141a]/80 border border-white/10 p-6 sm:p-8 rounded-xl backdrop-blur-md flex flex-col gap-6 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
                Why Allocate With Us
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 border-l-2 border-[#009ADE] pl-4">
                  <span className="text-2xl sm:text-3xl font-black text-white">Up to 3.5%</span>
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Daily ROI Yield</span>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-[#009ADE] pl-4">
                  <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Asset Backing</span>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-[#009ADE] pl-4">
                  <span className="text-2xl sm:text-3xl font-black text-white">24/7</span>
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Automated Credit</span>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-[#009ADE] pl-4">
                  <span className="text-2xl sm:text-3xl font-black text-white">Tiered</span>
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Ref Bonus Rewards</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified ESG Contracts
                </span>
                <span className="text-[#009ADE] font-extrabold">Instant Activation</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
