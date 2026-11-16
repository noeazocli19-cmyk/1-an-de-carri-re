"use client";

import { timelineSteps } from "@/data/timeline";
import { TimelineItem } from "./TimelineItem";

export function Timeline() {
  return (
    <ol className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
      {timelineSteps.map((step, index) => (
        <li key={step.id} className="h-full">
          <TimelineItem step={step} index={index} />
        </li>
      ))}
    </ol>
  );
}
