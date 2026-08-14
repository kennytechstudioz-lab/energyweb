"use client";

import React from "react";
import Image from "next/image";

export default function LandownersImpactSection() {
  return (
    <section className="w-full bg-white text-neutral-900 py-16 sm:py-24 md:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & 2x2 Stats Grid */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            
            {/* Main Headline Statement */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#2d2e32] leading-snug tracking-tight">
              With your help, New Energy Holdings is creating reliable and low-cost power for residents and businesses across the United States.
            </h2>

            {/* 2x2 Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-2">
              
              {/* Stat 1 */}
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#333333] tracking-tight">
                  350+
                </span>
                <span className="text-sm sm:text-base text-[#555555] font-normal leading-snug">
                  projects in our operating fleet
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#333333] tracking-tight">
                  10 GW
                </span>
                <span className="text-sm sm:text-base text-[#555555] font-normal leading-snug">
                  gross operating capacity (we own 8.1 GW)
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#333333] tracking-tight">
                  $75M
                </span>
                <span className="text-sm sm:text-base text-[#555555] font-normal leading-snug">
                  investment in local communities each year
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#333333] tracking-tight">
                  500+
                </span>
                <span className="text-sm sm:text-base text-[#555555] font-normal leading-snug">
                  landowners hosting our projects
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: landowners.png Image */}
          <div className="lg:col-span-6 relative w-full aspect-[4/3] sm:aspect-[5/4] rounded-sm overflow-hidden shadow-sm">
            <Image
              src="/images/landowners.png"
              alt="Landowners hosting New Energy Holdings clean energy projects"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
