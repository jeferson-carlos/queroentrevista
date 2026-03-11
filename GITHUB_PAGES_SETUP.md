# Deploy no GitHub Pages - Quero Entrevistas

Este projeto já está configurado para deploy automático no GitHub Pages via GitHub Actions.

Arquivos já preparados no projeto:
- `.github/workflows/deploy-pages.yml`
- `vite.config.ts` com `base: "/"` para domínio customizado
- `public/CNAME` com `queroentrevista.com.br`

## O que você precisa fazer (uma vez)

### 1) Subir as alterações para `main`
Garanta que este commit esteja na branch `main`, porque o workflow publica apenas a partir de `main`.

### 2) Configurar o GitHub Pages para usar Actions
1. Abra o repositório no GitHub.
2. Vá em `Settings` > `Pages`.
3. Em `Build and deployment`, selecione:
   - `Source`: **GitHub Actions**

### 3) Criar variáveis de ambiente no GitHub
1. Vá em `Settings` > `Secrets and variables` > `Actions` > aba `Variables`.
2. Clique em `New repository variable` e crie:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_GA_MEASUREMENT_ID` (opcional, para Google Analytics)

Use os valores do seu projeto Supabase:
- `Project URL`
- `Publishable key` (`sb_publishable_...`)

Se quiser ativar Google Analytics (GA4):
- Crie uma propriedade no [Google Analytics](https://analytics.google.com/)
- Copie o `Measurement ID` (formato `G-XXXXXXXXXX`)
- Use esse valor em `VITE_GA_MEASUREMENT_ID`

### 4) Configurar domínio personalizado no GitHub
1. Vá em `Settings` > `Pages`.
2. Em `Custom domain`, informe:
   - `queroentrevista.com.br`
3. Salve e aguarde validação.
4. Quando liberar, marque `Enforce HTTPS`.

### 5) Configurar DNS do domínio
No provedor DNS do domínio `queroentrevista.com.br`, configure:

Registros `A` para o domínio raiz (`@`):
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Registro `CNAME` para `www`:
- `www` -> `jeferson-carlos.github.io`

Opcional (IPv6, recomendado): registros `AAAA` para `@`:
- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

### 6) Disparar o deploy
Opção A (automática):
- Faça push/merge em `main`.

Opção B (manual):
1. Abra a aba `Actions`.
2. Selecione workflow `Deploy to GitHub Pages`.
3. Clique em `Run workflow`.

### 7) Validar publicação
Depois da propagação DNS e deploy concluído:
- `https://queroentrevista.com.br`
- `https://www.queroentrevista.com.br`

Observação: a propagação DNS pode levar de alguns minutos até 24 horas.

## Observações
- Nunca use `service_role` ou `secret key` no front-end.
- Se alterar variáveis no GitHub, execute novo deploy para refletir no site.
- O endereço legado `https://jeferson-carlos.github.io/queroentrevista/` pode não refletir corretamente após a troca para domínio customizado.
