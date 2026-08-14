"use client";

import React, { useEffect } from "react";
import { useSettingStore } from "@/store/settingStore";
import { usePlanStore } from "@/store/planStore";

import PlansHeroSection from "@/components/plans/PlansHeroSection";
import PlansGridSection from "@/components/plans/PlansGridSection";
import PlansWhyUsSection from "@/components/plans/PlansWhyUsSection";
import PlansFaqSection from "@/components/plans/PlansFaqSection";
import ContactCtaSection from "@/components/about/ContactCtaSection";

export default function InvestmentPlansPage() {
  const { fetchSettings } = useSettingStore();
  const { fetchPlans } = usePlanStore();

  useEffect(() => {
    Promise.all([
      fetchSettings(),
      fetchPlans ? fetchPlans() : Promise.resolve(),
    ]).catch((err) => console.error("Error loading plans page data:", err));
  }, [fetchSettings, fetchPlans]);

  return (
    <>
      <PlansHeroSection />
      <PlansGridSection />
      <PlansWhyUsSection />
      <PlansFaqSection />
      <ContactCtaSection />
    </>
  );
}
