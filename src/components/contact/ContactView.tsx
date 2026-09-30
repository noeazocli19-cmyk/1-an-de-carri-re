"use client";

import { Download, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";

/**
 * Vue Contact — email direct, CV téléchargeable, réseaux sociaux
 * et formulaire de contact. Coordonnées issues de src/data/site.ts.
 */
export default function ContactView() {
  return (
    <Container className="pb-8 pt-12 md:pt-16">
      {/* En-tête */}
      <Reveal>
        <span className="eyebrow">Contact</span>
        <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Travaillons ensemble.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Un projet, une question, une opportunité — ou simplement l'envie
          d'échanger sur le développement ? Ma boîte est ouverte.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.25fr]">
        {/* Colonne gauche : coordonnées */}
        <Reveal delay={0.05} className="flex flex-col items-start">
          <p className="eyebrow">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 font-serif text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl"
          >
            {site.email}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Je réponds généralement sous 24 à 48 h.
          </p>

          <p className="eyebrow mt-8">Téléphone · WhatsApp</p>
          <a
            href={site.phoneHref}
            className="mt-3 font-serif text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl"
          >
            {site.phone}
          </a>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Discuter sur WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={site.phoneHref}>M&apos;appeler</a>
            </Button>
          </div>

          <a
            href="/cv-noe.pdf"
            download
            className="link-underline mt-8 w-fit text-sm"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Télécharger mon CV
          </a>

          <p className="eyebrow mt-8">Réseaux</p>
          <SocialLinks className="mt-3" />
          <p className="mt-4 text-sm text-muted-foreground">
            Basé au Bénin — disponible à distance.
          </p>
        </Reveal>

        {/* Colonne droite : formulaire */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
