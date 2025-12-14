# 🎯 INOVE AI Design System 80/20
**Versão Essencial - Setup em <2h, cobre 80% dos casos**

> Sistema minimalista que prioriza velocidade. Use quando: novo projeto, MVP, validação rápida.

---

## 📋 Índice

1. [Quick Start](#quick-start)
2. [Filosofia 80/20](#filosofia-8020)
3. [Tokens Essenciais](#tokens-essenciais)
4. [5 Componentes Core](#5-componentes-core)
5. [3 Layouts Padrão](#3-layouts-padrão)
6. [Receitas Comuns](#receitas-comuns)
7. [Migração para 100%](#migração-para-100)

---

## Quick Start

### Instalação (5 minutos)

```bash
# 1. Instalar dependências
npm install tailwindcss clsx tailwind-merge framer-motion lucide-react

# 2. Copiar arquivos do design system
/src
  /design-system
    /tokens
      primitives.ts
      flavors.ts
    /components
      Button.tsx
      Input.tsx
      Card.tsx
      Toast.tsx
      Modal.tsx
    /hooks
      useToast.ts
    index.ts
```

### Setup Tailwind (2 minutos)

```javascript
// tailwind.config.js
import { generateTailwindConfig } from './src/design-system/tokens/flavors'

export default generateTailwindConfig('ai-dev', 'light')
```

### Primeiro Componente (30 segundos)

```tsx
import { Button } from '@/design-system'

export default function App() {
  return (
    <Button variant="primary" size="md">
      Deploy Agent
    </Button>
  )
}
```

✅ **Pronto!** Você já tem design system funcionando.

---

## Filosofia 80/20

### O que está INCLUÍDO (80% dos casos)

✅ Botões (5 variants)  
✅ Inputs (text, email, password, number)  
✅ Cards (container universal)  
✅ Toasts (feedback global)  
✅ Modals (dialogs críticos)  
✅ 3 Layouts (Dashboard, Auth, Landing)  
✅ Dark mode automático  
✅ Estados visuais (hover, focus, disabled, loading, error)  

### O que NÃO está incluído (20% edge cases)

❌ Data tables complexas  
❌ Charts/gráficos  
❌ File upload com preview  
❌ Rich text editor  
❌ Calendário/date picker  
❌ Autocomplete avançado  
❌ Drag & drop  

**Se precisar:** Migre para versão 100% ou adicione componente específico.

---

## Tokens Essenciais

### Estrutura de 2 Camadas (simplificado)

```
Layer 1: Primitives → Valores crus (nunca usar direto)
Layer 2: Semantic → O que você usa no código
```

### Arquivo: `tokens/primitives.ts`

```typescript
// PRIMITIVES - Hardware do sistema
export const primitives = {
  // Spacing (base 4px)
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96
  },
  
  // Typography
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
}
```

### Arquivo: `tokens/flavors.ts`

```typescript
import { primitives } from './primitives'

// SEMANTIC TOKENS - O que você usa
export const semanticTokens = {
  color: {
    // Interactive
    primary: { light: '#2b2bee', dark: '#4d4dff' },
    primaryHover: { light: '#2020c8', dark: '#6666ff' },
    
    // Feedback
    success: { light: '#10b981', dark: '#34d399' },
    error: { light: '#ef4444', dark: '#f87171' },
    warning: { light: '#f59e0b', dark: '#fbbf24' },
    
    // Surface
    surface: { light: '#ffffff', dark: '#1c1c27' },
    surfaceElevated: { light: '#f6f6f8', dark: '#252538' },
    
    // Text
    textPrimary: { light: '#111118', dark: '#f9fafb' },
    textSecondary: { light: '#616189', dark: '#94a3b8' },
    
    // Border
    border: { light: '#dbdbe6', dark: '#334155' },
    borderFocus: { light: '#2b2bee', dark: '#4d4dff' }
  },
  
  typography: {
    fontFamily: {
      display: 'Space Grotesk, sans-serif',
      body: 'Noto Sans, sans-serif',
      mono: 'monospace'
    }
  }
}

// GERADOR TAILWIND CONFIG
export function generateTailwindConfig(mode: 'light' | 'dark') {
  const colors = Object.entries(semanticTokens.color).reduce((acc, [key, value]) => {
    acc[key] = value[mode]
    return acc
  }, {} as Record<string, string>)
  
  return {
    darkMode: 'class',
    theme: {
      extend: {
        colors,
        spacing: primitives.spacing,
        fontSize: primitives.fontSize,
        fontWeight: primitives.fontWeight,
        fontFamily: semanticTokens.typography.fontFamily,
        borderRadius: primitives.borderRadius,
        boxShadow: primitives.shadow
      }
    }
  }
}
```

### CSS Variables (auto-switch dark mode)

```css
/* globals.css */
:root {
  --primary: #2b2bee;
  --primary-hover: #2020c8;
  --success: #10b981;
  --error: #ef4444;
  --surface: #ffffff;
  --surface-elevated: #f6f6f8;
  --text-primary: #111118;
  --text-secondary: #616189;
  --border: #dbdbe6;
  --border-focus: #2b2bee;
}

.dark {
  --primary: #4d4dff;
  --primary-hover: #6666ff;
  --success: #34d399;
  --error: #f87171;
  --surface: #1c1c27;
  --surface-elevated: #252538;
  --text-primary: #f9fafb;
  --text-secondary: #94a3b8;
  --border: #334155;
  --border-focus: #4d4dff;
}
```

---

## 5 Componentes Core

### 1. Button

**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}
```

**Código:** `components/Button.tsx`

```tsx
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function Button({ 
  variant = 'primary', 
  size = 'md',
  isLoading,
  isDisabled,
  leftIcon,
  rightIcon,
  children,
  onClick
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  )
  
  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--border-focus)]',
    secondary: 'bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface)]',
    outline: 'bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]',
    destructive: 'bg-[var(--error)] text-white hover:opacity-90 focus:ring-[var(--error)]'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-base rounded-lg',
    lg: 'h-12 px-6 text-lg rounded-xl'
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size])}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          {children}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
}
```

**Exemplos de uso:**

```tsx
// Primary action
<Button variant="primary">Deploy Agent</Button>

// Loading state
<Button variant="primary" isLoading>Processing...</Button>

// With icons
import { Plus, ArrowRight } from 'lucide-react'
<Button variant="primary" leftIcon={<Plus size={16} />}>
  New Project
</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// Disabled
<Button variant="primary" isDisabled>Unavailable</Button>
```

---

### 2. Input

**Props:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number'
  label?: string
  placeholder?: string
  error?: string
  success?: string
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
}
```

**Código:** `components/Input.tsx`

```tsx
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle } from 'lucide-react'

export function Input({
  type = 'text',
  label,
  placeholder,
  error,
  success,
  isDisabled,
  leftIcon,
  value,
  onChange
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      
      <div className={cn(
        'relative flex items-center h-10 px-3 rounded-lg',
        'bg-[var(--surface)] border transition-all',
        error && 'border-[var(--error)]',
        success && 'border-[var(--success)]',
        !error && !success && 'border-[var(--border)]',
        isFocused && !error && 'border-[var(--border-focus)] ring-2 ring-[var(--border-focus)]/20',
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}>
        {leftIcon && (
          <span className="text-[var(--text-secondary)] mr-2">{leftIcon}</span>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        />
      </div>
      
      {error && (
        <p className="text-xs text-[var(--error)] flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-xs text-[var(--success)] flex items-center gap-1">
          <CheckCircle size={12} />
          {success}
        </p>
      )}
    </div>
  )
}
```

**Exemplos de uso:**

```tsx
import { Mail, Lock } from 'lucide-react'

// Basic input
<Input 
  label="Email"
  placeholder="you@example.com"
/>

// With icon
<Input 
  label="Email"
  leftIcon={<Mail size={16} />}
  placeholder="you@example.com"
/>

// Error state
<Input 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Success state
<Input 
  label="Username"
  success="Username is available"
/>

// Controlled
const [email, setEmail] = useState('')
<Input 
  value={email}
  onChange={setEmail}
  placeholder="Email"
/>
```

---

### 3. Card

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
  onClick?: () => void
}
```

**Código:** `components/Card.tsx`

```tsx
import { cn } from '@/lib/utils'

