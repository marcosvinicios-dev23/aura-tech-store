# Migração experimental para Cloudflare

Esta preparação acontece **somente** na branch `cloudflare-migracao`. Não mesclar com `main` nem mudar o projeto de produção da Vercel antes de validar o ambiente de testes.

## Inventário inicial confirmado
- Next.js 16.3.4, React 19.2.0.
- `next.config.ts` permite imagens remotas do Unsplash e do host de `SUPABASE_URL`.
- Server Actions configuradas com limite de corpo de 10 MB.
- O Supabase e as rotas do painel precisam ser preservados.

## Próximas verificações antes de alterar a configuração de build
1. Mapear rotas dinâmicas, APIs, Server Actions, bibliotecas Node.js e autenticação.
2. Verificar compatibilidade da versão de Next.js com o adaptador OpenNext para Cloudflare Workers e os limites do plano gratuito.
3. Preparar scripts e configuração do Workers **somente nesta branch**, sem substituir o build atual até confirmar compatibilidade.
4. Configurar variáveis e segredos no ambiente Cloudflare, sem colocar credenciais no GitHub.
5. Testar catálogo, fotos, painel, login, cadastro, edição e exclusão em um ambiente de prévia isolado.
6. Confirmar que o ambiente de testes não altera dados de produção; usar Supabase de testes quando operações de escrita forem testadas.
7. Publicar no Cloudflare somente após testes; manter a Vercel em produção até decisão explícita.

## Atenção
Cloudflare Pages estático não é substituto direto para todas as funcionalidades de servidor do Next.js. Avaliar Workers com adaptador compatível. A existência desta branch ou deste documento não significa que a migração esteja concluída.
