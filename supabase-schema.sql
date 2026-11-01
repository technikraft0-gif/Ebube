-- ==============================================================================
-- Ebube Udorie Portfolio — Supabase Schema & Storage Setup
-- Run this script in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Content Overrides Table (Hero, About, Capabilities, Testimonials, Contact, Profile)
create table if not exists public.content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 2. Projects Table (Case Studies, Details, Order, Visibility)
create table if not exists public.projects (
  slug text primary key,
  data jsonb not null,
  order_num integer default 0,
  hidden boolean default false,
  updated_at timestamptz default now()
);

create index if not exists idx_projects_order on public.projects(order_num);
create index if not exists idx_projects_hidden on public.projects(hidden);

-- 3. Blog Posts Table (Markdown articles, drafts, scheduling)
create table if not exists public.posts (
  slug text primary key,
  status text not null default 'draft',
  published_at timestamptz,
  data jsonb not null,
  updated_at timestamptz default now()
);

create index if not exists idx_posts_status_published on public.posts(status, published_at desc);

-- 4. Media Library Table (Uploaded images, screenshots, CV metadata)
create table if not exists public.media (
  id text primary key,
  url text not null,
  name text not null,
  folder text default '',
  resource_type text default 'image',
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_media_created on public.media(created_at desc);

-- 5. Analytics Visits Table (Privacy-friendly visitor tracking)
create table if not exists public.analytics_visits (
  id text primary key,
  session_id text not null,
  visitor_id text not null,
  path text not null,
  source text default 'direct',
  source_type text default 'direct',
  entry boolean default false,
  bot boolean default false,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_visits_created on public.analytics_visits(created_at desc);
create index if not exists idx_visits_session on public.analytics_visits(session_id);

-- 6. Analytics Events Table (CV downloads, external link clicks)
create table if not exists public.analytics_events (
  id text primary key,
  type text not null,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_events_created on public.analytics_events(created_at desc);
create index if not exists idx_events_type on public.analytics_events(type);

-- 7. Storage Bucket for Media & CV
-- Create a public bucket named 'portfolio' if it does not already exist
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

-- Storage Policy: Allow public read access to all files in 'portfolio'
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'portfolio' );

-- Storage Policy: Allow service role (admin backend) full access
create policy "Service Role Full Access"
  on storage.objects for all
  using ( bucket_id = 'portfolio' )
  with check ( bucket_id = 'portfolio' );
