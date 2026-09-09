# TechCell Assistência

Template comercial de vitrine digital para assistências técnicas e lojas de tecnologia. Não possui carrinho, checkout ou pagamento online: cada interesse é encaminhado ao WhatsApp da empresa.

## Funcionalidades

- Home premium e catálogo responsivo
- Pesquisa, filtros combinados e ordenação
- Páginas individuais com galeria e mensagem personalizada para WhatsApp
- Login administrativo server-side com cookie seguro
- Dashboard e CRUD de celulares, notebooks, MacBooks, tablets e acessórios
- Ocultar/reativar, controle de estoque e exclusão com confirmação
- Upload múltiplo, câmera real no celular, previews e escolha da foto principal
- Compressão automática das fotos antes do upload (WebP/JPEG, até 1600 px e alvo de aproximadamente 700 KB)
- Configurações da empresa e identidade visual, com troca ou remoção de logo e banner
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

Os 14 produtos em lib/demo-data.ts são fictícios e usados somente até o banco receber registros. Eles incluem celulares, MacBooks e notebooks e não representam estoque real. Após configurar o Supabase, use o painel para cadastrar o catálogo verdadeiro.

## Atualização de instalações existentes

Para uma instalação criada antes das categorias de produto, execute uma única vez o arquivo `database/migrations/20260909_product_categories.sql` no SQL Editor do Supabase. A migração pode ser executada novamente com segurança e adiciona a categoria aos produtos existentes, além dos quatro novos itens de demonstração.

Depois da migração, faça um novo deploy na Vercel para que o painel passe a publicar todas as categorias.

## Fotos e armazenamento

As imagens escolhidas ou capturadas são redimensionadas e comprimidas no próprio navegador antes do envio. Isso reduz o consumo do Supabase Storage e torna o painel mais rápido no celular. A qualidade visual permanece adequada para a vitrine; o arquivo original do aparelho não é enviado ao servidor.

## Alterar o acesso administrativo

Atualize ADMIN_EMAIL, ADMIN_PASSWORD_HASH e AUTH_SECRET no ambiente, depois faça um novo deploy. Nunca adicione a senha pura ao GitHub.
