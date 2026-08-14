"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandownersOverviewSection() {
  return (
    <section className="w-full bg-[#0d0e12] text-white py-24 md:py-32 border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
              LONG-TERM PARTNERSHIPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Unlocking the true potential of your land.
            </h2>
            <p className="text-base text-neutral-300 font-light leading-relaxed">
              At New Energy Holdings, landowners are at the heart of our mission. We partner with farmers, ranchers, and commercial landowners to develop utility-scale solar, wind, and battery storage projects that generate reliable, long-term lease income while preserving land heritage for generations to come.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-[#009ADE] pl-4 flex flex-col gap-1">
                <span className="text-2xl font-black text-white">Guaranteed Income</span>
                <span className="text-xs text-neutral-400 font-medium">Fixed 25-30 year long-term lease revenues unaffected by crop or market volatility.</span>
              </div>

              <div className="border-l-2 border-[#009ADE] pl-4 flex flex-col gap-1">
                <span className="text-2xl font-black text-white">Zero Capital Required</span>
                <span className="text-xs text-neutral-400 font-medium">New Energy Holdings covers 100% of engineering, permitting, construction, and maintenance costs.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/landowners.jpg"
              alt="Landowners partnership"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#14161f]/80 backdrop-blur-md rounded-xl border border-white/10">
              <span className="text-xs font-black text-[#009ADE] uppercase tracking-wider block">Community First</span>
              <span className="text-sm font-bold text-white mt-1 block">Preserving agricultural heritage while powering clean energy grid transitions.</span>
            </div>
          </div>
        </div>

        {/* 3 Steps Workflow */}
        <div className="flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">HOW IT WORKS</span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">Simple, Transparent Land Development</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#14161f] border border-white/10 p-8 rounded-xl flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-[#009ADE]/15 text-[#009ADE] font-black text-base flex items-center justify-center border border-[#009ADE]/30">
                01
              </div>
              <h4 className="text-lg font-black text-white">Site Evaluation &amp; Consultation</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                We assess your acreage for solar exposure, wind speeds, and grid interconnectivity with zero obligation.
              </p>
            </div>

            <div className="bg-[#14161f] border border-white/10 p-8 rounded-xl flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-[#009ADE]/15 text-[#009ADE] font-black text-base flex items-center justify-center border border-[#009ADE]/30">
                02
              </div>
              <h4 className="text-lg font-black text-white">Lease Agreement &amp; Permitting</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                We structure fair, competitive lease terms and handle all environmental studies, zoning, and regulatory permits.
              </p>
            </div>

            <div className="bg-[#14161f] border border-white/10 p-8 rounded-xl flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-[#009ADE]/15 text-[#009ADE] font-black text-base flex items-center justify-center border border-[#009ADE]/30">
                03
              </div>
              <h4 className="text-lg font-black text-white">Construction &amp; Daily Operation</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Our clean energy facility begins operation, delivering reliable quarterly or annual lease payments for decades.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
