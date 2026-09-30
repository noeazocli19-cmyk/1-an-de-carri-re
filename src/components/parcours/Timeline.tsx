"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { timelineSteps } from "@/data/timeline";
import { TimelineItem } from "./TimelineItem";

/**
 * Timeline verticale du parcours — le cœur visuel de la vue Parcours.
 *
 * Une ligne grise de base parcourt toute la hauteur ; par-dessus, une ligne
 * verte de progression grandit avec le scroll (useScroll + useSpring).
 * Les grands marqueurs d'année (« 2025 », « 2026 ») sont insérés dès que
 * l'année d'une étape diffère de la précédente, positionnés sur la ligne.
 *
 * prefers-reduced-motion : la ligne est pleine (scaleY = 1), aucun ressort,
 * les étapes sont toutes visibles — voir TimelineItem.
 */
export function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.72", "end 0.5"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* Ligne de base */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2"
      />
      {/* Ligne de progression pilotée par le scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-[2px] origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
        style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }}
      />

      <ol className="relative">
        {timelineSteps.map((step, index) => {
          const showYear =
            index === 0 || timelineSteps[index - 1].year !== step.year;
          return (
            <Fragment key={step.id}>
              {showYear ? (
                <li
                  aria-hidden="true"
                  className="relative flex justify-start py-6 pl-11 md:justify-center md:py-8 md:pl-0"
                >
                  <span className="relative z-10 bg-background px-3 font-serif text-3xl text-foreground md:text-4xl">
                    {step.year}
                  </span>
                </li>
              ) : null}
              <li>
                <TimelineItem step={step} index={index} />
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
