/**
 * Traitement de la vraie photo de Noé (fournie par lui-même).
 * Source : upload/noe-photo.png (1024x1536, portrait pleine hauteur)
 * Sortie : public/images/noe-portrait.jpg — version web optimisée (900px de large, JPEG mozjpeg q85)
 *
 * Ratio natif conservé (2:3) — les composants next/image déclarent width/height
 * proportionnels (ex. 600x900) pour éviter tout warning de ratio.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve(__dirname, "../upload/noe-photo.png");
const OUT_DIR = path.resolve(__dirname, "../public/images");

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const meta = await sharp(SRC).metadata();
  console.log(
    `Source : ${meta.width}x${meta.height} (${meta.format}) — ${Math.round(
      (meta.size ?? 0) / 1024
    )} Ko`
  );

  // Version web : 900px de large (net jusqu'à ~450px d'affichage en retina), ratio 2:3 conservé.
  const outPath = path.join(OUT_DIR, "noe-portrait.jpg");
  const info = await sharp(SRC)
    .resize({ width: 900 })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(outPath);

  console.log(
    `OK : ${outPath} — ${info.width}x${info.height} — ${Math.round(
      (info.size ?? 0) / 1024
    )} Ko`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
