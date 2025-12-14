import React from 'react';
import { useSales } from '../context/SalesContext';
import { LayoutDashboard, Kanban, ClipboardList, FileBarChart, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface AppSidebarProps {
    currentView: 'dashboard' | 'pipeline' | 'daily' | 'reports';
    onViewChange: (view: 'dashboard' | 'pipeline' | 'daily' | 'reports') => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ currentView, onViewChange }) => {
    const { currentUser, switchUser, users, logout } = useSales();
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navItems = [
        { id: 'dashboard', label: 'Resumo (Meta)', icon: LayoutDashboard },
        { id: 'pipeline', label: 'Orçamentos', icon: Kanban },
        { id: 'daily', label: 'Diário (Contatos)', icon: ClipboardList },
        { id: 'reports', label: 'Painel & Dados', icon: FileBarChart },
    ];

    if (!currentUser) return null;

    return (
        <div className="h-full flex flex-col bg-[var(--surface-elevated)] border-r border-[var(--border)]">
            {/* Logo */}
            <div className="p-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30">
                        TL
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold tracking-tight text-[var(--text-primary)]">SalesHub</h1>
                        <p className="text-[10px] text-[var(--text-secondary)] font-medium tracking-wide uppercase">TopLimp v2.2</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative overflow-hidden group
                                ${isActive
                                    ? 'text-white shadow-lg shadow-cyan-500/20'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 z-0"></div>
                            )}
                            <Icon className={`w-5 h-5 z-10 relative flex-shrink-0 ${isActive ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`} />
                            <span className="z-10 relative">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Theme Toggle - NEW */}
            <div className="px-4 pb-2">
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs font-medium"
                >
                    <span>Modo Escuro</span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isDark ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </button>
            </div>


            {/* User Profile */}
            <div className="p-4 border-t border-[var(--border)]">
                <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-[var(--surface)] shadow-md object-cover" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[var(--surface)] rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[var(--text-primary)] truncate">{currentUser.name}</p>
                            <p className="text-xs text-[var(--text-secondary)] truncate font-medium">{currentUser.role}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="text-[var(--text-secondary)] hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                            title="Sair"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>

                    {/* User Switcher - ONLY VISIBLE TO ADMIN */}
                    {currentUser.role === UserRole.ADMIN && (
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border)]">
                            {users.filter(u => u.role !== UserRole.ADMIN).map(u => (
                                <button
                                    key={u.id}
                                    onClick={() => switchUser(u.id)}
                                    className={`h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm border
                                        ${currentUser.id === u.id
                                            ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30'
                                            : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'}`}
                                    title={`Alternar para ${u.name}`}
                                >
                                    {u.name.charAt(0)}
                                </button>
                            ))}
                            <button
                                onClick={() => switchUser('admin')}
                                className={`h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm border
                                    ${currentUser.role === UserRole.ADMIN && currentUser.id === 'admin'
                                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/30'
                                        : 'bg-purple-50 text-purple-400 border-purple-200 hover:bg-purple-100 hover:text-purple-600'}`}
                                title="Visão Gestor"
                            >
                                AD
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppSidebar;
