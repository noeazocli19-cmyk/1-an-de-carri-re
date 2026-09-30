import type { Note } from "@/types";

/**
 * Notes — carnet de développement de Noé.
 *
 * ⚠️ TODO (Noé) : remplace/ajoute tes propres notes ici. Chaque note est un
 * objet du tableau : titre, extrait, tags et contenu découpé en blocs
 * (un bloc = un titre optionnel + des paragraphes).
 */
export const notes: Note[] = [
  {
    slug: "un-an-de-developpement",
    title: "Ce que j'ai appris après un an de développement",
    excerpt:
      "Un an, neuf projets, et surtout une conviction : la meilleure façon d'apprendre, c'est de construire.",
    date: "Janvier 2026",
    readingTime: "5 min",
    tags: ["Apprentissage", "Bilan"],
    content: [
      {
        paragraphs: [
          "Il y a un an, j'ouvrais mon premier fichier HTML sans vraiment savoir où j'allais. Aujourd'hui, j'ai construit neuf projets, d'une simple page statique jusqu'à des applications full-stack avec NestJS et PostgreSQL. Si je devais résumer cette année en une phrase, ce serait celle-ci : je n'ai presque rien appris en suivant des cours, et presque tout en construisant.",
        ],
      },
      {
        heading: "Construire, puis construire encore",
        paragraphs: [
          "Le premier tournant, c'est le moment où j'ai arrêté de consommer des tutoriels pour commencer à finir des projets. Un projet terminé — même petit, même moche — m'a appris plus que dix heures de vidéos. Parce qu'un projet fini oblige à régler tous les problèmes : celui qu'on avait prévu et les douze autres.",
          "Mon premier portfolio en ligne valait à lui seul des semaines de tutoriels. Pas parce que le code était bon, mais parce qu'il m'a forcé à répondre à des questions concrètes : comment on héberge, comment on teste sur mobile, comment on finit.",
        ],
      },
      {
        heading: "Ce qui a vraiment changé",
        paragraphs: [
          "Trois choses se sont transformées cette année. D'abord ma relation à l'erreur : au début, une erreur me bloquait des heures ; maintenant, elle me demande généralement des minutes, parce que j'ai appris à lire les messages, à isoler, à tester. Ensuite ma vision du code : je ne demande plus « est-ce que ça marche ? » mais « est-ce que quelqu'un d'autre que moi pourrait le comprendre ? ». Enfin, mes ambitions : je ne veux plus seulement faire des sites, je veux construire des produits.",
        ],
      },
      {
        heading: "Et maintenant ?",
        paragraphs: [
          "Je me spécialise autour de NestJS et de l'architecture backend, j'expérimente autour des SaaS, et je commence à partager ce que j'apprends — cette note en est la preuve. Si une seule chose devait rester de cette première année, ce serait celle-là : la progression vient de la répétition, pas de l'intensité. Un peu, souvent, sur la durée.",
        ],
      },
    ],
  },
  {
    slug: "pourquoi-nestjs",
    title: "Pourquoi je me spécialise autour de NestJS",
    excerpt:
      "Après mes débuts front, c'est le backend qui m'a attiré. Et parmi tous les frameworks, NestJS est celui qui m'a donné une vraie grille de lecture.",
    date: "Janvier 2026",
    readingTime: "4 min",
    tags: ["NestJS", "Backend", "Spécialisation"],
    content: [
      {
        paragraphs: [
          "Quand j'ai découvert PHP puis le fonctionnement serveur, quelque chose s'est déclenché : je voulais comprendre la pièce invisible. Ce qui reçoit les requêtes, valide les données, protège les comptes, tient la logique métier. Le front se voit, le back se conçoit — et j'aime concevoir.",
        ],
      },
      {
        heading: "Ce que NestJS m'a apporté",
        paragraphs: [
          "Avant NestJS, quand j'écrivais du code serveur, je bricolais une structure à chaque projet. NestJS m'a donné une architecture toute prête et éprouvée : des modules par domaine, des services pour la logique, des contrôleurs pour le HTTP, de l'injection de dépendances. Ce n'est pas de la contrainte, c'est de la liberté : je pense à mon problème, plus à l'organisation du code.",
          "L'autre force, c'est TypeScript de bout en bout. Mes types circulent de la base de données (via Prisma) jusqu'à l'API. Toute une catégorie d'erreurs disparaît avant même d'exécuter le code.",
        ],
      },
      {
        heading: "Pourquoi m'inverser dans une spécialisation si tôt",
        paragraphs: [
          "Après un an, on pourrait me dire : apprendre encore large avant de creuser. Mon expérience est l'inverse : depuis que je me spécialise autour de NestJS, j'apprends plus vite. Parce que chaque projet backend fait réutiliser, affiner et relier ce que le précédent m'a appris — validation, authentification, modélisation, architecture. La spécialisation n'est pas un rétrécissement, c'est un moteur.",
        ],
      },
      {
        heading: "La direction",
        paragraphs: [
          "Mon objectif est clair : construire des applications et des SaaS avec des backends solides, lisibles et maintenables. NestJS est l'outil qui m'y conduit, et j'ai encore beaucoup à apprendre — c'est précisément ce qui me plaît.",
        ],
      },
    ],
  },
  {
    slug: "ce-que-un-saas-mapprend",
    title: "Ce que construire un SaaS m'apprend",
    excerpt:
      "Un SaaS n'est pas une application plus grande. C'est une application où les comptes, les permissions et les cas limites deviennent le cœur du problème.",
    date: "Janvier 2026",
    readingTime: "4 min",
    tags: ["SaaS", "Produit", "Apprentissage"],
    content: [
      {
        paragraphs: [
          "Mon premier réflexe a été de penser « un SaaS, c'est comme mon API, mais plus grand ». Je me trompais. La différence n'est pas la taille, c'est la nature des problèmes : des comptes réels, des données réelles, des utilisateurs qui font des choses que tu n'as pas prévues.",
        ],
      },
      {
        heading: "Les leçons, jusqu'ici",
        paragraphs: [
          "Première leçon : la sécurité n'est pas une fonctionnalité, c'est un socle. Isoler les données par utilisateur, valider chaque entrée, protéger chaque route — ça ne s'ajoute pas à la fin. Deuxième leçon : les états vides sont le vrai produit. Un tableau de bord sans données doit être aussi soigné qu'avec. Troisième leçon : le périmètre explose toujours. Chaque fonctionnalité de plus coûte deux fois plus que prévu, parce qu'elle touche les comptes, les permissions, les erreurs.",
          "Et la plus surprenante : je passe plus de temps à penser qu'à coder. Décider ce que je ne construis pas est devenu ma compétence la plus utile.",
        ],
      },
      {
        heading: "Ce que ça change pour moi",
        paragraphs: [
          "Construire un SaaS m'a fait passer d'une logique de développeur à une logique de produit. Je ne construis plus « une application qui fait X », je construis « quelque chose qu'une personne utilisera, cassera, et réutilisera ». C'est exactement pour ça que je veux construire des produits : c'est plus difficile, et plus intéressant.",
        ],
      },
    ],
  },
  {
    slug: "erreurs-de-debutant",
    title: "Les erreurs que je faisais au début",
    excerpt:
      "Copier-coller sans comprendre, refuser de lire la documentation, recommencer au lieu de refactorer... Un an plus tard, retour sur mes pires habitudes.",
    date: "Décembre 2025",
    readingTime: "4 min",
    tags: ["Erreurs", "Apprentissage", "Méthode"],
    content: [
      {
        paragraphs: [
          "Cet article est une lettre ouverte au moi d'il y a un an. Si tu débutes, j'espère qu'il t'évitera quelques semaines de galère.",
        ],
      },
      {
        heading: "Erreur n°1 : copier sans comprendre",
        paragraphs: [
          "Mon premier réflexe était de copier un bout de code de Stack Overflow, de voir que ça marchait, et de passer à la suite. Le problème : je construisais sur du sable. Maintenant, ma règle est simple : je n'intègre pas une ligne que je ne saurais pas réécrire moi-même. C'est plus lent au début, infiniment plus rapide ensuite.",
        ],
      },
      {
        heading: "Erreur n°2 : tout recommencer au lieu de réparer",
        paragraphs: [
          "Quand un projet partait mal, je le jetais et j'en recommençais un nouveau. Résultat : je savais bien démarrer des projets et très mal les finir. La discipline que j'ai acquise depuis : finir. Même mal. Surtout mal — c'est en finissant un projet raté qu'on apprend le plus, parce qu'on rencontre les vrais problèmes : ceux de la fin.",
        ],
      },
      {
        heading: "Erreur n°3 : croire que demander de l'aide est une faiblesse",
        paragraphs: [
          "Je passais des heures bloqué sur un problème pour éviter de paraître débutant. Ironie : la chose la plus professionnelle que j'ai apprise cette année, c'est de poser les bonnes questions tôt. Décrire un problème précisément — ce que je fais, ce que j'obtiens, ce que j'attends — résout la moitié des bugs et m'a appris à mieux comprendre ce que je code.",
        ],
      },
    ],
  },
  {
    slug: "ia-et-manire-de-developper",
    title: "Ce que l'IA change dans ma manière de développer",
    excerpt:
      "L'IA écrit du code mieux et plus vite que moi sur plein de sujets. Alors qu'est-ce que j'apprends, moi ? Mon expérience après un an.",
    date: "Janvier 2026",
    readingTime: "5 min",
    tags: ["IA", "Méthode", "Réflexion"],
    content: [
      {
        paragraphs: [
          "J'apprends à développer à l'ère de l'IA. L'outil écrit du code correct plus vite que moi sur énormément de sujets. Il serait absurde de l'ignorer ; il serait dangereux de s'y reposer sans comprendre. Voici comment je m'en sers — et ce que ça change.",
        ],
      },
      {
        heading: "L'IA comme accélérateur, pas comme pilote",
        paragraphs: [
          "Ma règle : l'IA peut écrire, mais je décide. Je l'utilise pour générer du code répétitif, explorer une API inconnue, déboguer un message obscur. Mais je garde une exigence non négociable : je dois être capable d'expliquer chaque ligne qui entre dans mon projet. Le jour où je ne peux plus, je reviens aux bases — documentation, code source, expérimentation.",
        ],
      },
      {
        heading: "Ce qui devient plus important, pas moins",
        paragraphs: [
          "Si l'IA écrit le code, que reste-t-il ? Précisément ce qui m'a pris un an à construire : savoir ce qu'il faut construire. Décomposer un problème, choisir une architecture, repérer un bug conceptuel que l'IA ne voit pas parce qu'il n'est pas dans le code mais dans la conception. Plus les outils écrivent de code, plus la compréhension vaut cher.",
          "Concrètement : je lis encore la documentation. Je teste encore les choses à la main. Je fais encore des projets sans IA pour vérifier que je sais. Ce sont ces bases qui me permettent d'utiliser l'IA comme un levier plutôt que comme une béquille.",
        ],
      },
      {
        heading: "Mon bilan après un an",
        paragraphs: [
          "L'IA m'a fait gagner du temps, mais elle n'a pas fait mon apprentissage à ma place. Elle ne peut pas : apprendre à développer, c'est construire des modèles mentaux, et ça ne se délègue pas. Mon conseil à quelqu'un qui commence aujourd'hui : utilise l'IA, aime l'IA — mais comprends chaque ligne qu'elle écrit pour toi.",
        ],
      },
    ],
  },
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export function getNextNote(slug: string): Note | undefined {
  const index = notes.findIndex((n) => n.slug === slug);
  if (index === -1) return undefined;
  return notes[(index + 1) % notes.length];
}
