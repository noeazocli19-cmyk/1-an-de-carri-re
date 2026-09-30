"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Bouton de bascule thème sombre ↔ clair.
 * Les deux icônes sont rendues et masquées en CSS via la classe .dark —
 * aucun état monté nécessaire, aucun risque de mismatch d'hydratation.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Changer de thème (sombre / clair)"
      title="Changer de thème"
      className={
        className ??
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    >
      <Sun aria-hidden="true" className="h-4 w-4 dark:hidden" />
      <Moon aria-hidden="true" className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