export function Card({ 
  children, 
  padding = 'md',
  elevated = false,
  onClick 
}: CardProps) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div 
      className={cn(
        'rounded-xl border border-[var(--border)]',
        'bg-[var(--surface)]',
        elevated ? 'shadow-lg' : 'shadow-sm',
        paddingStyles[padding],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
```

**Exemplos de uso:**

```tsx
// Basic card
<Card>
  <h3>API Requests</h3>
  <p className="text-2xl font-bold">1.2M</p>
</Card>

// Elevated (mais destaque)
<Card elevated>
  <h2>Premium Plan</h2>
  <p>$49/month</p>
</Card>

// Clickable
<Card onClick={() => navigate('/project/123')}>
  <h3>Neural-Net-v1</h3>
  <p>Production</p>
</Card>

// Custom padding
<Card padding="lg">
  <h1>Welcome</h1>
</Card>
```

---

### 4. Toast

**Sistema de notificações globais**

**Hook:** `hooks/useToast.ts`

```typescript
import { create } from 'zustand'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
      }, toast.duration || 5000)
    }
  },
  removeToast: (id) => set((state) => ({ 
    toasts: state.toasts.filter(t => t.id !== id) 
  }))
}))

export function useToast() {
  const { addToast } = useToastStore()
  
  return {
    success: (message: string) => addToast({ message, type: 'success' }),
    error: (message: string) => addToast({ message, type: 'error' }),
    warning: (message: string) => addToast({ message, type: 'warning' }),
    info: (message: string) => addToast({ message, type: 'info' })
  }
}
```

**Componente:** `components/Toast.tsx`

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useToastStore } from '@/hooks/useToast'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: 'border-[var(--success)] text-[var(--success)]',
  error: 'border-[var(--error)] text-[var(--error)]',
  warning: 'border-[var(--warning)] text-[var(--warning)]',
  info: 'border-[var(--primary)] text-[var(--primary)]'
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className={cn(
                'p-4 rounded-lg shadow-lg',
                'bg-[var(--surface-elevated)] border-l-4',
                colors[toast.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon size={20} />
                <p className="flex-1 text-sm text-[var(--text-primary)]">
                  {toast.message}
                </p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
```

