alter table products
  add column if not exists category text not null default 'Celular';

alter table products
  drop constraint if exists products_category_check;

alter table products
  add constraint products_category_check
  check (category in ('Celular','Notebook','MacBook','Tablet','Acessório'));

update products
set category = 'Celular'
where category is null;

create index if not exists idx_products_company_category
  on products(company_id, category);

insert into products (
  company_id, slug, category, brand, model, storage, color, condition,
  price, stock, battery_health, warranty, description, images,
  primary_image, featured, hidden
)
select
  companies.id,
  demo.slug,
  demo.category,
  demo.brand,
  demo.model,
  demo.storage,
  demo.color,
  demo.condition,
  demo.price,
  demo.stock,
  demo.battery_health,
  demo.warranty,
  demo.description,
  demo.images::jsonb,
  0,
  demo.featured,
  false
from companies
cross join (values
  (
    'macbook-air-m3-256gb', 'MacBook', 'Apple', 'MacBook Air M3', '256GB',
    'Meia-noite', 'Seminovo', 7299.00, 1, 96, '90 dias',
    'MacBook demonstrativo com chip M3, design leve e excelente autonomia para trabalho e estudos.',
    '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"]', true
  ),
  (
    'macbook-pro-m3-512gb', 'MacBook', 'Apple', 'MacBook Pro M3', '512GB',
    'Cinza-espacial', 'Novo', 11999.00, 1, 100, '12 meses',
    'MacBook demonstrativo de alto desempenho, com tela de alta definição e acabamento premium.',
    '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"]', false
  ),
  (
    'notebook-dell-inspiron-15-512gb', 'Notebook', 'Dell', 'Inspiron 15', '512GB',
    'Prata', 'Novo', 3899.00, 2, null, '12 meses',
    'Notebook demonstrativo com SSD rápido, tela ampla e configuração equilibrada para a rotina.',
    '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"]', false
  ),
  (
    'notebook-lenovo-ideapad-3-256gb', 'Notebook', 'Lenovo', 'IdeaPad 3', '256GB',
    'Cinza', 'Seminovo', 2499.00, 1, null, '90 dias',
    'Notebook demonstrativo revisado, indicado para estudos, navegação e tarefas profissionais.',
    '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"]', false
  )
) as demo(
  slug, category, brand, model, storage, color, condition, price, stock,
  battery_health, warranty, description, images, featured
)
where companies.slug = 'techcell-assistencia'
on conflict (company_id, slug) do update
set category = excluded.category;
