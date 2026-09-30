"use client";

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { featuredProjects } from "@/data/projects";
import ProjectCaseStudy from "./ProjectCaseStudy";

/**
 * Projets sélectionnés — les trois projets `featured`, présentés en études de
 * cas éditoriales (alternance image/contenu), séparées par des traits fins.
 */
export default function SelectedProjects() {
  const { navigate } = usePortfolio();

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Travaux récents"
            title="Projets sélectionnés"
            description="Trois projets qui montrent ce que je construis et comment je pense."
          />
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

        <div className="mt-12 sm:mt-16">
          <div className="rule" aria-hidden="true" />
          {featuredProjects.map((project, index) => (
            <Fragment key={project.slug}>
              <div className="py-14 sm:py-16">
                <ProjectCaseStudy project={project} index={index} />
              </div>
              {index < featuredProjects.length - 1 ? (
                <div className="rule" aria-hidden="true" />
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
