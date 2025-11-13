"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Simple, non-aggressive scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // One more attempt after next paint to catch any late scroll restoration
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [pathname, searchParams]);

  return null;
}
