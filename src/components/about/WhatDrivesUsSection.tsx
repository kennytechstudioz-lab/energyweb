"use client";

import React from "react";
import Image from "next/image";

interface PillarItem {
  title: string;
  image: string;
  description: string;
}

const pillars: PillarItem[] = [
  {
    title: "Expertise",
    image: "/images/expert.webp",
    description:
      "New Energy Holdings’s extensive experience with all aspects of project development, project finance, operations, and customer service has made us a leader in the renewable energy industry.",
  },
  {
    title: "Leadership",
    image: "/images/leadership.webp",
    description:
      "New Energy Holdings’s leadership team represents decades of experience across renewable energy sectors and fosters a culture of integrity, accountability, and teamwork. The leadership team brings strategic vision to our platform, establishing a road map for the growth of our company.",
  },
  {
    title: "People",
    image: "/images/people.webp",
    description:
      "New Energy Holdings’s employees work across six offices and hundreds of sites. The team offers a diverse range of experience, including longtime solar and wind industry leaders, energy engineers, project developers, investment specialists, and experts in environmental issues, permitting, interconnection, transmission, and power plant operations.",
  },
  {
    title: "Community",
    image: "/images/community.webp",
    description:
      "Community engagement at New Energy Holdings starts with listening to the interests and needs of local communities, with our site teams taking a leadership role.",
  },
];

export default function WhatDrivesUsSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Tag, Headline & Intro */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
              <span>WHAT DRIVES US</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
              The engine inside New Energy Holdings
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-sm pt-1">
              Behind our success are the people who make it possible. Our team shares a sense of purpose, drive to solve hard problems, and commitment to doing good.
            </p>
          </div>

          {/* Right Column: 2x2 Pillars Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {pillars.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 items-start">
                
                <div className="flex items-center gap-4">
                  {/* Circular Image Icon with Accent Ring */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#009ADE] overflow-hidden relative flex-shrink-0 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#009ADE] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
                  {item.description}
                </p>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
