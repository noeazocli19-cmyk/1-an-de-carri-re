"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Apparition en cascade : fondu + translation verticale douce.
 * Si prefers-reduced-motion : rendu statique, aucune animation.
 */
function Cascade({
  delay,
  reducedMotion,
  className,
  children,
}: {
  delay: number;
  reducedMotion: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Couche externe : transformations liées au scroll (parallaxe de dissolution).
 * Désactivée si prefers-reduced-motion — les MotionValues restent calculées
 * (ordre des hooks stable) mais ne sont pas appliquées au DOM.
 */
function ParallaxLayer({
  enabled,
  style,
  className,
  children,
}: {
  enabled: boolean;
  style: MotionStyle;
  className?: string;
  children: ReactNode;
}) {
  if (!enabled) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
}

/**
 * Hero — élément central du site. Tout est centré : titre, rôles, description,
 * actions, preuve honnête, puis le portrait sous le contenu.
 * Deux couches de mouvement imbriquées : parallaxe au scroll (externe) et
 * apparition en cascade (interne) pour éviter tout conflit de transform.
 */
export default function Hero() {
  const { navigate } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  // Parallaxe douce : quand la section sort du viewport, le contenu se dissout.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const line2X = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const photoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-16 pt-24 md:pt-32">
      <Container className="flex flex-col items-center text-center">
        {/* Titre */}
        <ParallaxLayer
          enabled={!reducedMotion}
          style={{ y: titleY, opacity: titleOpacity }}
          className="w-full"
        >
          <Cascade delay={0} reducedMotion={reducedMotion}>
            <h1 className="font-serif text-7xl tracking-tight text-foreground sm:text-8xl md:text-9xl">
              NOÉ
              <span
                aria-hidden="true"
                className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-primary align-baseline md:h-3 md:w-3"
              />
            </h1>
          </Cascade>
        </ParallaxLayer>

        {/* Sous-titres — deux lignes qui s'écartent doucement au scroll */}
        <ParallaxLayer enabled={!reducedMotion} style={{ x: line1X }} className="w-full">
          <Cascade delay={0.12} reducedMotion={reducedMotion} className="mt-6 md:mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground sm:text-sm md:text-base">
              {site.role}
            </p>
          </Cascade>
        </ParallaxLayer>
        <ParallaxLayer enabled={!reducedMotion} style={{ x: line2X }} className="w-full">
          <Cascade delay={0.24} reducedMotion={reducedMotion} className="mt-2 md:mt-3">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground sm:text-sm md:text-base">
              {site.role2}
            </p>
          </Cascade>
        </ParallaxLayer>

        {/* Description */}
        <Cascade delay={0.36} reducedMotion={reducedMotion} className="mt-6 w-full md:mt-8">
          <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
            {site.heroDescription}
          </p>
        </Cascade>

        {/* Actions */}
        <ParallaxLayer
          enabled={!reducedMotion}
          style={{ y: buttonsY, opacity: buttonsOpacity }}
          className="w-full"
        >
          <Cascade delay={0.48} reducedMotion={reducedMotion} className="mt-8 md:mt-10">
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => navigate({ name: "projets" })}
              >
                Voir mes projets
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => navigate({ name: "parcours" })}
              >
                Mon parcours
              </Button>
            </div>
          </Cascade>
        </ParallaxLayer>

        {/* Preuve honnête — 1 an de parcours, 9+ projets, jamais gonflé */}
        <ParallaxLayer enabled={!reducedMotion} style={{ opacity: badgeOpacity }} className="w-full">
          <Cascade delay={0.6} reducedMotion={reducedMotion} className="mt-6 md:mt-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              {site.proof}
            </span>
          </Cascade>
        </ParallaxLayer>

        {/* Indication de scroll — rebond très doux */}
        <Cascade delay={0.72} reducedMotion={reducedMotion} className="mt-10 w-full md:mt-12">
          <motion.div
            aria-hidden="true"
            className="flex justify-center"
            animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </Cascade>

        {/* Photo officielle de Noé — halo vert de la marque */}
        <ParallaxLayer
          enabled={!reducedMotion}
          style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
          className="w-full"
        >
          <motion.figure
            className="mx-auto mt-12 flex w-full flex-col items-center md:mt-16"
            initial={reducedMotion ? undefined : { opacity: 0, y: 28, scale: 0.97 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <motion.div
              className="relative"
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Halo vert doux derrière la photo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-95 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(34,197,94,0.2)_0%,rgba(34,197,94,0.05)_45%,transparent_70%)] blur-2xl"
              />
              <div className="relative w-60 overflow-hidden rounded-[2rem] border border-border shadow-[0_32px_64px_-32px_rgba(0,0,0,0.55)] ring-1 ring-foreground/10 sm:w-72 md:w-[340px]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/noe-portrait.jpg"
                    alt="Photo de Noé, développeur full-stack, un ordinateur portable à la main"
                    fill
                    priority
                    sizes="(min-width: 768px) 340px, 288px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
            <figcaption className="mt-4 text-center text-xs text-muted-foreground">
              {site.name} — {site.role} · {site.role2}
            </figcaption>
          </motion.figure>
        </ParallaxLayer>
      </Container>
    </section>
  );
}
