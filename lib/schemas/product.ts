import { z } from "zod";

// Schema matching a full database row read back from `app_9f02912e_products`.
// Numeric columns may arrive as strings from Supabase, so we coerce them.
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.coerce.number(),
  currency: z.string().catch("EUR"),
  image_url: z.string().nullable(),
  category: z.string().nullable(),
  status: z.string().catch("active"),
  stock: z.coerce.number().catch(0),
  dietary_tags: z.array(z.string()).catch([]),
  allergens: z.array(z.string()).catch([]),
  created_at: z.string().nullable(),
});

export type Product = z.infer<typeof productSchema>;

// Insert payload: only the user-facing fields, with sensible defaults.
export const productInsertSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  price: z.number().positive("Le prix doit être positif"),
  currency: z.string().default("EUR"),
  image_url: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  status: z.string().default("active"),
  stock: z.number().int().nonnegative().optional(),
  dietary_tags: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
});

export type ProductInsert = z.infer<typeof productInsertSchema>;

// Update payload: every field optional.
export const productUpdateSchema = productInsertSchema.partial();

export type ProductUpdate = z.infer<typeof productUpdateSchema>;
