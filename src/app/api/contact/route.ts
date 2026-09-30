import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * POST /api/contact — enregistre un message envoyé depuis le formulaire
 * de contact du portfolio dans la base de données.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères.").max(100),
  email: z.string().trim().email("Adresse email invalide.").max(200),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Requête invalide." },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides.";
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 422 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject && subject.length > 0 ? subject : null,
        message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] Erreur :", error);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
