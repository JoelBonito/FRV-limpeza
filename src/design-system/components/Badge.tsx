import { cn } from '@/lib/utils'

type BadgeVariant = 'solid' | 'soft' | 'outline'
type BadgeColor = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
    children: React.ReactNode
    variant?: BadgeVariant
    color?: BadgeColor
    size?: BadgeSize
    withDot?: boolean
    icon?: React.ReactNode
    className?: string
}

// Solid variant styles (filled background, white text)
const solidStyles: Record<BadgeColor, string> = {
    neutral: 'bg-[#64748b] text-white shadow-sm',
    primary: 'bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/20',
    success: 'bg-[var(--success)] text-white shadow-sm',
    warning: 'bg-[var(--warning)] text-white shadow-sm',
    error: 'bg-[var(--error)] text-white shadow-sm',
    info: 'bg-[#3b82f6] text-white shadow-sm',
}

// Soft variant styles (light background, colored text) - auto adapta dark mode
const softStyles: Record<BadgeColor, string> = {
    neutral: 'bg-[#e2e8f0] text-[#475569] dark:bg-[#334155] dark:text-[#cbd5e1]',
    primary: 'bg-[#2b2bee]/10 text-[#2b2bee] dark:bg-[#4d4dff]/20 dark:text-[#6666ff]',
    success: 'bg-[#10b981]/10 text-[#10b981] dark:bg-[#34d399]/20 dark:text-[#6ee7b7]',
    warning: 'bg-[#fef3c7] text-[#b45309] dark:bg-[#fbbf24]/20 dark:text-[#fcd34d]', // amber-100 text-amber-700
    error: 'bg-[#ef4444]/10 text-[#ef4444] dark:bg-[#f87171]/20 dark:text-[#fca5a5]',
    info: 'bg-[#dbeafe] text-[#1d4ed8] dark:bg-[#3b82f6]/20 dark:text-[#60a5fa]', // blue-100 text-blue-700
}

// Outline variant styles (border only) - auto adapta dark mode
const outlineStyles: Record<BadgeColor, string> = {
    neutral: 'border border-[var(--border)] text-[var(--text-secondary)] bg-transparent',
    primary: 'border border-[var(--primary)] text-[var(--primary)] bg-transparent',
    success: 'border border-[var(--success)] text-[var(--success)] bg-transparent',
    warning: 'border border-[var(--warning)] text-[var(--warning)] bg-transparent',
    error: 'border border-[var(--error)] text-[var(--error)] bg-transparent',
    info: 'border border-[#3b82f6] text-[#3b82f6] bg-transparent',
}

// Dot indicator colors
const dotStyles: Record<BadgeColor, string> = {
    neutral: 'bg-[#64748b]',
    primary: 'bg-[var(--primary)]',
    success: 'bg-[var(--success)]',
    warning: 'bg-[var(--warning)]',
    error: 'bg-[var(--error)]',
    info: 'bg-[#3b82f6]',
}

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-0.5 text-xs gap-1.5',
    lg: 'px-3 py-1 text-sm gap-2',
}

export function Badge({
    children,
    variant = 'soft',
    color = 'neutral',
    size = 'md',
    withDot = false,
    icon,
    className
}: BadgeProps) {
    const variantStyleMap = {
        solid: solidStyles,
        soft: softStyles,
        outline: outlineStyles,
    }

    return (
        <span
            className={cn(
                'inline-flex items-center font-semibold rounded-md transition-colors',
                sizeStyles[size],
                variantStyleMap[variant][color],
                className
            )}
        >
            {withDot && (
                <span className={cn('w-1.5 h-1.5 rounded-full', dotStyles[color])} />
            )}
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </span>
    )
}
