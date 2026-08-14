"use client";

import React, { useState } from "react";
import VideoModal from "@/components/home/VideoModal";

export default function LandownersHeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full h-[65vh] sm:h-[70vh] min-h-[420px] bg-black flex items-center justify-center overflow-hidden border-b border-white/10">
      
      {/* Autoplay Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/videos/landowners.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center gap-6">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          Partnering with Landowners
        </h1>

        {/* Play Video CTA Button */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="inline-flex items-center gap-3 text-white hover:text-[#009ADE] transition-colors font-bold text-xs sm:text-sm tracking-widest uppercase group cursor-pointer pt-2"
        >
          <span>PLAY VIDEO</span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white group-hover:border-[#009ADE] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

      </div>

      {/* Modal Video Player */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/videos/landowners.mp4"
      />

    </section>
  );
}
