"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useBlogStore } from "@/store/blogStore";

export default function CommunitySection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const communityBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "community");
  }, [blogs]);

  if (!communityBlog) {
    return null;
  }

  const title = communityBlog.title;
  const tag = communityBlog.subtitle || "HOW WE'RE DIFFERENT";
  const bgImage = communityBlog.picture || "/images/charity.jpg";

  // Parse paragraphs purely from content
  const content = communityBlog.content || "";
  const rawParagraphs = content
    .split(/<br\s*\/?>|\n\n/)
    .map((p) => p.replace(/<[^>]*>?/gm, "").trim())
    .filter(Boolean);

  const paragraph1 = rawParagraphs[0] || "";
  const paragraph2 = rawParagraphs[1] || "";

  return (
    <section
      className="relative w-full min-h-screen py-20 md:py-28 bg-cover bg-center text-white overflow-hidden flex flex-col justify-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark Ambient Overlay for High Text Contrast */}
      <div className="absolute inset-0 bg-neutral-950/70 z-10 pointer-events-none" />

      <div className="relative z-20 max-w-[1440px] mx-auto px-[10px] md:px-6 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-16">
        
        {/* Left Side: Vertical Title & Tag */}
        <div className="flex flex-col gap-4 lg:py-6 max-w-lg lg:max-w-md">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-white/90">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>{tag}</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.08] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Right Side: 2-Column Content Grid & CTA Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1 items-end pt-4">
          
          {/* Column 1: Paragraph 1 + CTA Button */}
          <div className="flex flex-col gap-6">
            {paragraph1 && (
              <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                {paragraph1}
              </p>
            )}

            <div>
              <Link
                href="/about"
                className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group"
              >
                <span>How we partner with communities</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Paragraph 2 */}
          <div className="flex flex-col gap-6">
            {paragraph2 && (
              <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                {paragraph2}
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
