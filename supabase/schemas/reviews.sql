-- 1. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_name TEXT NOT NULL,
  project_url TEXT NOT NULL,
  feedback TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user_name ON reviews(user_name);

-- 3. Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Policy untuk PUBLIC READ
CREATE POLICY "public_can_read_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (true);

-- Policy untuk INSERT (public)
CREATE POLICY "public_can_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy untuk UPDATE (public)
CREATE POLICY "public_can_update_reviews"
ON reviews FOR UPDATE
TO anon, authenticated
USING (true);

-- Policy untuk DELETE (public)
CREATE POLICY "public_can_delete_reviews"
ON reviews FOR DELETE
TO anon, authenticated
USING (true);