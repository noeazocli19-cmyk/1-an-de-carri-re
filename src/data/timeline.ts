import type { TimelineStep } from "@/types";

/**
 * Timeline du parcours de Noé.
 *
 * Histoire réelle confirmée :
 * - 2025 : début de la formation (HTML, CSS, JavaScript)
 * - Nov. 2025 : approfondissement JavaScript (logique, fonctionnement, raisonnement)
 * - Déc. 2025 : premières interfaces réelles + premiers projets concrets
 * - Jan. 2026 : découverte de React (interfaces, sites vitrines)
 * - Ensuite : PHP → backend → TypeScript → NestJS → Next.js → Prisma → PostgreSQL → SaaS
 *
 * ⚠️ TODO (Noé) : les libellés de période après janvier 2026 sont volontairement
 * vagues ("2026"). Remplace-les par les vraies dates quand tu les confirmeras.
 */
export const timelineSteps: TimelineStep[] = [
  {
    id: "debut-formation",
    year: "2025",
    period: "Octobre 2025",
    title: "Début de la formation",
    description: "J'apprends à structurer une page avec HTML et à la mettre en forme avec CSS.",
    tags: ["HTML", "CSS"],
  },
  {
    id: "javascript-profond",
    year: "2025",
    period: "Novembre 2025",
    title: "JavaScript, en profondeur",
    description: "Un mois centré sur la logique JavaScript et le raisonnement derrière le code.",
    tags: ["JavaScript", "Logique", "Raisonnement"],
  },
  {
    id: "premieres-interfaces",
    year: "2025",
    period: "Décembre 2025",
    title: "Premières interfaces réelles",
    description: "Je réalise mes premières interfaces complètes et termine mes premiers projets concrets.",
    tags: ["HTML", "CSS", "JavaScript", "Premiers projets"],
  },
  {
    id: "react",
    year: "2026",
    period: "Janvier 2026",
    title: "Découverte de React",
    description: "React m'amène à composer des interfaces et à construire mes premiers sites vitrines.",
    tags: ["React", "Composants", "Sites vitrines"],
  },
  {
    id: "php-backend",
    year: "2026",
    period: "2026",
    title: "PHP et l'envie de comprendre le serveur",
    description: "PHP me fait découvrir le fonctionnement serveur et déclenche mon intérêt pour le backend.",
    tags: ["PHP", "Backend", "Serveur"],
  },
  {
    id: "typescript-ecosysteme",
    year: "2026",
    period: "2026",
    title: "TypeScript et l'écosystème moderne",
    description: "TypeScript, Next.js, Prisma et PostgreSQL m'aident à structurer des applications complètes.",
    tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
  },
  {
    id: "nestjs",
    year: "2026",
    period: "2026",
    title: "NestJS : la révélation",
    description: "Avec NestJS, j'approfondis l'architecture modulaire et la construction d'API.",
    tags: ["NestJS", "Architecture", "API REST"],
  },
  {
    id: "aujourdhui",
    year: "2026",
    period: "Aujourd'hui",
    title: "Applications, SaaS et spécialisation NestJS",
    description: "Je poursuis mes applications web et consolide progressivement ma spécialisation backend NestJS.",
    tags: ["SaaS", "Full-Stack", "NestJS"],
    current: true,
  },
];
