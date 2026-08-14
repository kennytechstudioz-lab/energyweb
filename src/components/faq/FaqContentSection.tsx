"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFaqStore, FaqData } from "@/store/faqStore";

const FALLBACK_FAQS: FaqData[] = [
  // General & Platform
  {
    _id: "faq-1",
    category: "General",
    question: "What is New Energy Holdings?",
    answer:
      "New Energy Holdings is an integrated clean energy capital platform operating renewable assets including utility-scale solar arrays, wind farms, and carbon capture installations across global markets.",
  },
  {
    _id: "faq-2",
    category: "General",
    question: "Who can invest in New Energy Holdings capital plans?",
    answer:
      "Any individual or institution that meets our standard account verification requirements can participate. We welcome global investors looking to diversify into ESG clean energy assets.",
  },
  {
    _id: "faq-3",
    category: "General",
    question: "Is New Energy Holdings registered and compliant?",
    answer:
      "Yes. We adhere strictly to regional regulatory guidelines and ESG compliance standards, working alongside licensed utility partners and institutional energy buyers.",
  },

  // Investments & Yields
  {
    _id: "faq-4",
    category: "Investments",
    question: "How are daily investment yields calculated?",
    answer:
      "Yields are generated through long-term Power Purchase Agreements (PPAs), grid battery energy storage discharge tariffs, and carbon offset credits. Profits are calculated as a daily percentage rate based on your active plan tranche.",
  },
  {
    _id: "faq-5",
    category: "Investments",
    question: "Is my principal capital returned after the investment cycle?",
    answer:
      "Yes. 100% of your invested principal is automatically released and returned to your available account balance upon completion of your plan's duration maturity cycle.",
  },
  {
    _id: "faq-6",
    category: "Investments",
    question: "Can I activate multiple investment plans simultaneously?",
    answer:
      "Yes, you can run multiple active investment plans across different tranches and currencies simultaneously to maximize yield diversification.",
  },

  // Deposits & Withdrawals
  {
    _id: "faq-7",
    category: "Deposits & Withdrawals",
    question: "What payment methods are supported for deposits?",
    answer:
      "We support major cryptocurrency assets (BTC, ETH, USDT, USDC, TRX) as well as direct wire/capital transfer options specified in your account portal.",
  },
  {
    _id: "faq-8",
    category: "Deposits & Withdrawals",
    question: "How long does a withdrawal request take to process?",
    answer:
      "Withdrawal requests are reviewed and processed by our automated capital gateway within 1 to 24 hours, depending on wallet verification status.",
  },
  {
    _id: "faq-9",
    category: "Deposits & Withdrawals",
    question: "Are there any deposit or withdrawal fees?",
    answer:
      "New Energy Holdings charges zero platform fees on deposits and withdrawals. standard blockchain network transaction fees apply.",
  },

  // Security & Account
  {
    _id: "faq-10",
    category: "Security",
    question: "How is my personal data and account secured?",
    answer:
      "We implement end-to-end SSL encryption, cold wallet capital storage, multi-factor authentication (2FA), and strict access control protocols.",
  },
  {
    _id: "faq-11",
    category: "Security",
    question: "What should I do if I forget my password?",
    answer:
      "You can reset your password anytime via the 'Forgot Password' link on the sign-in page, which sends a secure reset link to your registered email address.",
  },

  // Referrals
  {
    _id: "faq-12",
    category: "Referrals",
    question: "How does the partner referral program work?",
    answer:
      "When someone registers using your referral link and activates an investment plan, you receive an instant commission percentage (from 5% to 12%) credited directly to your balance.",
  },
];

const CATEGORIES = [
  "All",
  "General",
  "Investments",
  "Deposits & Withdrawals",
  "Security",
  "Referrals",
];

interface FaqContentSectionProps {
  searchQuery: string;
}

export default function FaqContentSection({ searchQuery }: FaqContentSectionProps) {
  const { faqs, isLoading, fetchFaqs } = useFaqStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  // Combined FAQs list
  const displayFaqs = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;

  // Dynamically derive category tabs from active FAQs
  const categories = [
    "All",
    ...Array.from(new Set(displayFaqs.map((f) => f.category))).filter(Boolean),
  ];

  // Filtered FAQs based on category tab & search query
  const filteredFaqs = displayFaqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" ||
      faq.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#0d0e12] text-white py-20 md:py-28 relative">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Category Tabs Bar */}
        <div className="flex flex-wrap gap-2.5 items-center justify-center border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#009ADE] text-white shadow-lg shadow-[#009ADE]/20"
                  : "bg-[#14161f] text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-3 border-[#009ADE] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Hydrating Knowledge Base...
            </span>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-16 text-center border border-white/10 bg-[#14161f]/50 rounded-2xl flex flex-col items-center gap-3">
            <svg className="w-10 h-10 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold text-neutral-300">
              No matching questions found.
            </span>
            <p className="text-xs text-neutral-500 max-w-md">
              Try searching with different keywords or switch categories above.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            {filteredFaqs.map((faq, index) => {
              const faqId = faq._id || `faq-item-${index}`;
              const isOpen = openFaqId === faqId;

              return (
                <div
                  key={faqId}
                  className={`bg-[#14161f] border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-[#009ADE]/50 bg-[#161824] shadow-lg shadow-[#009ADE]/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faqId)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left font-extrabold text-base sm:text-lg text-white focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-[#009ADE] uppercase tracking-wider bg-[#009ADE]/10 border border-[#009ADE]/20 px-2.5 py-1 rounded-full flex-shrink-0">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>

                    <div
                      className={`p-2 rounded-full border transition-transform duration-300 flex-shrink-0 ${
                        isOpen
                          ? "rotate-180 bg-[#009ADE] text-white border-[#009ADE]"
                          : "bg-white/5 border-white/10 text-neutral-400"
                      }`}
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Support Help Banner */}
        <div className="max-w-4xl mx-auto w-full bg-gradient-to-r from-[#141722] via-[#1a1e2c] to-[#141722] border border-[#009ADE]/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#009ADE]">
              STILL HAVE QUESTIONS?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Our support team is here to assist you 24/7.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Get in touch directly with our clean energy investment specialists.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-[#009ADE] hover:bg-[#0082be] text-white px-8 py-4 font-black text-xs uppercase tracking-wider rounded-lg transition-all flex-shrink-0 flex items-center gap-2"
          >
            <span>Contact Support</span>
            <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
        </div>

      </div>

    </section>
  );
}
