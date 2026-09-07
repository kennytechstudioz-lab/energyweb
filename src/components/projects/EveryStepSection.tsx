"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

interface StepItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  image?: string;
}

export default function EveryStepSection() {
  const { blogs, fetchBlogs } = useBlogStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const dynamicSteps: StepItem[] = useMemo(() => {
    const items = blogs.filter((b) => b.category?.toLowerCase().trim() === "project-steps");
    if (!items || items.length === 0) return [];

    return items.map((b, idx) => ({
      id: b.shortName?.toLowerCase() || `step-${idx}`,
      title: b.title,
      summary: b.subtitle || "Development phase",
      description: b.content ? b.content.replace(/<[^>]*>?/gm, "") : "",
      image: b.picture || "/images/site.png",
    }));
  }, [blogs]);

  if (dynamicSteps.length === 0) {
    return null;
  }

  const toggleStep = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Tag, Headline & Intro */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>PROCESS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Every step of the way
          </h2>

          <p className="text-base sm:text-xl font-medium text-neutral-600 leading-relaxed pt-1">
            Project development is a multi-year, multi-stakeholder process. We take pride in our diligent, expert-led team, our mission to do good by the communities where we work, and our commitment to being a reliable long-term partner.
          </p>
        </div>

        {/* 6 Accordion Process Steps */}
        <div className="flex flex-col border-t border-neutral-300">
          {dynamicSteps.map((step, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={step.id || idx}
                className="border-b border-neutral-300 transition-colors py-6 md:py-8 flex flex-col gap-6 cursor-pointer group"
                onClick={() => toggleStep(idx)}
              >
                {/* Header Row: Title, Summary & Circular Toggle */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Left Title */}
                  <div className="md:col-span-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#009ADE] tracking-tight leading-tight group-hover:text-[#0082be] transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Middle Summary Label */}
                  <div className="md:col-span-7">
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-800 leading-snug">
                      {step.summary}
                    </span>
                  </div>

                  {/* Right Circular Toggle Button */}
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#009ADE] text-white flex items-center justify-center font-black text-base sm:text-lg transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-45 bg-[#0082be]" : "group-hover:scale-110"
                      }`}
                      aria-label="Toggle step details"
                    >
                      +
                    </button>
                  </div>

                </div>

                {/* Expanded Content View */}
                {isOpen && (
                  <div className="pt-2 border-t border-neutral-100/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Detailed Description */}
                    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
                      <p className="text-sm sm:text-base font-medium text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Right Column: Step Image Card */}
                    {step.image && (
                      <div className="md:col-span-6 lg:col-span-5 relative">
                        <div className="relative w-full aspect-[1.5/1] rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-50 group-hover:shadow-lg transition-shadow">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
