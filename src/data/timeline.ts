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
    description:
      "Je démarre mon parcours dans le développement web. Premiers pas avec HTML et CSS : structure d'une page, mise en forme, les fondations de tout ce qui suivra.",
    tags: ["HTML", "CSS"],
  },
  {
    id: "javascript-profond",
    year: "2025",
    period: "Novembre 2025",
    title: "JavaScript, en profondeur",
    description:
      "Un mois complet consacré au langage : logique, fonctionnement, évolution, raisonnement. C'est le moment où le code cesse d'être une incantation et devient un outil que je comprends.",
    tags: ["JavaScript", "Logique", "Raisonnement"],
  },
  {
    id: "premieres-interfaces",
    year: "2025",
    period: "Décembre 2025",
    title: "Premières interfaces réelles",
    description:
      "Je crée mes premières interfaces complètes en HTML, CSS et JavaScript, et je termine mes premiers projets concrets. Voir un projet abouti change la manière d'apprendre.",
    tags: ["HTML", "CSS", "JavaScript", "Premiers projets"],
  },
  {
    id: "react",
    year: "2026",
    period: "Janvier 2026",
    title: "Découverte de React",
    description:
      "Je découvre React et je construis plusieurs interfaces et sites vitrines. La pensée par composants change complètement ma manière d'aborder une page.",
    tags: ["React", "Composants", "Sites vitrines"],
  },
  {
    id: "php-backend",
    year: "2026",
    period: "2026",
    title: "PHP et l'envie de comprendre le serveur",
    description:
      "Je découvre PHP. Plus que le langage, c'est la découverte du fonctionnement serveur qui me marque : je veux comprendre ce qui se passe derrière une interface, pas seulement devant.",
    tags: ["PHP", "Backend", "Serveur"],
  },
  {
    id: "typescript-ecosysteme",
    year: "2026",
    period: "2026",
    title: "TypeScript et l'écosystème moderne",
    description:
      "TypeScript devient mon quotidien, suivi de Next.js, Prisma et PostgreSQL. Je passe d'interfaces isolées à des applications structurées de bout en bout.",
    tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
  },
  {
    id: "nestjs",
    year: "2026",
    period: "2026",
    title: "NestJS : la révélation",
    description:
      "Je découvre NestJS et tout s'emboîte : architecture en modules, injection de dépendances, API structurées. C'est la direction que je choisis d'approfondir sérieusement.",
    tags: ["NestJS", "Architecture", "API REST"],
  },
  {
    id: "aujourdhui",
    year: "2026",
    period: "Aujourd'hui",
    title: "Applications, SaaS et spécialisation NestJS",
    description:
      "Un an après le début, je construis des applications web complètes, j'expérimente autour des SaaS et je consolide ma spécialisation backend autour de NestJS. Et je ne compte pas m'arrêter là.",
    tags: ["SaaS", "Full-Stack", "NestJS"],
    current: true,
  },
];
