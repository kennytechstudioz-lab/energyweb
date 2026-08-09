"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate code dispatch and navigate to verification code entry page
    setTimeout(() => {
      setLoading(false);
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
          ACCOUNT RECOVERY
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Forgot Password?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          Enter your registered email address below. We will send you a verification code to reset your password.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded text-xs font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Registered Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full bg-[#16171d] border border-white/10 rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#009ADE] transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 px-6 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Sending Code..." : "Send Verification Code"}</span>
          <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </button>

      </form>

      {/* Footer Nav */}
      <div className="text-center pt-2 border-t border-white/10">
        <p className="text-xs text-neutral-400">
          Remember your password?{" "}
          <Link href="/login" className="text-[#009ADE] hover:underline font-extrabold ml-1">
            Back to Sign In ↗
          </Link>
        </p>
      </div>

    </div>
  );
}
