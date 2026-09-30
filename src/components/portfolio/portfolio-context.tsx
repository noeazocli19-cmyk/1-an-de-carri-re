"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { View } from "@/types";

interface PortfolioContextValue {
  view: View;
  /** Clé unique de la vue courante (utilisée par AnimatePresence) */
  viewKey: string;
  navigate: (view: View) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function viewKeyOf(view: View): string {
  if (view.name === "projet" || view.name === "note") {
    return `${view.name}:${view.slug}`;
  }
  return view.name;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>({ name: "home" });

  const navigate = useCallback((next: View) => {
    setView((current) => {
      if (viewKeyOf(current) === viewKeyOf(next)) return current;
      // Remonter en haut de page au changement de vue
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      });
      return next;
    });
  }, []);

  const value = useMemo<PortfolioContextValue>(
    () => ({ view, viewKey: viewKeyOf(view), navigate }),
    [view, navigate]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio doit être utilisé dans PortfolioProvider");
  }
  return ctx;
}
