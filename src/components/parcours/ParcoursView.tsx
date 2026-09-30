"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Timeline } from "./Timeline";

/**
 * Vue Parcours — timeline verticale pilotée par le scroll.
 * Chaque étape est réelle et documentée (données : src/data/timeline.ts) :
 * d'octobre 2025 à aujourd'hui, sans expérience gonflée ni date inventée.
 */
export default function ParcoursView() {
  return (
    <Container className="pt-12 md:pt-16">
      {/* En-tête centré */}
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="eyebrow">Parcours</span>
        <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Un an à construire, étape par étape.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          D'octobre 2025 à aujourd'hui : chaque étape est réelle, documentée et
          reliée aux projets que j'ai construits. Le scroll raconte la
          progression.
        </p>
      </Reveal>

      {/* Timeline scroll */}
      <div className="mt-16 md:mt-24">
        <Timeline />
      </div>

      {/* Note de fin */}
      <div className="flex items-center justify-center gap-2.5 pb-16 pt-10 md:pb-24">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
        />
        <p className="text-sm text-muted-foreground">
          La suite s'écrit en ce moment.
        </p>
      </div>
    </Container>
  );
}
