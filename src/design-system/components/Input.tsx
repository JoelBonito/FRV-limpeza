import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string
    error?: string
    success?: string
    isDisabled?: boolean
    leftIcon?: React.ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({
    type = 'text',
    label,
    placeholder,
    error,
    success,
    isDisabled,
    leftIcon,
    value,
    onChange,
    onFocus,
    onBlur,
    className,
    disabled,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const isInputDisabled = isDisabled || disabled;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)
        onBlur?.(e)
    }

    return (
        <div className="flex flex-col gap-1.5 w-full">
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
                isInputDisabled && 'opacity-50 cursor-not-allowed',
                className
            )}>
                {leftIcon && (
                    <span className="text-[var(--text-secondary)] mr-2">{leftIcon}</span>
                )}

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isInputDisabled}
                    className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] w-full"
                    {...props}
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

