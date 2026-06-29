"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { categorySchema, type Category } from "@/lib/schemas/category";

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fetchCategories: () => Promise<void>;
  getById: (id: string) => Category | undefined;
  getByName: (name: string) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  fetched: false,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from(TABLES.categories)
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("name", { ascending: true });

      if (error) throw error;

      const parsed = (data ?? []).flatMap((row) => {
        const result = categorySchema.safeParse(row);
        return result.success ? [result.data] : [];
      });

      set({ items: parsed, loading: false, fetched: true });
    } catch (err) {
      set({
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Impossible de charger les catégories.",
        fetched: true,
      });
    }
  },

  getById: (id) => get().items.find((c) => c.id === id),
  getByName: (name) =>
    get().items.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    ),
}));
