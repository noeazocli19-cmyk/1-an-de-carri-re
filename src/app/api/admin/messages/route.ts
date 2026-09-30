import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { db } from "@/lib/db";

/**
 * GET /api/admin/messages — liste des messages du formulaire de contact
 * (réservé à la session administrateur).
 *
 * Le volume d'un portfolio est faible : on renvoie les 500 derniers messages
 * et les statistiques ; filtrage, recherche, tri et pagination sont faits
 * côté client (dashboard) — rapide et compatible SQLite comme PostgreSQL.
 */
export async function GET(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);

  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { ok: false, error: "Non autorisé." },
      { status: 401 }
    );
  }

  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    const now = Date.now();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const stats = {
      total: messages.length,
      unread: messages.filter((m) => !m.read && !m.archived).length,
      today: messages.filter((m) => m.createdAt >= startOfDay).length,
      week: messages.filter((m) => m.createdAt.getTime() >= weekAgo).length,
    };

    return NextResponse.json({ ok: true, messages, stats });
  } catch (error) {
    console.error("[/api/admin/messages] Erreur :", error);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
