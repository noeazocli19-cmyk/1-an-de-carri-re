import { Download } from "lucide-react";

/**
 * Bouton flottant pour récupérer l'archive complète du projet.
 *
 * NOTE POUR NOÉ : ce bouton est là pour te permettre de télécharger le
 * dossier du projet en un clic depuis l'aperçu. Une fois que tu as
 * récupéré le zip, tu peux le retirer en supprimant <SourceDownloadChip />
 * dans src/components/portfolio/PortfolioApp.tsx (et ce fichier).
 */
export function SourceDownloadChip() {
  return (
    <a
      href="/download/portfolio-noe.zip"
      download="portfolio-noe.zip"
      aria-label="Télécharger le dossier complet du projet au format zip"
      className="fixed bottom-[calc(64px+env(safe-area-inset-bottom))] right-3 z-40 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/95 py-2.5 pl-3.5 pr-4 text-sm font-medium text-foreground shadow-lg shadow-black/10 backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-5 md:right-5"
    >
      <Download className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        Dossier <span className="font-semibold text-primary">.zip</span>
      </span>
    </a>
  );
}
