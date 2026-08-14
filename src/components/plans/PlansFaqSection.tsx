"use client";

import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How are the daily investment plan yields generated?",
    answer:
      "Yields are generated through active power purchase agreements (PPAs), clean energy grid tariffs, and carbon credit monetization across New Energy Holdings' operating portfolio of utility solar, wind farms, and battery storage facilities.",
  },
  {
    question: "What is the minimum amount required to start investing?",
    answer:
      "You can begin investing with as little as $100 in our Solar Micro-Array Plan. Each investment tranche specifies its minimum and maximum deposit threshold.",
  },
  {
    question: "When are daily profits credited to my balance?",
    answer:
      "Profits are credited every 24 hours from the exact timestamp of your active deposit confirmation. You can view real-time yield accruals directly in your user dashboard.",
  },
  {
    question: "Is my initial principal investment returned at maturity?",
    answer:
      "Yes. 100% of your principal investment capital is unlocked and credited back to your account wallet upon completion of your plan's maturity cycle.",
  },
  {
    question: "Are there any hidden withdrawal or management fees?",
    answer:
      "No. We operate with complete fee transparency. There are zero management fees on active plans, and withdrawals are processed promptly upon request.",
  },
  {
    question: "How does the referral bonus program work?",
    answer:
      "When someone registers using your unique referral link and makes an active plan deposit, you instantly receive a referral bonus percentage (5% to 12% depending on the chosen plan) credited straight to your balance.",
  },
];

export default function PlansFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#0d0e12] text-white py-24 md:py-32 border-t border-white/10">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Everything You Need To Know
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Have questions about how clean energy capital allocations work? Explore our comprehensive breakdown below.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-[#14161f] border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#009ADE]/50 bg-[#161824]" : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left font-extrabold text-base sm:text-lg text-white focus:outline-none cursor-pointer"
                >
                  <span>{item.question}</span>
                  <div className={`p-2 rounded-full border transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 bg-[#009ADE] text-white border-[#009ADE]" : "bg-white/5 border-white/10 text-neutral-400"
                  }`}>
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
