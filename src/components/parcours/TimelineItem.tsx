"use client";

import { Code2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/types";

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
  count: number;
}

export function TimelineItem({ step, index, count }: TimelineItemProps) {
  return (
    <Reveal delay={(index % 3) * 0.06} className="h-full">
      <article
        role="group"
        aria-roledescription="diapositive"
        aria-label={`Étape ${index + 1} sur ${count} : ${step.title}`}
        className={cn(
          "group flex min-h-72 flex-col rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 sm:min-h-80 sm:p-6",
          step.current
            ? "border-primary/60 bg-primary/[0.04]"
            : "border-border bg-card hover:border-primary/40"
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border",
              step.current
                ? "border-primary/50 text-primary"
                : "border-border text-muted-foreground"
            )}
          >
            <Code2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {step.period}
          </p>
          {step.current ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
              En cours
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {step.title}
        </h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {step.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
