-- Security hardening for waitlist_leads.
-- Run this after supabase/waitlist_setup.sql.

do $$
begin
  if not exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'waitlist_leads'
  ) then
    raise exception 'Table public.waitlist_leads does not exist. Run waitlist_setup.sql first.';
  end if;
end
$$;

create index if not exists waitlist_leads_created_at_idx
  on public.waitlist_leads (created_at desc);

alter table public.waitlist_leads
  alter column created_at set default now(),
  alter column source set default 'landing-page';

alter table public.waitlist_leads drop constraint if exists waitlist_leads_current_moment_check;
alter table public.waitlist_leads
  add constraint waitlist_leads_current_moment_check
  check (current_moment in ('primeiro-emprego', 'recolocacao', 'troca-empresa')) not valid;

alter table public.waitlist_leads drop constraint if exists waitlist_leads_name_len_check;
alter table public.waitlist_leads
  add constraint waitlist_leads_name_len_check
  check (char_length(btrim(name)) between 2 and 120) not valid;

alter table public.waitlist_leads drop constraint if exists waitlist_leads_email_format_check;
alter table public.waitlist_leads
  add constraint waitlist_leads_email_format_check
  check (
    char_length(btrim(email)) between 6 and 254
    and btrim(email) ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ) not valid;

alter table public.waitlist_leads drop constraint if exists waitlist_leads_linkedin_format_check;
alter table public.waitlist_leads
  add constraint waitlist_leads_linkedin_format_check
  check (
    linkedin is null
    or (
      char_length(btrim(linkedin)) <= 255
      and btrim(linkedin) ~* '^https?://([a-z]{2,3}\.)?linkedin\.com/.+'
    )
  ) not valid;

alter table public.waitlist_leads drop constraint if exists waitlist_leads_source_len_check;
alter table public.waitlist_leads
  add constraint waitlist_leads_source_len_check
  check (char_length(btrim(source)) between 2 and 50) not valid;

create or replace function public.waitlist_guard_and_normalize()
returns trigger
language plpgsql
as $$
begin
  new.name := btrim(new.name);
  new.email := lower(btrim(new.email));
  new.source := coalesce(nullif(btrim(coalesce(new.source, '')), ''), 'landing-page');

  if new.linkedin is not null then
    new.linkedin := nullif(btrim(new.linkedin), '');
  end if;

  if exists (
    select 1
    from public.waitlist_leads wl
    where lower(wl.email) = lower(new.email)
      and wl.created_at > now() - interval '1 minute'
  ) then
    raise exception 'Too many attempts for this email. Please wait 1 minute.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_waitlist_guard_and_normalize on public.waitlist_leads;
create trigger trg_waitlist_guard_and_normalize
before insert on public.waitlist_leads
for each row
execute function public.waitlist_guard_and_normalize();
