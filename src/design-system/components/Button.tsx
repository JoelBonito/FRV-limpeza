import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    isDisabled?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading,
    isDisabled,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = cn(
        'inline-flex items-center justify-center gap-2',
        'font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50'
    )

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-border-focus',
        secondary: 'bg-surface-elevated text-text-primary border border-border hover:bg-surface',
        outline: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',
        ghost: 'bg-transparent text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
        destructive: 'bg-error text-white hover:opacity-90 focus:ring-error'
    }

    const sizes = {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-xl'
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isDisabled || isLoading || disabled}
            {...props}
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
