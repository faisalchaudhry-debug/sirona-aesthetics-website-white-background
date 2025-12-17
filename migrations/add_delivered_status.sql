-- Run this in your Supabase SQL Editor to add 'delivered' as a valid status

-- Step 1: Drop the existing constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Step 2: Add the new constraint with 'delivered' included
ALTER TABLE orders ADD CONSTRAINT orders_status_check 
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled'));
