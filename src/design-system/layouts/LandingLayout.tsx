import { Button } from '../components/Button'

export function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--surface)]">
            {/* Navbar */}
            <nav className="border-b border-[var(--border)] px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="font-bold text-xl text-[var(--text-primary)]">INOVE AI</div>
                    <Button variant="primary">Get Started</Button>
                </div>
            </nav>

            {/* Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[var(--border)] px-6 py-8">
                <div className="max-w-7xl mx-auto text-center text-[var(--text-secondary)]">
                    © 2024 INOVE AI. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
