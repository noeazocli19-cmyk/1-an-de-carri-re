"use client";

import Image from "next/image";
import { usePortfolio } from "@/components/portfolio/portfolio-context";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { site } from "@/data/site";

const FOOTER_LINKS = [
  { label: "Accueil", name: "home" },
  { label: "À propos", name: "a-propos" },
  { label: "Parcours", name: "parcours" },
  { label: "Projets", name: "projets" },
  { label: "Notes", name: "notes" },
  { label: "Contact", name: "contact" },
] as const;

export function Footer() {
  const { navigate } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque — logo officiel */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate({ name: "home" })}
              className="group flex w-fit items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              aria-label="Aller à l'accueil"
            >
              <Image
                src="/logo-mark.png"
                alt="Logo NOÉ — Développeur Full-Stack · Produits numériques · SaaS"
                width={220}
                height={220}
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-[1.06] sm:h-14 sm:w-14"
                style={{ filter: "drop-shadow(0 0 14px rgba(34, 197, 94, 0.25))" }}
              />
              <span className="flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-foreground">
                NOÉ
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
            </button>
            <p className="text-sm text-muted-foreground">
              {site.role} · {site.role2}
            </p>
            <p className="font-serif text-base italic text-foreground/70">
              {site.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation de pied de page">
            <p className="eyebrow mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => navigate({ name: link.name })}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & réseaux */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow mb-0">Me suivre</p>
            <SocialLinks />
            <a
              href={`mailto:${site.email}`}
              className="link-underline w-fit text-sm font-medium"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.phone} — Bénin
            </a>
            <a
              href="/cv-noe.pdf"
              download
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Télécharger mon CV
            </a>
          </div>
        </div>

        <div className="rule mt-10" />

        <div className="flex flex-col items-start justify-between gap-2 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} Noé — Tous droits réservés.</p>
          <p>Conçu et développé par Noé.</p>
        </div>
      </Container>
    </footer>
  );
}
