import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_TTL_S,
  checkLoginRateLimit,
  clearLoginAttempts,
  clientIp,
  registerFailedLogin,
  signSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

/**
 * POST /api/admin/login — ouvre une session administrateur.
 * Corps : { password: string }
 *
 * Sécurité : rate limit 5 tentatives / 15 min par IP, comparaison en temps
 * constant, message d'erreur générique (pas d'énumération), cookie httpOnly
 * signé SameSite=Lax, Secure en production.
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);

    // 1. Rate limiting avant toute autre opération
    const limit = checkLoginRateLimit(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Trop de tentatives. Réessaie dans ${Math.ceil(
            limit.retryAfterS / 60
          )} minute(s).`,
        },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterS) } }
      );
    }

    // 2. Corps de la requête
    const body = await request.json().catch(() => null);
    const password =
      typeof body?.password === "string" ? body.password : undefined;

    if (!password) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe requis." },
        { status: 400 }
      );
    }

    // 3. Vérification (temps constant)
    if (!verifyAdminPassword(password)) {
      registerFailedLogin(ip);
      // Petite pause pour casser les attaques automatisées à haute fréquence
      await new Promise((resolve) => setTimeout(resolve, 400));
      return NextResponse.json(
        { ok: false, error: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    // 4. Succès : session signée + remise à zéro du compteur
    clearLoginAttempts(ip);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, signSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_S,
    });
    return response;
  } catch (error) {
    console.error("[/api/admin/login] Erreur :", error);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