**Setup no App:**

```tsx
// App.tsx ou layout principal
import { ToastContainer } from '@/design-system'

export default function App() {
  return (
    <>
      {/* Seu app */}
      <Routes>...</Routes>
      
      {/* Toast container (só incluir 1x) */}
      <ToastContainer />
    </>
  )
}
```

**Exemplos de uso:**

```tsx
import { useToast } from '@/design-system'

function DeployButton() {
  const toast = useToast()
  
  const handleDeploy = async () => {
    try {
      await deployAgent()
      toast.success('Agent deployed successfully')
    } catch (error) {
      toast.error('Deployment failed')
    }
  }
  
  return <Button onClick={handleDeploy}>Deploy</Button>
}
```

---

### 5. Modal

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
```

**Código:** `components/Modal.tsx`

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}: ModalProps) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-[var(--surface)] rounded-2xl shadow-xl z-50',
              'w-full mx-4',
              sizes[size]
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Exemplos de uso:**

```tsx
import { useState } from 'react'
import { Modal, Button, Input } from '@/design-system'

function NewProjectModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Project</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Create New Project"
        size="md"
      >
        <div className="space-y-4">
          <Input 
            label="Project Name"
            value={name}
            onChange={setName}
            placeholder="e.g., Neural-Net-v2"
          />
          
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
```

---

## 3 Layouts Padrão

### 1. Dashboard Layout

```tsx
// layouts/DashboardLayout.tsx
interface DashboardLayoutProps {
  sidebar: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
}

export function DashboardLayout({ sidebar, header, children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--surface)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border)] bg-[var(--surface-elevated)]">
        {sidebar}
      </aside>
      
      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-[var(--border)] bg-[var(--surface)]">
          {header}
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**Uso:**
```tsx
<DashboardLayout
  sidebar={<MySidebar />}
  header={<MyHeader />}
>
  <h1>Dashboard</h1>
  {/* Seu conteúdo */}
</DashboardLayout>
```

