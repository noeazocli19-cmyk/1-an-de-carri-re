"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  ArchiveRestore,
  CalendarDays,
  ChevronDown,
  Clock,
  Download,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
};

type Stats = {
  total: number;
  unread: number;
  today: number;
  week: number;
};

type StatusFilter = "all" | "unread" | "read" | "archived";

const PAGE_SIZE = 10;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/* ------------------------------------------------------------------ */
/* Composant                                                           */
/* ------------------------------------------------------------------ */

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    unread: 0,
    today: 0,
    week: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openId, setOpenId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  /* Chargement ------------------------------------------------------ */

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (res.status === 401) {
        // Session expirée → retour au login
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? "Erreur de chargement.");
      }
      setMessages(data.messages as ContactMessage[]);
      setStats(data.stats as Stats);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur de chargement. Réessaie plus tard."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  /* Actions --------------------------------------------------------- */

  const patchMessage = useCallback(
    async (id: string, patch: { read?: boolean; archived?: boolean }) => {
      setBusyId(id);
      try {
        const res = await fetch(`/api/admin/messages/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error ?? "Action impossible.");
        }
        const updated = data.message as ContactMessage;
        setMessages((current) =>
          current.map((m) => (m.id === id ? updated : m))
        );
        return updated;
      } catch (err) {
        toast({
          title: "Action impossible",
          description:
            err instanceof Error ? err.message : "Réessaie plus tard.",
          variant: "destructive",
        });
        return null;
      } finally {
        setBusyId(null);
      }
    },
    [toast]
  );

  const toggleOpen = useCallback(
    async (message: ContactMessage) => {
      const next = openId === message.id ? null : message.id;
      setOpenId(next);
      // Marquer comme lu à l'ouverture
      if (next === message.id && !message.read) {
        const updated = await patchMessage(message.id, { read: true });
        if (updated) {
          setStats((s) => ({ ...s, unread: Math.max(0, s.unread - 1) }));
        }
      }
    },
    [openId, patchMessage]
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setBusyId(target.id);
    try {
      const res = await fetch(`/api/admin/messages/${target.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? "Suppression impossible.");
      }
      setMessages((current) => current.filter((m) => m.id !== target.id));
      setStats((s) => ({
        ...s,
        total: Math.max(0, s.total - 1),
        unread: !target.read && !target.archived
          ? Math.max(0, s.unread - 1)
          : s.unread,
      }));
      toast({ title: "Message supprimé", description: target.email });
    } catch (err) {
      toast({
        title: "Suppression impossible",
        description:
          err instanceof Error ? err.message : "Réessaie plus tard.",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  }, [deleteTarget, toast]);

  const logout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.refresh();
    }
  }, [router]);

  /* Filtrage / recherche (côté client) ------------------------------ */

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = messages.filter((m) => {
      if (filter === "unread" && (m.read || m.archived)) return false;
      if (filter === "read" && (!m.read || m.archived)) return false;
      if (filter === "archived" && !m.archived) return false;
      if (filter === "all" && m.archived) return false;

      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject ?? "").toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });

    // Tri par date décroissante (sécurité, la base trie déjà mais le
    // marquage lu/archivé peut réordonner visuellement)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [messages, filter, query]);

  const resetPaging = useCallback(() => setVisibleCount(PAGE_SIZE), []);

  /* ---------------------------------------------------------------- */

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      {/* En-tête */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-9 w-9 object-contain"
            style={{ filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.35))" }}
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Administration
            </h1>
            <p className="text-sm text-muted-foreground">
              Messages du portfolio — Noé
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/download/portfolio-noe.zip"
            download="portfolio-noe.zip"
            aria-label="Télécharger l'archive complète du projet (zip)"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Projet .zip</span>
            <span className="sm:hidden">.zip</span>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw
              className={cn("h-4 w-4", loading && "animate-spin")}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Rafraîchir</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            disabled={loggingOut}
            className="gap-2"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <LogOut className="h-4 w-4" aria-hidden="true" />
            )}
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Statistiques */}
      <section
        aria-label="Statistiques"
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <StatCard icon={Inbox} label="Total" value={stats.total} />
        <StatCard
          icon={MailOpen}
          label="Non lus"
          value={stats.unread}
          highlight={stats.unread > 0}
        />
        <StatCard icon={Clock} label="Aujourd'hui" value={stats.today} />
        <StatCard icon={CalendarDays} label="7 derniers jours" value={stats.week} />
      </section>

      {/* Barre d'outils */}
      <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={filter}
          onValueChange={(value) => {
            setFilter(value as StatusFilter);
            resetPaging();
          }}
        >
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5">
              Tous
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-1.5">
              Non lus
              {stats.unread > 0 ? (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {stats.unread}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="read">Lus</TabsTrigger>
            <TabsTrigger value="archived">Archivés</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            placeholder="Rechercher nom, email, sujet…"
            aria-label="Rechercher dans les messages"
            className="pl-9"
          />
        </div>
      </section>

      {/* Contenu */}
      <section aria-label="Liste des messages" className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="surface rounded-xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="mt-3 h-3 w-full max-w-md" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="surface rounded-xl p-8 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={load} className="mt-4">
              Réessayer
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="surface rounded-xl p-10 text-center">
            <Inbox
              className="mx-auto h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {query
                ? "Aucun message ne correspond à cette recherche."
                : filter === "archived"
                  ? "Aucun message archivé."
                  : filter === "unread"
                    ? "Aucun nouveau message — tout est lu. 🎉"
                    : "Aucun message pour le moment."}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {visible.slice(0, visibleCount).map((message) => (
              <MessageRow
                key={message.id}
                message={message}
                open={openId === message.id}
                busy={busyId === message.id}
                onToggle={() => toggleOpen(message)}
                onToggleRead={() =>
                  patchMessage(message.id, { read: !message.read })
                }
                onToggleArchive={() =>
                  patchMessage(message.id, {
                    archived: !message.archived,
                    read: true,
                  })
                }
                onDelete={() => setDeleteTarget(message)}
              />
            ))}
          </ul>
        )}

        {/* Pagination */}
        {!loading && !error && visible.length > visibleCount ? (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Afficher plus ({visible.length - visibleCount} restant
              {visible.length - visibleCount > 1 ? "s" : ""})
            </Button>
          </div>
        ) : null}
      </section>

      {/* Confirmation de suppression */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce message ?</AlertDialogTitle>
            <AlertDialogDescription>
              Message de {deleteTarget?.name} ({deleteTarget?.email}). Cette
              action est définitive — le message ne pourra pas être récupéré.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carte de statistique                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: typeof Inbox;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface rounded-xl p-4",
        highlight && "border-primary/50 glow-green"
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-semibold tabular-nums",
          highlight && "text-primary"
        )}
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ligne de message (extensible)                                       */
/* ------------------------------------------------------------------ */

