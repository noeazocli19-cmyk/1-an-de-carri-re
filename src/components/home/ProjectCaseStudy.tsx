"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { TechList } from "@/components/shared/TechList";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyProps {
  project: Project;
  index: number;
}

/**
 * Étude de cas éditoriale : image et contenu en grille deux colonnes,
 * ordre alterné (image à droite si index pair, à gauche si impair).
 * Sur mobile, l'image passe toujours au-dessus du texte.
 */
export default function ProjectCaseStudy({ project, index }: ProjectCaseStudyProps) {
  const { navigate } = usePortfolio();
  const imageRight = index % 2 === 0;

  return (
    <Reveal>
      <article className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-14">
        {/* Visuel */}
        <div
          className={cn(
            "group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted",
            imageRight ? "md:order-2" : "md:order-1"
          )}
        >
          <Image
            src={project.cover}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Contenu */}
        <div className={imageRight ? "md:order-1" : "md:order-2"}>
          <div className="flex flex-col gap-4 sm:gap-5">
            <span className="font-mono text-sm text-primary">0{index + 1}</span>
            <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{project.tagline}</p>

            <div className="mt-1 flex flex-col gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  Problème
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  Solution
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </div>
            </div>

            <TechList items={project.technologies} />

            <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{project.learning}</span>
            </p>

            <div className="mt-1">
              <Button
                variant="outline"
                onClick={() => navigate({ name: "projet", slug: project.slug })}
              >
                Voir le projet
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
