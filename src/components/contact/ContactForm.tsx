"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Formulaire de contact contrôlé (nom, email, sujet, message).
 * Envoi en POST JSON vers /api/contact ; états : idle, loading, success, error.
 * Champs requis : nom, email, message — labels explicites et aria-required.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [status, setStatus] = useState<FormStatus>("idle");

  const loading = status === "loading";

  const update =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });
      if (!response.ok) {
        throw new Error(`Réponse invalide : ${response.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center py-10 text-center"
      >
        <CircleCheck aria-hidden="true" className="h-10 w-10 text-primary" />
        <h3 className="mt-4 font-serif text-2xl text-foreground">
          Message envoyé !
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Merci pour votre message — je vous réponds au plus vite.
        </p>
        <Button variant="outline" className="mt-6" onClick={resetForm}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      {status === "error" ? (
        <p
          role="alert"
          className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          Une erreur est survenue. Réessayez, ou écrivez-moi directement par
          email.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="nom" className="text-sm font-medium">
            Nom*
          </Label>
          <Input
            id="nom"
            name="nom"
            required
            aria-required="true"
            autoComplete="name"
            placeholder="Votre nom"
            value={values.name}
            onChange={update("name")}
            disabled={loading}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email*
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            placeholder="vous@exemple.com"
            value={values.email}
            onChange={update("email")}
            disabled={loading}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="sujet" className="text-sm font-medium">
            Sujet
            <span className="text-xs font-normal text-muted-foreground">
              (optionnel)
            </span>
          </Label>
          <Input
            id="sujet"
            name="sujet"
            placeholder="De quoi souhaitez-vous parler ?"
            value={values.subject}
            onChange={update("subject")}
            disabled={loading}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium">
            Message*
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-required="true"
            placeholder="Parlez-moi de votre projet, de votre question…"
            value={values.message}
            onChange={update("message")}
            disabled={loading}
            className="mt-1.5"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              Envoi en cours…
            </>
          ) : (
            "Envoyer le message"
          )}
        </Button>
      </form>
    </div>
  );
}
