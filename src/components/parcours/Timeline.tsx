"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { timelineSteps } from "@/data/timeline";
import { TimelineItem } from "./TimelineItem";

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const count = timelineSteps.length;

  useEffect(() => {
    if (isPaused || reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % count);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [count, isPaused, reducedMotion]);

  const changeStep = (direction: -1 | 1) => {
    setActiveIndex((index) => (index + direction + count) % count);
  };
  const activeStep = timelineSteps[activeIndex];

  return (
    <section
      role="region"
      aria-label="Étapes de mon parcours"
      aria-roledescription="carrousel"
      className="mx-auto max-w-3xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? "Reprendre le parcours" : "Mettre le parcours en pause"}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isPaused ? (
              <Play aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Pause aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => changeStep(-1)}
            aria-label="Étape précédente"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => changeStep(1)}
            aria-label="Étape suivante"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStep.id}
            initial={reducedMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -28 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <TimelineItem step={activeStep} index={activeIndex} count={count} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {timelineSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            aria-label={`Afficher l’étape ${index + 1} : ${step.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? "w-6 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
