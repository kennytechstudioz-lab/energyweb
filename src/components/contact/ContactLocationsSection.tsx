"use client";

import React from "react";
import Image from "next/image";

interface LocationItem {
  title: string;
  image: string;
  address: string;
  cityStateZip: string;
  phone?: string;
}

const locations: LocationItem[] = [
  {
    title: "HQ in San Francisco, CA",
    image: "/images/fransico.webp",
    address: "100 California Street, Suite 650",
    cityStateZip: "San Francisco, CA 94111",
    phone: "415-627-1600",
  },
  {
    title: "Houston, TX",
    image: "/images/houston.webp",
    address: "1200 Smith Street, Suite 600",
    cityStateZip: "Houston, TX 77002",
    phone: "346-293-7100",
  },
  {
    title: "Princeton, NJ",
    image: "/images/princeton.png",
    address: "902 Carnegie Center, Suite 520",
    cityStateZip: "Princeton, NJ 08540",
    phone: "609-608-1525",
  },
  {
    title: "Scottsdale, AZ",
    image: "/images/scottsdale.webp",
    address: "4900 N Scottsdale Road, Suite 5000",
    cityStateZip: "Scottsdale, AZ 85251",
    phone: "480-424-1300",
  },
  {
    title: "San Diego, CA",
    image: "/images/sandiego.webp",
    address: "11988 El Camino Real, Suite 500",
    cityStateZip: "San Diego, CA 92130",
    phone: "760-710-2140",
  },
  {
    title: "Denver, CO",
    image: "/images/denver.webp",
    address: "1099 18th Street, Suite 2520",
    cityStateZip: "Denver, Colorado 80202",
  },
];

export default function ContactLocationsSection() {
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

        {/* 2-Column Grid of 6 Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 lg:gap-y-14">
          {locations.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 group">
              
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
                
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug mt-1.5">
                  {item.address}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                  {item.cityStateZip}
                </p>
                
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
