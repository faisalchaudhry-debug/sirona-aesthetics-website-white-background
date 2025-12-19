-- Drop existing policies to ensure clean slate
DROP POLICY IF EXISTS "Enable insert for public" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for admins" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for admins" ON contact_submissions;

-- Make sure RLS is enabled
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 1. Allow everyone (anon and authenticated) to INSERT
CREATE POLICY "Enable insert for all" ON contact_submissions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- 2. Allow admins to SELECT (view) all
CREATE POLICY "Enable read for admins" ON contact_submissions
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- 3. Allow admins to UPDATE (e.g. mark as read)
CREATE POLICY "Enable update for admins" ON contact_submissions
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
