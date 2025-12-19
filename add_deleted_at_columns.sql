-- Add deleted_at column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Add deleted_at column to blogs table (assuming table name is 'blogs')
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create an index for faster queries on deleted items (optional but recommended)
-- CREATE INDEX IF NOT EXISTS products_deleted_at_idx ON products (deleted_at);
-- CREATE INDEX IF NOT EXISTS blogs_deleted_at_idx ON blogs (deleted_at);
