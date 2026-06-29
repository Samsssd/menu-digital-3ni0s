"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { productSchema, type Product } from "@/lib/schemas/product";

export type ProductFilters = {
  category: string | null;
  dietaryTag: string | null;
};

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  /** Comma-joined set of every dietary tag present across active products. */
  allDietaryTags: string[];
  fetched: boolean;
  setFilter: (key: keyof ProductFilters, value: string | null) => void;
  clearFilters: () => void;
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  filters: { category: null, dietaryTag: null },
  allDietaryTags: [],
  fetched: false,

  setFilter: (key, value) => {
    const current = get().filters[key];
    // Toggle off when the same value is selected again.
    const next = current === value ? null : value;
    set((state) => ({ filters: { ...state.filters, [key]: next } }));
  },

  clearFilters: () =>
    set({ filters: { category: null, dietaryTag: null } }),

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from(TABLES.products)
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      const { category, dietaryTag } = get().filters;

      if (category) {
        query = query.eq("category", category);
      }

      // dietary_tags is a Postgres array — use the overlaps operator.
      if (dietaryTag) {
        query = query.contains("dietary_tags", [dietaryTag]);
      }

      const { data, error } = await query;

      if (error) throw error;

      const parsed = (data ?? []).flatMap((row) => {
        const result = productSchema.safeParse(row);
        return result.success ? [result.data] : [];
      });

      const tags = Array.from(
        new Set(parsed.flatMap((p) => p.dietary_tags ?? []))
      ).sort((a, b) => a.localeCompare(b));

      set({ items: parsed, allDietaryTags: tags, loading: false, fetched: true });
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Impossible de charger les produits.",
        fetched: true,
      });
    }
  },
}));
