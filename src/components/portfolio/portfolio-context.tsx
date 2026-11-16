"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { View } from "@/types";

interface PortfolioContextValue {
  view: View;
  /** Clé unique de la vue courante (utilisée par AnimatePresence) */
  viewKey: string;
  navigate: (view: View, sectionId?: string) => void;
  pendingSection: string | null;
  clearPendingSection: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function viewKeyOf(view: View): string {
  if (view.name === "projet" || view.name === "note") {
    return `${view.name}:${view.slug}`;
  }
  return view.name;
}

function viewFromUrl(url: URL): View {
  const name = url.searchParams.get("view");

  if (name === "projet" || name === "note") {
    const slug = url.searchParams.get("slug");
    return slug ? { name, slug } : { name: "home" };
  }

  if (name === "home" || name === "projets" || name === "tarifs" || name === "notes") {
    return { name };
  }

  return { name: "home" };
}

function urlForView(view: View): string {
  const url = new URL(window.location.href);
  url.searchParams.delete("view");
  url.searchParams.delete("slug");

  if (view.name !== "home") {
    url.searchParams.set("view", view.name);
  }
  if (view.name === "projet" || view.name === "note") {
    url.searchParams.set("slug", view.slug);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>({ name: "home" });
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    const syncView = () => {
      const url = new URL(window.location.href);
      const next = viewFromUrl(url);
      if (url.searchParams.has("view") && next.name === "home") {
        window.history.replaceState(null, "", urlForView(next));
      }
      setPendingSection(null);
      setView(next);
    };
    syncView();
    window.addEventListener("popstate", syncView);
    return () => window.removeEventListener("popstate", syncView);
  }, []);

  const navigate = useCallback(
    (next: View, sectionId?: string) => {
      if (viewKeyOf(view) === viewKeyOf(next)) {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        } else if (next.name === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      window.history.pushState(null, "", urlForView(next));
      setView(next);
      setPendingSection(sectionId ?? null);
      if (!sectionId) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        });
      }
    },
    [view]
  );

  const clearPendingSection = useCallback(() => setPendingSection(null), []);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      view,
      viewKey: viewKeyOf(view),
      navigate,
      pendingSection,
      clearPendingSection,
    }),
    [view, navigate, pendingSection, clearPendingSection]
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
