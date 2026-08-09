"use client";

import React from "react";
import ProjectsHeroSection from "@/components/projects/ProjectsHeroSection";
import ProjectShowcaseSection from "@/components/projects/ProjectShowcaseSection";
import ProjectOverviewSection from "@/components/projects/ProjectOverviewSection";
import PipelineSection from "@/components/projects/PipelineSection";
import EveryStepSection from "@/components/projects/EveryStepSection";
import ContactCtaSection from "@/components/about/ContactCtaSection";

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeroSection />
      <ProjectShowcaseSection />
      <ProjectOverviewSection />
      <PipelineSection />
      <EveryStepSection />
      <ContactCtaSection />
    </>
  );
}