function MessageRow({
  message,
  open,
  busy,
  onToggle,
  onToggleRead,
  onToggleArchive,
  onDelete,
}: {
  message: ContactMessage;
  open: boolean;
  busy: boolean;
  onToggle: () => void;
  onToggleRead: () => void;
  onToggleArchive: () => void;
  onDelete: () => void;
}) {
  const unread = !message.read && !message.archived;

  return (
    <li
      className={cn(
        "surface overflow-hidden rounded-xl transition-colors",
        unread && "border-primary/40 bg-accent/40",
        open && "bg-accent/20"
      )}
    >
      {/* En-tête cliquable */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-accent/30 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <span
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            unread ? "bg-primary" : "bg-border"
          )}
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "truncate text-sm",
                unread ? "font-semibold text-foreground" : "font-medium"
              )}
            >
              {message.name}
            </span>
            {unread ? <Badge className="h-5 px-1.5 text-[10px]">Nouveau</Badge> : null}
            {message.archived ? (
              <Badge variant="outline" className="h-5 gap-1 px-1.5 text-[10px]">
                <Archive className="h-3 w-3" aria-hidden="true" />
                Archivé
              </Badge>
            ) : null}
          </span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
            {message.email}
            {message.subject ? ` · ${message.subject}` : ""}
          </span>
          <span className="mt-1.5 block truncate text-sm text-muted-foreground">
            {message.message}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="whitespace-nowrap text-[11px] tabular-nums text-muted-foreground">
            {formatDate(message.createdAt)}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Détails */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 py-4">
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    De
                  </dt>
                  <dd className="mt-0.5 font-medium">{message.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Email
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${message.email}`}
                      className="link-underline break-all"
                    >
                      {message.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Sujet
                  </dt>
                  <dd className="mt-0.5">{message.subject ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Reçu le
                  </dt>
                  <dd className="mt-0.5">{formatDate(message.createdAt)}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Message
                </p>
                <p className="mt-1.5 whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                  {message.message}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild size="sm" className="gap-2">
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent(
                      `Re: ${message.subject ?? "Ton message sur mon portfolio"}`
                    )}`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Répondre
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleRead}
                  disabled={busy}
                  className="gap-2"
                >
                  {message.read ? (
                    <>
                      <MailOpen className="h-4 w-4" aria-hidden="true" />
                      Marquer non lu
                    </>
                  ) : (
                    <>
                      <MailOpen className="h-4 w-4" aria-hidden="true" />
                      Marquer lu
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleArchive}
                  disabled={busy}
                  className="gap-2"
                >
                  {message.archived ? (
                    <>
                      <ArchiveRestore className="h-4 w-4" aria-hidden="true" />
                      Désarchiver
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4" aria-hidden="true" />
                      Archiver
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDelete}
                  disabled={busy}
                  className="gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Supprimer
                </Button>
                {busy ? (
                  <Loader2
                    className="h-4 w-4 animate-spin text-muted-foreground"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
