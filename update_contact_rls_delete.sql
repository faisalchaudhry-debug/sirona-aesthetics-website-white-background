-- Allow admins to DELETE
CREATE POLICY "Enable delete for admins" ON contact_submissions
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
