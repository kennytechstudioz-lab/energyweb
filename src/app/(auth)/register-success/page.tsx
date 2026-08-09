"use client";

import React from "react";
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      
      {/* Animated Success Icon (#009ADE) */}
      <div className="w-16 h-16 rounded-full bg-[#009ADE]/15 border-2 border-[#009ADE] flex items-center justify-center text-[#009ADE] shadow-lg">
        <svg className="w-8 h-8 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
          REGISTRATION COMPLETE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Account Created Successfully!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
          Welcome to New Energy Holdings! Your clean energy allocation keys have been generated. You can now sign in to your account and activate your portfolio.
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full pt-2">
        <Link
          href="/login"
          className="w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 px-6 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Proceed to Sign In</span>
          <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </Link>
      </div>

    </div>
  );
}
