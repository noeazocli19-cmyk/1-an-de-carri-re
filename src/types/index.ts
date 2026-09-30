/**
 * Types globaux du portfolio de Noé.
 */

export type ViewName =
  | "home"
  | "a-propos"
  | "parcours"
  | "projets"
  | "notes"
  | "contact";

/**
 * Vue courante de la SPA (route unique `/`).
 * - vues principales : accueil, à propos, parcours, projets, notes, contact
 * - vues de détail : un projet précis (projet) ou une note précise (note)
 */
export type View =
  | { name: ViewName }
  | { name: "projet"; slug: string }
  | { name: "note"; slug: string };

export type ProjectSize = "large" | "medium" | "small";

export interface ProjectDecision {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Courte description affichée sous le titre */
  tagline: string;
  /** Période honnête, ex. "Déc. 2025" ou "2026" */
  year: string;
  category: string;
  /** Présenté sur la page d'accueil */
  featured: boolean;
  /** Hiérarchie visuelle éditoriale sur la page /projets */
  size: ProjectSize;
  cover: string;
  /** Étude de cas — accueil et page projet */
  problem: string;
  solution: string;
  technologies: string[];
  learning: string;
  /** Page détail */
  introduction: string;
  context: string;
  objective: string;
  features: string[];
  architecture?: string[];
  difficulties: string[];
  decisions: ProjectDecision[];
  learnings: string[];
  demoUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
}

export interface TimelineStep {
  id: string;
  /** Grand marqueur d'année affiché sur la timeline */
  year: "2025" | "2026";
  /** Libellé de période honnête — les dates postérieures à React restent volontairement vagues */
  period: string;
  title: string;
  description: string;
  tags: string[];
  /** Étape actuelle ("Aujourd'hui") */
  current?: boolean;
}

export interface NoteBlock {
  heading?: string;
  paragraphs: string[];
}

export interface Note {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: NoteBlock[];
}

export type SocialIconName =
  | "github"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "whatsapp"
  | "mail";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconName;
}
