export interface PricingExample {
  title: string;
  description: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

/**
 * Prix indicatifs à adapter selon la complexité et le périmètre de chaque mission.
 */
export const pricingExamples: PricingExample[] = [
  {
    title: "Portfolio / CV en ligne",
    description: "Une présence professionnelle claire pour présenter ton activité, tes réalisations et tes coordonnées.",
    price: "À partir de 75 000 FCFA",
    features: [
      "Jusqu’à 5 pages ou sections",
      "Design responsive",
      "Formulaire de contact",
      "Optimisation SEO essentielle",
    ],
  },
  {
    title: "Site vitrine",
    description: "Un site moderne pour présenter une entreprise, ses services et générer des demandes de devis.",
    price: "À partir de 150 000 FCFA",
    highlighted: true,
    features: [
      "Jusqu’à 7 pages ou sections",
      "Présentation des services",
      "WhatsApp et réseaux sociaux",
      "Référencement technique de base",
    ],
  },
  {
    title: "Boutique en ligne",
    description: "Une boutique simple pour présenter un catalogue et faciliter les commandes locales.",
    price: "À partir de 300 000 FCFA",
    features: [
      "Catalogue et fiches produits",
      "Panier ou commande WhatsApp",
      "Gestion des promotions",
      "Administration des contenus",
    ],
  },
  {
    title: "Application web / SaaS",
    description: "Une plateforme sur mesure avec comptes, tableaux de bord et fonctionnalités métier avancées.",
    price: "Sur devis",
    features: [
      "Analyse fonctionnelle",
      "Comptes et rôles utilisateurs",
      "API et base de données",
      "Déploiement et maintenance",
    ],
  },
];
