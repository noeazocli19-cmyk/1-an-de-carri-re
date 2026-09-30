import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://noe.dev"),
  title: {
    default: "Noé — Développeur Full-Stack · Créateur de produits numériques",
    template: "%s — Noé",
  },
  description:
    "Portfolio de Noé, développeur Full-Stack et créateur de produits numériques. 1 an de parcours, 9+ projets réalisés, spécialisation backend autour de NestJS. Je construis des applications web, j'expérimente autour des SaaS et je partage ce que j'apprends.",
  keywords: [
    "Noé",
    "développeur full-stack",
    "NestJS",
    "Next.js",
    "TypeScript",
    "backend",
    "SaaS",
    "portfolio développeur",
    "produits numériques",
  ],
  authors: [{ name: "Noé" }],
  creator: "Noé",
  openGraph: {
    title: "Noé — Développeur Full-Stack · Créateur de produits numériques",
    description:
      "1 an de parcours · 9+ projets réalisés. Je construis des applications web, j'expérimente autour des SaaS et me spécialise autour de NestJS.",
    url: "https://noe.dev",
    siteName: "Noé — Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noé — Développeur Full-Stack · Créateur de produits numériques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noé — Développeur Full-Stack · Créateur de produits numériques",
    description:
      "1 an de parcours · 9+ projets réalisés. Spécialisation backend NestJS.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Noé",
  jobTitle: "Développeur Full-Stack · Créateur de produits numériques",
  description:
    "Développeur Full-Stack, 1 an de parcours, 9+ projets réalisés, spécialisation backend autour de NestJS.",
  knowsAbout: [
    "NestJS",
    "TypeScript",
    "Next.js",
    "React",
    "Prisma",
    "PostgreSQL",
  ],
  email: "mailto:noeazocli19@gmail.com",
  telephone: "+229 01 28 25 08 95",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BJ",
  },
  sameAs: [
    "https://github.com/noeazocli19-cmyk",
    "https://www.linkedin.com/in/digitaux-aze-3b951a410",
    "https://www.facebook.com/profile.php?id=61590924623788",
  ],
  url: "https://noe.dev",
};

/**
 * Anti-flash de l'intro : exécuté avant le premier rendu.
 * — Intro déjà vue pendant la session → `intro-done` (le splash est masqué en CSS).
 * — Première visite → `intro-pending` (le splash est affiché, scroll verrouillé).
 */
const introScript = `(function(){try{if(sessionStorage.getItem("noe-intro-v1")==="1"){document.documentElement.classList.add("intro-done")}else{document.documentElement.classList.add("intro-pending")}}catch(e){document.documentElement.classList.add("intro-pending")}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
