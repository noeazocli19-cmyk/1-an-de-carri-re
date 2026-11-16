"use client";

import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, Code2, Download, Mail, MapPin } from "lucide-react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { aboutSections, visionSteps } from "@/data/about";
import { site } from "@/data/site";

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
        className="rounded-3xl border border-border bg-card p-6 sm:p-9 lg:p-12"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal className="flex flex-col items-start">
            <span className="eyebrow">À propos</span>
            <h2
              id="about-title"
              className="mt-4 max-w-3xl font-serif text-4xl leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Je construis des produits, pas seulement du code.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4">
              {introParagraphs.map((paragraph, i) => (
                <p
                  key={`intro-${i}`}
                  className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-8 grid gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">Basé au</dt>
                  <dd className="text-sm font-medium text-foreground">{site.location}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                  <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">Orientation</dt>
                  <dd className="text-sm font-medium text-foreground">Full-stack · Backend NestJS</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
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

            <div className="mt-8 flex flex-wrap gap-3">
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

          <Reveal delay={0.12} className="mx-auto w-full max-w-sm lg:max-w-none">
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src="/images/noe-portrait.jpg"
                alt="Portrait de Noé, développeur full-stack"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-top grayscale transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-medium text-foreground/70">{site.role}</p>
                <p className="mt-1 font-serif text-2xl text-foreground">
                  {site.tagline}
                </p>
              </figcaption>
              <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <Code2 aria-hidden="true" className="h-5 w-5" />
              </span>
            </figure>
          </Reveal>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sections.map((section, i) => {
          const isVision = section.id === VISION_SECTION_ID;
          return (
            <Reveal
              key={section.id}
              delay={(i % 2) * 0.06}
              className={isVision ? "md:col-span-2" : undefined}
            >
              <article
                id={section.id}
                aria-labelledby={`${section.id}-titre`}
                className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <p className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  id={`${section.id}-titre`}
                  className="mt-3 font-serif text-2xl text-foreground sm:text-3xl"
                >
                  {section.label}
                </h3>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={`${section.id}-${j}`}
                      className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {isVision ? (
                  <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {visionSteps.map((vision, k) => (
                      <div
                        key={vision.step}
                        className="rounded-xl border border-border bg-background/60 p-4"
                      >
                        <p aria-hidden="true" className="font-mono text-xs text-primary">
                          {String(k + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 font-medium text-foreground">{vision.step}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {vision.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
