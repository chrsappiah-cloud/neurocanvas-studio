
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('resident', 'caregiver', 'therapist', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  medium text not null,
  mood text,
  music text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.profiles(id) on delete cascade,
  caregiver_id uuid references public.profiles(id) on delete set null,
  mode text not null check (mode in ('painting', 'drawing')),
  mood text,
  music_track text,
  duration_seconds integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_artworks_resident_id on public.artworks(resident_id);
create index if not exists idx_sessions_resident_id on public.sessions(resident_id);
create index if not exists idx_sessions_caregiver_id on public.sessions(caregiver_id);

alter table public.profiles enable row level security;
alter table public.artworks enable row level security;
alter table public.sessions enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated

-- Dementia-friendly additions: Playlists and Caregiver Notes
create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  tracks jsonb not null default '[]'::jsonb,
  is_favourite boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.caregiver_notes (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.profiles(id) on delete cascade,
  caregiver_id uuid not null references public.profiles(id) on delete cascade,
  note text not null,
  mood_before text,
  mood_after text,
  created_at timestamptz not null default now()
);

alter table public.playlists enable row level security;
alter table public.caregiver_notes enable row level security;

create index if not exists idx_playlists_resident_id on public.playlists(resident_id);
create index if not exists idx_caregiver_notes_resident_id on public.caregiver_notes(resident_id);

create policy "playlists_select_own_or_staff"
on public.playlists
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and (
        p.id = playlists.resident_id
        or p.role in ('caregiver', 'therapist', 'admin')
      )
  )
);

create policy "playlists_insert_staff"
on public.playlists
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('caregiver', 'therapist', 'admin')
  )
);

create policy "caregiver_notes_select_own_or_staff"
on public.caregiver_notes
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and (
        p.id = caregiver_notes.resident_id
        or p.role in ('caregiver', 'therapist', 'admin')
      )
  )
);

create policy "caregiver_notes_insert_staff"
on public.caregiver_notes
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('caregiver', 'therapist', 'admin')
  )
);
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "artworks_select_own_or_caregiver"
on public.artworks
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and (
        p.id = artworks.resident_id
        or p.role in ('caregiver', 'therapist', 'admin')
      )
  )
);

create policy "artworks_insert_creator"
on public.artworks
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and (
        p.id = created_by
        or p.role in ('caregiver', 'therapist', 'admin')
      )
  )
);

create policy "sessions_select_own_or_caregiver"
on public.sessions
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and (
        p.id = sessions.resident_id
        or p.role in ('caregiver', 'therapist', 'admin')
      )
  )
);

create policy "sessions_insert_caregiver_or_admin"
on public.sessions
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('caregiver', 'therapist', 'admin')
  )
);

create policy "sessions_update_caregiver_or_admin"
on public.sessions
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('caregiver', 'therapist', 'admin')
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('caregiver', 'therapist', 'admin')
  )
);
