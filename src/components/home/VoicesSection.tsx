"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";
import { useBlogStore } from "@/store/blogStore";

export default function VoicesSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const voiceBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "voices");
  }, [blogs]);

  if (!voiceBlog) {
    return null;
  }

  const title = voiceBlog.title;
  const author = voiceBlog.author;
  const role = voiceBlog.subtitle || "";
  const quote = voiceBlog.content?.replace(/<[^>]*>?/gm, "") || "";
  const picture = voiceBlog.picture || "/images/storage.jpg";

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6 flex flex-col gap-12">
        
        {/* Top Tag & Main Headline */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>NEW ENERGY VOICES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1]">
            {title}
          </h2>
        </div>

        {/* Media & Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image/Video Card with Centered Play Button */}
          <div className="lg:col-span-5 relative">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-neutral-900 group cursor-pointer border border-neutral-200"
            >
              <Image
                src={picture}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              {/* Centered Play Button (#009ADE) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#009ADE] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote & Executive Author Signature */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            {/* Quote Icon */}
            <div className="text-4xl font-black text-[#009ADE] tracking-tighter leading-none select-none">
              //
            </div>

            {/* Quote Body (Cyan-Blue #009ADE) */}
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#009ADE] leading-snug tracking-tight">
              {quote}
            </blockquote>

            {/* Author Attribution */}
            <div className="flex flex-col pt-2 border-t border-neutral-200/80">
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
                {author}
              </span>
              {role && (
                <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                  {role}
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/Capricorn.mp4"
      />
    </section>
  );
}
