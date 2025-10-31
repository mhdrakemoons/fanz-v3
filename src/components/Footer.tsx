"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTiktok, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If it's the same page, just scroll to top
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to different page - router will trigger ScrollToTop component
      router.push(href);
    }
  };

  return (
    <footer className="relative mt-8">
      <div className="w-full max-w-[87.5rem] mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm px-6 md:px-8 py-6">
          {/* Mobile: Logo + Social Icons row | Desktop: Logo left, Nav centered, Social right */}
          <div className="flex flex-col md:flex-row md:relative gap-5 md:gap-6 items-start md:items-center">
            {/* Logo and Social Icons Row for Mobile */}
            <div className="flex w-full md:w-auto items-center justify-between md:justify-start">
              <Link 
                href="/" 
                onClick={(e) => handleNavClick(e, "/")}
                className="flex items-center gap-2.5 text-[#111827] hover:opacity-80 transition-opacity"
              >
                <div className="text-primary size-6 flex items-center justify-center flex-shrink-0">
                  <svg 
                    fill="currentColor" 
                    viewBox="0 0 48 48" 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="w-6 h-6"
                  >
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
                  </svg>
                </div>
                <span className="text-base font-bold tracking-tight">Fanzsocial</span>
              </Link>
              {/* Social Icons - visible on mobile, hidden on desktop (shown in main row) */}
              <div className="flex items-center gap-3 text-gray-500 md:hidden">
                <a aria-label="TikTok" className="hover:text-primary transition-colors" href="#"><FaTiktok /></a>
                <a aria-label="Instagram" className="hover:text-primary transition-colors" href="#"><FaInstagram /></a>
                <a aria-label="YouTube" className="hover:text-primary transition-colors" href="#"><FaYoutube /></a>
                <a aria-label="X" className="hover:text-primary transition-colors" href="#"><FaXTwitter /></a>
              </div>
            </div>
            {/* Navigation Links - Desktop: Centered */}
            <nav className="flex flex-wrap items-center gap-0.5 md:gap-1.5 rounded-full border border-gray-200 bg-white/80 p-1.5 backdrop-blur-sm shadow-sm md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" 
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
              >
                Home
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" 
                href="/blog"
                onClick={(e) => handleNavClick(e, "/blog")}
              >
                Blog
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" 
                href="/reviews"
                onClick={(e) => handleNavClick(e, "/reviews")}
              >
                Reviews
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" 
                href="/best-strategies"
                onClick={(e) => handleNavClick(e, "/best-strategies")}
              >
                Best Strategies
              </Link>
            </nav>
            {/* Social Icons - Desktop: Right side */}
            <div className="hidden md:flex items-center gap-3 text-gray-500 ml-auto">
              <a aria-label="TikTok" className="hover:text-primary transition-colors" href="#"><FaTiktok /></a>
              <a aria-label="Instagram" className="hover:text-primary transition-colors" href="#"><FaInstagram /></a>
              <a aria-label="YouTube" className="hover:text-primary transition-colors" href="#"><FaYoutube /></a>
              <a aria-label="X" className="hover:text-primary transition-colors" href="#"><FaXTwitter /></a>
            </div>
          </div>
          {/* Privacy Policy and Terms of Service - Mobile only */}
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-600 md:hidden">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <span className="text-gray-300" aria-hidden>•</span>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
          {/* Copyright - Mobile only */}
          <div className="mt-3 text-xs text-gray-500 text-center md:hidden">
            © {year} Fanzsocial. All rights reserved.
          </div>
          {/* Desktop: Privacy/TOS and Copyright row */}
          <div className="mt-4 hidden md:flex items-center justify-between relative">
            <div className="text-xs text-gray-500">
              © {year} Fanzsocial. All rights reserved.
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-sm text-gray-600">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <span className="text-gray-300" aria-hidden>•</span>
              <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
