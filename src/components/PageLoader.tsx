"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0e12] text-white transition-opacity duration-300">
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo Container */}
        <div className="relative h-16 w-56 animate-pulse">
          <Image
            src="/EnergyDarkLogo.png"
            alt="New Energy Holdings Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Loading Spinner / Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#009ADE] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#009ADE] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#009ADE] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

      </div>
    </div>
  );
}
