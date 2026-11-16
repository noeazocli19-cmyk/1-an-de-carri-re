"use client";

import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  FolderOpen,
  BadgeEuro,
  House,
  Mail,
  NotebookText,
  UserRound,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", view: "home", icon: House },
  { label: "À propos", section: "about", icon: UserRound },
  { label: "Parcours", section: "parcours", icon: BriefcaseBusiness },
  { label: "Projets", view: "projets", icon: FolderOpen },
  { label: "Tarifs", view: "tarifs", icon: BadgeEuro },
  { label: "Notes", view: "notes", icon: NotebookText },
  { label: "Contact", section: "contact", icon: Mail },
] as const;

/**
 * Barre de navigation mobile fixée en bas de l'écran, avec icônes et libellés.
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
          const active = "view" in item && activeName === item.view;
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex-1">
              <button
                type="button"
                onClick={() => {
                  if ("section" in item) {
                    navigate({ name: "home" }, item.section);
                  } else {
                    navigate({ name: item.view });
                  }
                }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-[60px] w-full flex-col items-center justify-center gap-1 whitespace-nowrap px-0.5 py-2 text-[10px] leading-none transition-[color,transform] duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary active:scale-[0.97]",
                  active
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0 h-0.5 w-5 rounded-full bg-primary transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={active ? 2.25 : 1.8} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
