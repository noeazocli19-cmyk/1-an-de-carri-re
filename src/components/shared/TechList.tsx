import { cn } from "@/lib/utils";

interface TechListProps {
  items: string[];
  className?: string;
}

/**
 * Liste de technologies en texte mono séparé par des points.
 * Aucun logo, aucun pourcentage — sobre et honnête.
 */
export function TechList({ items, className }: TechListProps) {
  return (
    <p className={cn("font-mono text-xs tracking-wide text-muted-foreground", className)}>
      {items.join(" · ")}
    </p>
  );
}
