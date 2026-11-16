"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { site } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { navigate } = usePortfolio();
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-12"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[24%] -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,81,43,0.16)_0%,rgba(255,81,43,0.05)_42%,transparent_72%)] blur-2xl sm:h-[34rem] sm:w-[34rem]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-8 md:min-h-[490px] md:grid-cols-[minmax(0,1fr)_minmax(250px,0.9fr)_minmax(0,1fr)] md:gap-6 lg:gap-10">
          <motion.div
            className="relative z-10 pt-4 md:pt-0"
            initial={reducedMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Portfolio personnel · 2026
            </span>
            <h2 className="mt-8 max-w-sm text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.55rem]">
              {site.role}
              <span className="text-primary">.</span>
            </h2>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Basé au {site.location}
            </div>
          </motion.div>

          <motion.div
            className="relative z-0 mx-auto w-full max-w-[390px] md:self-end"
            style={reducedMotion ? undefined : { y: portraitY, opacity: portraitOpacity }}
          >
            <motion.figure
              className="mx-auto"
              initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
            >
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#151311] shadow-[0_32px_100px_-40px_rgba(255,81,43,0.28)]"
                animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/noe-portrait.jpg"
                  alt="Noé, développeur full-stack, avec son ordinateur portable"
                  fill
                  priority
                  sizes="(min-width: 768px) 30vw, 82vw"
                  className="object-cover object-[center_18%] grayscale contrast-110 brightness-[0.82]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-transparent to-[#090909]/10"
                  aria-hidden="true"
                />
              </motion.div>
              <figcaption className="sr-only">
                {site.name}, {site.role}, basé au {site.location}.
              </figcaption>
            </motion.figure>
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col items-start gap-5 md:pl-2"
            initial={reducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Construire. Apprendre. Partager.
            </p>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.heroDescription}
            </p>
            <button
              type="button"
              onClick={() => navigate({ name: "projets" })}
              className="group mt-1 inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-2 pr-5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary transition-transform duration-200 group-hover:rotate-[-35deg]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              Voir mes travaux
            </button>
            <span className="mt-1 text-xs text-muted-foreground">{site.proof}</span>
          </motion.div>
        </div>

        <motion.h1
          className="relative z-10 -mt-2 whitespace-nowrap text-center text-[clamp(5rem,20vw,15rem)] font-black leading-[0.76] tracking-[-0.09em] text-foreground sm:-mt-8 md:-mt-12"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
        >
          NOÉ<span className="text-primary">.</span>
        </motion.h1>

        <motion.div
          className="mt-10 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground sm:mt-12"
          animate={reducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Défiler pour découvrir
        </motion.div>
      </Container>
    </section>
  );
}
