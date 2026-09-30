import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { db } from "@/lib/db";

/**
 * PATCH /api/admin/messages/[id] — met à jour le statut d'un message
 * (lu / non lu, archivé / désarchivé).
 * DELETE /api/admin/messages/[id] — supprime définitivement un message.
 * Réservés à la session administrateur.
 */

const patchSchema = z.object({
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});

function isAuthed(request: Request): boolean {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);

  return verifySessionToken(token);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(request)) {
    return NextResponse.json(
      { ok: false, error: "Non autorisé." },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Données invalides." },
      { status: 422 }
    );
  }

  const data: { read?: boolean; archived?: boolean } = {};
  if (typeof parsed.data.read === "boolean") data.read = parsed.data.read;
  if (typeof parsed.data.archived === "boolean")
    data.archived = parsed.data.archived;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Aucune modification fournie." },
      { status: 422 }
    );
  }

  try {
    const updated = await db.contactMessage.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, message: updated });
  } catch (error) {
    console.error("[/api/admin/messages/[id]] PATCH Erreur :", error);
    return NextResponse.json(
      { ok: false, error: "Message introuvable ou erreur serveur." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(request)) {
    return NextResponse.json(
      { ok: false, error: "Non autorisé." },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/admin/messages/[id]] DELETE Erreur :", error);
    return NextResponse.json(
      { ok: false, error: "Message introuvable ou erreur serveur." },
      { status: 500 }
    );
  }
}
