"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { notes } from "@/data/notes";

/**
 * Carnet de développement — les trois notes les plus récentes,
 * chaque ligne entière est cliquable.
 */
export default function NotesTeaser() {
  const { navigate } = usePortfolio();
  const latestNotes = notes.slice(0, 3);

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Notes" title="Le carnet de développement" />
          <Reveal delay={0.15} className="shrink-0">
            <button
              type="button"
              className="link-underline text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
              onClick={() => navigate({ name: "notes" })}
            >
              Toutes les notes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <ul className="flex flex-col">
            {latestNotes.map((note) => (
              <li key={note.slug}>
                <button
                  type="button"
                  onClick={() => navigate({ name: "note", slug: note.slug })}
                  className="group flex w-full items-center justify-between gap-6 border-b border-border py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span className="min-w-0">
                    <span className="mb-1.5 block font-mono text-xs text-muted-foreground">
                      {note.date}
                    </span>
                    <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary sm:text-xl">
                      {note.title}
                    </h3>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground line-clamp-1">
                      {note.excerpt}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
