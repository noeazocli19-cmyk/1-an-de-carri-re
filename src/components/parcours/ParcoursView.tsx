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
      <Reveal className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <span className="eyebrow">Parcours</span>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Mon parcours, étape par étape.
          </h2>
        </div>
        <p className="max-w-xl leading-relaxed text-muted-foreground md:justify-self-end">
          D’octobre 2025 à aujourd’hui : les étapes qui ont construit ma façon de concevoir et de
          développer.
        </p>
      </Reveal>

      <div className="mt-10 md:mt-14">
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
