"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Écran de connexion de l'espace d'administration.
 * Mot de passe unique (ADMIN_PASSWORD) — erreurs génériques, gestion du
 * rate limit (429) avec affichage du délai d'attente.
 */
export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        // Recharge la page serveur : la session valide affiche le dashboard
        router.refresh();
        return;
      }

      setError(
        data?.error ??
          "Connexion impossible. Vérifie le mot de passe et réessaie."
      );
      setPassword("");
    } catch {
      setError("Erreur réseau. Vérifie ta connexion et réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="surface rounded-2xl p-8 shadow-xl">
          {/* Marque */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-mark.png"
              alt="Logo NOÉ"
              width={64}
              height={64}
              priority
              className="h-12 w-12 object-contain"
              style={{ filter: "drop-shadow(0 0 14px rgba(34, 197, 94, 0.35))" }}
            />
            <h1 className="mt-4 text-xl font-semibold tracking-tight">
              Espace administrateur
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              Portfolio de Noé — accès privé
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Mot de passe</Label>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  autoFocus
                  required
                  disabled={loading}
                  className="pl-9"
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={loading || password.length === 0}
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Vérification…
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            Session sécurisée de 8 h · 5 tentatives maximum toutes les 15 min.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
