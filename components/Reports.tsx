import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { DealStatus } from '../types';
import { Download, Calendar, FilterX, User as UserIcon } from 'lucide-react';
import { Card, Button, Badge } from '@/design-system';

const Reports: React.FC = () => {
  const { deals, users } = useSales();
  const [dateFilter, setDateFilter] = useState('');

  const filteredDeals = deals.filter(deal => {
    if (!dateFilter) return true;
    return deal.createdAt.startsWith(dateFilter);
  });

  const getUserName = (id: string) => users.find(u => u.id === id)?.name || 'Desconhecido';

  const calculateTotal = () => filteredDeals.reduce((acc, curr) => acc + curr.value, 0);

  const getStatusVariant = (status: DealStatus): 'success' | 'error' | 'neutral' => {
    if (status === DealStatus.APPROVED) return 'success';
    if (status === DealStatus.LOST) return 'error';
    return 'neutral';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">Painel & Dados</h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1">Exportação e análise (Painel Diário)</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download className="w-5 h-5" />}
        >
          Exportar CSV
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="flex items-center gap-4 bg-[var(--surface-elevated)] border-[var(--border)]">
        <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-xl text-cyan-600 dark:text-cyan-400">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">Filtrar por data analisada</span>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-transparent border-none p-0 text-[var(--text-primary)] font-bold focus:ring-0 cursor-pointer text-lg w-full md:w-auto"
          />
        </div>
        {dateFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateFilter('')}
            title="Limpar filtro"
          >
            <FilterX className="w-5 h-5" />
          </Button>
        )}
      </Card>

      {/* MOBILE/TABLET VIEW: CARDS */}
      <div className="lg:hidden space-y-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <Card key={deal.id} className="relative overflow-hidden bg-[var(--surface)] border-[var(--border)]">
              <div className="flex justify-between items-start mb-4">
                <Badge color="neutral" size="sm">
                  {new Date(deal.createdAt).toLocaleDateString('pt-BR')}
                </Badge>
                <Badge color={getStatusVariant(deal.status)} size="sm">
                  {deal.status}
                </Badge>
              </div>

              <div className="mb-4">
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight mb-0.5">{deal.clientName}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-2">
                  <UserIcon className="w-3 h-3" />
                  <span>{getUserName(deal.userId)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase">Valor</span>
                <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">R$ {deal.value.toLocaleString('pt-BR')}</span>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-10 text-[var(--text-secondary)] font-medium bg-[var(--surface-elevated)] border-[var(--border)]">
            Nenhum registro encontrado.
          </Card>
        )}

        {/* Mobile Summary Footer */}
        <Card className="border-cyan-100 dark:border-cyan-900 bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-cyan-900/40">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide text-xs">Total acumulado</span>
            <span className="font-black text-cyan-700 dark:text-cyan-400 text-2xl">R$ {calculateTotal().toLocaleString('pt-BR')}</span>
          </div>
        </Card>
      </div>

      {/* DESKTOP VIEW: TABLE */}
      <div className="hidden lg:block">
        <Card padding="none" elevated className="overflow-hidden bg-[var(--surface-elevated)] border-[var(--border)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Data</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Vendedor</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-[var(--surface)] transition-colors group">
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] font-medium">
                        {new Date(deal.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[var(--text-primary)]">
                        {getUserName(deal.userId)}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] font-medium">
                        {deal.clientName}
                      </td>
                      <td className="px-6 py-4">
                        <Badge color={getStatusVariant(deal.status)} size="sm">
                          {deal.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-primary)] font-bold font-mono text-right">
                        R$ {deal.value.toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-[var(--text-secondary)] font-medium">
                      Nenhum registro encontrado para este período.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-[var(--surface)] border-t border-[var(--border)]">
                <tr>
                  <td colSpan={4} className="px-6 py-5 text-right font-bold text-[var(--text-secondary)] uppercase tracking-wide text-xs">Total acumulado</td>
                  <td className="px-6 py-5 text-right font-black text-cyan-700 dark:text-cyan-400 text-xl">R$ {calculateTotal().toLocaleString('pt-BR')}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;