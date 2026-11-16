"use client";

import { Code2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/types";

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
}

export function TimelineItem({ step, index }: TimelineItemProps) {
  return (
    <Reveal delay={(index % 3) * 0.06} className="h-full">
      <article
        className={cn(
          "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
          step.current
            ? "border-primary/60 bg-primary/[0.04]"
            : "border-border bg-card hover:border-primary/40"
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border",
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

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {step.period}
          </p>
          {step.current ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
              En cours
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
