"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { NoteCard } from "@/components/notes/NoteCard";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { notes } from "@/data/notes";

/**
 * Vue NOTES — le carnet de développement.
 * La note la plus récente (notes[0]) est mise à la une en pleine largeur ;
 * les suivantes forment une grille sobre en deux colonnes.
 */
export default function NotesView() {
  const { navigate } = usePortfolio();
  const [featured, ...rest] = notes;
  const openFeatured = () =>
    featured ? navigate({ name: "note", slug: featured.slug }) : undefined;

  return (
    <Container className="pt-12 md:pt-16">
      {/* En-tête */}
      <Reveal className="flex flex-col gap-4">
        <span className="eyebrow">Notes</span>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Le carnet de développement.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Ce que j&rsquo;apprends, ce que je me trompe, ce que ça change. Écrit au fil de
          la construction — sans filtre corporate.
        </p>
      </Reveal>

      {/* Note à la une */}
      {featured && (
        <article
          onClick={openFeatured}
          className="group mt-14 cursor-pointer rounded-2xl border border-border p-7 transition-colors hover:border-primary/40 sm:p-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {featured.date}
            </span>
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Titre — seul élément focusable au clavier de la carte */}
          <h2 className="mt-4 font-serif text-3xl text-foreground transition-colors group-hover:text-primary sm:text-4xl">
            <button
              type="button"
              onClick={openFeatured}
              className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {featured.title}
            </button>
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">{featured.excerpt}</p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            Lire la note
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </article>
      )}

      {/* Les autres notes */}
      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((note, i) => (
            <Reveal key={note.slug} delay={(i % 2) * 0.08} className="h-full">
              <NoteCard note={note} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
