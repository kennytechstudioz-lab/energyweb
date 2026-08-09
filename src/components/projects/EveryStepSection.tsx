"use client";

import React, { useState } from "react";
import Image from "next/image";

interface StepItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  image?: string;
}

const stepsList: StepItem[] = [
  {
    id: "site",
    title: "Site evaluation",
    summary: "Identify real estate and meet with landowners",
    description:
      "We start by working closely with prospective landowners. We leverage sophisticated GIS tools and datasets, execute title insurance and reports, and run visual surveys of real estate.",
    image: "/images/site.png",
  },
  {
    id: "planning",
    title: "Planning",
    summary: "Conduct environmental reviews and engineering studies",
    description:
      "Optimizing project site designs is informed by multiple factors, including geographical considerations and equipment placement.",
    image: "/images/planning.png",
  },
  {
    id: "permitting",
    title: "Permitting",
    summary: "Secure permitting approvals & transmission interconnection",
    description:
      "Interconnection processes are market-specific and are typically lengthy coordination processes between RTO/ISOs, utilities, and developers like New Energy Holdings. Permitting is a multi-stakeholder process spanning local, state, and national jurisdictions.",
    image: "/images/permitting.webp",
  },
  {
    id: "contracting",
    title: "Contracting",
    summary: "Contract power with customers",
    description:
      "Securing customer offtakers to purchase the electricity. An offtaker can range from utilities, to governments to commercial and industrial customers. Offtaker agreements (Power Purchase Agreements, or PPAs) are critical to securing predictable revenue streams for projects.",
    image: "/images/contracting.png",
  },
  {
    id: "design",
    title: "Design engineering",
    summary: "Optimize designs and purchase equipment",
    description:
      "The design engineering process is iterative and considers feedback from many stakeholders including those from real estate, permitting, interconnection, and offtake. New Energy Holdings selects equipment wisely with careful evaluation of performance, quality, risk, and full lifecycle value.",
    image: "/images/design.webp",
  },
  {
    id: "financing",
    title: "Financing",
    summary: "Secure project financing",
    description:
      "New Energy Holdings arranges 100% of a project’s required funding through a combination of sponsor equity, construction financing, tax equity, and debt. Our diversified financing experience combined with our portfolio of long-term generation assets gives New Energy Holdings a unique advantage working with investors and financing institutions.",
    image: "/images/financing.jpg",
  },
];

export default function EveryStepSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleStep = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* Tag, Headline & Intro */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>PROCESS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
            Every step of the way
          </h2>

          <p className="text-base sm:text-xl font-medium text-neutral-600 leading-relaxed pt-1">
            Project development is a multi-year, multi-stakeholder process. We take pride in our diligent, expert-led team, our mission to do good by the communities where we work, and our commitment to being a reliable long-term partner.
          </p>
        </div>

        {/* 6 Accordion Process Steps */}
        <div className="flex flex-col border-t border-neutral-300">
          {stepsList.map((step, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={step.id}
                className="border-b border-neutral-300 transition-colors py-6 md:py-8 flex flex-col gap-6 cursor-pointer group"
                onClick={() => toggleStep(idx)}
              >
                {/* Header Row: Title, Summary & Circular Toggle */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Left Title */}
                  <div className="md:col-span-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#009ADE] tracking-tight leading-tight group-hover:text-[#0082be] transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Middle Summary Label */}
                  <div className="md:col-span-7">
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-800 leading-snug">
                      {step.summary}
                    </span>
                  </div>

                  {/* Right Circular Toggle Button */}
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#009ADE] text-white flex items-center justify-center font-black text-base sm:text-lg transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-45 bg-[#0082be]" : "group-hover:scale-110"
                      }`}
                      aria-label="Toggle step details"
                    >
                      +
                    </button>
                  </div>

                </div>

                {/* Expanded Content View */}
                {isOpen && (
                  <div className="pt-2 border-t border-neutral-100/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Detailed Description */}
                    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
                      <p className="text-sm sm:text-base font-medium text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Right Column: Step Image Card */}
                    {step.image && (
                      <div className="md:col-span-6 lg:col-span-5 relative">
                        <div className="relative w-full aspect-[1.5/1] rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-50 group-hover:shadow-lg transition-shadow">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

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
