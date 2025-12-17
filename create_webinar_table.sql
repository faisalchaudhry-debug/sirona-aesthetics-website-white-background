-- Create a table for webinar registrations
create table webinar_registrations (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  clinic_name text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table webinar_registrations enable row level security;

-- Policies
create policy "Admins can view all webinar registrations." on webinar_registrations
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Anyone can insert webinar registrations." on webinar_registrations
  for insert with check (true);
