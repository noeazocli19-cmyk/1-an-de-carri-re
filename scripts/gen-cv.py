#!/usr/bin/env python3
"""Génère le CV PDF de Noé — sobre, éditorial, honnête."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

GREEN = HexColor("#16A34A")
INK = HexColor("#111111")
GRAY = HexColor("#808080")
LIGHT = HexColor("#F5F5F5")

W, H = A4
M = 18 * mm  # marge

c = canvas.Canvas("/home/z/my-project/public/cv-noe.pdf", pagesize=A4)
c.setTitle("CV — Noé, Développeur Full-Stack")


def text(x, y, s, size=10, color=INK, bold=False):
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.setFillColor(color)
    c.drawString(x, y, s)


def right_text(x_right, y, s, size=10, color=GRAY, bold=False):
    c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
    c.setFillColor(color)
    c.drawRightString(x_right, y, s)


def wrap(s, width, size=10, bold=False):
    from reportlab.pdfbase.pdfmetrics import stringWidth

    font = "Helvetica-Bold" if bold else "Helvetica"
    words, lines, current = s.split(), [], ""
    for w in words:
        t = (current + " " + w).strip()
        if stringWidth(t, font, size) <= width:
            current = t
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


y = H - M

# ---- En-tête
text(M, y, "NOÉ", 26, INK, bold=True)
dot_r = 2.2
name_w = c.stringWidth("NOÉ", "Helvetica-Bold", 26)
c.setFillColor(GREEN)
c.circle(M + name_w + 8, y + 4, dot_r, stroke=0, fill=1)
y -= 8

text(M, y, "Développeur Full-Stack  ·  Créateur de produits numériques", 11.5, GRAY)
y -= 16

text(M, y, "1 an de parcours  ·  9+ projets réalisés  ·  Spécialisation NestJS", 10, GREEN, bold=True)
y -= 10

contact_line = "noeazocli19@gmail.com   ·   +229 01 28 25 08 95   ·   github.com/noeazocli19-cmyk"
right_text(W - M, H - M, contact_line, 9, GRAY)

# ---- Profil
y -= 14
c.setFillColor(GREEN)
c.rect(M, y - 1, 14 * mm, 1.6, stroke=0, fill=1)
y -= 14
text(M, y, "PROFIL", 11, INK, bold=True)
y -= 14
for line in wrap(
    "Développeur full-stack en première année de parcours (depuis octobre 2025). "
    "Je construis des applications web et j'expérimente autour des SaaS, avec une spécialisation "
    "backend autour de NestJS. J'apprends en construisant : chaque projet du portfolio est documenté, "
    "de son problème initial jusqu'à ses apprentissages.",
    W - 2 * M, 9.5,
):
    text(M, y, line, 9.5, INK)
    y -= 12.5

# ---- Parcours
y -= 8
text(M, y, "PARCOURS", 11, INK, bold=True)
y -= 14
steps = [
    ("Oct. 2025", "Début de la formation — HTML, CSS, JavaScript. Fondations solides, apprentissage par la pratique."),
    ("Nov. 2025", "JavaScript en profondeur : logique, fonctionnement, raisonnement."),
    ("Déc. 2025", "Premières interfaces réelles et premiers projets concrets menés jusqu'à la mise en ligne."),
    ("Jan. 2026", "Découverte de React — plusieurs interfaces et sites vitrines construits."),
    ("2026", "PHP puis backend ; TypeScript, Next.js, Prisma, PostgreSQL ; spécialisation NestJS."),
    ("Aujourd'hui", "Applications web complètes, expérimentation SaaS, consolidation de la spécialisation NestJS."),
]
for period, desc in steps:
    c.setFillColor(GREEN if period == "Aujourd'hui" else INK)
    c.circle(M + 2, y + 3, 1.6, stroke=0, fill=1)
    text(M + 9, y, period, 9.5, GREEN if period == "Aujourd'hui" else INK, bold=True)
    x_desc = M + 9 + 62
    for i, line in enumerate(wrap(desc, W - M - x_desc, 9.5)):
        text(x_desc, y - i * 12, line, 9.5, GRAY)
    y -= max(12, 12 * len(wrap(desc, W - M - x_desc, 9.5))) + 1

# ---- Projets (sélection)
y -= 8
text(M, y, "PROJETS — RÉALISATIONS EN LIGNE", 11, INK, bold=True)
y -= 14
projects = [
    ("FINDA — Plateforme d'artisans", "Next.js · TypeScript · Tailwind CSS",
     "Mon premier projet en ligne : mise en relation clients/artisans (recherche, catégories, comptes)."),
    ("SEO AI Writer — SaaS IA", "Next.js · TypeScript · Gemini 2.5 Flash",
     "Suite SEO : chat IA en streaming, 15+ outils de génération, analyse SEO temps réel."),
    ("ConvertFlow — SaaS utilitaire", "Next.js · TypeScript",
     "Conversion, compression et optimisation de fichiers : 200+ formats, conversion par lots."),
    ("Les Hauts de Palette — E-commerce", "Next.js · TypeScript · Tailwind CSS",
     "Site éditorial et commande en ligne d'une maison viticole bordelaise depuis 1859."),
    ("Zstore Bénin — Boutique en ligne", "Next.js · TypeScript · Tailwind CSS",
     "Vitrine marchande d'un vrai commerce de Cotonou : catalogue, commande WhatsApp."),
    ("Autres réalisations", "HTML · CSS · JavaScript · React",
     "L'Arche Tech, Digital Innovation, E.T.P.S Belle Odeur (vitrines & e-commerce) — et ce portfolio."),
]
for title, stack, desc in projects:
    text(M, y, title, 10, INK, bold=True)
    right_text(W - M, y, stack, 8.5, GREEN)
    y -= 11.5
    for line in wrap(desc, W - 2 * M, 9):
        text(M + 2, y, line, 9, GRAY)
        y -= 11
    y -= 2.5

# ---- Stack
y -= 4
text(M, y, "STACK", 11, INK, bold=True)
y -= 13
text(M, y, "Langages :", 9.5, GRAY, bold=True)
text(M + 55, y, "TypeScript · JavaScript · PHP (bases)", 9.5, INK)
y -= 12
text(M, y, "Backend :", 9.5, GRAY, bold=True)
text(M + 55, y, "NestJS · API REST · Auth JWT · validation · Prisma", 9.5, INK)
y -= 12
text(M, y, "Front :", 9.5, GRAY, bold=True)
text(M + 55, y, "React · Next.js · Tailwind CSS", 9.5, INK)
y -= 12
text(M, y, "Données :", 9.5, GRAY, bold=True)
text(M + 55, y, "PostgreSQL · Prisma ORM · modélisation relationnelle", 9.5, INK)
y -= 12
text(M, y, "Outils :", 9.5, GRAY, bold=True)
text(M + 55, y, "Git · GitHub · VS Code · Figma (bases)", 9.5, INK)

# ---- Direction & contact
y -= 20
c.setFillColor(LIGHT)
c.roundRect(M, y - 34, W - 2 * M, 40, 6, stroke=0, fill=1)
text(M + 10, y - 10, "DIRECTION", 9, GREEN, bold=True)
text(M + 10, y - 22, "Construire des produits utiles — applications, SaaS, backend NestJS.", 9.5, INK)
text(M + 10, y - 32, "Portfolio détaillé avec les 8 projets en ligne : noe.dev  —  toute la documentation y est disponible.", 9, GRAY)

# ---- Pied
text(M, 14 * mm, "CV mis à jour en janvier 2026 — conçu et développé par Noé.", 8, GRAY)

c.save()
print("CV généré : /home/z/my-project/public/cv-noe.pdf")
