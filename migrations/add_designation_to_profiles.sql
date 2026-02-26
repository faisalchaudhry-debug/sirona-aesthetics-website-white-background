-- Migration: Add designation field to profiles table
-- Run this in your Supabase SQL editor

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS designation text;
