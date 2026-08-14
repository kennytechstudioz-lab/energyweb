"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlanStore, PlanData } from "@/store/planStore";
import { useAuthStore } from "@/store/authStore";

// Fallback plans if store/API hasn't populated yet
const FALLBACK_PLANS: PlanData[] = [
  {
    id: "plan-solar-starter",
    name: "Solar Micro-Array Plan",
    percent: 1.5,
    duration: 14,
    min: 100,
    max: 1000,
    referralPercent: 5,
    picture: "/images/solarenergy.webp",
    description: "Ideal for retail investors entering clean energy asset management. Focused on distributed solar photovoltaic arrays.",
    benefits: [
      "Daily automated ROI payouts",
      "Short 14-day lockup cycle",
      "5% referral bonus reward",
      "Principal returned at maturity",
    ],
  },
  {
    id: "plan-wind-growth",
    name: "Wind Reserve Tranche",
    percent: 2.2,
    duration: 30,
    min: 1000,
    max: 10000,
    referralPercent: 7,
    picture: "/images/windenergy.webp",
    description: "Medium-term capital allocation in utility-scale onshore wind farms generating steady grid power yields.",
    benefits: [
      "2.2% daily profit distribution",
      "Medium 30-day growth horizon",
      "7% referral bonus reward",
      "Priority withdrawal processing",
    ],
  },
  {
    id: "plan-carbon-capture",
    name: "Carbon Capture & CCUS Plan",
    percent: 2.8,
    duration: 60,
    min: 5000,
    max: 50000,
    referralPercent: 10,
    picture: "/images/site.png",
    description: "High-yield investment tranche backing industrial carbon sequestration and green hydrogen storage systems.",
    benefits: [
      "2.8% daily profit distribution",
      "60-day structured tranche",
      "10% referral bonus reward",
      "Dedicated account manager",
    ],
  },
  {
    id: "plan-institutional-energy",
    name: "Institutional Renewable Reserve",
    percent: 3.5,
    duration: 90,
    min: 10000,
    max: 0,
    referralPercent: 12,
    picture: "/images/storage.jpg",
    description: "Exclusive institutional tranche backing mega-scale utility battery storage and global grid transition assets.",
    benefits: [
      "Maximum 3.5% daily return",
      "Unlimited maximum allocation",
      "12% referral bonus reward",
      "VIP portfolio audit & report",
    ],
  },
];

