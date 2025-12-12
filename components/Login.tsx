import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const { login, users } = useSales();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email)) {
      setError('E-mail não encontrado. Tente um dos e-mails de demonstração.');
    }
  };

  const demoUsers = users.filter(u => u.role === 'Vendedor');
  const adminUser = users.find(u => u.role === 'Admin');

  return (
    <div className="h-screen w-full flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/30 mx-auto mb-4">
              TL
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">TopLimp SalesHub</h1>
            <p className="text-slate-500 font-medium mt-2">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wide">E-mail Corporativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.nome@toplimp.com"
                  className="block w-full pl-12 pr-4 py-4 bg-white/50 border border-white/60 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-800/20 hover:bg-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Entrar no Sistema
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-10 pt-6 border-t border-slate-200/50">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contas de Demonstração</p>
            
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {/* Admin Button */}
                {adminUser && (
                  <button 
                    onClick={() => setEmail(adminUser.email)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs">AD</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-purple-900">Acesso Gestor</p>
                      <p className="text-[10px] text-purple-600 font-mono">{adminUser.email}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
                
                {/* Sales Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {demoUsers.map(u => (
                    <button 
                      key={u.id}
                      onClick={() => setEmail(u.email)}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/40 hover:bg-white border border-white/60 transition-all text-center gap-1 group"
                    >
                      <img src={u.avatar} className="w-6 h-6 rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
                      <p className="text-[10px] font-medium text-slate-600 truncate w-full">{u.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">Clique em um usuário para preencher o e-mail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;