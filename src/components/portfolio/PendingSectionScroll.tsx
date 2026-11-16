"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";

export function PendingSectionScroll() {
  const { pendingSection, clearPendingSection } = usePortfolio();

  useEffect(() => {
    if (!pendingSection) return;

    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(pendingSection);
      if (section) {
        section.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }
      clearPendingSection();
    });

    return () => cancelAnimationFrame(frame);
  }, [pendingSection, clearPendingSection]);

  return null;
}
