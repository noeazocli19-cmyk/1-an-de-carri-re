// Copie multiplateforme des assets statiques vers le build standalone.
// (remplace « cp -r », qui n'existe pas sur Windows — fonctionne partout).
import { cpSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");

// 1. Les assets compilés du client (JS/CSS) — requis par output: "standalone"
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), {
  recursive: true,
});

// 2. Le dossier public (images, logo, fichiers téléchargeables)
if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(standalone, "public"), {
    recursive: true,
  });
}

console.log("✓ Assets statiques copiés vers .next/standalone (static + public)");
