"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
          NEW CREDENTIALS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Reset Password
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          Create a strong new password for your New Energy Holdings account.
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

      {/* Success Alert */}
      {success && (
        <div className="bg-[#009ADE]/10 border border-[#009ADE]/30 text-[#009ADE] p-3.5 rounded text-xs font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Password reset successfully! Redirecting to Sign In...</span>
        </div>
      )}

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            New Password <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#16171d] border border-white/10 rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#009ADE] transition-colors"
          />
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Confirm New Password <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#16171d] border border-white/10 rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#009ADE] transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="mt-3 w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 px-6 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Updating Password..." : "Reset Password"}</span>
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
