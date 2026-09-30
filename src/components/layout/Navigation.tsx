"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Accueil", name: "home" },
  { label: "À propos", name: "a-propos" },
  { label: "Parcours", name: "parcours" },
  { label: "Projets", name: "projets" },
  { label: "Notes", name: "notes" },
  { label: "Contact", name: "contact" },
] as const;

/**
 * En-tête de navigation.
 * — Desktop (md+) : logo, liens texte, thème + CTA « Me contacter ».
 * — Mobile : logo + thème uniquement ; les liens vivent dans la barre
 *   fixe en bas (MobileTabBar), en libellés texte.
 */
export function Navigation() {
  const { view, navigate } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeName =
    view.name === "projet"
      ? "projets"
      : view.name === "note"
        ? "notes"
        : view.name;

  const go = (name: (typeof NAV_ITEMS)[number]["name"]) => {
    navigate({ name });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          {/* Logo officiel */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label="Aller à l'accueil"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={56}
              height={56}
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9"
              style={{ filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.35))" }}
            />
            <span className="flex items-baseline gap-0.5 text-lg font-semibold tracking-tight text-foreground">
              NOÉ
              <span className="inline-block h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
            </span>
          </button>

          {/* Liens desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = activeName === item.name;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => go(item.name)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active ? (
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Thème + CTA desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => go("contact")}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-px hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Me contacter
            </button>
          </div>

          {/* Thème (mobile — les liens sont dans la barre du bas) */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Navigation mobile fixée en bas (libellés texte) */}
      <MobileTabBar />
    </>
  );
}
