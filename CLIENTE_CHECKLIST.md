# Nova loja: instalação em 15 etapas

1. Confirme contrato, escopo e pagamento inicial.
2. Crie repositório **novo e privado** a partir do template, sem compartilhar arquivos .env.
3. Crie projeto Supabase **novo**, exclusivo da loja.
4. Execute `database/schema.sql` no SQL Editor desse projeto.
5. Crie bucket público `product-images` no Storage.
6. Edite `database/new-client.example.sql` com nome, slug, WhatsApp, endereço e cores da loja e execute **apenas no Supabase novo**.
7. Crie projeto Vercel separado na sua equipe Pro e conecte ao repositório privado da loja.
8. Nas variáveis da Vercel, defina `COMPANY_SLUG` exatamente igual ao slug cadastrado.
9. Configure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `SUPABASE_STORAGE_BUCKET` somente no servidor.
10. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` e `AUTH_SECRET` exclusivos.
11. Configure `NEXT_PUBLIC_SITE_URL` com a URL final e faça deploy de teste.
12. Teste login, configurações da loja, inclusão/edição/exclusão de produtos, fotos e WhatsApp.
13. Registre domínio na conta/titularidade do cliente, cobrando-o separadamente; aponte DNS para o projeto Vercel.
14. Confira HTTPS, nome da loja, estoque e todas as páginas antes de liberar.
15. Registre data da publicação (início da hospedagem), vencimento de R$ 50/mês e canal de suporte.

## Avisos
- Não utilize a mesma chave de serviço ou banco de um cliente para outro.
- A configuração de exemplo mantém dados demonstrativos quando Supabase não está configurado: não use esse modo para produção.
- A homepage ainda possui textos genéricos e algumas menções à TechCell; revise a personalização antes de entregar.
- Não há instalador de um clique: esta é a primeira etapa do template parametrizável.
- Não use este SQL em um Supabase existente de outro cliente.
