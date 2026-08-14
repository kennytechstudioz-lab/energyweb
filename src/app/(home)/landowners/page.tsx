"use client";

import React, { useEffect } from "react";
import { useSettingStore } from "@/store/settingStore";
import LandownersHeroSection from "@/components/landowners/LandownersHeroSection";
import LandownersImpactSection from "@/components/landowners/LandownersImpactSection";
import LandownersOverviewSection from "@/components/landowners/LandownersOverviewSection";
import ContactCtaSection from "@/components/about/ContactCtaSection";

export default function LandownersPage() {
  const { fetchSettings } = useSettingStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <>
      <LandownersHeroSection />
      <LandownersImpactSection />
      <LandownersOverviewSection />
      <ContactCtaSection />
    </>
  );
}
