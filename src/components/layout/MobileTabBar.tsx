"use client";

import { usePortfolio } from "@/components/portfolio/portfolio-context";
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
 * Barre de navigation mobile — fixée en bas de l'écran, libellés texte
 * uniquement (pas d'icônes, pas d'emojis), identique aux liens de la
 * navigation principale. Remplace l'ancien menu hamburger sur mobile.
 */
export function MobileTabBar() {
  const { view, navigate } = usePortfolio();

  const activeName =
    view.name === "projet"
      ? "projets"
      : view.name === "note"
        ? "notes"
        : view.name;

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex w-full max-w-xl items-stretch justify-between px-1">
        {NAV_ITEMS.map((item) => {
          const active = activeName === item.name;
          return (
            <li key={item.name} className="flex-1">
              <button
                type="button"
                onClick={() => navigate({ name: item.name })}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] w-full flex-col items-center justify-center gap-[5px] whitespace-nowrap px-0.5 py-2 text-[11px] leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary active:scale-[0.97]",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-1 w-1 rounded-full bg-primary transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
