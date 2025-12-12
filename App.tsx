import React, { useState } from 'react';
import { SalesProvider, useSales } from './context/SalesContext';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import DailyLog from './components/DailyLog';
import Reports from './components/Reports';
import Login from './components/Login';
import { UserRole } from './types';
import { LayoutDashboard, Kanban, ClipboardList, FileBarChart, Menu, X, LogOut, User as UserIcon } from 'lucide-react';

// --- Layout Component ---
const MainLayout: React.FC = () => {
  const { currentUser, switchUser, users, isAuthenticated, logout } = useSales();
  const [currentView, setCurrentView] = useState<'dashboard' | 'pipeline' | 'daily' | 'reports'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If not authenticated, show login
  if (!isAuthenticated || !currentUser) {
    return <Login />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Resumo (Meta)', icon: LayoutDashboard }, // Based on Resumo.csv
    { id: 'pipeline', label: 'Orçamentos', icon: Kanban }, // Based on Orçamentos.csv
    { id: 'daily', label: 'Diário (Contatos)', icon: ClipboardList }, // Based on Diário.csv
    { id: 'reports', label: 'Painel & Dados', icon: FileBarChart }, // Based on Painel Diário.csv
  ];

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'pipeline': return <Pipeline />;
      case 'daily': return <DailyLog />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex font-sans text-slate-800 bg-[#f0f9ff]">
      {/* Mobile/Tablet Header (Glass) - Visible up to LG breakpoint */}
      <div className="lg:hidden fixed top-0 left-0 right-0 glass-panel z-40 px-4 py-3 flex items-center gap-4 m-2 rounded-2xl shadow-sm transition-all duration-300">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="text-slate-600 p-2 hover:bg-white/50 rounded-xl transition-colors active:scale-95 border border-transparent hover:border-slate-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">TL</div>
            <span className="font-bold text-slate-800 tracking-tight">TopLimp</span>
        </div>
      </div>

      {/* 
          SIDEBAR / DRAWER
          Updated Pattern: Off-Canvas Slide-in (Left)
          - Fixed width (w-72) even on mobile
          - Slides in from left (-translate-x-full to translate-x-0)
          - Sits ON TOP of the overlay
      */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 flex flex-col glass-panel shadow-2xl transform transition-transform duration-300 ease-out
        lg:static lg:inset-auto lg:h-[calc(100vh-2rem)] lg:my-4 lg:ml-4 lg:rounded-[2rem] lg:shadow-lg lg:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Mobile Header inside Sidebar (Logo + Close Button) */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/40">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">TL</div>
              <span className="font-bold text-slate-800">Menu</span>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(false)} 
             className="p-2 bg-white/50 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-500 transition-all shadow-sm"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Desktop Header (Logo) - Hidden on Mobile to avoid duplication */}
        <div className="hidden lg:block p-8 pb-0">
          <div className="flex items-center gap-4 mb-10">
            {/* Logo: Blue/Cyan for Water/Cleanliness */}
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/30">
              TL
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">SalesHub</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">TopLimp v2.2</p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 pt-4 flex-1 overflow-y-auto">
          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                      ? 'text-white shadow-lg shadow-cyan-500/20' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                    }`}
                >
                  {isActive && (
                    /* Active State: Fresh Cyan to Blue gradient */
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 z-0"></div>
                  )}
                  <Icon className={`w-5 h-5 z-10 relative ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="z-10 relative">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-6 m-4 bg-white/40 rounded-[1.5rem] border border-white/50 shadow-sm mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img src={currentUser.avatar} alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" />
              {/* Online indicator: Green for Health/Ok */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500 truncate font-medium">{currentUser.role}</p>
            </div>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Switcher - ONLY VISIBLE TO ADMIN */}
          {currentUser.role === UserRole.ADMIN && (
            <div className="grid grid-cols-3 gap-2 border-t border-white/50 pt-4">
              {users.filter(u => u.role !== UserRole.ADMIN).map(u => (
                <button 
                  key={u.id} 
                  onClick={() => switchUser(u.id)}
                  className={`h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm border
                    ${currentUser.id === u.id 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30' 
                      : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-600'}`}
                  title={`Alternar para ${u.name}`}
                >
                  {u.name.charAt(0)}
                </button>
              ))}
              {/* Button to revert to Admin view if needed */}
              <button 
                  onClick={() => switchUser('admin')}
                  className={`h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm border
                    ${currentUser.role === UserRole.ADMIN && currentUser.id === 'admin'
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/30' 
                      : 'bg-purple-50 text-purple-400 border-purple-100 hover:bg-purple-100 hover:text-purple-600'}`}
                  title="Visão Gestor"
                >
                  AD
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen w-full relative pt-20 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto h-full pb-20 lg:pb-8">
          {renderView()}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar - Now distinct from the sidebar element */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SalesProvider>
      <MainLayout />
    </SalesProvider>
  );
};

export default App;