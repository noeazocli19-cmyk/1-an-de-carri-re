"use client";

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Music2,
} from "lucide-react";
import { socials } from "@/data/socials";
import type { SocialIconName } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<SocialIconName, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  whatsapp: MessageCircle,
  mail: Mail,
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Liens sociaux en pastilles rondes — dérivés des données réelles de src/data/socials.ts.
 */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.icon === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon className={cn("h-4 w-4", iconClassName)} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
