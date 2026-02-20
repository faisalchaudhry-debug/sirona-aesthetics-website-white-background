-- Migration: Support guest orders for the Veluria standalone page
-- Run this in your Supabase SQL editor before testing /veluria checkout

-- 1. Make user_id nullable so guest orders (no account) can be stored
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- 2. Add guest contact fields
ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_email text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_name  text;
