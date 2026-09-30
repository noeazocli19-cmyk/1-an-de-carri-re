"use client";

import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
}

/**
 * Carte note (grille secondaire de la vue Notes) : date, titre, extrait,
 * deux tags maximum et flèche d'appel. Toute la carte est cliquable à la
 * souris ; le titre est un vrai <button> pour la navigation au clavier.
 */
export function NoteCard({ note }: NoteCardProps) {
  const { navigate } = usePortfolio();
  const openNote = () => navigate({ name: "note", slug: note.slug });

  return (
    <article
      onClick={openNote}
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-border p-6 transition-colors hover:border-primary/40"
    >
      <span className="font-mono text-xs text-muted-foreground">{note.date}</span>

      {/* Titre — seul élément focusable au clavier de la carte */}
      <h3 className="mt-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
        <button
          type="button"
          onClick={openNote}
          className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {note.title}
        </button>
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
        {note.excerpt}
      </p>

      {/* Pied de carte : tags (2 max) + flèche décorative */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        />
      </div>
    </article>
  );
}
