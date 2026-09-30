/**
 * Génère toutes les déclinaisons du logo NOÉ depuis le fichier officiel.
 * - icon.png / apple-icon.png : le "N" seul recadré (favicon)
 * - og-image.png : 1200x630 fond noir avec le logo complet centré
 * - logo-n.png : le N seul en 512 (réutilisation)
 */
import sharp from "sharp";

const SRC = "public/logo-noe.png";
const SIZE = 1254;

// Le "N" vert occupe approximativement cette zone (vérifiée visuellement)
// Crop carré 500x500 pour préserver un ratio 1:1
const N_CROP = { left: 380, top: 200, width: 500, height: 500 };

async function main() {
  // 1. Favicon "N" seul — recadré carré centré sur le N
  const nSquare = await sharp(SRC)
    .extract({
      left: N_CROP.left,
      top: N_CROP.top,
      width: N_CROP.width,
      height: N_CROP.height,
    })
    .toBuffer();
  await sharp(nSquare)
    .resize(512, 512, { fit: "contain", background: "#0a0a0a" })
    .flatten({ background: "#0a0a0a" })
    .png()
    .toFile("public/logo-n.png");
  await sharp(nSquare)
    .resize(512, 512, { fit: "contain", background: "#0a0a0a" })
    .flatten({ background: "#0a0a0a" })
    .png()
    .toFile("src/app/icon.png");
  await sharp(nSquare)
    .resize(180, 180, { fit: "contain", background: "#0a0a0a" })
    .flatten({ background: "#0a0a0a" })
    .png()
    .toFile("src/app/apple-icon.png");

  // 2. OG image 1200x630 — logo complet centré sur fond noir
  const logoResized = await sharp(SRC)
    .resize(560, 560, { fit: "inside" })
    .toBuffer();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: "#0a0a0a",
    },
  })
    .composite([{ input: logoResized, gravity: "center" }])
    .png()
    .toFile("public/og-image.png");

  console.log("✅ Icônes générées : icon.png, apple-icon.png, logo-n.png, og-image.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
