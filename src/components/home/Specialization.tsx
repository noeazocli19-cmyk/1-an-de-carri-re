"use client";

import { Code2, Database, PanelsTopLeft, Server } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

const skillGroups = [
  {
    title: "Frontend",
    description: "Des interfaces accessibles, responsives et structurées par composants.",
    icon: PanelsTopLeft,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & API",
    description: "Une spécialisation en construction autour de NestJS et de la logique serveur.",
    icon: Server,
    featured: true,
    technologies: ["NestJS", "PHP", "API REST"],
  },
  {
    title: "Données",
    description: "Modéliser les données et connecter les applications à leur persistance.",
    icon: Database,
    technologies: ["Prisma", "PostgreSQL"],
  },
  {
    title: "Fondamentaux",
    description: "Le socle qui guide encore ma façon de comprendre et de construire le web.",
    icon: Code2,
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Specialization() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <span className="eyebrow">Compétences</span>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Les outils de mes projets.
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-muted-foreground md:justify-self-end">
            Les technologies que j’utilise ou que j’approfondis, classées par domaine — sans
            niveaux artificiels ni pourcentages.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            const featured = group.featured === true;

            return (
              <Reveal
                key={group.title}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article
                  className={`flex h-full flex-col rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${
                    featured
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`text-sm font-medium ${featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                        {group.title}
                      </h3>
                      <p className="mt-2 font-serif text-4xl">
                        {String(group.technologies.length).padStart(2, "0")}
                        <span className={`ml-2 font-sans text-xs ${featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                          éléments
                        </span>
                      </p>
                    </div>
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border ${
                        featured
                          ? "border-primary-foreground/35 text-primary-foreground"
                          : "border-primary/40 text-primary"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>

                  <p className={`mt-4 min-h-12 text-sm leading-relaxed ${featured ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                    {group.description}
                  </p>

                  <ul className={`mt-5 divide-y ${featured ? "divide-primary-foreground/20 border-primary-foreground/20" : "divide-border border-border"} border-t`}>
                    {group.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="flex items-center gap-3 py-3"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${featured ? "bg-primary-foreground" : "bg-primary"}`}
                        />
                        <span className="text-sm font-medium">{technology}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
