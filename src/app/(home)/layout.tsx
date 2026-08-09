import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import SmartsuppWidget from "@/components/SmartsuppWidget";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";
import "@/styles/home.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="home-root min-h-screen bg-[#0f1012] text-white flex flex-col font-sans antialiased">
      <PageLoader />
      <Header />
      <main className="relative flex flex-col flex-1 min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <SmartsuppWidget />
    </div>
  );
}
