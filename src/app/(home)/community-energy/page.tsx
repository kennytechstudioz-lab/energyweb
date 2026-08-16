import React from "react";
import type { Metadata } from "next";
import CommunityEnergyHeroSection from "@/components/community-energy/CommunityEnergyHeroSection";
import CommunityEnergyOverviewSection from "@/components/community-energy/CommunityEnergyOverviewSection";

export const metadata: Metadata = {
  title: "Community Energy | Roofless Solar Solutions",
  description: "Go solar and support 100% renewable power with zero roof required. Enjoy guaranteed savings with no upfront costs or cancellation fees.",
};

export default function CommunityEnergyPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0f1012] text-white">
      <CommunityEnergyHeroSection />
      <CommunityEnergyOverviewSection />
    </div>
  );
}
