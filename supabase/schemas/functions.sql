-- Function untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger jika sudah ada (untuk idempotensi)
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;

-- Create trigger
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function untuk mendapatkan rata-rata rating
CREATE OR REPLACE FUNCTION get_average_rating()
RETURNS DECIMAL(3,2) AS $$
DECLARE
  avg_rating DECIMAL(3,2);
BEGIN
  SELECT COALESCE(AVG(rating), 0)::DECIMAL(3,2)
  INTO avg_rating
  FROM reviews;
  RETURN avg_rating;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function untuk mendapatkan distribusi rating
CREATE OR REPLACE FUNCTION get_rating_distribution()
RETURNS TABLE(rating_value INTEGER, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    rating,
    COUNT(*)::BIGINT
  FROM reviews
  GROUP BY rating
  ORDER BY rating DESC;
END;
$$ LANGUAGE plpgsql STABLE;