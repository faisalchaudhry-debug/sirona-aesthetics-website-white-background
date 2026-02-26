-- Migration: Add phone + address fields to guest orders
-- Run this in your Supabase SQL editor

ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_phone       text;

-- Shipping address
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_line1    text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_line2    text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_city     text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_postcode text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_country  text;

-- Billing address (null means same as shipping)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_line1     text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_line2     text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_city      text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_postcode  text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_country   text;
