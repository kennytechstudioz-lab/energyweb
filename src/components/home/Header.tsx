"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSettingStore } from "@/store/settingStore";
import { useAuthStore } from "@/store/authStore";
import GoogleTranslate from "@/components/GoogleTranslate";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const userRole = user?.role;

  const { setting, fetchSettings } = useSettingStore();

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const navItemClass = (path: string) => {
    const active = isActive(path);
    return active
      ? "text-[#009ADE] font-black"
      : "text-neutral-800 hover:text-[#009ADE] transition-colors font-bold";
  };

  return (
    <>
      <header
        className={`left-0 w-full z-50 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 bg-white shadow-md text-neutral-900"
            : "relative bg-white text-neutral-900 border-b border-neutral-100"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-stretch justify-between">
          
          {/* Left: Brand Logo (Clean, no search icon) */}
          <div className="flex items-center px-4 md:px-8 py-3.5 flex-shrink-0 border-r border-neutral-100">
            <Link href="/" className="flex items-center">
              <div className="relative h-[44px] w-[165px]">
                <Image
                  src="/CapricornLogo.png"
                  alt="New Energy Holdings"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Area: Top Utility Subnav + Main Nav Row */}
          <div className="hidden lg:flex flex-col justify-between flex-1">
            
            {/* Top Sub-utility bar */}
            <div className="flex items-center justify-end gap-6 px-8 py-2 border-b border-neutral-100 text-[11px] font-semibold text-neutral-600">
              <Link href="/about" className="hover:text-[#009ADE] flex items-center gap-1 transition-colors">
                <span className="text-[10px]">↗</span>
                <span>Landowners &amp; Partners</span>
              </Link>
              <Link href="/plans" className="hover:text-[#009ADE] flex items-center gap-1 transition-colors">
                <span className="text-[10px]">↗</span>
                <span>Community Energy</span>
              </Link>
              <Link href="/projects" className="hover:text-[#009ADE] flex items-center gap-1 transition-colors">
                <span className="text-[10px]">↗</span>
                <span>Public Investors</span>
              </Link>
              <Link href="/contact" className="hover:text-[#009ADE] flex items-center gap-1 transition-colors">
                <span className="text-[10px]">↗</span>
                <span>Contact Us</span>
              </Link>
              <div className="scale-90 origin-right">
                <GoogleTranslate elementId="gt-home-desktop" />
              </div>
            </div>

            {/* Main Navigation Links Row */}
            <div className="flex items-center justify-end gap-8 px-8 py-3 text-[13px] font-extrabold tracking-wide">
              <Link href="/" className={navItemClass("/")}>
                HOME
              </Link>
              <Link href="/about" className={navItemClass("/about")}>
                ABOUT US
              </Link>
              <Link href="/plans" className={navItemClass("/plans")}>
                INVESTMENT PLANS
              </Link>
              <Link href="/projects" className={navItemClass("/projects")}>
                PROJECTS
              </Link>
              <Link href="/faq" className={navItemClass("/faq")}>
                FAQ
              </Link>
              <Link href="/contact" className={navItemClass("/contact")}>
                CONTACT US
              </Link>
            </div>

          </div>

          {/* Far Right: Highlight CTA Button (#009ADE) */}
          <div className="hidden sm:flex items-stretch flex-shrink-0">
            {isAuthenticated ? (
              <Link
                href={userRole === "staff" ? "/admin" : "/dashboard"}
                className="bg-[#009ADE] hover:bg-[#0082be] text-white px-6 md:px-8 py-4 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer"
              >
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-white/80 font-bold">Access Portal</span>
                  <span>Dashboard</span>
                </div>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/register"
                className="bg-[#009ADE] hover:bg-[#0082be] text-white px-6 md:px-8 py-4 font-black text-xs sm:text-sm tracking-wider flex items-center gap-3 transition-all cursor-pointer"
              >
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase text-white/80 font-bold">Invest with us</span>
                  <span>Get Started</span>
                </div>
                <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden flex items-center px-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-neutral-900 hover:text-[#009ADE] transition-colors p-2"
              aria-label="Open menu"
            >
              <svg className="w-7 h-7 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-neutral-950/98 z-[999] flex flex-col p-6 text-white overflow-y-auto antialiased transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative h-[44px] w-[165px]">
              <Image src="/CapricornLogo.png" alt="New Energy Holdings" fill className="object-contain object-left brightness-0 invert" />
            </div>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#009ADE]">
            <svg className="w-7 h-7 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-5 text-xl font-black mb-8">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">HOME</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">ABOUT US</Link>
          <Link href="/plans" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">INVESTMENT PLANS</Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">PROJECTS</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">CONTACT US</Link>
          <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#009ADE]">FAQ</Link>
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-white/10">
          <Link
            href="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 font-extrabold uppercase tracking-wider text-sm rounded-lg"
          >
            Get Started ↗
          </Link>
        </div>
      </div>
    </>
  );
}
