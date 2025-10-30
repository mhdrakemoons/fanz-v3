"use client";

import { useEffect } from "react";

export default function DisableScrollRestoration() {
  useEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}

