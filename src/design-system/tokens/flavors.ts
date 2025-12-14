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
            display: ['Space Grotesk', 'sans-serif'],
            body: ['Noto Sans', 'sans-serif'],
            mono: ['monospace']
        }
    }
}

// GERADOR TAILWIND CONFIG
export function generateTailwindConfig(mode: 'light' | 'dark') {
    // Nota: A configuração de cores aqui é estática para o tailwind.config.ts
    // O ideal é usar variáveis CSS para suportar dark mode dinâmico.
    // Vamos adaptar para usar as variáveis CSS que definiremos no globals.css

    return {
        darkMode: 'class',
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            "./*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}",
            "./layouts/**/*.{js,ts,jsx,tsx}"
        ],
        theme: {
            extend: {
                colors: {
                    primary: 'var(--primary)',
                    'primary-hover': 'var(--primary-hover)',
                    success: 'var(--success)',
                    error: 'var(--error)',
                    warning: 'var(--warning)',
                    info: 'var(--info)',
                    surface: 'var(--surface)',
                    'surface-elevated': 'var(--surface-elevated)',
                    'text-primary': 'var(--text-primary)',
                    'text-secondary': 'var(--text-secondary)',
                    border: 'var(--border)',
                    'border-focus': 'var(--border-focus)',

                    // Data Visualization
                    'chart-1': 'var(--chart-1)',
                    'chart-2': 'var(--chart-2)',
                    'chart-3': 'var(--chart-3)',
                    'chart-4': 'var(--chart-4)',
                    'chart-5': 'var(--chart-5)',
                },
                spacing: primitives.spacing,
                fontSize: primitives.fontSize,
                fontWeight: primitives.fontWeight,
                fontFamily: semanticTokens.typography.fontFamily,
                borderRadius: primitives.borderRadius,
                boxShadow: primitives.shadow
            }
        },
        plugins: [],
    }
}
