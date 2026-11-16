"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

const slides = [
  {
    id: "portrait",
    src: "/images/noe-portrait.jpg",
    alt: "Portrait de Noé, développeur full-stack",
    eyebrow: site.role,
    title: site.tagline,
    monochrome: true,
  },
  ...featuredProjects.map((project) => ({
    id: project.slug,
    src: project.screenshots?.[0] ?? project.cover,
    alt: `Capture du projet ${project.title}`,
    eyebrow: project.category,
    title: project.title,
    monochrome: false,
  })),
];

export default function AboutCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused || reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isPaused, reducedMotion]);

  const changeSlide = (direction: -1 | 1) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <div
      role="region"
      aria-label="Portrait et projets de Noé"
      aria-roledescription="carrousel"
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          aria-live="off"
        >
          <Image
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            sizes="(max-width: 1024px) 80vw, 360px"
            className={`object-cover object-top ${activeSlide.monochrome ? "grayscale" : ""}`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-xs font-medium text-white/70">{activeSlide.eyebrow}</p>
            <p className="mt-1 font-serif text-xl text-white sm:text-2xl">
              {activeSlide.title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-2 backdrop-blur">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Afficher ${slide.id === "portrait" ? "le portrait" : `le projet ${slide.title}`}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? "w-5 bg-primary" : "w-1.5 bg-white/55"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? "Reprendre le carrousel" : "Mettre le carrousel en pause"}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isPaused ? (
              <Play aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Pause aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Image précédente"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Image suivante"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
