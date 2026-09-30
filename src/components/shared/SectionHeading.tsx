"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * En-tête de section éditorial : petit label vert, titre serif, description grise.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-muted-foreground sm:text-lg",
            centered ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
