"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

const stats: { value: string; label: string }[] = [
  { value: "1 an", label: "de parcours, depuis octobre 2025" },
  { value: "9+", label: "projets construits et documentés" },
  { value: "10", label: "technologies explorées" },
];

/**
 * « Une année à construire » — section sur fond gris clair qui raconte le
 * parcours honnêtement : une année, 9+ projets, une conviction.
 */
export default function OneYear() {
  return (
    <section className="bg-muted py-24 sm:py-28">
      <Container>
        <Reveal>
          <span className="eyebrow">Une année</span>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
            Une année à construire.
          </h2>
        </Reveal>

        <div className="mt-8 max-w-2xl md:mt-10">
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted-foreground">
              En octobre 2025, je commençais mon parcours dans le développement web.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Un an plus tard, j’ai déjà construit plus de 9 projets, expérimenté plusieurs
              technologies et surtout compris une chose : je veux aller au-delà du simple fait de
              coder.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div aria-hidden="true" className="mb-4 mt-8 h-px w-12 bg-primary" />
            <p className="font-medium leading-relaxed text-foreground">
              Je veux construire des produits utiles.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.value} delay={index * 0.1}>
              <p className="font-serif text-5xl tracking-tight text-foreground">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
