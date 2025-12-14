import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    padding?: 'none' | 'sm' | 'md' | 'lg'
    elevated?: boolean
    onClick?: () => void
    className?: string
}

export function Card({
    children,
    padding = 'md',
    elevated = false,
    onClick,
    className
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
                'rounded-xl border border-border',
                'bg-surface',
                elevated ? 'shadow-lg' : 'shadow-sm',
                paddingStyles[padding],
                onClick && 'cursor-pointer hover:shadow-md transition-shadow',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
