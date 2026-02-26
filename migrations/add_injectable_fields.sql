-- Add is_injectable flag to products table
-- Products marked as injectable will require training verification before checkout
ALTER TABLE products
ADD COLUMN IF NOT EXISTS is_injectable BOOLEAN DEFAULT false;

-- Add can_buy_injectables flag to profiles table
-- Admin/Jackie can toggle this per user once they verify injectable training
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS can_buy_injectables BOOLEAN DEFAULT false;
