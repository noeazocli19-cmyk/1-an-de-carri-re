/**
 * Contenu de la page À propos.
 * ⚠️ TODO (Noé) : personnalise librement ces textes — ils racontent ton histoire.
 */

export interface AboutSection {
  id: string;
  label: string;
  paragraphs: string[];
}

export const aboutSections: AboutSection[] = [
  {
    id: "qui-je-suis",
    label: "Qui je suis",
    paragraphs: [
      "Je m'appelle Noé, j'ai une vingtaine d'années et je construis des produits numériques. Derrière ce titre un peu formel, il y a quelque chose de très simple : depuis octobre 2025, je passe la majeure partie de mon temps à concevoir, coder, casser et reconstruire des applications web.",
      "Je ne suis pas développeur depuis dix ans. J'en suis à ma première année — et je l'assume complètement. Ce qui me distingue, ce n'est pas l'ancienneté : c'est ce que j'ai construit pendant cette année, et la direction que je me suis fixée.",
    ],
  },
  {
    id: "mon-parcours",
    label: "Mon parcours",
    paragraphs: [
      "Tout a commencé fin 2025, avec les bases : HTML, CSS, JavaScript. J'ai voulu comprendre plutôt que survoler — un mois entier passé uniquement sur la logique JavaScript a tout changé dans ma manière de raisonner.",
      "Puis les projets sont arrivés : des interfaces, des sites vitrines, du React, une incursion en PHP qui a réveillé ma curiosité pour le backend. TypeScript, Next.js, Prisma, PostgreSQL ont suivi — jusqu'à NestJS, le framework autour duquel j'ai choisi de me spécialiser.",
      "Un an plus tard : plus de neuf projets, des pages statiques aux applications full-stack. Le détail est sur la page Parcours.",
    ],
  },
  {
    id: "maniere-apprendre",
    label: "Ma manière d'apprendre",
    paragraphs: [
      "J'apprends en construisant. Pas « aussi » — c'est ma méthode principale. Un concept que je n'ai pas mis à l'épreuve dans un projet réel ne compte pas comme appris.",
      "Ma boucle est simple : je choisis un projet légèrement au-dessus de mon niveau, je construis jusqu'à me bloquer, je résous le blocage, et j'écris ce que j'ai appris. Chaque projet de mon portfolio correspond à cette boucle, plusieurs fois répétée.",
      "J'accorde beaucoup d'importance aux fondamentaux : je préfère comprendre une documentation officielle que d'empiler des raccourcis. C'est plus lent. C'est aussi ce qui me permet d'aller vite aujourd'hui.",
    ],
  },
  {
    id: "pourquoi-je-construis",
    label: "Pourquoi je construis",
    paragraphs: [
      "Parce que voir une idée devenir une chose utilisable est, pour moi, la plus belle partie du métier. Une interface qui répond, une API qui tient, un produit que quelqu'un utilise : c'est concret, c'est vérifiable, et ça ne ment pas.",
      "Mais il y a une raison plus profonde : je ne veux pas seulement écrire du code. Le code est un moyen. Ce que je cherche, c'est construire des produits utiles — des choses qui résolvent un vrai problème pour de vraies personnes.",
    ],
  },
  {
    id: "ce-que-je-cherche",
    label: "Ce que je cherche aujourd'hui",
    paragraphs: [
      "Aujourd'hui, je me concentre sur le développement full-stack avec une spécialisation backend autour de NestJS : architecture, API, applications web, SaaS.",
      "Je cherche à travailler sur de vrais produits — rejoindre une équipe, contribuer à un produit existant ou construire le mien. L'essentiel pour moi : construire quelque chose de réel, avec des gens qui veulent le faire sérieusement.",
    ],
  },
  {
    id: "ou-je-veux-aller",
    label: "Où je veux aller",
    paragraphs: [
      "Je vois mon parcours comme le début d'un écosystème, pas comme une destination. À court terme : construire davantage de produits et consolider ma spécialisation backend. À moyen terme : partager ce que j'apprends, documenter ma progression, et construire progressivement une communauté autour de mes projets.",
      "Et plus tard — c'est une vision, pas un acquis — je veux transmettre : créer ma propre plateforme de formation pour enseigner le développement tel que je l'aurais aimé l'apprendre. Construire, partager, enseigner, créer : c'est dans cet ordre, et à chaque étape son moment.",
    ],
  },
];

/** Chaîne de vision affichée visuellement sur la page À propos */
export const visionSteps = [
  {
    step: "Construire",
    description: "Des produits réels, utiles, finis.",
  },
  {
    step: "Partager",
    description: "Documenter la progression, publier ce que j'apprends.",
  },
  {
    step: "Enseigner",
    description: "Transmettre plus tard à travers ma plateforme de formation.",
  },
  {
    step: "Créer",
    description: "Réunir le tout dans un écosystème durable.",
  },
];

export const quickFacts = [
  { label: "Parcours", value: "1 an, depuis octobre 2025" },
  { label: "Projets", value: "9+ réalisés" },
  { label: "Spécialisation", value: "NestJS · Backend" },
  { label: "Ambition", value: "Produits & SaaS" },
];
