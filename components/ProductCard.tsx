"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, ArrowUpRight } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/schemas/product";
import { DietaryBadge } from "@/components/DietaryBadge";

function ProductThumb({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt={product.name}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-latte-soft via-cream-deep to-latte",
        className
      )}
    >
      <Coffee className="h-8 w-8 text-stone/50" strokeWidth={1.4} />
    </div>
  );
}

export function ProductCard({
  product,
  index = 0,
  variant = "default",
}: {
  product: Product;
  index?: number;
  variant?: "default" | "compact";
}) {
  const tags = (product.dietary_tags ?? []).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <Link
        href={`/menu/${product.id}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl bg-ivory ring-1 ring-latte/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift hover:ring-amber/30"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductThumb
            product={product}
            className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Price chip */}
          <div className="absolute bottom-3 left-3 rounded-full bg-ivory/95 px-3 py-1.5 text-sm font-semibold text-espresso shadow-soft backdrop-blur-sm">
            {formatPrice(product.price, product.currency)}
          </div>

          {/* Arrow */}
          <span className="absolute right-3 top-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-espresso/90 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>

          {/* Stock badge */}
          {typeof product.stock === "number" && product.stock <= 0 && (
            <div className="absolute right-3 top-3 rounded-full bg-rose/90 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-ivory">
              Épuisé
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {product.category && (
            <span className="eyebrow text-stone">{product.category}</span>
          )}
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-espresso">
            {product.name}
          </h3>

          {product.description && variant !== "compact" && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mocha">
              {product.description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
              {tags.map((t) => (
                <DietaryBadge key={t} tag={t} />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
