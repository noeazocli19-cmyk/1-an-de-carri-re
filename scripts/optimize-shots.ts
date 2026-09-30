/**
 * Convertit les captures d'écran PNG (1440x900) en JPEG optimisés
 * et les renomme selon les slugs finaux des projets.
 * Supprime ensuite les anciens placeholders.
 */
import sharp from "sharp";
import { unlinkSync, existsSync } from "fs";

const MAP: Array<[string, string]> = [
  ["artisan-1", "finda-1"],
  ["artisan-2", "finda-2"],
  ["palette-1", "hauts-de-palette-1"],
  ["palette-2", "hauts-de-palette-2"],
  ["zstore-1", "zstore-benin-1"],
  ["zstore-2", "zstore-benin-2"],
  ["seo-ai-1", "seo-ai-writer-1"],
  ["seo-ai-2", "seo-ai-writer-2"],
  ["convertflow-1", "convertflow-1"],
  ["convertflow-2", "convertflow-2"],
  ["arche-tech-1", "arche-tech-1"],
  ["arche-tech-2", "arche-tech-2"],
  ["digital-innovation-1", "digital-innovation-1"],
  ["digital-innovation-2", "digital-innovation-2"],
  ["parfum-1", "belle-odeur-1"],
  ["parfum-2", "belle-odeur-2"],
];

const OLD_FILES = [
  "api-bibliotheque.png",
  "app-meteo.png",
  "blog-nextjs.png",
  "dashboard-saas.png",
  "lien-court.png",
  "notes-collab.png",
  "premier-portfolio.png",
  "site-vitrine.png",
  "task-manager.png",
];

async function main() {
  for (const [src, dest] of MAP) {
    const srcPath = `public/images/projects/${src}.png`;
    const destPath = `public/images/projects/${dest}.jpg`;
    if (!existsSync(srcPath)) {
      console.warn(`⚠️ introuvable: ${srcPath}`);
      continue;
    }
    await sharp(srcPath).jpeg({ quality: 82, mozjpeg: true }).toFile(destPath);
    if (src !== dest) unlinkSync(srcPath);
    console.log(`✅ ${dest}.jpg`);
  }
  for (const old of OLD_FILES) {
    const p = `public/images/projects/${old}`;
    if (existsSync(p)) {
      unlinkSync(p);
      console.log(`🗑️  ${old}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
