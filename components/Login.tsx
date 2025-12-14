import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { AuthLayout, Card, Input, Button, useToast } from '@/design-system';
import { ArrowRight, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login, users } = useSales();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email)) {
      setError('E-mail não encontrado.');
      toast.error('E-mail não encontrado. Tente um dos e-mails de demonstração.');
    } else {
      toast.success('Login realizado com sucesso!');
    }
  };

  const demoUsers = users.filter(u => u.role === 'Vendedor');
  const adminUser = users.find(u => u.role === 'Admin');

  return (
    <AuthLayout>
      <Card elevated className="w-full bg-surface-elevated border-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/30 mx-auto mb-4">
            TL
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">TopLimp SalesHub</h1>
          <p className="text-text-secondary font-medium mt-1 text-sm">Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="E-MAIL CORPORATIVO"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.nome@toplimp.com"
            leftIcon={<Mail size={18} />}
            error={error}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            rightIcon={<ArrowRight size={18} />}
          >
            Entrar no Sistema
          </Button>
        </form>

        {/* Demo Credentials Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">
            Contas de Demonstração
          </p>

          <div className="space-y-3">
            {/* Admin Button */}
            {adminUser && (
              <Button
                variant="secondary"
                className="w-full justify-start h-auto py-3 px-4 bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-900 dark:text-purple-300"
                onClick={() => setEmail(adminUser.email)}
                leftIcon={
                  <div className="w-6 h-6 rounded bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-[10px] mr-2">
                    AD
                  </div>
                }
              >
                <div className="text-left">
                  <p className="text-xs font-bold">Acesso Gestor</p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-normal">{adminUser.email}</p>
                </div>
              </Button>
            )}

            {/* Sales Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {demoUsers.map(u => (
                <button
                  key={u.id}
                  onClick={() => setEmail(u.email)}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border transition-all text-center gap-1.5 group"
                >
                  <img src={u.avatar} className="w-8 h-8 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-medium text-text-secondary active:text-text-primary truncate w-full">{u.name.split(' ')[0]}</p>
                </button>
              ))}
            </div>

            <p className="text-[10px] text-center text-[var(--text-secondary)] opacity-70">
              Clique em um usuário para preencher o e-mail
            </p>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Login;