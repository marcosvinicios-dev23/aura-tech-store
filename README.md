# TechCell Assistência

Template comercial de vitrine digital para assistências técnicas de celulares. Não possui carrinho, checkout ou pagamento online: cada interesse é encaminhado ao WhatsApp da empresa.

## Funcionalidades

- Home premium e catálogo responsivo
- Pesquisa, filtros combinados e ordenação
- Páginas individuais com galeria e mensagem personalizada para WhatsApp
- Login administrativo server-side com cookie seguro
- Dashboard e CRUD de celulares
- Ocultar/reativar, controle de estoque e exclusão com confirmação
- Upload múltiplo, câmera no celular, previews e escolha da foto principal
- Configurações da empresa e identidade visual
- Arquitetura preparada para várias empresas por company_id

## Configuração local

1. Rode o SQL de database/schema.sql em um projeto Supabase.
2. Crie um bucket público chamado product-images.
3. Copie .env.example para .env.local.
4. Preencha as variáveis. Gere AUTH_SECRET com pelo menos 32 bytes aleatórios.
5. Gere ADMIN_PASSWORD_HASH com npm run hash-password -- "sua-senha" após instalar as dependências.
6. Execute npm install e npm run dev.

## Deploy na Vercel

Importe este repositório na Vercel, adicione todas as variáveis de .env.example em Project Settings → Environment Variables e publique. A senha e a service role nunca devem usar prefixo NEXT_PUBLIC_.

## Dados de demonstração

Os dez aparelhos em lib/demo-data.ts são fictícios e usados somente até o banco receber registros. Eles não representam estoque real. Após configurar o Supabase, use o painel para cadastrar o catálogo verdadeiro.

## Alterar o acesso administrativo

Atualize ADMIN_EMAIL, ADMIN_PASSWORD_HASH e AUTH_SECRET no ambiente, depois faça um novo deploy. Nunca adicione a senha pura ao GitHub.
