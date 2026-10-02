"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  ExternalLink,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { TechList } from "@/components/shared/TechList";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { getNextProject, getProjectBySlug } from "@/data/projects";
import type { Project } from "@/types";

interface ContentSection {
  number: string;
  /** Titre complet affiché dans la colonne de droite */
  title: string;
  /** Libellé raccourci utilisé dans le sommaire (optionnel) */
  short?: string;
  body: ReactNode;
}

/** Paragraphe de corps de section. */
function SectionParagraph({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-muted-foreground">{children}</p>;
}

function ProjectLinks({
  project,
  layout = "row",
}: {
  project: Project;
  layout?: "row" | "column";
}) {
  if (!project.demoUrl && !project.githubUrl) return null;

  const buttonClassName = layout === "column" ? "min-h-11 w-full" : "min-h-11 flex-1";

  return (
    <div className={layout === "column" ? "flex flex-col gap-2" : "flex gap-2"}>
      {project.demoUrl && (
        <Button asChild variant="outline" size="sm" className={buttonClassName}>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" />
            Voir la démo
          </a>
        </Button>
      )}
      {project.githubUrl && (
        <Button asChild variant="outline" size="sm" className={buttonClassName}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" />
            Code source
          </a>
        </Button>
      )}
    </div>
  );
}

/**
 * Vue DÉTAIL D'UN PROJET — étude de cas complète : introduction, contexte,
 * problème, objectif, solution, fonctionnalités, architecture (si présente),
 * difficultés, décisions techniques, apprentissages, captures (si présentes).
 * Sommaire + stack + liens en colonne gauche collante sur desktop.
 */
export default function ProjectDetailView({ slug }: { slug: string }) {
  const { navigate } = usePortfolio();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Container className="py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-muted-foreground">Projet introuvable.</p>
          <Button onClick={() => navigate({ name: "projets" })}>Tous les projets</Button>
        </div>
      </Container>
    );
  }

  const next = getNextProject(slug);

  // Sections réellement rendues, dans l'ordre — le sommaire en dérive.
  const sections: ContentSection[] = [
    {
      number: "01",
      title: "Introduction",
      body: <SectionParagraph>{project.introduction}</SectionParagraph>,
    },
    {
      number: "02",
      title: "Contexte",
      body: <SectionParagraph>{project.context}</SectionParagraph>,
    },
    {
      number: "03",
      title: "Problème",
      body: <SectionParagraph>{project.problem}</SectionParagraph>,
    },
    {
      number: "04",
      title: "Objectif",
      body: <SectionParagraph>{project.objective}</SectionParagraph>,
    },
    {
      number: "05",
      title: "Solution",
      body: <SectionParagraph>{project.solution}</SectionParagraph>,
    },
    {
      number: "06",
      title: "Fonctionnalités",
      body: (
        <ul className="space-y-2.5">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      ),
    },
    ...(project.architecture
      ? [
          {
            number: "07",
            title: "Architecture",
            body: (
              <ol className="space-y-3">
                {project.architecture.map((item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            ),
          },
        ]
      : []),
    {
      number: "08",
      title: "Difficultés rencontrées",
      short: "Difficultés",
      body: (
        <ul className="space-y-2.5">
          {project.difficulties.map((difficulty) => (
            <li key={difficulty} className="flex gap-2.5 text-sm text-muted-foreground">
              <CircleAlert
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
              />
              {difficulty}
            </li>
          ))}
        </ul>
      ),
    },
    {
      number: "09",
      title: "Décisions techniques",
      short: "Décisions",
      body: (
        <div className="space-y-5">
          {project.decisions.map((decision) => (
            <div key={decision.title} className="border-l-2 border-primary/30 pl-4">
              <p className="text-sm font-medium text-foreground">{decision.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{decision.detail}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      number: "10",
      title: "Ce que j'ai appris",
      short: "Apprentissages",
      body: (
        <ul className="space-y-2.5">
          {project.learnings.map((learning) => (
            <li key={learning} className="flex gap-2.5 text-sm text-muted-foreground">
              <ArrowRight
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              {learning}
            </li>
          ))}
        </ul>
      ),
    },
    ...(project.screenshots?.length
      ? [
          {
            number: "11",
            title: "Captures d'écran",
            body: (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot, i) => (
                  <div
                    key={screenshot}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <Image
                      src={screenshot}
                      alt={`Capture d'écran du projet ${project.title} (${i + 1})`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  // Sommaire : les sections rendues, hors introduction (déjà sous les yeux).
  const sommaire = sections.filter((section) => section.number !== "01");

  return (
    <Container className="pt-10 md:pt-14">
      {/* Retour */}
      <button
        type="button"
        onClick={() => navigate({ name: "projets" })}
        className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Tous les projets
      </button>

      {/* En-tête */}
      <div className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          <span aria-hidden="true" className="text-xs text-muted-foreground">
            ·
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {project.category}
          </span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.tagline}</p>
      </div>

      {/* Les liens restent accessibles sans la colonne latérale sur mobile. */}
      <div className="mt-6 max-w-xl lg:hidden">
        <ProjectLinks project={project} />
      </div>

      {/* Couverture */}
      <div className="relative mt-10 aspect-[21/10] overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={project.cover}
          alt={`Couverture du projet ${project.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Corps : sommaire collant à gauche, étude de cas à droite */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Sommaire */}
            <div>
              <p className="eyebrow">Sommaire</p>
              <ul className="mt-3 space-y-2">
                {sommaire.map((section) => (
                  <li key={section.number} className="flex gap-2 text-sm">
                    <span className="mt-0.5 font-mono text-xs text-primary">
                      {section.number}
                    </span>
                    <span className="text-muted-foreground">
                      {section.short ?? section.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div>
              <p className="eyebrow">Stack</p>
              <TechList items={project.technologies} className="mt-3" />
            </div>

            {/* Liens externes — seulement si présents dans les données */}
            {(project.demoUrl || project.githubUrl) && (
              <ProjectLinks project={project} layout="column" />
            )}
          </div>
        </aside>

        {/* Étude de cas */}
        <div className="max-w-2xl">
          {sections.map((section, i) => (
            <Reveal key={section.number} className={i === 0 ? undefined : "mt-12"}>
              <section aria-labelledby={`section-projet-${section.number}`}>
                <h2 id={`section-projet-${section.number}`}>
                  <span className="mb-2 block font-mono text-xs text-primary">
                    {section.number}
                  </span>
                  <span className="font-serif text-2xl text-foreground sm:text-[1.7rem]">
                    {section.title}
                  </span>
                </h2>
                <div className="mt-5">{section.body}</div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Projet suivant */}
      {next && (
        <div className="mt-20 border-t border-border pt-10">
          <p className="eyebrow">Projet suivant</p>
          <button
            type="button"
            onClick={() => navigate({ name: "projet", slug: next.slug })}
            className="group mt-3 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="flex items-center gap-3">
              <span className="font-serif text-3xl text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                {next.title}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-6 w-6 text-muted-foreground transition-all group-hover:translate-x-1.5 group-hover:text-primary"
              />
            </span>
          </button>
        </div>
      )}
    </Container>
  );
}
