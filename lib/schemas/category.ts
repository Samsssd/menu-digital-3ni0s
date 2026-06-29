import { z } from "zod";

// Schema matching a full database row read back from `app_9f02912e_categories`.
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  display_order: z.coerce.number().int().catch(0),
  created_at: z.string().nullable(),
});

export type Category = z.infer<typeof categorySchema>;

// Insert payload.
export const categoryInsertSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  display_order: z.number().int().optional(),
});

export type CategoryInsert = z.infer<typeof categoryInsertSchema>;

// Update payload: every field optional.
export const categoryUpdateSchema = categoryInsertSchema.partial();

export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;
