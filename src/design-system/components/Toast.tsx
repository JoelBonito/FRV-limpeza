import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useToastStore } from '../hooks/useToast'
import { cn } from '@/lib/utils'

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
