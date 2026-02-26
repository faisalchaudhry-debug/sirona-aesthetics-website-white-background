-- Training Events table
-- Stores upcoming training sessions shown on the /training page
-- Admin manages via /admin/webinars

CREATE TABLE IF NOT EXISTS training_events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    event_date timestamptz NOT NULL,
    description text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE training_events ENABLE ROW LEVEL SECURITY;

-- Anyone can read training events (used on the public /training page)
CREATE POLICY "Public read training events" ON training_events
    FOR SELECT USING (true);
