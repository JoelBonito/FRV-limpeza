# Plano de Implementação: Design System Inove AI (80/20)

## Contexto
O projeto necessita de uma padronização visual e de componentes para garantir consistência, performance e manutenibilidade. Adotaremos o "Inove AI Design System 80/20", uma abordagem minimalista focada em velocidade e cobertura dos casos de uso essenciais.

## Objetivo
Implementar a fundação do Design System, incluindo tokens, configuração do Tailwind, e os 5 componentes core (Button, Input, Card, Toast, Modal), além dos layouts padrão.

## User Review Required
> [!IMPORTANT]
> **Breaking Changes**: A introdução das variáveis CSS globais e do reset do Tailwind pode alterar a aparência de componentes existentes que não utilizem o Design System.
> Recomenda-se uma migração gradual ou uma revisão visual após a instalação.

## Mudanças Propostas

### 1. Instalação e Configuração
*   **Dependências**: Instalar `tailwindcss`, `clsx`, `tailwind-merge`, `framer-motion`, `lucide-react`.
*   **Tailwind**: Atualizar `tailwind.config.ts` para usar o gerador de configuração do Design System (`generateTailwindConfig`).
*   **CSS**: Atualizar `index.css` (ou `globals.css`) com as variáveis CSS de tokens (`:root` e `.dark`).

### 2. Estrutura de Arquivos (Novo Diretório `src/design-system`)
#### Tokens (`src/design-system/tokens/`)
*   `primitives.ts`: Definição de espaçamentos, fontes, cores primitivas.
*   `flavors.ts`: Definição de tokens semânticos e gerador de config do Tailwind.

#### Utils (`src/lib/`)
*   `utils.ts`: Utilitário `cn()` para fusão de classes Tailwind.

#### Componentes Core (`src/design-system/components/`)
*   `Button.tsx`: Variantes primary, secondary, outline, ghost, destructive.
*   `Input.tsx`: Suporte a ícones, estados de erro/sucesso.
*   `Card.tsx`: Container padrão com padding e elevação configuráveis.
*   `Toast.tsx`: Sistema de notificação (requer Context/Store).
*   `Modal.tsx`: Dialogs acessíveis com backdrop.

#### Hooks (`src/design-system/hooks/`)
*   `useToast.ts`: Gerenciamento de estado dos toasts (Zustand).

#### Layouts (`src/design-system/layouts/`)
*   `DashboardLayout.tsx`: Sidebar + Header + Content.
*   `AuthLayout.tsx`: Centralizado para login/cadastro.
*   `LandingLayout.tsx`: Navbar + Content + Footer.

### 3. Integração
*   Adicionar `ToastContainer` no `App.tsx`.
*   Verificar configuração de aliases (ex: `@/`) no `vite.config.ts` se necessário.

## Plano de Verificação

### Automatizada
*   Build do projeto via `npm run build` para garantir que não há erros de tipagem ou dependências.

### Manual
*   **Kitchen Sink**: Criar uma rota temporária `/design-test` exibindo todos os componentes em suas várias variantes.
*   **Dark Mode**: Testar a alternância de temas e verificar se as variáveis CSS respondem corretamente.
*   **Responsividade**: Verificar o comportamento dos layouts em mobile e desktop.
