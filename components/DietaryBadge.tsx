"use client";

import { cn } from "@/lib/utils";

/** Normalised tag → tailwind classes. Keys are lower-cased / de-accented. */
const TAG_STYLES: Record<string, string> = {
  vegan: "bg-sage/12 text-sage ring-sage/25",
  vegetarien: "bg-sage-soft/25 text-sage ring-sage-soft/40",
  végétarien: "bg-sage-soft/25 text-sage ring-sage-soft/40",
  "sans gluten": "bg-amber/12 text-amber ring-amber/25",
  "sans-gluten": "bg-amber/12 text-amber ring-amber/25",
  sansgluten: "bg-amber/12 text-amber ring-amber/25",
  bio: "bg-sage/12 text-sage ring-sage/25",
  "sans lactose": "bg-rose/12 text-rose ring-rose/25",
  "sans-lactose": "bg-rose/12 text-rose ring-rose/25",
  halal: "bg-clay/12 text-clay ring-clay/25",
  casher: "bg-clay/12 text-clay ring-clay/25",
};

export function DietaryBadge({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  const key = tag.toLowerCase().trim();
  const style =
    TAG_STYLES[key] ?? "bg-latte-soft text-mocha ring-latte/70";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset",
        style,
        className
      )}
    >
      {tag}
    </span>
  );
}
