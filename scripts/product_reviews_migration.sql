-- Create product_reviews table
create table if not exists product_reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table product_reviews enable row level security;

-- Policies

-- 1. Public can view approved reviews
create policy "Public can view approved reviews" on product_reviews
  for select using (is_approved = true);

-- 2. Users can insert their own reviews
create policy "Users can insert their own reviews" on product_reviews
  for insert with check (auth.uid() = user_id);

-- 3. Users can view their own reviews (even if not approved)
create policy "Users can view their own reviews" on product_reviews
  for select using (auth.uid() = user_id);

-- 4. Admins can view all reviews
create policy "Admins can view all reviews" on product_reviews
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 5. Admins can update reviews (approval)
create policy "Admins can update reviews" on product_reviews
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 6. Admins can delete reviews
create policy "Admins can delete reviews" on product_reviews
  for delete using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
