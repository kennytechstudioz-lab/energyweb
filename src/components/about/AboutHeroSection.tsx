"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

export default function AboutHeroSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const heroBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "about-hero");
  }, [blogs]);

  if (!heroBlog) {
    return null;
  }

  const title = heroBlog.title;
  const subtitle =
    heroBlog.content?.replace(/<[^>]*>?/gm, "") ||
    heroBlog.subtitle ||
    "";
  const picture = heroBlog.picture || "/images/team.jpg";

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-neutral-900 text-white flex flex-col justify-center overflow-hidden">
      
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={picture}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55 z-10" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-[10px] md:px-6 w-full py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end w-full">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              {title}
            </h1>
          </div>

          {/* Right Column: Subtitle + Outline Button */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            {subtitle && (
              <p className="text-base sm:text-xl text-white/90 font-medium leading-relaxed max-w-lg">
                {subtitle}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={scrollToNext}
                className="inline-flex items-center justify-between gap-4 border-2 border-white bg-black/20 hover:bg-white hover:text-neutral-900 text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group cursor-pointer"
              >
                <span>Who is New Energy Holdings?</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
