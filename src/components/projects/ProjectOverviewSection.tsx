"use client";

import React, { useEffect, useMemo } from "react";
import { useBlogStore } from "@/store/blogStore";

export default function ProjectOverviewSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const projectBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "projects");
  }, [blogs]);

  if (!projectBlog) {
    return null;
  }

  const content = projectBlog.content || "";
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
    <section className="relative w-full bg-white text-neutral-900 py-16 md:py-20 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* 2-Column Process Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 text-sm sm:text-base font-medium text-neutral-700 leading-relaxed">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {col1.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {col2.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
