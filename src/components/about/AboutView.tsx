"use client";

import { ArrowRight, BriefcaseBusiness, ChevronDown, Download, Mail, MapPin } from "lucide-react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { aboutSections, visionSteps } from "@/data/about";
import { site } from "@/data/site";
import AboutCarousel from "./AboutCarousel";

const VISION_SECTION_ID = "ou-je-veux-aller";

/**
 * Vue À propos — portrait honnête de Noé : qui il est, comment il apprend,
 * où il va. Contenu issu de src/data/about.ts (textes réels, éditables).
 */
export default function AboutView() {
  const { navigate } = usePortfolio();

  const introParagraphs = aboutSections[0].paragraphs;
  const sections = aboutSections.slice(1);

  return (
    <Container className="py-12 md:py-16">
      <section
        id="qui-je-suis"
        aria-labelledby="about-title"
        className="rounded-3xl border border-border bg-card p-5 sm:p-7 lg:p-8"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <Reveal className="flex flex-col items-start">
            <span className="eyebrow">À propos</span>
            <h2
              id="about-title"
              className="mt-3 max-w-3xl font-serif text-3xl leading-[1.06] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Je construis des produits, pas seulement du code.
            </h2>
            <div className="mt-4 max-w-2xl space-y-3">
              {introParagraphs.map((paragraph, i) => (
                <p
                  key={`intro-${i}`}
                  className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-6 grid gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">Basé au</dt>
                  <dd className="text-sm font-medium text-foreground">{site.location}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                  <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">Orientation</dt>
                  <dd className="text-sm font-medium text-foreground">Full-stack · Backend NestJS</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={() => navigate({ name: "projets" })}>
                Voir mes projets
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button variant="outline" onClick={() => navigate({ name: "home" }, "contact")}>
                Me contacter
              </Button>
              <Button variant="ghost" asChild>
                <a href="/cv-noe.pdf" download>
                  <Download aria-hidden="true" />
                  Mon CV
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-xs lg:max-w-none">
            <AboutCarousel />
          </Reveal>
        </div>
      </section>

      <details className="group mt-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span>En savoir plus sur mon parcours et ma vision</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {sections.map((section, i) => {
            const isVision = section.id === VISION_SECTION_ID;
            return (
              <article
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-titre`}
                className={`rounded-xl border border-border bg-background/50 p-4 ${
                  isVision ? "md:col-span-2" : ""
                }`}
              >
                <p className="font-mono text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  id={`${section.id}-titre`}
                  className="mt-1.5 font-serif text-lg text-foreground sm:text-xl"
                >
                  {section.label}
                </h3>
                <div className="mt-2 space-y-2">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={`${section.id}-${j}`}
                      className="text-xs leading-relaxed text-muted-foreground sm:text-sm"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {isVision ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                    {visionSteps.map((vision, k) => (
                      <div
                        key={vision.step}
                        className="rounded-lg border border-border bg-card p-3"
                      >
                        <p aria-hidden="true" className="font-mono text-[10px] text-primary">
                          {String(k + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 font-medium text-foreground">{vision.step}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                          {vision.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </details>
    </Container>
  );
}
