import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import DisableScrollRestoration from "@/components/DisableScrollRestoration";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fanzsocial - Social Media Strategies for the Modern Creator",
  description:
    "Actionable strategies, blogs, and insights for creators and brands.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${plusJakarta.variable} font-display antialiased bg-background-light text-[#111827]`}>
        <DisableScrollRestoration />
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5">
          <Navbar />
        </div>
        {children}
        <div className="w-full max-w-[87.5rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
