-- Secure Products Table
-- 1. Drop the overly permissive public policy
DROP POLICY IF EXISTS "Products are viewable by everyone." ON products;

-- 2. Create restricted public policy (Active & Not Deleted)
CREATE POLICY "Public can view active products" ON products
  FOR SELECT
  USING (is_active = true AND deleted_at IS NULL);

-- 3. Ensure Admins see everything (Existing "Only admins..." policy covers ALL operations including SELECT,
--    so we don't strictly need a new one if that one exists. But to be safe and explicit for SELECT if the other was specific:)
--    Actually the existing policy "Only admins can insert/update/delete products." is defined as FOR ALL,
--    so it already grants Admins full SELECT access. We rely on that.


-- Secure Blogs Table (Assuming standard setup, if policies don't exist this creates them)
-- 1. Enable RLS just in case
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 2. Drop potential existing permissive policies
DROP POLICY IF EXISTS "Blogs are viewable by everyone" ON blogs;
DROP POLICY IF EXISTS "Public can view blogs" ON blogs;

-- 3. Create restricted public policy (Published & Not Deleted)
CREATE POLICY "Public can view published blogs" ON blogs
  FOR SELECT
  USING (is_published = true AND deleted_at IS NULL);

-- 4. Create Admin full access policy (if not already present)
--    We use a generic name to avoid conflicts if you ran a previous script with a different name.
--    This ensures admins can see drafts and deleted items.
CREATE POLICY "Admins can manage blogs" ON blogs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
