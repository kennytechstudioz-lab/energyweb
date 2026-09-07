"use client";

import React, { useEffect, useMemo } from "react";
import { useBlogStore } from "@/store/blogStore";

export default function CorporateStructureSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const corpBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "corporate");
  }, [blogs]);

  if (!corpBlog) {
    return null;
  }

  const title = corpBlog.title;
  const tag = corpBlog.subtitle || "CORPORATE";

  // Parse paragraphs cleanly from content
  const content = corpBlog.content || "";
  const rawParagraphs = content
    .split(/<br\s*\/?>|\n\n/)
    .map((p) => p.replace(/<[^>]*>?/gm, "").trim())
    .filter(Boolean);

  if (rawParagraphs.length === 0) {
    return null;
  }

  const midPoint = Math.ceil(rawParagraphs.length / 2);
  const col1 = rawParagraphs.slice(0, midPoint);
  const col2 = rawParagraphs.slice(midPoint);

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Tag & Section Headline */}
        <div className="flex flex-col gap-5 max-w-4xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>{tag}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            {title}
          </h2>
        </div>

        {/* 2-Column Balanced Text Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 text-sm sm:text-base font-medium text-neutral-700 leading-relaxed">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {col1.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {col2.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
