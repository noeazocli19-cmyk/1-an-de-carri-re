"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Fournisseur de thème — classe .dark sur <html>, thème sombre par défaut
 * (couleurs du logo), switch manuel via le bouton ThemeToggle de la navigation.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
