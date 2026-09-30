import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

/**
 * Espace d'administration — protégé par session signée (cookie httpOnly).
 * Hors indexation : metadata robots + X-Robots-Tag (next.config.ts) + robots.txt.
 */
export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

// La session est lue depuis les cookies : rendu toujours dynamique.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  const authed = verifySessionToken(store.get(ADMIN_COOKIE)?.value);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {authed ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
}
