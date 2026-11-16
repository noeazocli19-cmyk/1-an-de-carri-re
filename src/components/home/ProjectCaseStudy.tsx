"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const images = project.screenshots?.length ? project.screenshots : [project.cover];
  const [activeImage, setActiveImage] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  const changeImage = (direction: -1 | 1) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/50">
        <div className="group/preview relative aspect-[16/10] overflow-hidden bg-muted">
          <button
            type="button"
            onClick={() => navigate({ name: "projet", slug: project.slug })}
            aria-label={`Découvrir le projet ${project.title}`}
            className="absolute inset-0 z-0 block w-full text-left focus-visible:outline-2 focus-visible:outline-primary"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[activeImage]}
                className="absolute inset-0"
                initial={reducedMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <Image
                  src={images[activeImage]}
                  alt={`Capture ${activeImage + 1} du projet ${project.title}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover/preview:scale-[1.04]"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/preview:rotate-45">
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>

          {images.length > 1 ? (
            <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur">
                <button
                  type="button"
                  onClick={() => changeImage(-1)}
                  aria-label={`Capture précédente du projet ${project.title}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                {images.map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(imageIndex)}
                    aria-label={`Afficher la capture ${imageIndex + 1} de ${project.title}`}
                    aria-pressed={activeImage === imageIndex}
                    className={`h-1.5 rounded-full transition-all ${
                      activeImage === imageIndex ? "w-5 bg-primary" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => changeImage(1)}
                  aria-label={`Capture suivante du projet ${project.title}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1.5 font-mono text-[10px] text-white backdrop-blur">
                {String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            {project.category} <span aria-hidden="true">·</span> {project.year}
          </p>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
          <div className="mt-4 border-t border-border pt-3">
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
            className="mt-4 w-fit rounded-full"
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
