"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Add navigating class to disable smooth scrolling during navigation
    document.documentElement.classList.add("navigating");

    // Clear any hash from URL that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Helper function to force scroll to absolute top
    const scrollToAbsoluteTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Prevent any scroll events during initial navigation
    let isNavigating = true;
    const preventScroll = (e: Event) => {
      if (isNavigating && window.scrollY !== 0) {
        e.preventDefault();
        scrollToAbsoluteTop();
      }
    };

    // Listen for scroll attempts and force back to top
    window.addEventListener("scroll", preventScroll, { passive: false });

    // Immediate scroll
    scrollToAbsoluteTop();

    // Use requestAnimationFrame to scroll before next paint
    requestAnimationFrame(() => {
      scrollToAbsoluteTop();
    });

    // Multiple delayed attempts to catch late scroll restoration in production
    // Production builds have different timing than dev, so we need more attempts
    const timeouts = [
      setTimeout(scrollToAbsoluteTop, 0),
      setTimeout(scrollToAbsoluteTop, 50),
      setTimeout(scrollToAbsoluteTop, 100),
      setTimeout(scrollToAbsoluteTop, 150),
      setTimeout(scrollToAbsoluteTop, 200),
      setTimeout(scrollToAbsoluteTop, 300),
      setTimeout(scrollToAbsoluteTop, 500),
      // Stop preventing scroll and remove navigating class after navigation settles
      setTimeout(() => {
        isNavigating = false;
        window.removeEventListener("scroll", preventScroll);
        document.documentElement.classList.remove("navigating");
      }, 600),
    ];

    return () => {
      isNavigating = false;
      window.removeEventListener("scroll", preventScroll);
      document.documentElement.classList.remove("navigating");
      timeouts.forEach(clearTimeout);
    };
  }, [pathname, searchParams]);

  return null;
}


