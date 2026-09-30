"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TechList } from "@/components/shared/TechList";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import type { Project, ProjectSize } from "@/types";

/**
 * Correspondance taille éditoriale → empan de colonnes dans la grille 12 colonnes.
 * La même classe est portée par le wrapper <Reveal> dans ProjectsView (lui seul
 * est enfant direct de la grille) et par l'<article> ci-dessous.
 */
export const projectSpanBySize: Record<ProjectSize, string> = {
  large: "md:col-span-7",
  medium: "md:col-span-5",
  small: "md:col-span-4",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Carte projet éditoriale : couverture, méta (numéro, période, catégorie),
 * titre, accroche, stack et appel à l'action.
 * Toute la carte est cliquable à la souris ; le titre est un vrai <button>
 * pour rester navigable au clavier — le bouton ne couvre que le titre.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const { navigate } = usePortfolio();
  const isLarge = project.size === "large";
  const openProject = () => navigate({ name: "projet", slug: project.slug });

  return (
    <article
      onClick={openProject}
      className={cn("group cursor-pointer", projectSpanBySize[project.size])}
    >
      {/* Couverture */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-muted",
          isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={project.cover}
          alt={`Aperçu du projet ${project.title}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Méta : numéro éditorial, période honnête, catégorie */}
      <div className="mt-5 flex items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {project.category}
        </span>
      </div>

      {/* Titre — seul élément focusable au clavier de la carte */}
      <h3
        className={cn(
          "mt-2.5 font-serif text-foreground",
          isLarge ? "text-3xl" : "text-2xl"
        )}
      >
        <button
          type="button"
          onClick={openProject}
          className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {project.title}
        </button>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>

      <TechList items={project.technologies} className="mt-3.5" />

      {/* Appel à l'action — décoratif, la carte entière est cliquable */}
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        Voir le projet
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </article>
  );
}
