/**
 * Crée des versions transparentes du logo NOÉ :
 * - clé de luminance (alpha = canal max)
 * - seuil avec rampe douce pour éliminer le bruit du fond (alpha 1-30 → 0)
 * Résultat : fond parfaitement transparent, bords du logo préservés.
 */
import sharp from "sharp";

// Le "N" vert occupe approximativement cette zone (vérifiée visuellement)
// Crop carré 500x500 pour préserver un ratio 1:1 (requis par next/image)
const N_CROP = { left: 380, top: 200, width: 500, height: 500 };

const NOISE_CUTOFF = 28; // en dessous : considéré comme fond
const RAMP_END = 90; // fin de la rampe : alpha plein conservé au-delà

async function makeTransparent(input: Buffer, out: string, width?: number) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const outBuf = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    let alpha = Math.max(r, g, b);
    if (alpha <= NOISE_CUTOFF) {
      alpha = 0;
    } else if (alpha < RAMP_END) {
      // Rampe douce : évite les contours crayeux
      alpha = Math.round(((alpha - NOISE_CUTOFF) / (RAMP_END - NOISE_CUTOFF)) * 255);
    }
    outBuf[i] = r;
    outBuf[i + 1] = g;
    outBuf[i + 2] = b;
    outBuf[i + 3] = alpha;
  }

  let pipeline = sharp(outBuf, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
  if (width) {
    pipeline = pipeline.resize({ width });
  }
  await pipeline.png({ compressionLevel: 9 }).toFile(out);
  console.log(`✅ ${out}`);
}

async function main() {
  const full = await sharp("public/logo-noe.png").toBuffer();
  await makeTransparent(full, "public/logo-noe-transparent.png", 900);

  const nMark = await sharp("public/logo-noe.png").extract(N_CROP).toBuffer();
  await makeTransparent(nMark, "public/logo-n-transparent.png", 512);

  console.log("🎉 Logos transparents régénérés sans bruit de fond");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
