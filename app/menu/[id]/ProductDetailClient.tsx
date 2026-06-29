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
  Leaf,
  ShieldAlert,
  Package,
  Sparkles,
} from "lucide-react";
import { useProductsStore } from "@/lib/stores/useProductsStore";
import { useCategoriesStore } from "@/lib/stores/useCategoriesStore";
import { supabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { productSchema, type Product } from "@/lib/schemas/product";
import { formatPrice, cn } from "@/lib/utils";
import { DietaryBadge } from "@/components/DietaryBadge";
import { ProductCard } from "@/components/ProductCard";

type LoadState = "loading" | "not-found" | "error" | "ready";

export default function ProductDetailClient({ id }: { id: string }) {
  const {
    items: storeItems,
    fetched,
    fetchProducts,
  } = useProductsStore();
  const { items: categories, getByName, fetchCategories, fetched: catFetched } =
    useCategoriesStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Resolve the product: first from the store, then a direct fetch.
  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      // If we already have it in the store, use it.
      const fromStore = storeItems.find((p) => p.id === id);
      if (fromStore) {
        if (!cancelled) {
          setProduct(fromStore);
          setState("ready");
        }
        return;
      }

      // Ensure the store has been fetched at least once so we don't
      // hit the network on every mount when navigating from the menu.
      if (!fetched) {
        await fetchProducts();
      }

      const afterStore = useProductsStore.getState().items.find((p) => p.id === id);
      if (afterStore) {
        if (!cancelled) {
          setProduct(afterStore);
          setState("ready");
        }
        return;
      }

      // Fallback: direct single-row fetch (handles deep links / archived).
      try {
        const { data, error } = await supabase
          .from(TABLES.products)
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (cancelled) return;

        if (error) throw error;

        if (!data) {
          setState("not-found");
          return;
        }

        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
          setState("error");
          setErrorMsg("Les données de ce produit sont illisibles.");
          return;
        }

        setProduct(parsed.data);
        setState("ready");
      } catch (err) {
        if (cancelled) return;
        setState("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Impossible de charger ce produit."
        );
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch categories for the breadcrumb / related context.
  useEffect(() => {
    if (!catFetched) fetchCategories();
  }, [catFetched, fetchCategories]);

  // Related products: same category, excluding current.
  const related = product
    ? storeItems
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category === product.category
        )
        .slice(0, 3)
    : [];

  const category = product?.category ? getByName(product.category) : undefined;

  if (state === "loading") {
    return <DetailSkeleton />;
  }

  if (state === "not-found") {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-36 text-center sm:px-8">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-deep text-stone ring-1 ring-latte">
          <Coffee className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-espresso">
          Produit introuvable
        </h1>
        <p className="mt-3 text-pretty text-mocha">
          Cet article n&apos;est plus disponible ou n&apos;a jamais existé.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au menu
        </Link>
      </div>
    );
  }

  if (state === "error" || !product) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-36 text-center sm:px-8">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose/10 text-rose ring-1 ring-rose/20">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-espresso">
          Une erreur est survenue
        </h1>
        <p className="mt-3 text-pretty text-mocha">
          {errorMsg || "Impossible de charger ce produit."}
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au menu
        </Link>
      </div>
    );
  }

  const currency = product.currency ?? "EUR";
  const tags = product.dietary_tags ?? [];
  const allergens = product.allergens ?? [];
  const inStock = (product.stock ?? 0) > 0;

  return (
    <div className="overflow-hidden">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-medium text-mocha"
        >
          <Link href="/menu" className="transition-colors hover:text-espresso">
            Menu
          </Link>
          <span className="text-stone">/</span>
          {category ? (
            <>
              <Link
                href={`/categories/${category.id}`}
                className="transition-colors hover:text-espresso"
              >
                {category.name}
              </Link>
              <span className="text-stone">/</span>
            </>
          ) : null}
          <span className="truncate text-espresso">{product.name}</span>
        </motion.nav>
      </div>

      {/* Main detail */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-espresso shadow-lift ring-1 ring-latte">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover sm:aspect-square"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-coffee via-espresso to-coffee sm:aspect-square">
                  <Coffee className="h-16 w-16 text-amber-soft/30" strokeWidth={1} />
                </div>
              )}
              {inStock ? (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-xs font-semibold text-sage backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  Disponible
                </span>
              ) : (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-xs font-semibold text-rose backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                  Épuisé
                </span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {product.category && (
              <Link
                href={
                  category
                    ? `/categories/${category.id}`
                    : `/menu`
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1.5 text-xs font-medium text-amber transition-colors hover:bg-latte-soft"
              >
                <Tag className="h-3 w-3" />
                {product.category}
              </Link>
            )}

            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-espresso sm:text-5xl text-balance">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-espresso">
                {formatPrice(Number(product.price), currency)}
              </span>
              <span className="text-sm font-medium text-stone">{currency}</span>
            </div>

            {product.description && (
              <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-mocha">
                {product.description}
              </p>
            )}

            {/* Dietary tags */}
            {tags.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                  <Leaf className="h-3.5 w-3.5" />
                  Préférences diététiques
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <DietaryBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {allergens.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Allergènes
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {allergens.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-rose/25 bg-rose/5 px-3 py-1.5 text-xs font-medium capitalize text-rose"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Info row */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-latte/70 bg-ivory/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                  <Package className="h-3.5 w-3.5" />
                  Stock
                </div>
                <p className="mt-2 font-display text-2xl font-semibold text-espresso">
                  {product.stock ?? 0}
                </p>
              </div>
              <div className="rounded-2xl border border-latte/70 bg-ivory/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                  <Sparkles className="h-3.5 w-3.5" />
                  Statut
                </div>
                <p className="mt-2 font-display text-2xl font-semibold capitalize text-espresso">
                  {product.status === "active"
                    ? "À la carte"
                    : product.status}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory px-6 py-3.5 text-sm font-medium text-espresso transition-colors hover:bg-cream-deep"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour au menu
              </Link>
              {category && (
                <Link
                  href={`/categories/${category.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
                >
                  Voir la catégorie
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div
            aria-hidden
            className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-latte to-transparent"
          />
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-amber">Dans la même catégorie</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
                Vous aimerez aussi
              </h2>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-6 h-4 w-48 animate-pulse rounded-full bg-latte" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square animate-pulse rounded-[2rem] bg-gradient-to-br from-latte-soft via-cream-deep to-latte" />
        <div className="flex flex-col gap-5">
          <div className="h-6 w-24 animate-pulse rounded-full bg-latte" />
          <div className="h-12 w-3/4 animate-pulse rounded-full bg-latte" />
          <div className="h-10 w-32 animate-pulse rounded-full bg-latte" />
          <div className="mt-2 h-4 w-full animate-pulse rounded-full bg-latte/70" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-latte/70" />
          <div className="mt-4 flex gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-latte" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-latte" />
          </div>
        </div>
      </div>
    </div>
  );
}
