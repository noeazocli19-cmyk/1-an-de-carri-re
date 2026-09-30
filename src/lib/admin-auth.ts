import { createHash, createHmac, timingSafeEqual } from "crypto";

/**
 * Authentification de l'espace d'administration (/admin).
 *
 * Modèle de sécurité :
 * — Mot de passe unique défini par la variable d'environnement ADMIN_PASSWORD
 *   (jamais stocké en clair dans le code). Comparaison en temps constant
 *   (sha256 + timingSafeEqual) pour éviter les attaques temporelles.
 * — Session = cookie httpOnly signé (HMAC-SHA256) : le client ne peut ni le
 *   lire, ni le modifier ; toute altération invalide la signature.
 * — Expiration 8 h, vérifiée à chaque requête serveur (page + API).
 * — Rate limiting sur le login : 5 tentatives / 15 min par IP (mémoire).
 * — Cookie : SameSite=Lax (protection CSRF sur les mutations POST),
 *   Secure en production.
 * — /admin et /api/admin/* sont noindex (metadata + X-Robots-Tag + robots.txt).
 */

export const ADMIN_COOKIE = "noe_admin_session";
/** Durée de vie de la session (secondes) */
export const SESSION_TTL_S = 60 * 60 * 8;

/* ------------------------------------------------------------------ */
/* Secret de signature                                                 */
/* ------------------------------------------------------------------ */

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  // Repli uniquement hors production — jamais en prod (voir README).
  if (process.env.NODE_ENV !== "production") {
    return `dev-only-${process.env.ADMIN_PASSWORD ?? "insecure"}`;
  }
  throw new Error(
    "ADMIN_SESSION_SECRET manquant : définis-le en production (openssl rand -base64 32)."
  );
}

/* ------------------------------------------------------------------ */
/* Vérification du mot de passe (temps constant)                       */
/* ------------------------------------------------------------------ */

function sha256(input: string): Buffer {
  return createHash("sha256").update(input, "utf8").digest();
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 8) {
    // Mot de passe non configuré ou trop faible : refuse tout login.
    return false;
  }
  // On compare les hachés : longueur identique garantie + pas de fuite de longueur.
  return timingSafeEqual(sha256(candidate), sha256(expected));
}

/* ------------------------------------------------------------------ */
/* Sessions signées (HMAC-SHA256)                                      */
/* ------------------------------------------------------------------ */

export function signSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({
      v: 1,
      iat: Date.now(),
      exp: Date.now() + SESSION_TTL_S * 1000,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(
  token: string | undefined | null
): boolean {
  if (!token) return false;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex <= 0) return false;

  const payload = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);

  const expected = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return (
      typeof data.exp === "number" &&
      data.exp > Date.now() &&
      data.v === 1
    );
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Rate limiting du login (en mémoire, par IP)                         */
/* ------------------------------------------------------------------ */

const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_ATTEMPTS = 5;

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterS: number;
};

export function checkLoginRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Nettoyage périodique des entrées expirées
  if (loginAttempts.size > 1000) {
    for (const [key, entry] of loginAttempts) {
      if (entry.resetAt <= now) loginAttempts.delete(key);
    }
  }

  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 0, resetAt: now + LOGIN_WINDOW_MS });
    return {
      allowed: true,
      remaining: LOGIN_MAX_ATTEMPTS - 1,
      retryAfterS: 0,
    };
  }

  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterS: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return {
    allowed: true,
    remaining: LOGIN_MAX_ATTEMPTS - entry.count - 1,
    retryAfterS: 0,
  };
}

export function registerFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

/** IP client (dérivée des en-têtes de proxy standards) */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "local";
}
