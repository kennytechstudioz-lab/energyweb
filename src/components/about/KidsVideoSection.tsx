"use client";

import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/home/VideoModal";

export default function KidsVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full bg-white text-neutral-900 py-16 md:py-24 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Main Video Preview Card Container */}
        <div
          onClick={() => setIsVideoOpen(true)}
          className="relative w-full aspect-[16/9] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 group cursor-pointer border border-neutral-200"
        >
          {/* Background Image: children.webp */}
          <Image
            src="/images/children.webp"
            alt="Kids explain New Energy Holdings"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Centered Play Button (#009ADE) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#009ADE] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom Left Title Text */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">
              Kids explain New Energy Holdings
            </h3>
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
