import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://newenergyholdings.com"),
  title: {
    default: "New Energy Holdings | Leading Integrated Clean Power & Energy Infrastructure",
    template: "%s | New Energy Holdings",
  },
  description: "New Energy Holdings is a leading integrated clean energy infrastructure company. We develop, own, and operate utility-scale wind, solar, energy storage, and clean transition platforms globally.",
  keywords: [
    "New Energy Holdings",
    "Clean Energy Transition",
    "Renewable Infrastructure",
    "Solar Energy Storage",
    "Wind Energy Platform",
    "Clean Power Producer",
    "Energy Asset Management",
    "Sustainable Energy Investment",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "New Energy Holdings - Secure Clean Energy Portfolio",
    description: "Join a verified global network of clean energy allocators, funding next-generation carbon capture technology, utility-scale solar arrays, and high-efficiency wind reserves.",
    url: "https://newenergyholdings.com",
    siteName: "New Energy Holdings",
    images: ["/EnergyLightLogo.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Energy Holdings | Leading Integrated Clean Power & Energy Infrastructure",
    description: "New Energy Holdings is a leading integrated clean energy infrastructure company. We develop, own, and operate utility-scale wind, solar, energy storage, and clean transition platforms globally.",
    images: ["/EnergyLightLogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
