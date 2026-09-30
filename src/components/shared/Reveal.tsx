"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Décalage en secondes avant l'apparition */
  delay?: number;
  /** Décalage vertical initial en px */
  y?: number;
  className?: string;
}

/**
 * Apparition douce au scroll (une seule fois).
 * Respecte prefers-reduced-motion : pas de translation, simple fondu rapide.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
