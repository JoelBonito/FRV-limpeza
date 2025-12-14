import { useState } from 'react'
import { Menu } from 'lucide-react'

interface DashboardLayoutProps {
    sidebar: React.ReactNode
    header?: React.ReactNode
    children: React.ReactNode
    isOpen?: boolean
    onOpenChange?: (isOpen: boolean) => void
}

export function DashboardLayout({ sidebar, header, children, isOpen, onOpenChange }: DashboardLayoutProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false)

    // Controlled or Uncontrolled state pattern
    const isMobileSidebarOpen = isOpen !== undefined ? isOpen : internalIsOpen
    const setIsMobileSidebarOpen = onOpenChange || setInternalIsOpen

    return (
        <div className="flex h-screen supports-[height:100dvh]:h-[100dvh] bg-[var(--surface)] overflow-hidden">
            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Desktop: sempre visível, Mobile: slide-in */}
            <aside className={`
                fixed xl:static inset-y-0 left-0 z-50 w-64 
                border-r border-[var(--border)] bg-[var(--surface-elevated)]
                transform transition-transform duration-300 ease-in-out
                ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
            `}>
                {sidebar}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
                {/* Header (Optional) ou Mobile Header com Hambúrguer */}
                <header className="h-14 xl:h-16 border-b border-[var(--border)] bg-[var(--surface)] flex items-center px-4 flex-shrink-0">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="xl:hidden p-2 rounded-lg hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] transition-colors mr-3"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Custom Header Content */}
                    {header || (
                        <div className="flex-1">
                            <h1 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
                                SalesHub
                            </h1>
                        </div>
                    )}
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
