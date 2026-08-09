"use client";

import React from "react";

export default function ProjectOverviewSection() {
  return (
    <section className="relative w-full bg-white text-neutral-900 py-16 md:py-20 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[10px] md:px-6">
        
        {/* 2-Column Process Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 text-sm sm:text-base font-medium text-neutral-700 leading-relaxed">
          
          {/* Left Column */}
          <div>
            <p>
              Our cross functional approach to project development involves every stage of the process: from conception through siting, land surveying, entitlement, design, interconnection, contract negotiation, customer agreements, and financing. We work closely with property owners, local government, utilities, state and federal environmental agencies, technical consultants, and local communities to ensure our projects are responsibly sited and developed.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <p>
              Project development is on the front lines of New Energy Holdings&apos;s mission &ldquo;to do good by our customers, our communities, and our environment.&rdquo; We prioritize protecting natural resources and creating positive and lasting relationships with our projects&apos; landowners and neighbors.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
