create table if not exists public.waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  current_moment text not null check (current_moment in ('primeiro-emprego', 'recolocacao', 'troca-empresa')),
  linkedin text,
  source text not null default 'landing-page',
  created_at timestamptz not null default now()
);

alter table public.waitlist_leads enable row level security;

drop policy if exists "Allow anonymous inserts" on public.waitlist_leads;
create policy "Allow anonymous inserts"
  on public.waitlist_leads
  for insert
  to anon
  with check (true);
