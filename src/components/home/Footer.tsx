"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettingStore } from "@/store/settingStore";
import { useBlogStore } from "@/store/blogStore";

export default function Footer() {
  const { setting, fetchSettings } = useSettingStore();
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchSettings();
    fetchBlogs();
  }, [fetchSettings, fetchBlogs]);

  return (
    <footer className="relative w-full bg-[#f8fafc] text-neutral-900 pt-16 pb-8 overflow-hidden border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Main Footer Layout: Left Brand Block, Middle Nav Columns, Right Action Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
          
          {/* Left Column (4 cols): Socials, Logo, Paragraph (16px), Links (16px) & MilitaryTimes Badges */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Social Media Circular Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#009ADE] hover:bg-[#0082be] text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#009ADE] hover:bg-[#0082be] text-white flex items-center justify-center text-xs transition-colors"
                aria-label="YouTube"
              >
                ▶
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#009ADE] hover:bg-[#0082be] text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="X Twitter"
              >
                𝕏
              </a>
            </div>

            {/* Brand Logo */}
            <div className="relative h-[48px] w-[180px]">
              <Image
                src="/CapricornLogo.png"
                alt="New Energy Holdings"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Mission Statement (16px font size) */}
            <p className="text-[16px] font-medium text-neutral-700 leading-relaxed max-w-md">
              Our mission is to make clean, competitive, and reliable energy. Our energy assets generate enough electricity to power 2 million American homes every year.
            </p>

            {/* Sub-links (16px font size) */}
            <div className="flex flex-col gap-2.5 text-[16px] font-bold text-neutral-800">
              <Link href="/contact" className="hover:text-[#009ADE] flex items-center gap-1.5 transition-colors">
                <span className="text-[12px]">↗</span> <span>Contact Us</span>
              </Link>
              <Link href="/plans" className="hover:text-[#009ADE] flex items-center gap-1.5 transition-colors">
                <span className="text-[12px]">↗</span> <span>Community Solar</span>
              </Link>
              <Link href="/projects" className="hover:text-[#009ADE] flex items-center gap-1.5 transition-colors">
                <span className="text-[12px]">↗</span> <span>Public Investors</span>
              </Link>
              <Link href="/about" className="hover:text-[#009ADE] flex items-center gap-1.5 transition-colors">
                <span className="text-[12px]">↗</span> <span>Landowners</span>
              </Link>
            </div>

            {/* Bottom Left Badge: MilitaryTimes.webp */}
            <div className="pt-2">
              <div className="relative w-full max-w-[260px] aspect-[2.4/1]">
                <Image
                  src="/MilitaryTimes.webp"
                  alt="Military Times Best for Vets & America's Most Responsible Companies Badges"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

          </div>

          {/* Middle Columns (5 cols): Categorized Nav Links (16px font size) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[16px]">
            
            {/* Nav Column 1 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px]">
                  CUSTOMERS
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px]">
                  EXPERTISE
                </span>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Project Development
                </Link>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Commercial Operations
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px]">
                  OUR PORTFOLIO
                </span>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Project Map
                </Link>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Wind Energy
                </Link>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Solar Energy
                </Link>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Battery Storage
                </Link>
                <Link href="/projects" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Flexible Generation
                </Link>
              </div>
            </div>

            {/* Nav Column 2 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px] underline underline-offset-2">
                  COMMUNITY STORIES
                </span>
                <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Texas
                </Link>
                <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Hawai'i
                </Link>
                <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  California
                </Link>
                <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  West Virginia
                </Link>
                <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Pacific Northwest
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px]">
                  NEWSROOM
                </span>
                <Link href="/blog" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  Press Releases
                </Link>
                <Link href="/blog" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  In the News
                </Link>
                <Link href="/contact" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                  For the Media
                </Link>
              </div>
            </div>

            {/* Nav Column 3 */}
            <div className="flex flex-col gap-2.5">
              <span className="font-black text-neutral-900 uppercase tracking-wider text-[12px] underline underline-offset-2">
                ABOUT NEW ENERGY HOLDINGS
              </span>
              <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Our People
              </Link>
              <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Leadership
              </Link>
              <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Partners
              </Link>
              <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Sustainability
              </Link>
              <Link href="/about" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Careers
              </Link>
              <Link href="/blog" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Newsroom
              </Link>
              <Link href="/blog" className="font-bold text-neutral-700 hover:text-[#009ADE] leading-tight transition-colors">
                Blog
              </Link>
            </div>

          </div>

          {/* Right Column (3 cols): Action Buttons */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Solid #009ADE Button */}
            <Link
              href="/about"
              className="w-full bg-[#009ADE] hover:bg-[#0082be] text-white p-4 font-extrabold text-xs sm:text-sm tracking-wider flex items-center justify-between rounded transition-all group"
            >
              <span>Work at New Energy Holdings</span>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>

            {/* Outline Bordered Button */}
            <Link
              href="/projects"
              className="w-full border-2 border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 p-4 font-extrabold text-xs sm:text-sm tracking-wider flex items-center justify-between rounded transition-all group"
            >
              <span>Our public affiliate</span>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>

          </div>

        </div>

        {/* Sub-footer Divider & Copyright */}
        <div className="pt-6 border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-semibold text-neutral-600">
          <div>
            © 2026 New Energy Holdings Group LLC. All rights reserved. The overlapping circle and square are registered service marks of New Energy Holdings Group LLC.
          </div>
          <div>
            <Link href="/privacy-policy" className="hover:text-[#009ADE] underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
