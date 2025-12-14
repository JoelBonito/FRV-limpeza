import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

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

                    {/* Modal Container com Scroll */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className={cn(
                                    'bg-[var(--surface)] rounded-2xl shadow-xl',
                                    'w-full my-8',
                                    sizes[size]
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                {title && (
                                    <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                                        <h2 className="text-xl font-bold text-[var(--text-primary)]">
                                            {title}
                                        </h2>
                                        <button
                                            onClick={onClose}
                                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
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
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
