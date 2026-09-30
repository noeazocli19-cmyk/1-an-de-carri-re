# Portfolio de Noé — Développeur Full-Stack · Créateur de produits numériques

Portfolio professionnel personnel : présentation, projets réels, parcours,
notes techniques et formulaire de contact — avec **espace d'administration
sécurisé** pour lire et gérer les messages reçus.

![Stack](https://img.shields.io/badge/Next.js_16-App_Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220)

---

## ✨ Fonctionnalités

- **Portfolio mono-page (SPA)** : Accueil, À propos, Parcours (timeline animée),
  Projets (8 projets réels avec captures d'écran + pages détaillées), Notes,
  Contact — navigation par vues avec transitions Framer Motion.
- **Animation d'intro** : logo animé + écran de chargement à la première
  visite de chaque session (puis rideau qui lève sur le portfolio).
- **Thème sombre / clair** commutable, choix persistant (localStorage),
  sans flash au chargement.
- **Navigation mobile en bas** de l'écran (libellés texte, safe-area iOS).
- **Formulaire de contact** : validation Zod, enregistrement en base.
- **Espace admin `/admin`** : dashboard sécurisé des messages
  (stats, recherche, filtres, lu/non lu, archivage, suppression, réponse).
- **Honnêteté** : 1 an de parcours, 9+ projets — aucune donnée inventée.
- **Accessibilité** : HTML sémantique, ARIA, `prefers-reduced-motion` respecté.

---

## 🧰 Stack technique

| Domaine | Choix |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript 5 |
| Style | Tailwind CSS 4 · shadcn/ui · Lucide icons |
| Animations | Framer Motion |
| Base de données | PostgreSQL (**Neon**) via Prisma ORM |
| Gestionnaire de paquets | **pnpm 10** |
| Déploiement | Vercel |

---

## 🚀 Démarrage rapide (pnpm)

```bash
# 0. Prérequis : Node.js 20+ et pnpm 10
corepack enable          # active pnpm (version épinglée par package.json)

# 1. Installer les dépendances (génère aussi le client Prisma)
pnpm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# → remplis DATABASE_URL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET (voir plus bas)

# 3. Créer / synchroniser les tables
pnpm db:push

# 4. Lancer en développement
pnpm dev                 # → http://localhost:3000
```

Build de production :

```bash
pnpm build               # next build (sortie standalone)
pnpm start               # node .next/standalone/server.js
```

---

## 🗄️ Base de données Neon (PostgreSQL)

Le projet est prêt pour **[Neon](https://neon.tech)** (PostgreSQL serverless).

### 1. Récupérer tes deux URLs chez Neon

Dans la console Neon → ton projet → **Connection string** :

- **URL « pooled »** (contient `-pooler`) → pour **l'exécution** du site
  (Vercel / production) : pooling de connexions serverless.
- **URL directe** (sans `-pooler`) → pour les **commandes de migration**
  (`db push`, `migrate`).

### 2. Configurer `.env`

```bash
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require"
```

> 💡 Pour lancer `pnpm db:push` localement, mets temporairement l'URL **directe**
> (sans `-pooler`) dans `DATABASE_URL`, puis remets l'URL pooled pour le runtime.

### 3. Basculer le schéma Prisma sur PostgreSQL

Le dépôt contient deux schémas identiques (mêmes modèles) :

- `prisma/schema.prisma` → SQLite (développement local sans serveur)
- `prisma/schema.postgres.prisma` → **PostgreSQL / Neon (production)**

Pour Neon, il suffit de remplacer le contenu de `prisma/schema.prisma` par
celui de `schema.postgres.prisma` (ou de changer une seule ligne :
`provider = "sqlite"` → `provider = "postgresql"`), puis :

```bash
pnpm db:push        # crée la table ContactMessage dans Neon
```

### Scripts base de données

| Commande | Rôle |
|---|---|
| `pnpm db:push` | Synchronise le schéma avec la base (SQLite local ou Neon selon le provider) |
| `pnpm db:generate` | (Re)génère le client Prisma |
| `pnpm db:push:pg` | `db push` avec le schéma PostgreSQL (sans changer schema.prisma) |
| `pnpm db:generate:pg` | Génère le client depuis le schéma PostgreSQL |
| `pnpm db:migrate` | Migrations en mode dev |

---

## 🔐 Espace d'administration (`/admin`)

Dashboard privé pour gérer les **messages du formulaire de contact** :
statistiques (total / non lus / aujourd'hui / 7 jours), recherche plein texte,
filtres (Tous · Non lus · Lus · Archivés), lecture avec marquage automatique,
réponse par email, archivage et suppression (avec confirmation).

### Sécurité mise en place

- **Mot de passe** via variable d'environnement `ADMIN_PASSWORD`
  (jamais dans le code). Comparaison **en temps constant**
  (sha256 + `timingSafeEqual`) — insensible aux attaques temporelles.
- **Session** = cookie `httpOnly` **signé HMAC-SHA256** (altération impossible),
  `SameSite=Lax` (protection CSRF), `Secure` en production, **expiration 8 h**.
- **Rate limiting** : 5 tentatives de connexion / 15 min par IP, puis blocage.
- **Non-indexation** : `noindex` (metadata + en-têtes `X-Robots-Tag`),
  `robots.txt`, `X-Frame-Options: DENY` (anti-clickjacking),
  réponses API en `Cache-Control: no-store`.
- **API protégées** : toute route `/api/admin/*` vérifie la session côté serveur.

### Utilisation

1. Ouvre **`/admin`** (URL non liée depuis le site public).
2. Saisis le mot de passe défini dans `ADMIN_PASSWORD`.
3. Gère tes messages. Bouton **Déconnexion** pour clore la session.

> ⚠️ **Avant la mise en ligne** : choisis un mot de passe fort et change-le
> dans les variables d'environnement de Vercel. La valeur de démonstration
> du `.env` local ne doit jamais partir en production.

### Variables d'environnement

| Variable | Rôle | Exemple |
|---|---|---|
| `DATABASE_URL` | Connexion PostgreSQL (Neon) ou SQLite local | `postgresql://…?sslmode=require` |
| `ADMIN_PASSWORD` | Mot de passe du dashboard `/admin` (min. 8 caractères) | `un-mot-de-passe-fort` |
| `ADMIN_SESSION_SECRET` | Clé de signature des sessions (min. 16 caractères) | voir commande ci-dessous |

---

## ☁️ Déploiement sur Vercel

1. Pousse le code sur **GitHub**.
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importe le repo.
3. Variables d'environnement (Settings → Environment Variables) :
   - `DATABASE_URL` → **URL pooled Neon**
   - `ADMIN_PASSWORD` → ton mot de passe fort
   - `ADMIN_SESSION_SECRET` → voir commande ci-dessous
4. Déploie. Vercel exécute `pnpm install` + `next build` automatiquement
   (`postinstall` génère le client Prisma).
5. (Optionnel) Branche ton **nom de domaine** dans Settings → Domains.

> 🔑 **Générer `ADMIN_SESSION_SECRET`** :
> - macOS / Linux : `openssl rand -base64 32`
> - **Windows (PowerShell)** : `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

> Pour créer les tables sur Neon depuis ta machine :
> mets l'URL **directe** dans `.env` puis `pnpm db:push`.

---

## 📁 Structure du projet

```
├── prisma/
│   ├── schema.prisma              # Schéma SQLite (dev local)
│   ├── schema.postgres.prisma     # Schéma PostgreSQL (Neon / prod)
├── public/
│   ├── images/                    # Portrait + captures d'écran des projets
│   ├── logo-mark.png / logo-full.png
│   ├── cv-noe.pdf                 # CV téléchargeable
│   └── robots.txt                 # /admin non indexé
├── src/
│   ├── app/
│   │   ├── page.tsx               # Portfolio (SPA, route unique)
│   │   ├── admin/page.tsx         # Espace admin (session protégée)
│   │   ├── api/contact/route.ts   # Réception des messages du formulaire
│   │   └── api/admin/             # login · logout · messages (GET/PATCH/DELETE)
│   ├── components/
│   │   ├── admin/                 # Login + Dashboard
│   │   ├── portfolio/             # Shell SPA + IntroSplash + contexte
│   │   ├── layout/                # Navigation + MobileTabBar + Footer
│   │   ├── home/ · projects/ · about/ · parcours/ · notes/ · contact/
│   │   └── shared/                # ThemeProvider, Reveal, SectionHeading…
│   ├── data/                      # projets, parcours, notes, socials, site
│   ├── lib/                       # db (Prisma) · admin-auth (sécurité)
│   └── types/
├── .env.example                   # Modèle de configuration
└── package.json                   # Scripts pnpm
```

---

## 🎨 Personnalisation rapide

- **Coordonnées / liens** : `src/data/site.ts` et `src/data/socials.ts`
- **Projets** : `src/data/projects.ts`
- **Parcours & notes** : `src/data/parcours.ts` · `src/data/notes.ts`
- **Couleurs / thèmes** : `src/app/globals.css` (tokens `.dark` et `:root`)
- **CV** : `public/cv-noe.pdf`

---

## 📄 Licence

Projet personnel — © 2026 Noé. Tous droits réservés.
