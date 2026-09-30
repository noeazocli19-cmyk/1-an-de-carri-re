"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "noe-intro-v1";
/** Durée minimale d'affichage de l'intro (ms) */
const MIN_DISPLAY = 2300;
/** Garde-fou : on lève le rideau même si l'événement `load` traîne (ms) */
const MAX_DISPLAY = 6000;

type Phase = "intro" | "exit";

const EASE_CURTAIN: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_REVEAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Écran d'intro — joué à la première visite de chaque session.
 *
 * Déroulé : le N du logo apparaît (spring + halo vert), le nom « NOÉ » se
 * révèle lettre par lettre, une ligne de progression verte se remplit pendant
 * que la page se charge. Dès que la page est chargée (et la durée minimale
 * atteinte), le rideau se lève vers le haut et le portfolio apparaît.
 *
 * - sessionStorage : l'intro ne rejoue pas au rechargement ni en navigation interne.
 * - Anti-flash : un script inline (layout.tsx) ajoute `intro-done` sur <html>
 *   avant le premier rendu si l'intro a déjà été vue — le splash est alors
 *   masqué en CSS instantanément, sans écart visuel.
 * - `intro-pending` verrouille le scroll pendant l'intro.
 * - prefers-reduced-motion : version statique courte, fondu simple de sortie.
 *
 * Note d'implémentation : l'enfant d'AnimatePresence n'est rendu que pendant
 * la phase « intro ». Le passage à « exit » retire l'enfant de l'arbre —
 * c'est ce démontage qui déclenche l'animation de sortie, puis
 * `onExitComplete` qui persiste la marque de session.
 */
export function IntroSplash() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      // Déjà vu pendant cette session : le CSS (html.intro-done) masque déjà
      // le splash — on passe en « exit » au tick suivant pour démonter le nœud.
      const raf = requestAnimationFrame(() => setPhase("exit"));
      return () => cancelAnimationFrame(raf);
    }

    // Première visite de la session : verrouille le scroll pendant l'intro
    document.documentElement.classList.add("intro-pending");

    const minDelay = reducedMotion ? 500 : MIN_DISPLAY;
    let minTimeDone = false;
    let pageLoaded = document.readyState === "complete";

    const maybeExit = () => {
      if (minTimeDone && pageLoaded) setPhase("exit");
    };

    const minTimer = setTimeout(() => {
      minTimeDone = true;
      maybeExit();
    }, minDelay);

    const onLoad = () => {
      pageLoaded = true;
      maybeExit();
    };
    if (pageLoaded) {
      maybeExit();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Garde-fou : ne jamais rester bloqué sur l'intro
    const forceTimer = setTimeout(() => {
      setPhase("exit");
    }, Math.max(minDelay, MAX_DISPLAY));

    return () => {
      clearTimeout(minTimer);
      clearTimeout(forceTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [reducedMotion]);

  const handleExitComplete = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* stockage indisponible — l'intro rejouera à la prochaine session */
    }
    document.documentElement.classList.remove("intro-pending");
  }, []);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {phase === "intro" ? (
        <motion.div
          key="intro-splash"
          className="intro-splash fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }
              : { y: "-100%", transition: { duration: 0.75, ease: EASE_CURTAIN } }
          }
        >
          <p className="sr-only">Chargement du portfolio de Noé…</p>

          {/* Halo vert central, hérité de la luminescence du N */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(34,197,94,0.14) 0%, rgba(34,197,94,0.05) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Logo N */}
          <motion.div
            initial={
              reducedMotion ? false : { opacity: 0, scale: 0.55, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.15 }}
            className="relative"
          >
            <Image
              src="/logo-mark.png"
              alt="Logo NOÉ — N"
              width={112}
              height={112}
              priority
              className="h-20 w-20 object-contain md:h-24 md:w-24"
              style={{ filter: "drop-shadow(0 0 26px rgba(34, 197, 94, 0.45))" }}
            />
          </motion.div>

          {/* Nom — révélation lettre par lettre */}
          <div
            className="relative mt-7 flex items-center gap-0.5 text-2xl font-semibold tracking-[0.28em] text-foreground md:text-3xl"
            aria-label="NOÉ"
          >
            {["N", "O", "É"].map((letter, index) => (
              <motion.span
                key={letter}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.08, duration: 0.5, ease: EASE_REVEAL }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="ml-1 inline-block h-2 w-2 rounded-full bg-primary"
              initial={reducedMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.95 }}
              aria-hidden="true"
            />
          </div>

          {/* Devise */}
          <motion.p
            className="relative mt-3 text-[13px] tracking-wide text-muted-foreground"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: EASE_REVEAL }}
          >
            Construire. Apprendre. Partager.
          </motion.p>

          {/* Ligne de progression pendant le chargement */}
          {!reducedMotion ? (
            <div className="relative mt-9 h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full w-full origin-left bg-gradient-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, delay: 0.35, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
