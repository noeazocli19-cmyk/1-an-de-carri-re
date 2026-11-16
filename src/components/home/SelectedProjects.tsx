"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { projects } from "@/data/projects";
import ProjectCaseStudy from "./ProjectCaseStudy";

const PROJECT_FILTERS = ["Tous", "Applications web", "E-commerce", "Sites vitrine"] as const;
type ProjectFilter = (typeof PROJECT_FILTERS)[number];

function matchesFilter(category: string, filter: ProjectFilter) {
  const normalizedCategory = category.toLowerCase();

  switch (filter) {
    case "Applications web":
      return normalizedCategory.startsWith("plateforme") || normalizedCategory.startsWith("saas");
    case "E-commerce":
      return normalizedCategory.includes("e-commerce");
    case "Sites vitrine":
      return normalizedCategory.startsWith("site vitrine");
    default:
      return true;
  }
}

/**
 * Galerie filtrable des projets, avec animations de transition et technologies
 * affichées sur chaque carte.
 */
export default function SelectedProjects() {
  const { navigate } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("Tous");
  const reducedMotion = useReducedMotion() ?? false;
  const visibleProjects = projects.filter((project) =>
    matchesFilter(project.category, activeFilter)
  );

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="eyebrow">Travaux récents</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Des projets dont je suis fier.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Parcours les projets par catégorie et retrouve les technologies utilisées sur chaque carte.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <button
              type="button"
              className="link-underline text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
              onClick={() => navigate({ name: "projets" })}
            >
              Tous les projets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrer les projets par catégorie"
        >
          {PROJECT_FILTERS.map((filter) => {
            const count =
              filter === "Tous"
                ? projects.length
                : projects.filter((project) => matchesFilter(project.category, filter)).length;
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {filter}
                <span className={active ? "text-primary-foreground/70" : "text-muted-foreground/70"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, delay: index * 0.035 }}
              >
                <ProjectCaseStudy project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
