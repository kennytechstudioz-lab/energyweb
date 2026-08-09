"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";
import VideoModal from "./VideoModal";

interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  picture: string;
  author: string;
}

export default function HeroCarousel() {
  const { blogs, fetchBlogs } = useBlogStore();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const heroBlogs = (blogs as any[]).filter(
        (b) => b.category?.toLowerCase() === "hero"
      );
      if (heroBlogs.length > 0) {
        setSlides(heroBlogs);
      }
    }
  }, [blogs]);

  useEffect(() => {
    if (slides.length < 2) return;
    autoplayTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current); };
  }, [slides]);

  const activeSlide = slides[currentIndex] || {
    title: "Our vision is a world powered by clean energy.",
    subtitle: "We develop, own, and operate a growing fleet of clean energy projects across the country.",
    picture: "/images/banner.jpg",
    author: "New Energy Holdings",
  };

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-neutral-900 text-white flex flex-col justify-center overflow-hidden">
      
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {slides.length > 0 ? (
          slides.map((slide, idx) => (
            <div
              key={slide._id || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.picture || "/images/banner.jpg"}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45 z-10" />
            </div>
          ))
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/images/banner.jpg"
              alt="Clean energy operations"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45 z-10" />
          </div>
        )}
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-[10px] md:px-6 w-full py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end w-full">
          
          {/* Left Column: Big Vision Headline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              {activeSlide.title || "Our vision is a world powered by clean energy."}
            </h1>
          </div>

          {/* Right Column: Subtitle + Dual CTA Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <p className="text-base sm:text-xl text-white/90 font-medium leading-relaxed max-w-lg">
              {activeSlide.subtitle || "We develop, own, and operate a growing fleet of clean energy projects across the country."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Button 1: Solid #009ADE with diagonal arrow */}
              <Link
                href="/plans"
                className="inline-flex items-center justify-between gap-4 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group"
              >
                <span>Explore investment plans</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>

              {/* Button 2: Outline Border Button with diagonal arrow */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-between gap-4 border-2 border-white bg-black/20 hover:bg-white hover:text-neutral-900 text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-6 rounded transition-all group"
              >
                <span>Our asset portfolio</span>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
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
