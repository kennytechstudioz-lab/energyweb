"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please accept the Terms & Conditions and Privacy Policy to proceed.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    setLoading(true);

    try {
      // Register with backend store
      await register({
        username,
        email,
        password,
      });

      router.push("/register-success");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
          GET STARTED
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          Join New Energy Holdings global clean energy investment platform.
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

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Username */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Username <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. alex_investor"
            className="w-full bg-[#16171d] border border-white/10 rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#009ADE] transition-colors"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Email Address <span className="text-red-400">*</span>
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

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Password <span className="text-red-400">*</span>
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-300">
            Confirm Password <span className="text-red-400">*</span>
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

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded bg-[#16171d] border-white/20 text-[#009ADE] focus:ring-[#009ADE] cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-neutral-400 leading-normal cursor-pointer select-none">
            I accept New Energy Holdings&apos;s{" "}
            <Link href="/terms" className="text-[#009ADE] hover:underline font-semibold">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#009ADE] hover:underline font-semibold">
              Privacy Policy
            </Link>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3.5 px-6 font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Creating Account..." : "Create Account"}</span>
          <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </button>

      </form>

      {/* Footer Nav */}
      <div className="text-center pt-2 border-t border-white/10">
        <p className="text-xs text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#009ADE] hover:underline font-extrabold ml-1">
            Sign In ↗
          </Link>
        </p>
      </div>

    </div>
  );
}
