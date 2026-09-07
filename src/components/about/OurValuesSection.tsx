"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useBlogStore } from "@/store/blogStore";

interface ValueItem {
  title: string;
  description: string;
}

export default function OurValuesSection() {
  const { blogs, fetchBlogs } = useBlogStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const dynamicValues: ValueItem[] = useMemo(() => {
    const items = blogs.filter((b) => b.category?.toLowerCase().trim() === "values");
    if (!items || items.length === 0) return [];

    return items.map((b) => ({
      title: b.title,
      description: b.content ? b.content.replace(/<[^>]*>?/gm, "") : "",
    }));
  }, [blogs]);

  if (dynamicValues.length === 0) {
    return null;
  }

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Tag, Headline & Intro */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
              <span>HOW WE WORK</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
              Our Values
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-md pt-1">
              Our core set of values underpin everything we do at New Energy Holdings
            </p>
          </div>

          {/* Right Column: Accordion Rows */}
          <div className="lg:col-span-7 flex flex-col border-t border-neutral-300">
            {dynamicValues.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-neutral-300 transition-colors py-5 md:py-6 flex flex-col gap-3 cursor-pointer group"
                  onClick={() => toggleItem(idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Title (Cyan-Blue #009ADE) */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#009ADE] leading-tight tracking-tight group-hover:text-[#0082be] transition-colors">
                      {item.title}
                    </h3>

                    {/* Circular Toggle Button */}
                    <button
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#009ADE] text-white flex items-center justify-center font-black text-base sm:text-lg transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-45 bg-[#0082be]" : "group-hover:scale-110"
                      }`}
                      aria-label="Toggle value details"
                    >
                      +
                    </button>
                  </div>

                  {/* Expandable Details */}
                  {isOpen && (
                    <div className="pt-1 text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed max-w-2xl">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
