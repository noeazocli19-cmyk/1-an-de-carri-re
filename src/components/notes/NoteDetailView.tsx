"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { getNextNote, getNoteBySlug } from "@/data/notes";

/**
 * Vue DÉTAIL D'UNE NOTE — article éditorial sobre : méta (tags, date, temps de
 * lecture), titre, extrait, corps en blocs (titre + paragraphes), signature,
 * puis lien vers la note suivante.
 */
export default function NoteDetailView({ slug }: { slug: string }) {
  const { navigate } = usePortfolio();
  const note = getNoteBySlug(slug);

  if (!note) {
    return (
      <Container className="py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-muted-foreground">Note introuvable.</p>
          <Button onClick={() => navigate({ name: "notes" })}>Toutes les notes</Button>
        </div>
      </Container>
    );
  }

  const next = getNextNote(slug);

  return (
    <Container className="pt-10 md:pt-14">
      {/* Retour */}
      <button
        type="button"
        onClick={() => navigate({ name: "notes" })}
        className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Toutes les notes
      </button>

      {/* Article — une seule Reveal pour tout le bloc, sobrement */}
      <Reveal>
        <article className="mx-auto max-w-2xl pt-10">
          <div className="flex flex-wrap items-center gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs text-muted-foreground">
              · {note.date} · {note.readingTime} de lecture
            </span>
          </div>

          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
            {note.title}
          </h1>

          <p className="mt-5 font-serif italic text-xl text-muted-foreground">
            {note.excerpt}
          </p>

          <div className="rule mt-8" />

          {/* Corps : blocs = titre optionnel + paragraphes, depuis les données */}
          {note.content.map((block, blockIndex) => (
            <div key={block.heading ?? `bloc-${blockIndex}`} className="mt-9">
              {block.heading && (
                <h2 className="mb-4 font-serif text-2xl text-foreground">
                  {block.heading}
                </h2>
              )}
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="mb-5 text-base leading-[1.85] text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Signature */}
          <div className="rule mt-12" />
          <p className="mt-6 font-serif italic text-muted-foreground">— Noé</p>
        </article>
      </Reveal>

      {/* Note suivante */}
      {next && (
        <Reveal>
          <div
            onClick={() => navigate({ name: "note", slug: next.slug })}
            className="group mt-16 cursor-pointer rounded-2xl border border-border p-7 transition-colors hover:border-primary/40 sm:p-8"
          >
            <p className="eyebrow">Lire la note suivante</p>
            <button
              type="button"
              onClick={() => navigate({ name: "note", slug: next.slug })}
              className="mt-3 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-3">
                <span className="font-serif text-2xl text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  {next.title}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                />
              </span>
            </button>
          </div>
        </Reveal>
      )}
    </Container>
  );
}
