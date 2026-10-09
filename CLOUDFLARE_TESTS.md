# Testes antes de publicar no Cloudflare

## Preparação
- Verificar a versão compatível de `@opennextjs/cloudflare` com Next.js 16.3.4.
- Instalar o adaptador em ambiente de desenvolvimento e executar seu build.
- Confirmar suporte às APIs Node, Server Actions e otimização de imagens.
- Configurar segredos do Supabase no ambiente de preview (nunca commitar chaves).
- Usar Supabase de testes antes de executar cadastro, edição e exclusão.

## Testes obrigatórios
- Página inicial e catálogo; navegação entre categorias e detalhes.
- Imagens remotas, carregamento gradual e upload com compressão.
- Login/logout e proteção de rotas do painel.
- Cadastro, edição e exclusão de produtos; limpeza de estoque.
- Fluxo de WhatsApp e páginas de assistência.
- Headers de segurança e comportamento de cache.
- Requisições concorrentes e cotas de Workers/Supabase.

## Critério de publicação
Não apontar domínio de produção nem alterar a branch `main` ou o deploy Vercel antes da validação funcional e autorização.
