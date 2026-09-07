"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlogStore } from "@/store/blogStore";

export default function CommunityEnergyHeroSection() {
  const { blogs, fetchBlogs } = useBlogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const heroBlog = useMemo(() => {
    return blogs.find((b) => b.category?.toLowerCase().trim() === "community-energy" && b.shortName?.includes("Hero"));
  }, [blogs]);

  if (!heroBlog) {
    return null;
  }

  const title = heroBlog.title;
  const subtitle =
    heroBlog.content?.replace(/<[^>]*>?/gm, "") ||
    heroBlog.subtitle ||
    "";
  const picture = heroBlog.picture || "/images/community.jpg";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({ fullName: "", email: "", phone: "", address: "", message: "" });
    }, 2500);
  };

  return (
    <>
      <section className="relative w-full overflow-hidden min-h-[660px] md:min-h-[740px] flex flex-col justify-between items-center text-center text-white bg-neutral-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={picture}
            alt={title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Top Space & Centered Headline Header */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16 sm:pt-24 md:pt-28 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-lg max-w-4xl">
            {title}
          </h1>
        </div>

        {/* Bottom Curved Golden/Amber Dome Overlay Container */}
        <div className="relative z-10 w-full flex justify-center mt-8 md:mt-12">
          <div
            className="relative w-[130%] sm:w-[110%] md:w-[92%] max-w-[1120px] bg-gradient-to-b from-[#e5a823]/92 via-[#d89914]/94 to-[#c78b0e]/96 backdrop-blur-md pt-10 md:pt-12 pb-12 md:pb-14 px-6 sm:px-12 md:px-20 flex flex-col items-center text-center gap-6 shadow-[0_-10px_35px_rgba(0,0,0,0.3)] border-t border-yellow-300/30"
            style={{
              borderRadius: "50% 50% 0 0 / 80px 80px 0 0",
            }}
          >
            <p className="text-white font-medium text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed drop-shadow-sm font-sans">
              {subtitle}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer tracking-wide flex items-center gap-2"
            >
              <span>Request Information</span>
            </button>
          </div>
        </div>
      </section>

      {/* Information Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0f1115] border border-neutral-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#009ADE]">
                COMMUNITY SOLAR INQUIRY
              </span>
              <h3 className="text-xl font-black text-white">Request Roofless Solar Information</h3>
              <p className="text-xs text-neutral-400 font-light">
                Fill out the details below to receive a personalized community solar savings report.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 bg-green-500/10 border border-green-500/30 rounded-xl text-center flex flex-col items-center gap-2">
                <span className="text-2xl">✓</span>
                <h4 className="text-sm font-bold text-green-400">Request Submitted Successfully!</h4>
                <p className="text-xs text-neutral-400">A community solar specialist will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-[#14161f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#009ADE]"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#14161f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#009ADE]"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#14161f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#009ADE]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Home / Property Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-[#14161f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#009ADE]"
                    placeholder="123 Main Street, City, State"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 rounded-lg font-black uppercase tracking-wider text-xs transition-all cursor-pointer mt-2"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
