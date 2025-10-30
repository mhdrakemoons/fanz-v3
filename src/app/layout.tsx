import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fanzsocial - Social Media Strategies for the Modern Creator",
  description:
    "Actionable strategies, blogs, and insights for creators and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${plusJakarta.variable} font-display antialiased bg-background-light text-[#111827]`}>
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
