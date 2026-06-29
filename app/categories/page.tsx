"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Coffee } from "lucide-react";
import { useCategoriesStore } from "@/lib/stores/useCategoriesStore";
import { useProductsStore } from "@/lib/stores/useProductsStore";
import { CategoryCard, CategoryCardSkeleton } from "@/components/CategoryCard";
import { ErrorState, EmptyState } from "@/components/StateViews";

export default function CategoriesPage() {
  const {
    items: categories,
    loading,
    error,
    fetched,
    fetchCategories,
  } = useCategoriesStore();
  const { items: products, fetchProducts, fetched: productsFetched } =
    useProductsStore();

  useEffect(() => {
    if (!fetched) fetchCategories();
    if (!productsFetched) fetchProducts();
  }, [fetched, productsFetched, fetchCategories, fetchProducts]);

  // Count active products per category name
  const countFor = (name: string) =>
    products.filter((p) => p.category === name).length;

  return (
    <div className="overflow-hidden">
      {/* Header band */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-sage/10 blur-[130px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/70 px-4 py-1.5 text-xs font-medium text-mocha backdrop-blur"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-amber" />
            {categories.length > 0
              ? `${categories.length} catégories`
              : "Catégories"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-espresso sm:text-6xl lg:text-7xl text-balance"
          >
            Toutes nos catégories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-mocha"
          >
            Du café d&apos;origine aux pâtisseries du matin : explorez notre
            carte par univers et trouvez exactement ce dont vous avez envie.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
        {error ? (
          <ErrorState
            message="Impossible de charger les catégories."
            onRetry={fetchCategories}
          />
        ) : loading && !fetched ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <EmptyState
            title="Aucune catégorie pour l'instant"
            message="Notre carte est en cours de composition. Les univers apparaîtront ici dès qu'ils seront prêts."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={i}
                productCount={countFor(cat.name)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Cross-link to menu */}
      {categories.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-latte/70 bg-ivory/60 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:p-12"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl text-balance">
                Vous préférez tout voir d&apos;un coup d&apos;œil ?
              </h2>
              <p className="mt-2 max-w-md text-pretty text-mocha">
                Parcourez l&apos;intégralité de nos produits et filtrez selon vos
                préférences diététiques.
              </p>
            </div>
            <Link
              href="/menu"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-coffee hover:shadow-lift"
            >
              <Coffee className="h-4 w-4" />
              Voir le menu complet
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
}
