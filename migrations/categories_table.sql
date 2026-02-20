-- Migration: Product categories table
-- Run this in your Supabase SQL editor

create table if not exists categories (
  id         uuid default uuid_generate_v4() primary key,
  name       text not null,
  slug       text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Pre-populate with every category that already exists in the products table
insert into categories (name, slug) values
  ('PB Serum',  'pb-serum'),
  ('Novacutan', 'novacutan'),
  ('Smartker',  'smartker'),
  ('Devices',   'devices'),
  ('Veluria',   'veluria')
on conflict (slug) do nothing;

-- Allow anyone to read categories (public product filter bar)
alter table categories enable row level security;

create policy "Categories viewable by everyone"
  on categories for select
  using (true);

create policy "Categories manageable by admins"
  on categories for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );
