-- MODELO: executar SOMENTE no Supabase novo e exclusivo do cliente,
-- após executar database/schema.sql. Revise todos os valores antes de executar.
-- O slug precisa ser igual à variável COMPANY_SLUG na Vercel.
insert into companies (
  slug, name, whatsapp, address, city, state,
  business_hours, instagram, facebook, description,
  primary_color, secondary_color
) values (
  'loja-exemplo', 'Nome da Loja', '31999999999',
  'Endereço da loja', 'Betim', 'MG',
  'Segunda a sexta, 9h às 18h', '@perfil', '',
  'Celulares e assistência técnica.',
  '#0B1D3A', '#176BFF'
)
on conflict (slug) do nothing;

-- Produtos serão cadastrados pelo painel administrativo.
-- Não execute este exemplo em banco de produção de outro cliente.
