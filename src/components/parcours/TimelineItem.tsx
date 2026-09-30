"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/types";

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
}

/**
 * Une étape de la timeline du parcours.
 *
 * Activation : l'étape est « active » tant qu'elle traverse la zone médiane de
 * l'écran (useInView avec une marge négative de 42 % en haut et en bas).
 * Point vert + contenu pleine opacité lorsqu'elle est active, atténué sinon.
 *
 * prefers-reduced-motion : tout est visible, aucune animation, aucun état atténué.
 */
export function TimelineItem({ step, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  const active = reducedMotion ? true : inView;
  const onLeft = index % 2 === 0; // pair → colonne gauche (md), texte aligné à droite

  return (
    <div
      ref={ref}
      className="relative py-8 pl-12 md:grid md:grid-cols-2 md:gap-16 md:py-10 md:pl-0"
    >
      {/* Point sur la ligne */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-9 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center md:left-1/2"
      >
        {step.current ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex h-full w-full rounded-full border-2 transition-all duration-500",
            active || step.current
              ? "border-primary bg-primary"
              : "border-border bg-background",
            active && "ring-4 ring-primary/20"
          )}
        />
      </span>

      {/* Contenu de l'étape */}
      <div
        className={cn(
          "transition-all duration-500",
          active ? "opacity-100" : "opacity-45",
          onLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
        )}
      >
        <div
          className={cn(
            step.current && "rounded-xl border border-primary/30 bg-muted p-6"
          )}
        >
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
              active || step.current ? "text-primary" : "text-muted-foreground"
            )}
          >
            {step.period}
          </p>
          <h3 className="mt-1.5 text-lg font-medium text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
          <ul
            className={cn(
              "mt-3 flex flex-wrap gap-2",
              onLeft && "md:justify-end"
            )}
          >
            {step.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
