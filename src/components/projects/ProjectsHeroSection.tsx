"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useBlogStore } from "@/store/blogStore";

export default function ProjectsHeroSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const projectBlog = React.useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "projects");
  }, [blogs]);

  if (!projectBlog) {
    return null;
  }

  const title = projectBlog.title;
  const subtitle =
    projectBlog.subtitle ||
    (projectBlog.content ? projectBlog.content.replace(/<[^>]*>?/gm, "") : "");

  const scrollToVideos = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 pt-16 pb-28 md:pb-36 border-b border-neutral-100 overflow-hidden">
      
      {/* Background Wave Graphic */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/wave.svg"
          alt="Clean energy wave contours"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-60"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[10px] md:px-6 flex flex-col items-start">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500 mb-8">
          <Link href="/" className="hover:text-[#009ADE] transition-colors underline underline-offset-2">
            Home
          </Link>
          <span className="text-neutral-400">&gt;</span>
          <span className="text-neutral-700 underline underline-offset-2">Expertise</span>
        </div>

        {/* Big Cyan-Blue Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#009ADE] tracking-tight leading-none mb-6">
          {title}
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-base sm:text-xl font-bold text-neutral-900 leading-relaxed max-w-3xl mb-10">
          {subtitle}
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          
          {/* Button 1: Solid #009ADE with diagonal arrow */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-between gap-6 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group"
          >
            <div className="flex flex-col text-left leading-tight">
              <span>See where</span>
              <span>we build</span>
            </div>
            <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>

          {/* Button 2: Bordered outline button with down arrow */}
          <button
            onClick={scrollToVideos}
            className="inline-flex items-center justify-between gap-6 border-2 border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 font-extrabold text-xs sm:text-sm tracking-wider py-4 px-8 rounded transition-all group cursor-pointer"
          >
            <div className="flex flex-col text-left leading-tight">
              <span>Watch</span>
              <span>project videos</span>
            </div>
            <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
