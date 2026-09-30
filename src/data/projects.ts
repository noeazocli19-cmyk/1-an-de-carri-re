import type { Project } from "@/types";

/**
 * Projets réels de Noé — chacun en ligne sur Vercel, chacun avec sa démo.
 *
 * Règles honnêteté :
 * - noms, URLs, fonctionnalités et écrans proviennent des vrais sites déployés ;
 * - les captures d'écran sont de vraies captures des sites en production ;
 * - ne jamais inventer de fonctionnalités, de clients, de résultats ou de
 *   technologies non utilisées ;
 * - `featured: true` = les 3 projets présentés sur l'accueil ;
 * - `size` contrôle la hiérarchie visuelle sur la page Projets (large / medium / small).
 *
 * Les périodes restent volontairement regroupées sur 2026 (parcours démarré en
 * octobre 2025) — à affiner projet par projet si besoin.
 */
export const projects: Project[] = [
  {
    slug: "finda",
    title: "FINDA",
    tagline:
      "Mon premier projet en ligne : une plateforme qui connecte les clients aux artisans qualifiés à travers l'Afrique.",
    year: "2026",
    category: "Plateforme · Marketplace",
    featured: true,
    size: "large",
    cover: "/images/projects/finda-1.jpg",
    problem:
      "Trouver un artisan fiable est un vrai problème du quotidien : bouche-à-oreille, prix opaques, qualité incertaine. Je voulais construire la plateforme que j'aurais aimé utiliser : chercher un métier, une ville, comparer, contacter.",
    solution:
      "Une plateforme complète : recherche par service et par localisation, catégories de métiers (plomberie, électricité, menuiserie, couture…), carte des artisans, comptes utilisateurs, témoignages et FAQ — dans une interface sombre et moderne, pensée pour le mobile.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Un premier projet, c'est là qu'on découvre l'écart entre « une page » et « un produit » : la recherche, les catégories, les comptes, les états vides… tout se défend.",
    introduction:
      "FINDA est mon tout premier projet mis en ligne — et il est ambitieux : une plateforme qui connecte des clients avec des artisans qualifiés à travers l'Afrique, du plombier au menuisier, de la couture à la mécanique.",
    context:
      "Après mes débuts en HTML, CSS et JavaScript, je voulais construire quelque chose d'utile, pas un exercice. L'idée est partie d'un problème concret : trouver un artisan de confiance, rapidement et à un prix clair.",
    objective:
      "Permettre à n'importe qui de trouver l'artisan qu'il cherche : par métier, par ville, avec des informations claires et un contact direct.",
    features: [
      "Recherche par service et par localisation",
      "Catégories de métiers : plomberie, électricité, menuiserie, peinture, climatisation, couture, mécanique…",
      "Carte des artisans",
      "Comptes : inscription et connexion",
      "Témoignages et FAQ",
      "Indicateurs de confiance : artisans vérifiés, missions réalisées, satisfaction",
      "Chat de support intégré",
    ],
    difficulties: [
      "Penser « plateforme » et non « page » : comptes, recherche, catégories — mon premier vrai produit",
      "Construire une recherche utile (service + localisation) sans la surcompliquer",
      "Organiser beaucoup de métiers de façon lisible et navigable",
    ],
    decisions: [
      {
        title: "Commencer fort",
        detail:
          "Pour un premier projet, beaucoup auraient choisi une page simple. J'ai visé un vrai produit avec recherche, comptes et carte — c'est là que j'ai le plus appris, le plus vite.",
      },
    ],
    learnings: [
      "Structurer une application complète, pas seulement des pages",
      "L'importance de la recherche et des catégories dans un produit de découverte",
      "Un premier projet en ligne vaut tous les tutoriels",
    ],
    demoUrl: "https://artisan-nine-sigma.vercel.app/",
    screenshots: ["/images/projects/finda-1.jpg", "/images/projects/finda-2.jpg"],
  },
  {
    slug: "hauts-de-palette",
    title: "Les Hauts de Palette",
    tagline:
      "Le site d'un producteur de vins bordelais depuis 1859 : une maison, huit châteaux, et une commande en ligne élégante.",
    year: "2026",
    category: "E-commerce · Vins",
    featured: false,
    size: "medium",
    cover: "/images/projects/hauts-de-palette-1.jpg",
    problem:
      "Un domaine viticole a besoin d'un site à la hauteur de son histoire : raconter la maison, présenter ses châteaux et ses vins, et permettre de commander en ligne — sans trahir un univers premium très codifié.",
    solution:
      "Un site éditorial et marchand : histoire de la maison depuis 1859, présentation des châteaux et des vins, accords mets-vins, cellier et commande en ligne, dans une direction artistique sombre et raffinée avec un hero animé.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Un site de marque, c'est avant tout de la narration : chaque section fait avancer l'histoire, jusqu'au bouton d'achat.",
    introduction:
      "Les Hauts de Palette, c'est l'univers d'une maison viticole bordelaise établie depuis 1859 : huit châteaux, une vingtaine de salariés, un savoir-faire de cinq générations. Le site traduit cet héritage en expérience digitale.",
    context:
      "Je voulais travailler un univers premium où la typographie, le rythme et les images font tout — et où le e-commerce doit rester digne de la marque.",
    objective:
      "Raconter la maison et ses huit châteaux, puis convertir : découvrir les vins, les accords, et commander en ligne simplement.",
    features: [
      "Hero animé : bouteille, particules et géométrie en mouvement",
      "Présentation de la maison et de son histoire depuis 1859",
      "Pages Vins et Châteaux",
      "Accords mets-vins",
      "Cellier : panier et commande en ligne",
      "Livraison en France avec seuil de livraison offerte",
      "Thème clair / sombre",
    ],
    difficulties: [
      "Traduire un univers de terroir en interface moderne sans le dénaturer",
      "Les exigences spécifiques de la vente d'alcool en ligne : contrôle d'âge, mentions, modération",
      "Équilibrer le récit éditorial et le parcours d'achat",
    ],
    decisions: [
      {
        title: "Une vérification d'âge intégrée",
        detail:
          "La vente d'alcool impose un avertissement : le site ouvre sur un contrôle d'âge élégant, conforme et dans le ton de la marque — pas une popup anonyme.",
      },
    ],
    learnings: [
      "Construire une identité visuelle premium autour d'un contenu réel",
      "Les contraintes légales d'un e-commerce spécifique",
      "Le scroll au service du récit",
    ],
    demoUrl: "https://les-hauts-de-palette-rho.vercel.app/",
    screenshots: [
      "/images/projects/hauts-de-palette-1.jpg",
      "/images/projects/hauts-de-palette-2.jpg",
    ],
  },
  {
    slug: "zstore-benin",
    title: "Zstore Bénin",
    tagline:
      "La boutique en ligne d'un vrai commerce de Cotonou : décoration, bougies et senteurs premium, commandables en un clic sur WhatsApp.",
    year: "2026",
    category: "E-commerce · Boutique locale",
    featured: true,
    size: "medium",
    cover: "/images/projects/zstore-benin-1.jpg",
    problem:
      "Un vrai commerce de décoration et de senteurs à Agla (Cotonou) avait besoin d'une vitrine en ligne : montrer ses produits, ses promotions, et surtout convertir — avec les habitudes d'achat locales : commande via WhatsApp, retrait en boutique.",
    solution:
      "Un e-commerce coloré et chaleureux : catalogue de produits, promotions, galerie, parcours de commande WhatsApp, et toutes les informations de la boutique physique — adresse, téléphones, horaires.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Travailler pour un vrai commerce change tout : ce n'est pas mon goût qui compte, c'est ce qui fait vendre.",
    introduction:
      "Zstore Bénin n'est pas un site fictif : c'est la boutique en ligne d'un vrai commerce de décoration et de senteurs premium à Agla, Cotonou — bougies parfumées, parfums d'ambiance, objets déco et coffrets cadeaux.",
    context:
      "Un vrai commerce, de vrais produits, et des clients finaux qui commandent surtout depuis leur téléphone, via WhatsApp. Le projet devait épouser ces usages, pas les contredire.",
    objective:
      "Faire découvrir la boutique et ses collections, puis transformer l'intérêt en commande — sans friction.",
    features: [
      "Catalogue : bougies parfumées, parfums d'ambiance, décoration, coffrets",
      "Commande directe sur WhatsApp",
      "Bandeau de promotions et nouveautés",
      "Galerie et présentation de la boutique",
      "Informations pratiques : adresse (Agla, Cotonou), téléphones",
      "Thème clair / sombre",
      "Interface en français pensée mobile",
    ],
    difficulties: [
      "Concevoir pour un vrai public : mobile d'abord, WhatsApp au centre",
      "Organiser un catalogue vivant entre promotions et nouveautés",
      "Traduire l'ambiance d'une boutique physique en écran",
    ],
    decisions: [
      {
        title: "WhatsApp comme canal de commande",
        detail:
          "Au Bénin, la commande passe par WhatsApp. Plutôt que d'imposer un tunnel d'achat classique, le site met ce réflexe au centre : chaque produit mène à la conversation.",
      },
    ],
    learnings: [
      "L'UX locale : les habitudes d'achat dictent le parcours",
      "Un site client, c'est de l'écoute avant du code",
      "Les photos produit et les promotions pilotent la conversion",
    ],
    demoUrl: "https://zstore-beta.vercel.app/",
    screenshots: [
      "/images/projects/zstore-benin-1.jpg",
      "/images/projects/zstore-benin-2.jpg",
    ],
  },
  {
    slug: "seo-ai-writer",
    title: "SEO AI Writer",
    tagline:
      "Un assistant IA qui génère du contenu optimisé pour Google : articles, méta-données, FAQ et réseaux sociaux, propulsé par Gemini 2.5 Flash.",
    year: "2026",
    category: "SaaS · IA",
    featured: true,
    size: "large",
    cover: "/images/projects/seo-ai-writer-1.jpg",
    problem:
      "Écrire du contenu bien référencé demande du temps et de la méthode : mots-clés, structure, méta-données, intention de recherche. Je voulais construire un outil qui accompagne tout ce processus avec l'IA — pas un gadget, un vrai produit avec comptes et historique.",
    solution:
      "Une application SaaS avec comptes utilisateurs : un chat IA spécialisé SEO (réponses en streaming), plus de 15 outils de génération (articles, landing pages, méta-données, FAQ, réseaux sociaux, emails), une analyse SEO en temps réel avec score, recherche de mots-clés et export multi-format.",
    technologies: ["Next.js", "React", "TypeScript", "Gemini 2.5 Flash", "IA générative"],
    learning:
      "Construire avec une IA, c'est surtout construire l'expérience autour : prompts, streaming, édition, export — le modèle n'est que la moitié du produit.",
    introduction:
      "SEO AI Writer est mon projet SaaS axé IA : une suite complète pour créer, optimiser et analyser du contenu SEO, propulsée par Gemini 2.5 Flash. Du chat expert à l'analyse en temps réel, tout tourne autour d'un objectif : être mieux positionné sur Google.",
    context:
      "L'IA générative transforme la création de contenu. Je voulais comprendre comment l'intégrer sérieusement dans un produit : streaming, états, historique, export — tout ce qui sépare une démo d'un outil utilisable tous les jours.",
    objective:
      "Permettre à n'importe qui de produire du contenu optimisé pour Google : de l'idée au texte structuré, avec une analyse SEO claire et actionnable.",
    features: [
      "Comptes : inscription, connexion",
      "Chat IA SEO expert : streaming, markdown, historique, recherche de conversations",
      "15+ outils : articles, landing pages, descriptions produits, méta-données, FAQ, réseaux sociaux, emails, Google Ads",
      "Analyse SEO temps réel : score sur 100, lisibilité, densité de mots-clés, E-E-A-T",
      "Recherche de mots-clés : longue traîne, intentions, questions fréquentes",
      "Réécriture intelligente : réécrire, corriger, résumer, humaniser",
      "Historique et favoris",
      "Export PDF, DOCX, Markdown, TXT",
      "Mode sombre et command palette (Ctrl+K)",
    ],
    difficulties: [
      "Orchestrer des réponses en streaming propres : états, erreurs, annulation",
      "Concevoir une analyse SEO lisible : un score n'a de valeur que si on comprend comment l'améliorer",
      "Garder la simplicité malgré un périmètre large : 15+ outils, une navigation qui reste claire",
    ],
    decisions: [
      {
        title: "Gemini 2.5 Flash comme moteur",
        detail:
          "Rapide et capable, avec un rapport qualité/latence adapté à un outil d'écriture en flux. Le choix du modèle est une décision produit autant que technique.",
      },
    ],
    learnings: [
      "Intégrer une API d'IA en conditions réelles : streaming, erreurs, quotas",
      "Le SEO lui-même : on apprend une discipline en construisant l'outil qui l'enseigne",
      "Les détails qui font un SaaS : favoris, historique, export, raccourcis clavier",
    ],
    demoUrl: "https://seo-ai-pied.vercel.app/",
    screenshots: [
      "/images/projects/seo-ai-writer-1.jpg",
      "/images/projects/seo-ai-writer-2.jpg",
    ],
  },
  {
    slug: "convertflow",
    title: "ConvertFlow",
    tagline:
      "Convertissez, compressez et optimisez tous vos fichiers en quelques secondes : 200+ formats, directement dans le navigateur.",
    year: "2026",
    category: "SaaS · Outil web",
    featured: false,
    size: "large",
    cover: "/images/projects/convertflow-1.jpg",
    problem:
      "Convertir un fichier devrait être simple : un PDF en image, une vidéo compressée, un document optimisé. Les outils existants sont souvent saturés de publicités, lents ou limités. Je voulais un outil rapide, propre et accessible.",
    solution:
      "Une plateforme web qui convertit, compresse et optimise plus de 200 formats — images, documents, audio, vidéo, archives — directement en ligne, avec conversion par lots, chiffrement SSL et aucune inscription requise pour les conversions de base.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Un bon outil SaaS tient dans une phrase : « convertissez vos fichiers, vite et sans friction ». Tout le reste sert cette promesse.",
    introduction:
      "ConvertFlow est un utilitaire web tout-en-un : convertir, compresser et optimiser des fichiers en quelques secondes, avec un support de plus de 200 formats — de l'image à la vidéo, du document à l'archive.",
    context:
      "Les convertisseurs en ligne sont légion, mais rarement agréables. Un produit utile et sobre est un excellent exercice : pas de contenu à inventer, juste un service qui doit marcher vite et bien.",
    objective:
      "Le chemin le plus court entre « j'ai un fichier » et « j'ai le bon format » — en gardant la confiance et la rapidité.",
    features: [
      "Conversion, compression et optimisation de fichiers",
      "Support de 200+ formats : images, documents, audio, vidéo, archives",
      "Conversion par lots",
      "Chiffrement SSL",
      "Aucune inscription requise pour les conversions de base",
      "Outils et tarifs distincts",
      "Interface multilingue et thème sombre",
    ],
    difficulties: [
      "Couvrir une grande variété de formats sans compromettre la rapidité",
      "Traiter des fichiers lourds dans une interface qui reste fluide",
      "Organiser 200+ formats en parcours simples et compréhensibles",
    ],
    decisions: [
      {
        title: "Sans inscription pour commencer",
        detail:
          "La valeur doit être visible avant de demander quoi que ce soit : les conversions de base sont ouvertes à tous. Une décision d'acquisition autant que de produit.",
      },
    ],
    learnings: [
      "Le traitement de fichiers côté web : formats, limites, sécurité",
      "Un outil utilitaire vit par sa vitesse",
      "Clarifier l'offre : gratuit vs payant, sans ambiguïté",
    ],
    demoUrl: "https://convertflow-saas.vercel.app/",
    screenshots: [
      "/images/projects/convertflow-1.jpg",
      "/images/projects/convertflow-2.jpg",
    ],
  },
  {
    slug: "arche-tech",
    title: "L'Arche Tech",
    tagline:
      "Le site d'une agence web premium : sites performants, SEO et automatisation, présentés avec une esthétique qui assume le code.",
    year: "2026",
    category: "Site vitrine · Agence",
    featured: false,
    size: "medium",
    cover: "/images/projects/arche-tech-1.jpg",
    problem:
      "Une agence doit prouver son niveau avant même le premier échange : le site est sa première démo. Il fallait une vitrine premium, technique et crédible, qui présente services, portfolio et processus sans noyer le message.",
    solution:
      "Un site one-page long et structuré : accueil avec terminal de code animé, services, technologies, portfolio, processus de travail, témoignages, FAQ et contact — dans un thème sombre pensé conversion (« Démarrer un projet »).",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Un site d'agence est un exercice de persuasion : chaque section répond à une objection du client potentiel.",
    introduction:
      "L'Arche Tech crée des expériences digitales qui font grandir le business. Le site met en scène ce positionnement avec une esthétique de développeur — jusqu'au bloc de code animé du hero.",
    context:
      "Le positionnement est premium et technique. Le site devait le prouver : typographie forte, thème sombre, détails soignés, et un parcours qui mène naturellement au contact.",
    objective:
      "Donner confiance, montrer des réalisations, et transformer l'intérêt en premier rendez-vous.",
    features: [
      "Hero avec terminal de code animé",
      "Services : développement, SEO, automatisation",
      "Présentation des technologies",
      "Portfolio de réalisations",
      "Processus de travail étape par étape",
      "Témoignages et FAQ",
      "Appels à l'action « Démarrer un projet »",
    ],
    difficulties: [
      "Rester crédible dans un univers technique sans noyer le message",
      "Structurer une page longue : services, portfolio, processus, preuve sociale",
      "Écrire des contenus d'agence qui convertissent",
    ],
    decisions: [
      {
        title: "Assumer l'esthétique de développeur",
        detail:
          "Le hero montre du vrai code (projet.tsx) : un choix de positionnement — on parle à des clients qui cherchent de la vraie compétence technique.",
      },
    ],
    learnings: [
      "La preuve sociale (portfolio, témoignages, FAQ) structure la confiance",
      "Un one-page long demande un fil narratif solide",
      "Le design au service de la conversion",
    ],
    demoUrl: "https://l-arche-tech.vercel.app/",
    screenshots: [
      "/images/projects/arche-tech-1.jpg",
      "/images/projects/arche-tech-2.jpg",
    ],
  },
  {
    slug: "digital-innovation",
    title: "Digital Innovation",
    tagline:
      "Le site d'une agence web & marketing digital de Cotonou : propulser entrepreneurs, TPE et PME dans l'ère digitale.",
    year: "2026",
    category: "Site vitrine · Agence",
    featured: false,
    size: "medium",
    cover: "/images/projects/digital-innovation-1.jpg",
    problem:
      "Une agence locale au Bénin devait présenter son offre à un public d'entrepreneurs et de PME : clair, rassurant, direct — avec des canaux de contact qui correspondent aux usages locaux (WhatsApp, réseaux sociaux).",
    solution:
      "Un site vitrine sombre aux accents turquoise : positionnement immédiat, chiffres clés, présentation des services, et contact direct via WhatsApp et réseaux sociaux.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "Le digital local a ses codes : être trouvé, être compris en dix secondes, être joignable.",
    introduction:
      "Digital Innovation accompagne entrepreneurs, TPE, PME et startups dans leur transformation numérique à Cotonou, au Bénin. Le site pose le positionnement en une phrase et ouvre tous les canaux de contact.",
    context:
      "Une agence qui aide les autres à exister en ligne doit d'abord incarner cette exigence pour elle-même.",
    objective:
      "Expliquer l'offre simplement, prouver l'expérience, et rendre le contact immédiat.",
    features: [
      "Positionnement clair : agence web & digital au Bénin",
      "Chiffres clés : projets réalisés, clients, années d'expérience",
      "Présentation des services",
      "Contact direct WhatsApp",
      "Liens réseaux sociaux : Facebook, Instagram, TikTok",
      "Appels à l'action « Nous contacter »",
    ],
    difficulties: [
      "Parler à deux publics (entrepreneurs non techniques et startups) sans jargon ni simplification excessive",
      "Installer la confiance envers une agence locale : preuve et transparence",
      "Concevoir pour des connexions et des appareils variés",
    ],
    decisions: [
      {
        title: "WhatsApp au premier plan",
        detail:
          "Le contact passe par WhatsApp : le site l'intègre comme canal principal, pas comme gadget. Le produit s'adapte aux usages, pas l'inverse.",
      },
    ],
    learnings: [
      "Un message clair vaut mieux qu'une page complexe",
      "Les réseaux sociaux font partie de l'identité d'une marque locale",
      "Concevoir léger et rapide",
    ],
    demoUrl: "https://digitalinnovationbj.vercel.app/",
    screenshots: [
      "/images/projects/digital-innovation-1.jpg",
      "/images/projects/digital-innovation-2.jpg",
    ],
  },
  {
    slug: "belle-odeur",
    title: "E.T.P.S Belle Odeur",
    tagline:
      "Une maison de parfumerie en ligne : sélection homme et femme, fiches soignées, commande en ligne ou par téléphone.",
    year: "2026",
    category: "E-commerce · Parfumerie",
    featured: false,
    size: "small",
    cover: "/images/projects/belle-odeur-1.jpg",
    problem:
      "Un parfumeur a besoin d'une boutique en ligne qui restitue un univers olfactif… visuellement : sobriété, élégance, photos magnifiées, et un achat simple — y compris pour une clientèle qui préfère commander par téléphone.",
    solution:
      "Une boutique e-commerce claire et raffinée : collections homme et femme, recherche, panier, thème clair/sombre, commande en ligne ou par téléphone — avec un bandeau de consentement cookies conforme.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learning:
      "L'e-commerce, c'est du détail : une fiche produit, une photo, un bouton — chaque pixel travaille la confiance.",
    introduction:
      "E.T.P.S Belle Odeur est une maison de parfumerie : une sélection de parfums pour homme et femme, pensée pour chaque personnalité. Le site prolonge l'expérience boutique avec sobriété et élégance.",
    context:
      "Un catalogue réduit mais soigné : mieux vaut quelques produits bien présentés qu'un catalogue indigeste.",
    objective:
      "Donner envie, informer clairement, et permettre de commander en ligne — ou par téléphone, sans friction.",
    features: [
      "Catalogue parfums homme et femme",
      "Boutique avec recherche et panier",
      "Fiches produits soignées",
      "Commande en ligne ou par téléphone",
      "Thème clair / sombre",
      "Consentement cookies conforme : accepter, refuser, personnaliser",
    ],
    difficulties: [
      "Restituer un univers olfactif avec des moyens visuels",
      "Un parcours d'achat simple pour un public parfois peu enclin au web",
      "Respecter les exigences légales : cookies, mentions, transparence",
    ],
    decisions: [
      {
        title: "Garder le téléphone",
        detail:
          "Une partie de la clientèle préfère commander par téléphone : plutôt que de l'imposer en ligne, le site affiche le numéro au bon endroit. Le produit s'adapte au client, pas l'inverse.",
      },
    ],
    learnings: [
      "La sobriété comme luxe",
      "Un e-commerce tient sur des détails : fiche, photo, bouton",
      "Conformité et confiance vont ensemble",
    ],
    demoUrl: "https://parfum-seven-sooty.vercel.app/",
    screenshots: [
      "/images/projects/belle-odeur-1.jpg",
      "/images/projects/belle-odeur-2.jpg",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
