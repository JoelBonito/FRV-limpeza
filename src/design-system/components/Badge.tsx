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
    neutral: 'bg-slate-500 text-white shadow-sm',
    primary: 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30',
    success: 'bg-emerald-500 text-white shadow-sm',
    warning: 'bg-amber-500 text-white shadow-sm',
    error: 'bg-red-500 text-white shadow-sm',
    info: 'bg-blue-500 text-white shadow-sm',
}

// Soft variant styles (light background, dark text)
const softStyles: Record<BadgeColor, string> = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    primary: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
}

// Outline variant styles (border only)
const outlineStyles: Record<BadgeColor, string> = {
    neutral: 'border border-slate-200 text-slate-600 bg-transparent dark:border-slate-600 dark:text-slate-400',
    primary: 'border border-cyan-200 text-cyan-700 bg-transparent dark:border-cyan-800 dark:text-cyan-400',
    success: 'border border-emerald-200 text-emerald-700 bg-transparent dark:border-emerald-800 dark:text-emerald-400',
    warning: 'border border-amber-200 text-amber-700 bg-transparent dark:border-amber-800 dark:text-amber-400',
    error: 'border border-red-200 text-red-700 bg-transparent dark:border-red-800 dark:text-red-400',
    info: 'border border-blue-200 text-blue-700 bg-transparent dark:border-blue-800 dark:text-blue-400',
}

// Dot indicator colors
const dotStyles: Record<BadgeColor, string> = {
    neutral: 'bg-slate-500',
    primary: 'bg-cyan-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
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
