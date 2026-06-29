"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/schemas/category";

export function CategoryCard({
  category,
  index = 0,
  productCount,
}: {
  category: Category;
  index?: number;
  productCount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.07, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <Link
        href={`/categories/${category.id}`}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-espresso text-ivory ring-1 ring-espresso transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
      >
        {/* Visual */}
        <div className="relative aspect-[5/3] overflow-hidden">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-95"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coffee via-espresso to-coffee">
              <Coffee className="h-10 w-10 text-amber-soft/40" strokeWidth={1.2} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />

          <span className="absolute right-3 top-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-ivory/90 text-espresso opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ivory/65">
              {category.description}
            </p>
          )}
          {typeof productCount === "number" && (
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ivory/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ivory/70 ring-1 ring-ivory/10">
              {productCount} {productCount > 1 ? "produits" : "produit"}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-espresso",
        className
      )}
    >
      <div className="aspect-[5/3] animate-pulse bg-coffee" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-ivory/15" />
        <div className="h-3 w-full animate-pulse rounded-full bg-ivory/10" />
        <div className="mt-2 h-5 w-20 animate-pulse rounded-full bg-ivory/10" />
      </div>
    </div>
  );
}
