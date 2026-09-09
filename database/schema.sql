create extension if not exists pgcrypto;

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  whatsapp text not null,
  address text,
  city text,
  state text,
  business_hours text,
  instagram text,
  facebook text,
  description text,
  logo_url text,
  primary_color text not null default '#0B1D3A',
  secondary_color text not null default '#176BFF',
  banner_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  slug text not null,
  category text not null default 'Celular' check (category in ('Celular','Notebook','MacBook','Tablet','Acessório')),
  brand text not null,
  model text not null,
  storage text not null,
  color text not null,
  condition text not null check (condition in ('Novo','Seminovo')),
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  battery_health integer check (battery_health between 0 and 100),
  warranty text not null,
  description text not null,
  images jsonb not null default '[]'::jsonb,
  primary_image integer not null default 0,
  featured boolean not null default false,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, slug)
);

create index if not exists idx_products_company_status
  on products(company_id, hidden, stock);
create index if not exists idx_products_company_brand
  on products(company_id, brand);
create index if not exists idx_products_company_category
  on products(company_id, category);

alter table companies enable row level security;
alter table products enable row level security;

-- Nenhuma policy pública: toda consulta passa pelo backend com a service role.
