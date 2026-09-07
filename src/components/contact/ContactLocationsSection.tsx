"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

interface LocationItem {
  _id?: string;
  title: string;
  image: string;
  address: string;
  cityStateZip: string;
  phone?: string;
}

export default function ContactLocationsSection() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Read purely dynamic location blogs from MongoDB
  const dynamicLocations: LocationItem[] = useMemo(() => {
    const items = blogs.filter(
      (b) => b.category?.toLowerCase().trim() === "locations"
    );

    return items.map((b) => {
      // Content can be "100 California Street, Suite 650<br/>San Francisco, CA 94111" or multiline
      const cleanContent = b.content.replace(/<[^>]*>?/gm, "\n").trim();
      const lines = cleanContent.split("\n").map((l) => l.trim()).filter(Boolean);
      const street = lines[0] || "";
      const city = b.subtitle || lines[1] || "";
      const phone = b.shortName || "";

      return {
        _id: b._id,
        title: b.title,
        image: b.picture || "/images/fransico.webp",
        address: street,
        cityStateZip: city,
        phone: phone,
      };
    });
  }, [blogs]);

  if (dynamicLocations.length === 0) {
    return null;
  }

  return (
    <section
      id="contact-locations-section"
      className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Main Section Headline */}
        <div className="mb-14 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Our locations
          </h2>
        </div>

        {/* 2-Column Grid of Dynamic Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 lg:gap-y-14">
          {dynamicLocations.map((item, idx) => (
            <div key={item._id || idx} className="flex items-center gap-6 group">
              
              {/* Circular City Photo with Gold/Yellow Accent Ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#eab308] overflow-hidden relative shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Location Details */}
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-black text-[#009ADE] tracking-tight leading-tight group-hover:text-[#0082be] transition-colors">
                  {item.title}
                </h3>
                
                {item.address && (
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug mt-1.5">
                    {item.address}
                  </p>
                )}
                {item.cityStateZip && (
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                    {item.cityStateZip}
                  </p>
                )}
                
                {item.phone && (
                  <a
                    href={`tel:${item.phone.replace(/[^0-9]/g, "")}`}
                    className="text-xs sm:text-sm font-medium text-neutral-600 mt-1 hover:text-[#009ADE] transition-colors"
                  >
                    {item.phone}
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
