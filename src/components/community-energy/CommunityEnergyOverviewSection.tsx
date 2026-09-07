"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

interface OverviewCard {
  title: string;
  bgClass: string;
  offset: string;
  text: string;
}

const COLOR_VARIANTS = [
  { bgClass: "bg-[#004bb4]", offset: "0%" },
  { bgClass: "bg-[#f59e0b]", offset: "-100%" },
  { bgClass: "bg-[#eab308]", offset: "-200%" },
];

export default function CommunityEnergyOverviewSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const cards = useMemo(() => {
    const items = blogs.filter(
      (b) =>
        b.category?.toLowerCase().trim() === "community-energy" &&
        !b.shortName?.includes("Hero")
    );
    if (!items || items.length === 0) return [];

    return items.map((b, idx) => {
      const meta = COLOR_VARIANTS[idx % COLOR_VARIANTS.length];
      return {
        title: b.title,
        bgClass: meta.bgClass,
        offset: meta.offset,
        text: b.content ? b.content.replace(/<[^>]*>?/gm, "") : "",
      };
    });
  }, [blogs]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 antialiased">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 items-center text-center">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center gap-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            About New Energy Community Solar
            <div className="w-36 h-1 bg-[#eab308] mx-auto mt-3 rounded-full" />
          </h2>
          
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mt-2">
            We believe in a clean energy future. Community Solar is a hassle-free, roofless solar energy program that empowers you to make a difference and reduce your electricity costs. New Energy Holdings is NOT a Retail Energy Provider. New Energy Holdings is NOT a utility. We are a top renewables company, and with Community Solar, it&apos;s never been easier to support renewable power and benefit from energy savings.
          </p>
        </div>

        {/* 3-Column Panoramic Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col gap-5 text-center group">
              {/* Image Frame with sliced view of panels.jpg */}
              <div className="relative h-[240px] sm:h-[290px] w-full overflow-hidden rounded-md shadow-md border border-neutral-200 bg-neutral-100">
                {/* 300% Width Image positioning for panoramic effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 w-[300%] h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ left: card.offset }}
                  >
                    <Image
                      src="/images/panels.jpg"
                      alt={`Community Solar ${card.title}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Colored Pill Banner */}
                <div
                  className={`absolute bottom-0 left-0 right-0 py-3.5 px-4 ${card.bgClass} shadow-md transition-all duration-300`}
                >
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Text Description */}
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed px-2">
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
