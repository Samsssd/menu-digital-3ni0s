"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Coffee,
  AlertTriangle,
  Tag,
  Package,
  Clock,
} from "lucide-react";
import { useCategoriesStore } from "@/lib/stores/useCategoriesStore";
import { useProductsStore } from "@/lib/stores/useProductsStore";
import { supabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { categorySchema, type Category } from "@/lib/schemas/category";
import { ProductCard } from "@/components/ProductCard";
import {
  ProductGridSkeleton,
  ErrorState,
  EmptyState,
} from "@/components/StateViews";

type LoadState = "loading" | "not-found" | "error" | "ready";

export default function CategoryDetailClient({ id }: { id: string }) {
  const {
    items: categories,
    fetched: catFetched,
    fetchCategories,
    getById,
  } = useCategoriesStore();
  const {
    items: products,
    fetched: productsFetched,
    fetchProducts,
  } = useProductsStore();

  const [category, setCategory] = useState<Category | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Resolve the category: store first, then a direct fetch (deep links).
  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const fromStore = getById(id);
      if (fromStore) {
        if (!cancelled) {
          setCategory(fromStore);
          setState("ready");
        }
        return;
      }

      if (!catFetched) {
        await fetchCategories();
      }

      const afterStore = useCategoriesStore.getState().items.find(
        (c) => c.id === id
      );
      if (afterStore) {
        if (!cancelled) {
          setCategory(afterStore);
          setState("ready");
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from(TABLES.categories)
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (cancelled) return;
        if (error) throw error;

        if (!data) {
          setState("not-found");
          return;
        }

        const parsed = categorySchema.safeParse(data);
        if (!parsed.success) {
          setState("error");
          setErrorMsg("Les données de cette catégorie sont illisibles.");
          return;
        }

        setCategory(parsed.data);
        setState("ready");
      } catch (err) {
        if (cancelled) return;
        setState("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Impossible de charger cette catégorie."
        );
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Load the active products once so we can filter them by this category.
  useEffect(() => {
    if (!productsFetched) fetchProducts();
  }, [productsFetched, fetchProducts]);

  // Active products belonging to this category (match by name).
  const categoryName = category?.name;
  const categoryProducts = categoryName
    ? products.filter((p) => p.category === categoryName)
    : [];

  // Sibling categories (for navigation between sections).
  const siblings = categories.filter((c) => c.id !== id).slice(0, 3);

  /* ---------- States ---------- */

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-36">
        <div className="mb-6 h-4 w-40 animate-pulse rounded-full bg-latte" />
        <div className="h-12 w-2/3 animate-pulse rounded-full bg-latte" />
        <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-latte/70" />
        <div className="mt-12">
          <ProductGridSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (state === "not-found") {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-36 text-center sm:px-8">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-deep text-stone ring-1 ring-latte">
          <Coffee className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-espresso">
          Catégorie introuvable
        </h1>
        <p className="mt-3 text-pretty text-mocha">
          Cette section du menu n&apos;existe pas ou n&apos;est plus disponible.
        </p>
        <Link
          href="/categories"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
        >
          <ArrowLeft className="h-4 w-4" />
          Toutes les catégories
        </Link>
      </div>
    );
  }

  if (state === "error" || !category) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-36 text-center sm:px-8">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose/10 text-rose ring-1 ring-rose/20">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-espresso">
          Une erreur est survenue
        </h1>
        <p className="mt-3 text-pretty text-mocha">
          {errorMsg || "Impossible de charger cette catégorie."}
        </p>
        <Link
          href="/categories"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
        >
          <ArrowLeft className="h-4 w-4" />
          Toutes les catégories
        </Link>
      </div>
    );
  }

  /* ---------- Populated ---------- */

  const productsLoading = !productsFetched;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-amber/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-medium text-mocha"
          >
            <Link
              href="/categories"
              className="transition-colors hover:text-espresso"
            >
              Catégories
            </Link>
            <span className="text-stone">/</span>
            <span className="truncate text-espresso">{category.name}</span>
          </motion.nav>

          <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/70 px-4 py-1.5 text-xs font-medium text-amber backdrop-blur"
              >
                <Tag className="h-3.5 w-3.5" />
                Catégorie du menu
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06 }}
                className="mt-5 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-espresso sm:text-6xl lg:text-7xl text-balance"
              >
                {category.name}
              </motion.h1>

              {category.description && (
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14 }}
                  className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-mocha"
                >
                  {category.description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-sm font-medium text-espresso ring-1 ring-latte/70">
                  <Package className="h-4 w-4 text-amber" />
                  {categoryProducts.length}{" "}
                  {categoryProducts.length > 1 ? "produits" : "produit"}
                </span>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/60 px-5 py-2 text-sm font-medium text-espresso backdrop-blur transition-colors hover:bg-ivory"
                >
                  Voir tout le menu
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-espresso shadow-lift ring-1 ring-espresso">
                {category.image_url ? (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="aspect-[5/4] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[5/4] w-full items-center justify-center bg-gradient-to-br from-coffee via-espresso to-coffee">
                    <Coffee
                      className="h-16 w-16 text-amber-soft/30"
                      strokeWidth={1}
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
            Dans cette catégorie
          </h2>
          {!productsLoading && categoryProducts.length > 0 && (
            <span className="text-sm text-stone">
              {categoryProducts.length} résultat
              {categoryProducts.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {productsLoading ? (
          <ProductGridSkeleton count={3} />
        ) : categoryProducts.length === 0 ? (
          <EmptyState
            title="Aucun produit pour le moment"
            message="Cette section de notre carte est en cours de composition. Revenez bientôt pour découvrir nos nouveautés."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Sibling categories */}
      {siblings.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div
            aria-hidden
            className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-latte to-transparent"
          />
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-amber">Autres univers</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
                Explorer ailleurs
              </h2>
            </div>
            <Link
              href="/categories"
              className="group hidden items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-espresso sm:inline-flex"
            >
              Tout voir
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {siblings.map((sib, i) => (
              <motion.div
                key={sib.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/categories/${sib.id}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-latte/70 bg-ivory/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/40 hover:bg-ivory hover:shadow-soft"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-espresso">
                      {sib.name}
                    </h3>
                    {sib.description && (
                      <p className="mt-0.5 line-clamp-1 text-sm text-mocha">
                        {sib.description}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-deep text-mocha transition-colors group-hover:bg-amber group-hover:text-ivory">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
