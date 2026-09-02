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

-- 2. Create indexes
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_user_name ON reviews(user_name);

-- 3. Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "public_can_read_reviews"
ON reviews FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_can_insert_reviews"
ON reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "public_can_update_reviews"
ON reviews FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "public_can_delete_reviews"
ON reviews FOR DELETE TO anon, authenticated USING (true);

-- 5. Function dan trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 6. Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON reviews TO anon, authenticated;
GRANT USAGE ON SEQUENCE reviews_id_seq TO anon, authenticated;