"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories: { id: string; name: string }[];
  dietaryTags: string[];
  activeCategory: string | null;
  activeDietaryTag: string | null;
  onCategoryChange: (value: string | null) => void;
  onDietaryChange: (value: string | null) => void;
  onClear: () => void;
  resultCount: number;
}

export function FilterBar({
  categories,
  dietaryTags,
  activeCategory,
  activeDietaryTag,
  onCategoryChange,
  onDietaryChange,
  onClear,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilter = activeCategory !== null || activeDietaryTag !== null;

  return (
    <div className="sticky top-20 z-30 -mx-5 border-y border-latte/60 bg-cream/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Categories */}
        <div className="flex items-center gap-3">
          <span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone sm:inline-flex">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Catégories
          </span>
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <FilterPill
              label="Tout"
              active={activeCategory === null}
              onClick={() => onCategoryChange(null)}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat.id}
                label={cat.name}
                active={activeCategory === cat.name}
                onClick={() => onCategoryChange(cat.name)}
              />
            ))}
          </div>
        </div>

        {/* Dietary tags + actions */}
        {dietaryTags.length > 0 && (
          <div className="mt-3 flex items-center gap-3 border-t border-latte/40 pt-3">
            <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-stone sm:inline-flex">
              Régime
            </span>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {dietaryTags.map((tag) => (
                <FilterPill
                  key={tag}
                  label={tag}
                  active={activeDietaryTag === tag}
                  onClick={() => onDietaryChange(tag)}
                  variant="dietary"
                />
              ))}
            </div>
          </div>
        )}

        {/* Result count + clear */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-mocha">
            <span className="font-semibold text-espresso">{resultCount}</span>{" "}
            {resultCount > 1 ? "produits" : "produit"}
            {hasActiveFilter && " · filtré"}
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1.5 text-xs font-medium text-mocha transition-colors hover:bg-latte-soft hover:text-espresso"
            >
              <X className="h-3 w-3" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  variant = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "default" | "dietary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
        active
          ? variant === "dietary"
            ? "bg-sage text-ivory shadow-soft"
            : "bg-espresso text-ivory shadow-soft"
          : "bg-ivory/70 text-mocha ring-1 ring-latte hover:bg-ivory hover:text-espresso"
      )}
    >
      {active && <Check className="h-3 w-3" strokeWidth={2.5} />}
      <span className="capitalize">{label}</span>
    </button>
  );
}

export { motion };
