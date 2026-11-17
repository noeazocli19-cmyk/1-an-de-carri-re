"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { featuredProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
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
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => navigate({ name: "projets" })}
            >
              Tous les projets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid items-stretch gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {featuredProjects.map((project, index) => (
            <div
              key={project.slug}
              className={index === 2 ? "sm:col-span-2 sm:mx-auto sm:w-1/2" : undefined}
            >
              <ProjectCaseStudy project={project} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
