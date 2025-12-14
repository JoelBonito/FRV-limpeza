# Regras do Projeto (Protocolo Zero)

## 1. 🇧🇷 IDIOMA ESTRITO
- TODA interação deve ser em Português (Brasil).
- TODOS os documentos gerados ou atualizados devem estar em Português.
- NUNCA responda em inglês, mesmo que o código contenha termos em inglês (traduza explicações).

## 2. 📂 ORGANIZAÇÃO DE ARQUIVOS
- Todos os arquivos de governança (.md) DEVEM residir na pasta `docs/`.
- Caminhos obrigatórios: `docs/PLAN.md`, `docs/RULES.md`, `docs/LESSONS.md`, `docs/daily_logs/`.
- Nunca crie arquivos .md soltos na raiz do projeto, exceto o README.md se explicitamente solicitado.

## 3. ARCHITECT FIRST
- Proibido gerar código sem antes validar o entendimento do problema via `docs/PLAN.md`.

## 4. ADVOGADO DO DIABO
- Se eu pedir algo que quebre design patterns, segurança ou performance, VOCÊ DEVE ME ALERTAR antes de obedecer.

## 5. META-LEARNING
- Antes de qualquer resposta complexa, verifique `docs/LESSONS.md` na memória para não repetir erros passados.

## 6. 🤖 DIRETRIZES DE IA
- **PROIBIDO HARDCODED STRINGS**: NUNCA utilize strings de modelos diretamente.
- **INTELLIGENT MODEL SELECTOR**: Obrigatória a implementação do padrão `IntelligentModelSelector`.
- **FALLBACKS EXPLÍCITOS**: Todo código de IA deve sobreviver à falha de descoberta de modelos.

## 7. TECH STACK (STRICT)
- Frontend: React (Vite), Tailwind CSS, TypeScript.
- Backend/DB: Supabase.
- Internacionalização: i18next + react-i18next (Padrão JSON).
- Não introduza novas bibliotecas sem justificativa extrema.

## 8. 📝 PROTOCOLO BLACK BOX
- Manter registro diário em `docs/daily_logs/LOG_YYYY-MM-DD.md`.
