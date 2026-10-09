# Instalação de um novo cliente — modelo seguro

> **Branch de preparação:** `template-instalacao-clientes`. Não alterar a `main`, a Vercel atual ou o Supabase de qualquer cliente durante a preparação.

## Modelo comercial
- Desenvolvimento: preço variável, definido na proposta; 50% no início e 50% na entrega.
- Hospedagem: R$ 50/mês, administrada pelo desenvolvedor em sua conta Vercel Pro, a partir da publicação.
- Domínio: cobrado à parte; registrado **na conta e titularidade do cliente**, mesmo quando configurado pelo desenvolvedor.
- Acordar separadamente manutenção, suporte, backups e exportação de dados.

## Processo de instalação
1. Criar um **novo repositório privado** a partir do projeto-base (não conectar a loja nova ao repositório de produção de outra loja). Evitar histórico, arquivos ou segredos de clientes anteriores.
2. Criar um **novo projeto Supabase para cada cliente**; executar `database/schema.sql` e criar o bucket `product-images`. Não compartilhar banco nem service role entre clientes.
3. Criar credenciais administrativas exclusivas, com senha forte e `AUTH_SECRET` exclusivo. Guardar somente na Vercel (Environment Variables), nunca no GitHub.
4. Criar um projeto separado na Vercel Pro e conectar ao repositório do novo cliente. Configurar variáveis de ambiente e publicar em URL temporária.
5. Verificar o cadastro da empresa, o catálogo, o login, a inclusão/edição/exclusão de produtos, as fotos e o WhatsApp.
6. Registrar o domínio na conta do cliente, mediante autorização e pagamento. Configurar os DNS conforme instruções da Vercel e testar HTTPS.
7. Documentar o responsável pelo pagamento, o vencimento mensal, o procedimento de suspensão com aviso prévio e a forma de exportar dados ao encerrar o serviço.

## Ponto importante no código atual
`lib/repository.ts` fixa `companySlug = "techcell-assistencia"` e pode inserir dados fictícios automaticamente se a empresa não existir. **Não aponte um novo cliente para um Supabase real antes de substituir essa configuração e validar a inicialização**, para não criar registros de demonstração indesejados. O nome interno do pacote também é `techcell-assistencia`, mas não define sozinho a identidade visual.

## Critérios de aceite antes de entregar
- [ ] Nenhuma senha ou chave no GitHub
- [ ] Projeto Vercel isolado
- [ ] Supabase exclusivo e dados reais do cliente
- [ ] Nome, logo, cores, contatos e domínio corretos
- [ ] Catálogo e painel testados
- [ ] Domínio sob titularidade do cliente
- [ ] Valor e início da mensalidade comunicados
- [ ] Regras de suporte, suspensão e saída documentadas

Este arquivo é um procedimento inicial. A automação completa de instalação ainda não está implementada.
