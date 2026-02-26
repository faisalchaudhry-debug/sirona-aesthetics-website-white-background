-- Add 'injectable_review' as a valid order status
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the existing constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Step 2: Re-add constraint with 'injectable_review' included
ALTER TABLE orders ADD CONSTRAINT orders_status_check
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'injectable_review'));
