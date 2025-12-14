import { create } from 'zustand'

interface Toast {
    id: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

interface ToastStore {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9)
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))

        if (toast.duration !== 0) {
            setTimeout(() => {
                set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
            }, toast.duration || 5000)
        }
    },
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
    }))
}))

export function useToast() {
    const { addToast } = useToastStore()

    return {
        success: (message: string) => addToast({ message, type: 'success' }),
        error: (message: string) => addToast({ message, type: 'error' }),
        warning: (message: string) => addToast({ message, type: 'warning' }),
        info: (message: string) => addToast({ message, type: 'info' })
    }
}
