# Deploy no GitHub Pages - Quero Entrevistas

Este projeto ja esta configurado para deploy automatico no GitHub Pages via GitHub Actions.

Arquivos ja preparados no projeto:
- `.github/workflows/deploy-pages.yml`
- `vite.config.ts` com `base` automatico para Pages

## O que voce precisa fazer (uma vez)

### 1) Subir as alteracoes para `main`
Garanta que este commit esteja na branch `main`, porque o workflow publica apenas a partir de `main`.

### 2) Configurar o GitHub Pages para usar Actions
1. Abra o repositorio no GitHub.
2. Va em `Settings` > `Pages`.
3. Em `Build and deployment`, selecione:
   - `Source`: **GitHub Actions**

### 3) Criar variaveis de ambiente no GitHub
1. Va em `Settings` > `Secrets and variables` > `Actions` > aba `Variables`.
2. Clique em `New repository variable` e crie:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

Use os valores do seu projeto Supabase:
- `Project URL`
- `Publishable key` (`sb_publishable_...`)

### 4) Disparar o deploy
Opcao A (automatica):
- Faça push/merge em `main`.

Opcao B (manual):
1. Abra a aba `Actions`.
2. Selecione workflow `Deploy to GitHub Pages`.
3. Clique em `Run workflow`.

### 5) Validar publicacao
Depois do workflow concluir com sucesso, a URL sera:
- `https://jeferson-carlos.github.io/queroentrevista/`

## Observacoes
- Nunca use `service_role` ou `secret key` no front-end.
- Se alterar variaveis no GitHub, execute novo deploy para refletir no site.
- Se renomear o repositorio, a base do Vite e a URL mudam automaticamente no build do GitHub Actions.
