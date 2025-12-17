-- Create the blogs table if it doesn't exist
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    author_name TEXT,
    author_role TEXT,
    category TEXT,
    read_time TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies (if they don't exist, this might error if run multiple times, but for initial setup it's fine)
-- Allow public read access to published blogs
CREATE POLICY "Public read access" ON blogs
    FOR SELECT
    USING (is_published = true);

-- Allow full access to authenticated users (admins)
CREATE POLICY "Admin full access" ON blogs
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert or Update the "Understanding UKRP" blog post
INSERT INTO blogs (
    slug, 
    title, 
    excerpt, 
    content, 
    author_name, 
    author_role, 
    category, 
    read_time, 
    published_at, 
    is_published, 
    cover_image
) VALUES (
    'understanding-ukrp',
    'Understanding UKRP: Compliance Made Simple',
    'For aesthetics brands entering or operating in the UK, compliance is not optional—it’s the foundation of credibility.',
    '<p class="mb-6">For aesthetics brands entering or operating in the UK, compliance is not optional—it is the foundation of credibility and safety. The role of the UK Responsible Person (UKRP) has become critical in the post-Brexit regulatory landscape.</p>
    
    <p class="mb-6">The UKRP acts as the primary point of contact between a manufacturer and the UK regulatory authorities (MHRA). Their responsibilities include ensuring technical documentation is in order, vigilance reporting, and ensuring that all devices meets local safety standards before they reach the clinic floor.</p>

    <h3 class="text-xl font-bold text-white mb-4 mt-8">Comparing EU and UK Requirements</h3>
    <p class="mb-6">While the UK system still mirrors many aspects of the EU MDR, divergence is happening. Specific labeling requirements, registration timelines, and vigilance reporting pathways now differ. Navigating this can be complex for international manufacturers.</p>

    <p class="mb-6">Having a knowledgeable UKRP is about more than just ticking boxes; it is about risk mitigation. A robust compliance strategy ensures supply chain continuity and protects both the brand and the practitioner from legal and reputational risks.</p>

    <p class="mb-6">At Sirona, we ensure that every product we distribute is fully compliant with the latest UK regulations, giving our partner clinics complete peace of mind to focus on what matters most: patient care.</p>',
    'Edward Odofin',
    'Head of Science',
    'Regulation',
    '5 min read',
    '2025-09-22',
    true,
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070'
) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    author_name = EXCLUDED.author_name,
    author_role = EXCLUDED.author_role,
    category = EXCLUDED.category,
    read_time = EXCLUDED.read_time,
    excerpt = EXCLUDED.excerpt,
    published_at = EXCLUDED.published_at,
    cover_image = EXCLUDED.cover_image;
