"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import type { Project } from "@/types";

interface ProjectCaseStudyProps {
  project: Project;
  index: number;
}

/** Carte projet avec image, catégorie, technologies et accès à l'étude de cas. */
export default function ProjectCaseStudy({ project, index }: ProjectCaseStudyProps) {
  const { navigate } = usePortfolio();

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/50">
        <button
          type="button"
          onClick={() => navigate({ name: "projet", slug: project.slug })}
          aria-label={`Découvrir le projet ${project.title}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-muted text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
        >
          <Image
            src={project.cover}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            {project.category}
          </span>
          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              0{index + 1}
            </span>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Technologies
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Technologies utilisées">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-foreground/80"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="outline"
            className="mt-5 w-fit rounded-full"
            onClick={() => navigate({ name: "projet", slug: project.slug })}
          >
            Voir le projet
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
