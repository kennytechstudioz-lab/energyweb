"use client";

import React, { useEffect } from "react";
import { useSettingStore } from "@/store/settingStore";
import { usePlanStore } from "@/store/planStore";
import { useBlogStore } from "@/store/blogStore";

import HeroCarousel from "@/components/home/HeroCarousel";
import MissionSection from "@/components/home/MissionSection";
import CommunitySection from "@/components/home/CommunitySection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import VoicesSection from "@/components/home/VoicesSection";
import InteractiveMapSection from "@/components/home/InteractiveMapSection";
import CareersSection from "@/components/home/CareersSection";

export default function Home() {
  const { fetchSettings } = useSettingStore();
  const { fetchPlans } = usePlanStore();
  const { fetchBlogs } = useBlogStore();

  useEffect(() => {
    Promise.all([
      fetchSettings(),
      fetchPlans ? fetchPlans() : Promise.resolve(),
      fetchBlogs(),
    ]).catch((err) => console.error("Error loading home layout assets:", err));
  }, [fetchSettings, fetchPlans, fetchBlogs]);

  return (
    <>
      <HeroCarousel />
      <MissionSection />
      <CommunitySection />
      <CapabilitiesSection />
      <VoicesSection />
      <InteractiveMapSection />
      <CareersSection />
    </>
  );
}
