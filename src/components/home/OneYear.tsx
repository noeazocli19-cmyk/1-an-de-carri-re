"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { timelineSteps } from "@/data/timeline";
import { site } from "@/data/site";

const stats: { value: string; label: string }[] = [
  { value: site.stats.projects, label: "projets réalisés" },
  { value: site.stats.years, label: "de parcours depuis octobre 2025" },
  { value: "10", label: "technologies explorées" },
  { value: String(timelineSteps.length), label: "étapes documentées" },
];

export default function OneYear() {
  return (
    <section aria-label="Quelques chiffres clés" className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <div className="grid gap-6 rounded-3xl bg-primary px-6 py-9 text-primary-foreground sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-4 lg:py-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-5xl tracking-tight sm:text-6xl">
                  {stat.value}
                </p>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
