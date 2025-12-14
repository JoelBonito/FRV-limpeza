# Plano de Migração: Design System - Login & Dashboard

## Contexto
A fundação do Design System foi implementada com sucesso. Agora precisamos migrar as telas principais do aplicativo para utilizar os novos componentes e layouts, garantindo consistência visual e manutenibilidade.

## Objetivo
Refatorar `Login.tsx` e `Dashboard.tsx` (junto com `App.tsx`) para utilizar os componentes do Design System (`AuthLayout`, `DashboardLayout`, `Input`, `Button`, `Card`) e remover estilos "hardcoded" ou "ad-hoc".

## Mudanças Propostas

### 1. Migração do Login (`components/Login.tsx`)
*   **Layout**: Substituir o container manual pelo `<AuthLayout>`.
*   **Componentes**:
    *   `<div className="glass-panel">` -> `<Card elevated>`
    *   `<input>` de email -> `<Input type="email" leftIcon={<Mail />} />`
    *   `<button>` de submit -> `<Button variant="primary" rightIcon={<ArrowRight />}>`
    *   Botões de demo -> `<Button variant="secondary" size="sm">` ou `<Card clickable>`
*   **Estilo**: Remover classes como `glass-panel` e usar tokens semânticos (via componentes).

### 2. Migração do App Shell (`App.tsx`)
*   **Layout**: Substituir a implementação manual de Sidebar/Header pelo `<DashboardLayout>`.
*   **Sidebar**: Extrair conteúdo da sidebar atual para um componente `AppSidebar` e passar como prop para o layout.
*   **Header**: Criar `AppHeader` para conteúdo de topo (se houver) ou usar o header do layout.

### 3. Migração do Dashboard (`components/Dashboard.tsx`)
*   **KPI Cards**: Substituir implementação manual `KPICard` pelo componente `<Card>`.
*   **Charts**: Manter `Recharts` mas ajustar cores para usar variáveis CSS (`var(--primary)`, `var(--success)`).
*   **Estrutura**: Usar `<Card>` para os containers dos gráficos e tabelas.

## Plano de Execução

1.  **Login**: Refatorar `components/Login.tsx` (Fallback seguro: manter lógica de auth, mudar apenas UI).
2.  **Sidebar**: Extrair sidebar do `App.tsx` para `components/Sidebar.tsx`.
3.  **App**: Atualizar `App.tsx` para usar `DashboardLayout`.
4.  **Dashboard**: Atualizar `components/Dashboard.tsx` trocando `glass-card`/`glass-panel` por `<Card>`.

## Verificação
*   Login deve funcionar visualmente e funcionalmente.
*   Layout do Dashboard deve persistir a navegação e responsividade.
*   Gráficos devem respeitar o tema (Light/Dark).
