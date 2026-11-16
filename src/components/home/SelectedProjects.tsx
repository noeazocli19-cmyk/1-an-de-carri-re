"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { featuredProjects } from "@/data/projects";
import ProjectCaseStudy from "./ProjectCaseStudy";

/**
 * Sélection courte sur l'accueil. La liste complète est présentée sur la page
 * Projets.
 */
export default function SelectedProjects() {
  const { navigate } = usePortfolio();

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
              Une sélection de projets récents, avec les technologies et les détails de chaque réalisation.
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

        <div className="mt-10 grid items-stretch gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCaseStudy key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
