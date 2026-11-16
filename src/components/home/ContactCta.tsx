"use client";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { site } from "@/data/site";

/** Appel à l'action final — section signature en dégradé orange. */
export default function ContactCta() {
  const { navigate } = usePortfolio();

  return (
    <section className="bg-gradient-orange py-24 text-[#0a0a0a] sm:py-28">
      <Container className="text-center">
        <Reveal className="flex flex-col items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0a0a0a]/70">
            Contact
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-[#0a0a0a] md:text-5xl">
            Construire quelque chose ensemble ?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-[#0a0a0a]/70">
            Un projet, une question, une opportunité — ou simplement l’envie d’échanger sur le
            développement ? Ma boîte est ouverte.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Button
              size="lg"
              className="rounded-full bg-[#0a0a0a] text-[#ff7656] hover:bg-[#1a1a1a] hover:text-[#ff987e]"
              onClick={() => navigate({ name: "home" }, "contact")}
            >
              Me contacter
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-[#0a0a0a]/80 underline underline-offset-4 transition-colors hover:text-[#0a0a0a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a0a0a]"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
