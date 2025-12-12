import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { DealStatus } from '../types';
import { Download, Calendar, FilterX, User as UserIcon } from 'lucide-react';

const Reports: React.FC = () => {
  const { deals, users } = useSales();
  const [dateFilter, setDateFilter] = useState('');

  const filteredDeals = deals.filter(deal => {
    if (!dateFilter) return true;
    return deal.createdAt.startsWith(dateFilter);
  });

  const getUserName = (id: string) => users.find(u => u.id === id)?.name || 'Desconhecido';

  const calculateTotal = () => filteredDeals.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Painel & Dados</h1>
          <p className="text-slate-500 font-medium mt-1">Exportação e análise (Painel Diário)</p>
        </div>
        <button className="flex items-center gap-2 bg-white/60 hover:bg-white text-slate-700 px-6 py-3 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 transition-all font-semibold backdrop-blur-sm">
          <Download className="w-5 h-5" />
          Exportar CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-[1.5rem] flex items-center gap-4">
        <div className="bg-cyan-50 p-2 rounded-xl text-cyan-600">
            <Calendar className="w-6 h-6" />
        </div>
        <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Filtrar por data analisada</span>
            <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent border-none p-0 text-slate-800 font-bold focus:ring-0 cursor-pointer text-lg w-full md:w-auto"
            />
        </div>
        {dateFilter && (
            <button 
                onClick={() => setDateFilter('')}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Limpar filtro"
            >
                <FilterX className="w-5 h-5" />
            </button>
        )}
      </div>

      {/* 
          MOBILE/TABLET VIEW: CARDS (Up to LG) 
          Replaces Table for iPad/iPhone to avoid horizontal scroll
      */}
      <div className="lg:hidden space-y-4">
          {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                  <div key={deal.id} className="glass-panel rounded-2xl p-5 border border-white/60 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                          <span className="text-xs font-bold text-slate-500 bg-white/50 px-2 py-1 rounded-lg">
                              {new Date(deal.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm
                            ${deal.status === DealStatus.APPROVED ? 'bg-emerald-100/80 text-emerald-700' : 
                              deal.status === DealStatus.LOST ? 'bg-red-100/80 text-red-700' : 'bg-slate-100/80 text-slate-600'}`}>
                            {deal.status}
                          </span>
                      </div>
                      
                      <div className="mb-4">
                          <h3 className="text-base font-bold text-slate-800 leading-tight mb-0.5">{deal.clientName}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                              <UserIcon className="w-3 h-3" />
                              <span>{getUserName(deal.userId)}</span>
                          </div>
                      </div>

                      <div className="pt-3 border-t border-white/40 flex justify-between items-center">
                          <span className="text-xs font-semibold text-slate-400 uppercase">Valor</span>
                          <span className="text-xl font-extrabold text-slate-700 tracking-tight">R$ {deal.value.toLocaleString('pt-BR')}</span>
                      </div>
                  </div>
              ))
          ) : (
            <div className="text-center py-10 text-slate-500 font-medium bg-white/30 rounded-2xl">
                Nenhum registro encontrado.
            </div>
          )}
          
          {/* Mobile Summary Footer */}
          <div className="glass-panel p-5 rounded-2xl mt-4 border border-cyan-100 bg-gradient-to-br from-white to-cyan-50">
             <div className="flex justify-between items-center">
                <span className="font-bold text-slate-600 uppercase tracking-wide text-xs">Total acumulado</span>
                <span className="font-black text-cyan-700 text-2xl">R$ {calculateTotal().toLocaleString('pt-BR')}</span>
             </div>
          </div>
      </div>

      {/* 
          DESKTOP VIEW: TABLE (LG and Up)
      */}
      <div className="hidden lg:block glass-panel rounded-[2rem] overflow-hidden border border-white/40 shadow-xl shadow-cyan-900/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/40">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendedor</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status orçamento</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-8 py-5 text-sm text-slate-600 font-medium">
                      {new Date(deal.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-800">
                      {getUserName(deal.userId)}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600 font-medium">
                      {deal.clientName}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm
                        ${deal.status === DealStatus.APPROVED ? 'bg-emerald-100/60 text-emerald-700' : 
                          deal.status === DealStatus.LOST ? 'bg-red-100/60 text-red-700' : 'bg-slate-100/60 text-slate-600'}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-800 font-bold font-mono text-right">
                      R$ {deal.value.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-500 font-medium">
                    Nenhum registro encontrado para este período.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-white/40 border-t border-white/50 backdrop-blur-md">
                <tr>
                    <td colSpan={4} className="px-8 py-6 text-right font-bold text-slate-600 uppercase tracking-wide text-xs">Total acumulado</td>
                    <td className="px-8 py-6 text-right font-black text-cyan-700 text-xl">R$ {calculateTotal().toLocaleString('pt-BR')}</td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;