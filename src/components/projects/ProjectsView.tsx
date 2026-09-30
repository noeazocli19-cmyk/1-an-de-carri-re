"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ProjectCard, projectSpanBySize } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

/**
 * Vue PROJETS — liste éditoriale en grille 12 colonnes.
 * La hiérarchie visuelle vient des données (project.size → large / medium / small),
 * volontairement pas un mur de cartes identiques.
 */
export default function ProjectsView() {
  return (
    <Container className="pt-12 md:pt-16">
      {/* En-tête */}
      <Reveal className="flex flex-col gap-4">
        <span className="eyebrow">Projets</span>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          9+ projets construits depuis octobre 2025.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Des premières pages HTML aux applications full-stack avec NestJS : chaque projet
          est documenté avec son contexte, ses difficultés et ses apprentissages.
        </p>
      </Reveal>

      {/* Grille éditoriale — l'empan de colonnes suit la taille du projet */}
      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 3) * 0.08}
            className={projectSpanBySize[project.size]}
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
