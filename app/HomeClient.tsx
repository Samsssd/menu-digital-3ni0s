"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Leaf,
  Clock,
  Sparkles,
  Croissant,
  Soup,
} from "lucide-react";
import { useProductsStore } from "@/lib/stores/useProductsStore";
import { useCategoriesStore } from "@/lib/stores/useCategoriesStore";
import { ProductCard } from "@/components/ProductCard";
import {
  ProductCardSkeleton,
  ProductGridSkeleton,
  ErrorState,
  EmptyState,
} from "@/components/StateViews";
import { CategoryCard, CategoryCardSkeleton } from "@/components/CategoryCard";

const LOGO_URL =
  "https://d2w5g74r7hbhjx.cloudfront.net/app_9f02912e/branding/logo/4b503941964321e7mqxxrljv.png";

const VALUES = [
  {
    icon: Coffee,
    title: "Torréfaction artisanale",
    text: "Des grains sélectionnés à l'origine et torréfiés en petites quantités chaque semaine.",
  },
  {
    icon: Leaf,
    title: "Produits de saison",
    text: "Une carte qui évolue au rythme des produits frais et des producteurs locaux.",
  },
  {
    icon: Croissant,
    title: "Fait maison",
    text: "Pâtisseries et préparations élaborées chaque matin dans notre cuisine ouverte.",
  },
];

export function HomeClient() {
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
    fetched: productsFetched,
  } = useProductsStore();
  const {
    items: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
    fetched: categoriesFetched,
  } = useCategoriesStore();

  useEffect(() => {
    if (!productsFetched) fetchProducts();
    if (!categoriesFetched) fetchCategories();
  }, [productsFetched, categoriesFetched, fetchProducts, fetchCategories]);

  // Count active products per category for the featured section
  const featuredCategories = categories.slice(0, 4);
  const signatureProducts = products.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative">
        {/* backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 texture-grain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-amber/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-24">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            {/* Copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/70 px-4 py-1.5 text-xs font-medium text-mocha backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber" />
                Carte de saison · Automne 2025
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-espresso sm:text-6xl lg:text-7xl text-balance"
              >
                Le café comme on l&apos;aime,{" "}
                <span className="italic text-amber">lentement</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mocha"
              >
                Explorez notre menu numérique : boissons chaudes, pâtisseries
                maison et brunch du week-end. Filtrez selon vos envies et vos
                préférences diététiques.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-coffee hover:shadow-lift"
                >
                  Explorer le menu
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/60 px-6 py-3.5 text-sm font-medium text-espresso backdrop-blur transition-colors hover:bg-ivory"
                >
                  Parcourir les catégories
                </Link>
              </motion.div>
            </div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] bg-espresso shadow-lift ring-1 ring-espresso">
                  <div className="aspect-[4/5] w-full bg-gradient-to-br from-coffee via-espresso to-coffee">
                    <div className="flex h-full w-full flex-col justify-between p-8">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-14 w-14 overflow-hidden rounded-2xl bg-ivory/5 ring-1 ring-ivory/15">
                          <img
                            src={LOGO_URL}
                            alt="Logo du café"
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <span className="eyebrow text-ivory/40">
                          N° 01
                        </span>
                      </div>

                      <div>
                        <p className="font-display text-3xl font-medium italic leading-tight text-ivory">
                          « Une tasse, un moment, une histoire. »
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-ivory/50">
                          <span className="h-px w-8 bg-ivory/30" />
                          <span className="text-xs uppercase tracking-[0.2em]">
                            Depuis 2014
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating hours badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-ivory p-4 shadow-lift ring-1 ring-latte sm:block"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream-deep text-amber">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-medium text-mocha">Ouvert</p>
                      <p className="font-display text-sm font-semibold text-espresso">
                        7h30 — 19h00
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-latte/70 bg-ivory/60 p-6 backdrop-blur-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream-deep text-amber ring-1 ring-latte">
                <v.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-espresso">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mocha">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ LOUBIA ALGÉRIENNE PROMO ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber/20 via-cream-deep to-amber/10 ring-1 ring-latte"
        >
          <div className="relative grid gap-6 px-6 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-10 sm:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber/30 blur-[90px]"
            />
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ivory/70 text-amber shadow-sm ring-1 ring-latte">
              <Soup className="h-7 w-7" strokeWidth={1.7} />
            </span>
            <div className="relative">
              <p className="eyebrow text-amber">Spécialité maison</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-espresso sm:text-3xl text-balance">
                Loubia algérienne
              </h3>
              <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-mocha sm:text-base">
                Haricots blancs mijotés lentement dans une sauce parfumée,
                servis tout chauds avec du pain croustillant. Un plat
                réconfortant directement inspiré de la tradition algérienne.
              </p>
            </div>
            <div className="relative flex sm:justify-end">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-coffee hover:shadow-lift"
              >
                Voir le menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-amber">Nos univers</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl text-balance">
              Explorez par catégorie
            </h2>
          </div>
          <Link
            href="/categories"
            className="group hidden items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-espresso sm:inline-flex"
          >
            Tout voir
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesError ? (
            <div className="sm:col-span-2 lg:col-span-4">
              <ErrorState
                message="Impossible de charger les catégories."
                onRetry={fetchCategories}
              />
            </div>
          ) : categoriesLoading && !categoriesFetched ? (
            Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          ) : featuredCategories.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-4">
              <EmptyState
                title="Les catégories arrivent bientôt"
                message="Nous mettons la dernière touche à notre carte. Revenez vite pour découvrir nos univers."
              />
            </div>
          ) : (
            featuredCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))
          )}
        </div>
      </section>

      {/* ============ SIGNATURE PRODUCTS ============ */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-latte to-transparent"
        />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-amber">Sélection du chef</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl text-balance">
                Les incontournables
              </h2>
            </div>
            <Link
              href="/menu"
              className="group hidden items-center gap-1.5 text-sm font-medium text-mocha transition-colors hover:text-espresso sm:inline-flex"
            >
              Le menu complet
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-10">
            {productsError ? (
              <ErrorState
                message="Impossible de charger les produits."
                onRetry={fetchProducts}
              />
            ) : productsLoading && !productsFetched ? (
              <ProductGridSkeleton count={3} />
            ) : signatureProducts.length === 0 ? (
              <EmptyState
                title="La carte se prépare"
                message="Nos baristas et pâtissiers composent la sélection. Revenez bientôt pour découvrir nos incontournables."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {signatureProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 overflow-hidden rounded-[2rem] bg-espresso"
          >
            <div className="relative grid gap-8 px-8 py-12 sm:grid-cols-2 sm:items-center sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber/20 blur-[90px]"
              />
              <div className="relative">
                <h3 className="font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl text-balance">
                  Envie d&apos;y goûter ?
                </h3>
                <p className="mt-3 max-w-md text-pretty text-ivory/65">
                  Parcourez l&apos;intégralité de notre menu et filtrez selon vos
                  préférences diététiques.
                </p>
              </div>
              <div className="relative flex sm:justify-end">
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-espresso transition-all duration-300 hover:bg-cream-deep hover:shadow-lift"
                >
                  Découvrir le menu
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}