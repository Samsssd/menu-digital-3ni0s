// Central registry of prefixed Supabase table names for app_9f02912e.
// Reference table names ONLY through this module — never hardcode raw strings.

export const TABLES = {
  products: "app_9f02912e_products",
  categories: "app_9f02912e_categories",
} as const;

/** A single product row, matching the `app_9f02912e_products` columns. */
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  category: string | null;
  status: string;
  stock: number;
  dietary_tags: string[];
  allergens: string[];
  created_at: string | null;
}

/** A single category row, matching the `app_9f02912e_categories` columns. */
export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string | null;
}
