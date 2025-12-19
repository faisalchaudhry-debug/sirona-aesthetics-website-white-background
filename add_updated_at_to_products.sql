-- Add updated_at column to products table
ALTER TABLE products ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Optional: Create a trigger to automatically update updated_at on change
-- (This ensures it updates even if the app doesn't explicitly set it)
-- CREATE OR REPLACE FUNCTION update_modified_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.updated_at = now();
--    RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- CREATE TRIGGER update_products_modtime
-- BEFORE UPDATE ON products
-- FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
