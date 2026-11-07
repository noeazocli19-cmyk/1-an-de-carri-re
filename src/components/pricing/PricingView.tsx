"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { pricingExamples } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function PricingView() {
  const { navigate } = usePortfolio();

  return (
    <Container className="py-12 md:py-16">
      <Reveal className="flex flex-col gap-4">
        <span className="eyebrow">Tarifs</span>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Des sites adaptés à votre projet et à votre budget.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Ces tarifs sont indicatifs. Le prix final dépend des fonctionnalités,
          du contenu fourni, des intégrations et du délai.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {pricingExamples.map((item, index) => (
          <Reveal key={item.title} delay={(index % 2) * 0.08}>
            <article className={cn("flex h-full flex-col rounded-3xl border bg-card p-6 sm:p-8", item.highlighted ? "border-primary shadow-lg shadow-primary/10" : "border-border")}>
              {item.highlighted ? <span className="mb-5 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Le plus demandé</span> : null}
              <h2 className="font-serif text-2xl text-foreground">{item.title}</h2>
              <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <p className="mt-6 text-xl font-semibold text-foreground">{item.price}</p>
              <ul className="mt-7 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={item.highlighted ? "default" : "outline"} onClick={() => navigate({ name: "contact" })}>
                Demander un devis
                <ArrowRight aria-hidden="true" />
              </Button>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
