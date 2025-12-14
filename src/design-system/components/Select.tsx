import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, Check, Loader2 } from 'lucide-react'

type SelectSize = 'sm' | 'md' | 'lg'

interface SelectOption {
    value: string
    label: string
    group?: string
    disabled?: boolean
}

interface SelectProps {
    label?: string
    placeholder?: string
    options: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    size?: SelectSize
    disabled?: boolean
    error?: boolean | string
    loading?: boolean
    className?: string
}

const sizeStyles: Record<SelectSize, string> = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-12 text-base px-4',
}

export function Select({
    label,
    placeholder = 'Selecione...',
    options,
    value,
    onChange,
    size = 'md',
    disabled = false,
    error = false,
    loading = false,
    className
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const selectedOption = options.find(opt => opt.value === value)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault()
                if (isOpen && highlightedIndex >= 0) {
                    const option = options[highlightedIndex]
                    if (!option.disabled) {
                        onChange?.(option.value)
                        setIsOpen(false)
                    }
                } else {
                    setIsOpen(true)
                }
                break
            case 'ArrowDown':
                e.preventDefault()
                if (!isOpen) {
                    setIsOpen(true)
                } else {
                    setHighlightedIndex(prev =>
                        prev < options.length - 1 ? prev + 1 : 0
                    )
                }
                break
            case 'ArrowUp':
                e.preventDefault()
                if (isOpen) {
                    setHighlightedIndex(prev =>
                        prev > 0 ? prev - 1 : options.length - 1
                    )
                }
                break
            case 'Escape':
                setIsOpen(false)
                break
        }
    }

    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return
        onChange?.(option.value)
        setIsOpen(false)
    }

    // Group options if they have groups
    const groupedOptions = options.reduce((acc, option) => {
        const group = option.group || ''
        if (!acc[group]) acc[group] = []
        acc[group].push(option)
        return acc
    }, {} as Record<string, SelectOption[]>)

    const hasGroups = Object.keys(groupedOptions).some(key => key !== '')

    return (
        <div className={cn('w-full', className)} ref={containerRef}>
            {label && (
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={cn(
                        'w-full flex items-center justify-between gap-2 rounded-xl border transition-all outline-none',
                        'bg-[var(--surface)] text-left font-medium',
                        sizeStyles[size],
                        isOpen && 'ring-2 ring-[var(--primary)]/30 border-[var(--primary)]',
                        error
                            ? 'border-red-400 ring-red-100'
                            : 'border-[var(--border)] hover:border-slate-400',
                        disabled && 'opacity-50 cursor-not-allowed bg-slate-50',
                        !disabled && 'cursor-pointer'
                    )}
                >
                    <span className={cn(
                        'truncate',
                        selectedOption ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'
                    )}>
                        {selectedOption?.label || placeholder}
                    </span>

                    <div className="flex items-center gap-1 flex-shrink-0">
                        {loading ? (
                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                        ) : (
                            <ChevronDown className={cn(
                                'w-4 h-4 text-slate-400 transition-transform',
                                isOpen && 'rotate-180'
                            )} />
                        )}
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                    <ul
                        ref={listRef}
                        className={cn(
                            'absolute z-50 w-full mt-1 py-1 rounded-xl border border-[var(--border)]',
                            'bg-[var(--surface)] shadow-lg shadow-slate-200/50',
                            'max-h-60 overflow-auto',
                            'animate-in fade-in slide-in-from-top-2 duration-150'
                        )}
                    >
                        {hasGroups ? (
                            Object.entries(groupedOptions).map(([group, groupOptions], groupIndex) => (
                                <div key={group || groupIndex}>
                                    {group && (
                                        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {group}
                                        </div>
                                    )}
                                    {groupOptions.map((option) => {
                                        const globalIndex = options.findIndex(o => o.value === option.value)
                                        return (
                                            <li
                                                key={option.value}
                                                onClick={() => handleSelect(option)}
                                                onMouseEnter={() => setHighlightedIndex(globalIndex)}
                                                className={cn(
                                                    'flex items-center justify-between gap-2 px-3 py-2 cursor-pointer transition-colors',
                                                    'text-slate-700 dark:text-slate-200',
                                                    highlightedIndex === globalIndex && 'bg-slate-50 dark:bg-slate-800',
                                                    option.value === value && 'bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)]',
                                                    option.disabled && 'opacity-40 cursor-not-allowed'
                                                )}
                                            >
                                                <span className="truncate text-sm font-medium">
                                                    {option.label}
                                                </span>
                                                {option.value === value && (
                                                    <Check className="w-4 h-4 flex-shrink-0" />
                                                )}
                                            </li>
                                        )
                                    })}
                                </div>
                            ))
                        ) : (
                            options.map((option, index) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleSelect(option)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={cn(
                                        'flex items-center justify-between gap-2 px-3 py-2 cursor-pointer transition-colors',
                                        'text-slate-700 dark:text-slate-200',
                                        highlightedIndex === index && 'bg-slate-50 dark:bg-slate-800',
                                        option.value === value && 'bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)]',
                                        option.disabled && 'opacity-40 cursor-not-allowed'
                                    )}
                                >
                                    <span className="truncate text-sm font-medium">
                                        {option.label}
                                    </span>
                                    {option.value === value && (
                                        <Check className="w-4 h-4 flex-shrink-0" />
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            {/* Error Message */}
            {typeof error === 'string' && error && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
            )}
        </div>
    )
}
