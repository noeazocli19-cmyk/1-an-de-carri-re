"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import ProjectCaseStudy from "@/components/home/ProjectCaseStudy";
import { projectSpanBySize } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

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
 * Page dédiée à la galerie complète des projets, classés et filtrables.
 */
export default function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("Tous");
  const reducedMotion = useReducedMotion() ?? false;
  const visibleProjects = projects.filter((project) =>
    matchesFilter(project.category, activeFilter)
  );

  return (
    <Container className="pb-20 pt-12 md:pb-24 md:pt-16">
      <Reveal className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <span className="eyebrow">Projets</span>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Des projets dont je suis fier.
          </h1>
        </div>
        <p className="max-w-xl leading-relaxed text-muted-foreground md:justify-self-end">
          {projects.length} projets documentés ici, de la première idée jusqu’à leur mise en
          ligne. Chaque carte présente le projet et les technologies utilisées.
        </p>
      </Reveal>

      <div
        className="mt-10 flex flex-wrap gap-2"
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

      <div className="mt-8 grid items-stretch gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-12 xl:gap-x-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className={projectSpanBySize[project.size]}
              layout
              initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: reducedMotion ? 0 : 0.35, delay: index * 0.035 }}
            >
              <ProjectCaseStudy project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Container>
  );
}