---

### 2. Auth Layout

```tsx
// layouts/AuthLayout.tsx
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-elevated)] p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
```

**Uso:**
```tsx
<AuthLayout>
  <Card>
    <h1>Login</h1>
    <Input label="Email" />
    <Input label="Password" type="password" />
    <Button variant="primary">Sign In</Button>
  </Card>
</AuthLayout>
```

---

### 3. Landing Layout

```tsx
// layouts/LandingLayout.tsx
export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl">INOVE AI</div>
          <Button variant="primary">Get Started</Button>
        </div>
      </nav>
      
      {/* Content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-8">
        <div className="max-w-7xl mx-auto text-center text-[var(--text-secondary)]">
          © 2024 INOVE AI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
```

---

## Receitas Comuns

### Login Form

```tsx
import { useState } from 'react'
import { Input, Button, Card } from '@/design-system'
import { Mail, Lock } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Login logic
  }
  
  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        
        <Input
          label="Email"
          type="email"
          leftIcon={<Mail size={16} />}
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock size={16} />}
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />
        
        <Button 
          variant="primary" 
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </form>
    </Card>
  )
}
```

---

### Stats Card Grid

```tsx
import { Card } from '@/design-system'
import { TrendingUp, TrendingDown } from 'lucide-react'

const stats = [
  { label: 'API Requests', value: '1.2M', change: '+12%', positive: true },
  { label: 'Active Nodes', value: '48/64', change: '0%', positive: true },
  { label: 'Avg Latency', value: '45ms', change: '-2ms', positive: true },
  { label: 'Monthly Cost', value: '$840', change: '+5%', positive: false }
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <div className="space-y-2">
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <div className={cn(
              'flex items-center gap-1 text-sm',
              stat.positive ? 'text-[var(--success)]' : 'text-[var(--error)]'
            )}>
              {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stat.change}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

---

### Confirmation Dialog

```tsx
import { Modal, Button } from '@/design-system'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  title,
  message
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-[var(--text-secondary)]">{message}</p>
        
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Uso
<ConfirmDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Delete Project"
  message="Are you sure? This action cannot be undone."
/>
```

---

## Migração para 100%

Quando precisar de componentes avançados (tabelas, charts, etc):

### Opção 1: Adicionar ao sistema
1. Criar componente seguindo padrões do 80/20
2. Adicionar em `/components`
3. Documentar

### Opção 2: Usar versão 100%
1. Consultar `DESIGN_SYSTEM_100.md`
2. Copiar componente específico
3. Instalar dependências extras se necessário

### Opção 3: Bibliotecas externas
Componentes complexos compatíveis:
- **Tabelas:** TanStack Table
- **Charts:** Recharts
- **Date Picker:** React Day Picker
- **Rich Text:** Tiptap

**Importante:** Sempre aplicar tokens do sistema:
```tsx
<ExternalTable
  className="border border-[var(--border)] rounded-lg"
  // Força visual do sistema
/>
```

---

## Utilities

### cn() helper

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Checklist de Setup Completo

```bash
✅ Instalar dependências
✅ Copiar /design-system
✅ Configurar Tailwind
✅ Adicionar CSS variables em globals.css
✅ Importar ToastContainer no App
✅ Criar primeira tela usando componentes
✅ Testar dark mode
✅ Fazer deploy de teste
```

**Tempo total:** ~2 horas  
**Cobertura:** 80% dos casos de uso

---

## Próximos Passos

1. **Validação:** Criar 3 telas diferentes usando só esses componentes
2. **Edge Cases:** Quando encontrar algo não coberto, avaliar:
   - Realmente preciso? (evite over-engineering)
   - Componente 100% resolve?
   - Preciso de biblioteca externa?
3. **Documentação:** Adicionar exemplos específicos do seu projeto
4. **Team Sync:** Treinar time nos 5 componentes core

---

## Suporte

- **Dúvidas:** Consultar `DESIGN_SYSTEM_100.md`
- **Bugs:** Reportar em issues
- **Features:** Propor novas adições

**Última atualização:** Dezembro 2024  
**Versão:** 1.0 (80/20)
