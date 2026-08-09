"use client";

import React from "react";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import WhatDrivesUsSection from "@/components/about/WhatDrivesUsSection";
import OurValuesSection from "@/components/about/OurValuesSection";
import KidsVideoSection from "@/components/about/KidsVideoSection";
import SustainabilityCommitmentSection from "@/components/about/SustainabilityCommitmentSection";
import ExploreProjectsSection from "@/components/about/ExploreProjectsSection";
import AboutCareersSection from "@/components/about/AboutCareersSection";
import RootedInValuesSection from "@/components/about/RootedInValuesSection";
import CorporateStructureSection from "@/components/about/CorporateStructureSection";
import ContactCtaSection from "@/components/about/ContactCtaSection";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <WhatDrivesUsSection />
      <OurValuesSection />
      <KidsVideoSection />
      <SustainabilityCommitmentSection />
      <ExploreProjectsSection />
      <AboutCareersSection />
      <RootedInValuesSection />
      <CorporateStructureSection />
      <ContactCtaSection />
    </>
  );
}