export default function PlansGridSection() {
  const { plans, isLoading, fetchPlans } = usePlanStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Use plans from store if available, otherwise use fallback plans
  const displayPlans = plans && plans.length > 0 ? plans : FALLBACK_PLANS;

  // State for interactive calculator
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [calcAmount, setCalcAmount] = useState<number>(1000);

  // Sync selected plan once displayPlans are loaded
  useEffect(() => {
    if (displayPlans.length > 0 && !selectedPlanId) {
      const firstId = displayPlans[0].id || displayPlans[0]._id || "plan-solar-starter";
      setSelectedPlanId(firstId);
    }
  }, [displayPlans, selectedPlanId]);

  const activePlan = displayPlans.find(
    (p) => (p.id || p._id) === selectedPlanId
  ) || displayPlans[0];

  // Calculation formulas
  const dailyReturn = activePlan ? (calcAmount * activePlan.percent) / 100 : 0;
  const totalReturn = activePlan ? dailyReturn * activePlan.duration : 0;
  const netProfit = totalReturn;
  const totalPayout = calcAmount + totalReturn;

  const targetAuthUrl = isAuthenticated
    ? (user?.role === "staff" ? "/admin" : "/dashboard")
    : "/register";

  return (
    <section id="investment-plans-grid" className="w-full bg-[#0d0e12] text-white py-24 md:py-32 relative">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
            AVAILABLE CAPITAL TRANCHES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Choose Your Clean Energy Investment Plan
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Select a verified investment tier designed to match your risk profile and return targets. All plans credit profits directly to your account wallet on a 24-hour cycle.
          </p>
        </div>

        {/* Plans Grid */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-3 border-[#009ADE] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Hydrating Investment Tranches...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayPlans.map((plan, index) => {
              const planId = plan.id || plan._id || `plan-${index}`;
              const isSelected = planId === selectedPlanId;

              return (
                <div
                  key={planId}
                  className={`bg-[#14161d] border rounded-xl flex flex-col justify-between overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 shadow-xl ${
                    isSelected
                      ? "border-[#009ADE] shadow-[#009ADE]/10 ring-1 ring-[#009ADE]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Card Header Image */}
                  <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                    <Image
                      src={plan.picture || FALLBACK_PLANS[index % FALLBACK_PLANS.length].picture!}
                      alt={plan.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14161d] via-[#14161d]/40 to-transparent z-10" />

                    {/* Daily ROI Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-[#009ADE] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      {plan.percent}% Daily
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                    
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Key Metrics Table */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Min Deposit</span>
                        <span className="font-extrabold text-white text-sm">${plan.min.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Max Deposit</span>
                        <span className="font-extrabold text-white text-sm">
                          {plan.max === 0 ? "Unlimited" : `$${plan.max.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Duration</span>
                        <span className="font-extrabold text-[#009ADE] text-sm">{plan.duration} Days</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Ref Bonus</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{plan.referralPercent}%</span>
                      </div>
                    </div>

                    {/* Benefits Checklist */}
                    {plan.benefits && plan.benefits.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">
                          Plan Highlights
                        </span>
                        <ul className="flex flex-col gap-1.5 text-xs text-neutral-300">
                          {plan.benefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-[#009ADE] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col gap-2.5 pt-2">
                      <Link
                        href={targetAuthUrl}
                        className="w-full bg-[#009ADE] hover:bg-[#0082be] text-white py-3 px-4 font-black text-xs uppercase tracking-wider rounded transition-all text-center flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Invest Now</span>
                        <svg className="w-4 h-4 stroke-current stroke-[2.5] transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedPlanId(planId);
                          const el = document.getElementById("profit-calculator");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full bg-white/5 hover:bg-white/10 text-neutral-300 py-2.5 px-4 font-bold text-xs uppercase tracking-wider rounded transition-all text-center border border-white/10 cursor-pointer"
                      >
                        Calculate Yield
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Profit Calculator Card */}
        <div id="profit-calculator" className="bg-[#12141c] border border-[#009ADE]/30 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#009ADE]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Calculator Inputs */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
                  INTERACTIVE ESTIMATOR
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Investment Profit Calculator
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Simulate your projected daily, total return, and net profit based on your selected tranche allocation.
                </p>
              </div>

              {/* Plan Selection Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase text-neutral-300 tracking-wider">
                  Select Investment Plan
                </label>
                <select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="w-full bg-[#1b1e27] border border-white/15 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#009ADE] transition-colors font-bold cursor-pointer"
                >
                  {displayPlans.map((p, i) => (
                    <option key={p.id || p._id || i} value={p.id || p._id || i}>
                      {p.name} ({p.percent}% Daily for {p.duration} Days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-extrabold uppercase text-neutral-300 tracking-wider">
                    Investment Amount ($)
                  </label>
                  <span className="text-neutral-400 font-medium">
                    Min: ${activePlan?.min.toLocaleString() || 100}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-neutral-400 font-extrabold text-sm">$</span>
                  <input
                    type="number"
                    min={activePlan?.min || 10}
                    max={activePlan?.max || 1000000}
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#1b1e27] border border-white/15 rounded-lg pl-8 pr-4 py-3.5 text-base text-white font-extrabold focus:outline-none focus:border-[#009ADE] transition-colors"
                  />
                </div>
              </div>

              {/* Preset Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {[250, 500, 1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCalcAmount(amt)}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                      calcAmount === amt
                        ? "bg-[#009ADE] text-white"
                        : "bg-[#1b1e27] text-neutral-400 hover:text-white"
                    }`}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Calculated Results Box */}
            <div className="lg:col-span-6 bg-[#161822] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
                  Calculated Tranche Output
                </span>
                <span className="text-xs font-black text-[#009ADE] bg-[#009ADE]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {activePlan?.percent}% Daily ROI
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Daily Earning
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    ${dailyReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Duration Period
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#009ADE]">
                    {activePlan?.duration || 0} Days
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Net Profit
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">
                    +${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Total Return Payout
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    ${totalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400 font-light">
                  * Principal amount is returned in full upon maturity.
                </div>
                <Link
                  href={targetAuthUrl}
                  className="w-full sm:w-auto bg-[#009ADE] hover:bg-[#0082be] text-white px-6 py-3 text-xs font-black uppercase tracking-wider rounded transition-all text-center flex-shrink-0"
                >
                  Start Investment ↗
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
