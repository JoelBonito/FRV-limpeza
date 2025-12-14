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
    primary: 'bg-primary text-white shadow-sm shadow-primary/20',
    success: 'bg-success text-white shadow-sm',
    warning: 'bg-warning text-white shadow-sm',
    error: 'bg-error text-white shadow-sm',
    info: 'bg-info text-white shadow-sm',
}

// Soft variant styles (light background, colored text) - auto adapta dark mode
const softStyles: Record<BadgeColor, string> = {
    neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/15 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
}

// Outline variant styles (border only) - auto adapta dark mode
const outlineStyles: Record<BadgeColor, string> = {
    neutral: 'border border-border text-text-secondary bg-transparent',
    primary: 'border border-primary text-primary bg-transparent',
    success: 'border border-success text-success bg-transparent',
    warning: 'border border-warning text-warning bg-transparent',
    error: 'border border-error text-error bg-transparent',
    info: 'border border-info text-info bg-transparent',
}

// Dot indicator colors
const dotStyles: Record<BadgeColor, string> = {
    neutral: 'bg-slate-500',
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
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
