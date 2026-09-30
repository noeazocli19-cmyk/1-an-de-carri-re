"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/components/portfolio/portfolio-context";

interface Milestone {
  date: string;
  label: string;
  current?: boolean;
}

const milestones: Milestone[] = [
  { date: "Oct. 2025", label: "Les bases : HTML · CSS · JavaScript" },
  { date: "Jan. 2026", label: "React et la pensée par composants" },
  { date: "2026", label: "TypeScript · Next.js · Prisma · PostgreSQL" },
  { date: "Aujourd’hui", label: "NestJS et l’expérimentation SaaS", current: true },
];

/**
 * Aperçu du parcours — quatre jalons datés, le point vert animé marque
 * l'étape actuelle (« Aujourd'hui »).
 */
export default function ParcoursTeaser() {
  const { navigate } = usePortfolio();

  return (
    <section className="py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Parcours"
              title="D’HTML à NestJS."
              description="Mon parcours tient en une année. Chaque étape y est documentée, datée et reliée à un projet concret."
            />
            <Reveal delay={0.15} className="mt-8">
              <Button onClick={() => navigate({ name: "parcours" })}>
                Découvrir mon parcours
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <ul className="flex flex-col">
              {milestones.map((milestone) => (
                <li
                  key={milestone.date}
                  className="flex items-baseline gap-4 border-b border-border py-4 last:border-b-0"
                >
                  <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
                    {milestone.date}
                  </span>
                  <p className="flex items-center gap-2.5 text-sm text-foreground">
                    {milestone.current ? (
                      <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                    ) : null}
                    <span>{milestone.label}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
