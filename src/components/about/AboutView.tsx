"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { aboutSections, quickFacts, visionSteps } from "@/data/about";

const VISION_SECTION_ID = "ou-je-veux-aller";

/**
 * Vue À propos — portrait honnête de Noé : qui il est, comment il apprend,
 * où il va. Contenu issu de src/data/about.ts (textes réels, éditables).
 */
export default function AboutView() {
  const { navigate } = usePortfolio();

  // L'intro reprend les paragraphes de la première section (« Qui je suis ») :
  // on démarre la liste numérotée à la suivante pour ne rien dupliquer.
  const introParagraphs = aboutSections[0].paragraphs;
  const sections = aboutSections.slice(1);

  return (
    <Container className="pb-16 pt-12 md:pb-24 md:pt-16">
      {/* Intro : texte + portrait + faits rapides */}
      <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="flex flex-col items-start">
          <span className="eyebrow">À propos</span>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Je construis des produits, pas seulement du code.
          </h1>
          <div className="mt-6 space-y-4">
            {introParagraphs.map((paragraph, i) => (
              <p
                key={`intro-${i}`}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full max-w-xs lg:justify-self-end">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src="/images/noe-portrait.jpg"
              alt="Photo de Noé, développeur full-stack, un ordinateur portable à la main"
              fill
              sizes="(max-width: 1024px) 70vw, 320px"
              className="object-cover object-top"
            />
            {/* Voile bas pour la lisibilité de la légende */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent"
            />
            <figcaption className="absolute bottom-4 left-0 right-0 text-center text-xs font-medium text-white">
              Noé — Créer. Construire. Partager.
            </figcaption>
          </figure>
          <div className="mt-6 rounded-xl bg-muted p-6">
            <dl>
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between gap-4 py-2.5"
                >
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      {/* Sections numérotées */}
      {sections.map((section, i) => {
        const isVision = section.id === VISION_SECTION_ID;
        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-titre`}
            className="border-t border-border py-12"
          >
            <div className="grid gap-8 md:grid-cols-[220px_1fr]">
              <Reveal>
                <p
                  aria-hidden="true"
                  className="font-mono text-sm text-primary"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`${section.id}-titre`}
                  className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
                >
                  {section.label}
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={`${section.id}-${j}`}
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {isVision ? (
                  <div className="mt-8">
                    <p className="text-xs text-muted-foreground">
                      La vision, en quatre temps — construire d'abord, enseigner
                      plus tard.
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-4">
                      {visionSteps.map((vision, k) => (
                        <div
                          key={vision.step}
                          className="rounded-xl border border-border p-5"
                        >
                          <p
                            aria-hidden="true"
                            className="font-mono text-xs text-primary"
                          >
                            {String(k + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-2 font-medium text-foreground">
                            {vision.step}
                          </p>
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {vision.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* CTA final */}
      <Reveal className="mt-14 flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <a href="/cv-noe.pdf" download>
            <Download aria-hidden="true" />
            Télécharger mon CV
          </a>
        </Button>
        <Button onClick={() => navigate({ name: "contact" })}>
          Me contacter
        </Button>
      </Reveal>
    </Container>
  );
}
