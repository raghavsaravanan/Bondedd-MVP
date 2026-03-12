create table if not exists public.campuses (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  primary_domain text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.campus_domains (
  id bigserial primary key,
  campus_id bigint not null references public.campuses(id) on delete cascade,
  domain text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  campus_id bigint not null references public.campuses(id),
  campus_verification_status text not null check (campus_verification_status = 'verified-domain'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.campuses enable row level security;
alter table public.campus_domains enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "campuses are readable by authenticated users" on public.campuses;
create policy "campuses are readable by authenticated users"
on public.campuses for select
to authenticated
using (true);

drop policy if exists "campus domains are readable by authenticated users" on public.campus_domains;
create policy "campus domains are readable by authenticated users"
on public.campus_domains for select
to authenticated
using (true);

drop policy if exists "users can read their own profile" on public.profiles;
create policy "users can read their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users can update their own profile" on public.profiles;
create policy "users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_slug text := new.raw_user_meta_data ->> 'campus_slug';
  verification_status text := coalesce(new.raw_user_meta_data ->> 'campus_verification_status', 'verified-domain');
  matched_campus_id bigint;
begin
  select id into matched_campus_id
  from public.campuses
  where slug = requested_slug;

  if matched_campus_id is null then
    raise exception 'Campus slug % not found in campuses table', requested_slug;
  end if;

  insert into public.profiles (id, email, campus_id, campus_verification_status)
  values (new.id, new.email, matched_campus_id, verification_status);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

delete from public.campus_domains
where campus_id in (
  select id
  from public.campuses
  where slug <> 'ut-dallas'
);

delete from public.campuses
where slug <> 'ut-dallas';

insert into public.campuses (slug, name, primary_domain)
values
  ('ut-dallas', 'The University of Texas at Dallas', 'utdallas.edu')
on conflict (slug) do update
set
  name = excluded.name,
  primary_domain = excluded.primary_domain;

insert into public.campus_domains (campus_id, domain)
select c.id, d.domain
from public.campuses c
join (
  values
    ('ut-dallas', 'utdallas.edu')
) as d(slug, domain)
  on c.slug = d.slug
on conflict (domain) do nothing;
