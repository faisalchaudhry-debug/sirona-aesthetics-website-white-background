-- Function to handle email updates automatically
create or replace function public.handle_user_email_update()
returns trigger as $$
begin
  update public.profiles
  set email = new.email
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to watch for email changes in auth.users
-- Drop if exists to avoid errors on multiple runs
drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email on auth.users
  for each row
  execute procedure public.handle_user_email_update();

-- Sync any existing emails that are currently out of sync
-- This fixes the user's immediate issue
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and (p.email is distinct from u.email);
