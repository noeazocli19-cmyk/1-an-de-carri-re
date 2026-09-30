"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { TechList } from "@/components/shared/TechList";
import { usePortfolio } from "@/components/portfolio/portfolio-context";

const specializationStack: string[] = [
  "TypeScript",
  "NestJS",
  "Next.js",
  "Prisma",
  "PostgreSQL",
  "React",
];

/**
 * Spécialisation NestJS — uniquement du texte et des liens : aucune barre de
 * compétence, aucun pourcentage, aucun logo.
 */
export default function Specialization() {
  const { navigate } = usePortfolio();

  return (
    <section className="py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <span className="eyebrow">Spécialisation</span>
            <h2 className="mt-4 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
              NestJS
            </h2>
            <p className="mt-4 text-muted-foreground">
              Architecture backend · API · Applications web · SaaS
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-5">
            <p className="leading-relaxed text-muted-foreground">
              Après mes débuts front-end, j’ai choisi d’approfondir le backend. NestJS m’a donné ce
              que je cherchais : une architecture claire, des modules par domaine, une structure qui
              grandit bien — et TypeScript de bout en bout.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Mon objectif n’est pas de collectionner les technologies, mais de construire des API
              et des applications solides, lisibles et maintenables. La base de tout produit qui
              tient.
            </p>
            <TechList items={specializationStack} className="mt-1" />
            <button
              type="button"
              className="link-underline mt-1 self-start text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
              onClick={() => navigate({ name: "projets" })}
            >
              Voir comment j’utilise NestJS dans mes projets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
