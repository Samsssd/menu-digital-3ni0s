"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Coffee, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useProductsStore } from "@/lib/stores/useProductsStore";
import { useCategoriesStore } from "@/lib/stores/useCategoriesStore";
import { ProductCard } from "@/components/ProductCard";
import { FilterBar } from "@/components/FilterBar";
import {
  ProductGridSkeleton,
  ErrorState,
  EmptyState,
} from "@/components/StateViews";

export default function MenuPage() {
  const {
    items,
    loading,
    error,
    fetched,
    fetchProducts,
    allDietaryTags,
  } = useProductsStore();
  const {
    items: categories,
    fetched: catFetched,
    fetchCategories,
  } = useCategoriesStore();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDietaryTag, setActiveDietaryTag] = useState<string | null>(null);

  useEffect(() => {
    if (!fetched) fetchProducts();
    if (!catFetched) fetchCategories();
  }, [fetched, catFetched, fetchProducts, fetchCategories]);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeDietaryTag && !(p.dietary_tags ?? []).includes(activeDietaryTag))
        return false;
      return true;
    });
  }, [items, activeCategory, activeDietaryTag]);

  const toggleCategory = (value: string | null) =>
    setActiveCategory((prev) => (prev === value ? null : value));
  const toggleDietary = (value: string | null) =>
    setActiveDietaryTag((prev) => (prev === value ? null : value));
  const clearAll = () => {
    setActiveCategory(null);
    setActiveDietaryTag(null);
  };

  const showSkeletons = loading && items.length === 0;

  return (
    <div className="overflow-hidden">
      {/* ============ HEADER ============ */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-amber/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-espresso"
            >
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-end justify-between gap-6"
          >
            <div>
              <p className="eyebrow text-amber">La carte</p>
              <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-espresso sm:text-6xl text-balance">
                Le Menu
              </h1>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-mocha">
                Parcourez l&apos;intégralité de notre carte. Filtrez par
                catégorie ou par préférence diététique pour trouver exactement
                ce qui vous fait envie.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-latte bg-ivory/70 px-4 py-2 text-xs font-medium text-mocha backdrop-blur lg:flex">
              <Coffee className="h-4 w-4 text-amber" />
              Carte de saison
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FILTERS ============ */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FilterBar
          categories={categories}
          dietaryTags={allDietaryTags}
          activeCategory={activeCategory}
          activeDietaryTag={activeDietaryTag}
          onCategoryChange={toggleCategory}
          onDietaryChange={toggleDietary}
          onClear={clearAll}
          resultCount={filtered.length}
        />
      </div>

      {/* ============ GRID ============ */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {error ? (
          <ErrorState message={error} onRetry={fetchProducts} />
        ) : showSkeletons ? (
          <ProductGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={
              hasActiveFilter(activeCategory, activeDietaryTag)
                ? "Aucun produit ne correspond"
                : "La carte se prépare"
            }
            message={
              hasActiveFilter(activeCategory, activeDietaryTag)
                ? "Essayez de modifier ou de réinitialiser vos filtres pour découvrir d'autres options."
                : "Nos baristas et pâtissiers composent la sélection. Revenez bientôt."
            }
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

function hasActiveFilter(
  cat: string | null,
  tag: string | null
): boolean {
  return cat !== null || tag !== null;
}
