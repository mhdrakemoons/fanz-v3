"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Force scroll to absolute top on route changes (including query changes)
    if (typeof window !== "undefined") {
      // Clear any hash from URL that might cause scrolling
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        
        // Also use document.documentElement.scrollTop as fallback
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      // Additional delayed scroll to catch any late scroll restoration
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname, searchParams]);

  return null;
}


