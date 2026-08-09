"use client";

import React, { useState } from "react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        inquiryType: "",
        message: "",
      });
    }, 800);
  };

  return (
    <section
      id="contact-form-section"
      className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Top Header & Subtitle */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Get in touch
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed pt-1">
            Whether you’re a landowner interested in hosting a project, energy buyer shopping for long-term power contracts, equipment supplier, or someone else interested in working with New Energy Holdings, we’d love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">
          
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-neutral-900">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-neutral-900 rounded p-3.5 text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#009ADE] transition-colors"
            />
          </div>

          {/* Company Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-neutral-900">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full border-2 border-neutral-900 rounded p-3.5 text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#009ADE] transition-colors"
            />
          </div>

          {/* Email Address Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-neutral-900">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-neutral-900 rounded p-3.5 text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#009ADE] transition-colors"
            />
          </div>

          {/* Inquiry Type Select Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-neutral-900">
              Inquiry Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full border-2 border-neutral-900 rounded p-3.5 text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#009ADE] bg-white appearance-none transition-colors pr-10 cursor-pointer"
              >
                <option value="">Select One</option>
                <option value="Landowner Inquiries">Landowner Hosting Opportunities</option>
                <option value="Power Purchase Agreements">Commercial Power Purchase &amp; Offtake</option>
                <option value="Supplier & EPC">Equipment Supplier / EPC Partner</option>
                <option value="Investor Relations">Investor Relations &amp; Capital Markets</option>
                <option value="Careers">Careers &amp; General Inquiries</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-700">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-neutral-900">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-2 border-neutral-900 rounded p-3.5 text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#009ADE] resize-none transition-colors"
            />
          </div>

          {/* Submission Success Alert */}
          {isSubmitted && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded text-sm font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Thank you! Your message has been sent to our corporate dispatch team.</span>
            </div>
          )}

          {/* Submit Button (#009ADE) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-between gap-6 bg-[#009ADE] hover:bg-[#0082be] text-white font-extrabold text-xs sm:text-sm tracking-wider py-4 px-10 rounded transition-all group cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              <svg className="w-5 h-5 stroke-current stroke-[2.5] flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
