# Supabase Setup - Quero Entrevistas

## 1) Criar projeto no Supabase
1. Acesse https://supabase.com e crie um projeto.
2. Guarde a senha do banco e a região escolhida.

## 2) Criar tabela e política RLS
1. No painel do Supabase, abra `SQL Editor`.
2. Rode o SQL do arquivo `supabase/waitlist_setup.sql`.
3. Confirme se a tabela `public.waitlist_leads` foi criada.

## 2.1) Aplicar hardening de segurança (recomendado)
1. No `SQL Editor`, rode o arquivo `supabase/waitlist_security_hardening.sql`.
2. Esse script aplica:
   - validações adicionais de formato/tamanho no banco
   - normalização de dados (trim/lowercase) via trigger
   - proteção básica contra tentativas repetidas em curto intervalo

## 3) Obter credenciais do projeto
1. Vá em `Project Settings` > `API Keys`.
2. Copie:
   - `Project URL`
   - `Publishable key` (formato `sb_publishable_...`)

## 4) Configurar variáveis no projeto Vue
1. Na raiz do projeto, copie o arquivo de exemplo:
   - `cp .env.example .env`
2. Preencha o `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

## 5) Rodar aplicação local
1. Reinicie o servidor de desenvolvimento para carregar o `.env`.
2. Execute:
   - `npm run dev`
3. Envie o formulário na landing e valide no painel do Supabase:
   - `Table Editor` > `waitlist_leads`

## 6) Publicação
No deploy (Vercel, Netlify, etc.), configure as mesmas variáveis de ambiente:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Observações importantes
- O projeto está configurado para usar a chave pública no formato novo (`publishable`) no front-end.
- A tabela está com RLS ativa e política permitindo apenas `insert` anônimo.
- Não exponha `secret key` nem `service_role key` no front-end.
- Compatibilidade legada: ainda aceitamos `VITE_SUPABASE_ANON_KEY`, mas a recomendação é usar a `publishable key`.
