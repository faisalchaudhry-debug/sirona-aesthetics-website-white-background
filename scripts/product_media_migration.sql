-- Create product_media table
create table if not exists product_media (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  url text not null,
  media_type text not null check (media_type in ('gallery', 'before_after')),
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table product_media enable row level security;

-- Policies

-- 1. Public can view all media
create policy "Public can view all media" on product_media
  for select using (true);

-- 2. Admins can insert media
create policy "Admins can insert media" on product_media
  for insert with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 3. Admins can update media
create policy "Admins can update media" on product_media
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 4. Admins can delete media
create policy "Admins can delete media" on product_media
  for delete using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Migration: Move existing images to product_media
do $$
declare
    r record;
begin
    for r in select id, image_url, before_after_image_url from products loop
        -- Migrate main image
        if r.image_url is not null and r.image_url != '' then
            insert into product_media (product_id, url, media_type, display_order)
            values (r.id, r.image_url, 'gallery', 0);
        end if;

        -- Migrate before/after image
        if r.before_after_image_url is not null and r.before_after_image_url != '' then
            insert into product_media (product_id, url, media_type, display_order)
            values (r.id, r.before_after_image_url, 'before_after', 0);
        end if;
    end loop;
end $$;
