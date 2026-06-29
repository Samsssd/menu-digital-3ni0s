-- Menu Digital — initial schema
-- App ID: app_9f02912e
-- Idempotent: safe to re-run.

-- ───────────────────────────────────────────────
-- Categories du menu
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.app_9f02912e_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ───────────────────────────────────────────────
-- Produits (boissons & plats)
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.app_9f02912e_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  currency text DEFAULT 'EUR',
  image_url text,
  category text,
  status text DEFAULT 'active',
  stock integer DEFAULT 0,
  dietary_tags text[] DEFAULT '{}',
  allergens text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ───────────────────────────────────────────────
-- Grants
-- ───────────────────────────────────────────────
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.app_9f02912e_categories TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.app_9f02912e_products TO anon, authenticated;

-- ───────────────────────────────────────────────
-- Row Level Security (permissive)
-- ───────────────────────────────────────────────
ALTER TABLE public.app_9f02912e_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_9f02912e_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "app_9f02912e_categories_all" ON public.app_9f02912e_categories;
CREATE POLICY "app_9f02912e_categories_all"
  ON public.app_9f02912e_categories
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "app_9f02912e_products_all" ON public.app_9f02912e_products;
CREATE POLICY "app_9f02912e_products_all"
  ON public.app_9f02912e_products
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);
