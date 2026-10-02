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
  navigate: (view: View) => void;
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

  if (
    name === "home" ||
    name === "a-propos" ||
    name === "parcours" ||
    name === "projets" ||
    name === "notes" ||
    name === "contact"
  ) {
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

  useEffect(() => {
    const syncView = () => setView(viewFromUrl(new URL(window.location.href)));
    syncView();
    window.addEventListener("popstate", syncView);
    return () => window.removeEventListener("popstate", syncView);
  }, []);

  const navigate = useCallback(
    (next: View) => {
      if (viewKeyOf(view) === viewKeyOf(next)) return;
      window.history.pushState(null, "", urlForView(next));
      setView(next);
      // Remonter en haut de page au changement de vue
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      });
    },
    [view]
  );

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
