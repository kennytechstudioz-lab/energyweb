"use client";

import React, { useState, useEffect } from "react";
import { useSettingStore } from "@/store/settingStore";
import { useFaqStore } from "@/store/faqStore";

import FaqHeroSection from "@/components/faq/FaqHeroSection";
import FaqContentSection from "@/components/faq/FaqContentSection";
import ContactCtaSection from "@/components/about/ContactCtaSection";

export default function FaqPage() {
  const { fetchSettings } = useSettingStore();
  const { fetchFaqs } = useFaqStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      fetchSettings(),
      fetchFaqs ? fetchFaqs() : Promise.resolve(),
    ]).catch((err) => console.error("Error loading FAQ page data:", err));
  }, [fetchSettings, fetchFaqs]);

  return (
    <>
      <FaqHeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FaqContentSection searchQuery={searchQuery} />
      <ContactCtaSection />
    </>
  );
}
