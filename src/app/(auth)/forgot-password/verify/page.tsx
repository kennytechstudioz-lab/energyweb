"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`/forgot-password/reset?code=${encodeURIComponent(code)}`);
    }, 600);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
          VERIFICATION CODE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Enter Verification Code
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          We sent a 6-digit code to <span className="font-bold text-white">{emailParam || "your email"}</span>. Enter it below to reset your password.
        </p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded text-xs font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {resent && (
        <div className="bg-[#009ADE]/10 border border-[#009ADE]/30 text-[#009ADE] p-3.5 rounded text-xs font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>A new verification code has been dispatched to your email.</span>
        </div>
      )}

      {/* Code Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Verification Code Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            6-Digit Verification Code <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="123456"
            className="w-full bg-[#16171d] border border-white/10 rounded px-4 py-3.5 text-center text-xl font-black tracking-[0.5em] text-white placeholder-neutral-600 focus:outline-none focus:border-[#009ADE] transition-colors"
          />
        </div>

        {/* Resend Code Link */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleResend}
            className="text-xs text-[#009ADE] hover:underline font-semibold cursor-pointer"
          >
            Didn&apos;t receive code? Resend Code
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 px-6 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Verifying..." : "Verify Code"}</span>
          <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </button>

      </form>

      {/* Footer Nav */}
      <div className="text-center pt-2 border-t border-white/10">
        <p className="text-xs text-neutral-400">
          Back to{" "}
          <Link href="/login" className="text-[#009ADE] hover:underline font-extrabold ml-1">
            Sign In ↗
          </Link>
        </p>
      </div>

    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-neutral-400">Loading code verification...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
