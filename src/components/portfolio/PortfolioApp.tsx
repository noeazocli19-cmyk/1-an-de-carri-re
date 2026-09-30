"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PortfolioProvider, usePortfolio } from "@/components/portfolio/portfolio-context";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { IntroSplash } from "@/components/portfolio/IntroSplash";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import HomeView from "@/components/home/HomeView";
import AboutView from "@/components/about/AboutView";
import ParcoursView from "@/components/parcours/ParcoursView";
import ProjectsView from "@/components/projects/ProjectsView";
import ProjectDetailView from "@/components/projects/ProjectDetailView";
import NotesView from "@/components/notes/NotesView";
import NoteDetailView from "@/components/notes/NoteDetailView";
import ContactView from "@/components/contact/ContactView";

function ViewRouter() {
  const { view } = usePortfolio();
  const reducedMotion = useReducedMotion();

  const content = (() => {
    switch (view.name) {
      case "home":
        return <HomeView />;
      case "a-propos":
        return <AboutView />;
      case "parcours":
        return <ParcoursView />;
      case "projets":
        return <ProjectsView />;
      case "projet":
        return <ProjectDetailView slug={view.slug} />;
      case "notes":
        return <NotesView />;
      case "note":
        return <NoteDetailView slug={view.slug} />;
      case "contact":
        return <ContactView />;
    }
  })();

  const viewKey =
    view.name === "projet" || view.name === "note"
      ? `${view.name}:${view.slug}`
      : view.name;

  if (reducedMotion) {
    return <div key={viewKey}>{content}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Coquille de la SPA : navigation fixe, vues animées, footer collant en bas.
 * Route unique `/` — la navigation se fait par vues (PortfolioProvider).
 */
export function PortfolioApp() {
  return (
    <PortfolioProvider>
      <div className="flex min-h-screen flex-col bg-background pb-[calc(56px+env(safe-area-inset-bottom))] text-foreground md:pb-0">
        {/* Écran d'intro — première visite de la session */}
        <IntroSplash />
        <ScrollProgress />
        <Navigation />
        <main id="contenu" className="flex-1 pt-16">
          <ViewRouter />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
