"use client";

import { motion } from "framer-motion";
import { Coffee, AlertCircle, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Skeleton card matching ProductCard proportions. */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-ivory ring-1 ring-latte/70",
        className
      )}
    >
      <div className="aspect-[4/3] animate-pulse bg-gradient-to-br from-latte-soft via-cream-deep to-latte" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-latte" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-latte" />
        <div className="h-3 w-full animate-pulse rounded-full bg-latte/70" />
        <div className="mt-2 flex gap-2">
          <div className="h-5 w-14 animate-pulse rounded-full bg-latte/70" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-latte/70" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ErrorState({
  message = "Une erreur est survenue lors du chargement.",
  onRetry,
  className,
}: {
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-rose/20 bg-rose/5 px-6 py-16 text-center",
        className
      )}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose/10 text-rose ring-1 ring-rose/20">
        <AlertCircle className="h-6 w-6" />
      </span>
      <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-mocha">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-coffee"
        >
          <RotateCcw className="h-4 w-4" />
          Réessayer
        </button>
      )}
    </motion.div>
  );
}

export function EmptyState({
  title = "Rien à afficher pour le moment",
  message = "Revenez bientôt, notre carte s'enrichit au fil des saisons.",
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-latte bg-ivory/60 px-6 py-16 text-center",
        className
      )}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-deep text-stone ring-1 ring-latte">
        <Search className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-espresso">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-mocha">
        {message}
      </p>
    </motion.div>
  );
}

/** Inline pill skeleton for filter bars. */
export function PillSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-9 w-24 animate-pulse rounded-full bg-latte",
        className
      )}
    />
  );
}

export { Coffee };
