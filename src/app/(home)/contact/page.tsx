"use client";

import React from "react";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactLocationsSection from "@/components/contact/ContactLocationsSection";

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactLocationsSection />
    </>
  );
}
