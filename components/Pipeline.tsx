import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { Deal, DealStatus, UserRole } from '../types';
import { Plus, Search, Filter, AlertCircle, CheckCircle, Clock, XCircle, Send, MoreHorizontal, Calendar, User as UserIcon, Tag, DollarSign, ChevronRight } from 'lucide-react';

const StatusBadge = ({ status, compact = false }: { status: DealStatus, compact?: boolean }) => {
  const styles = {
    [DealStatus.PENDING]: 'bg-amber-100/80 text-amber-700 border-amber-200',
    [DealStatus.SENT]: 'bg-blue-100/80 text-blue-700 border-blue-200',
    [DealStatus.APPROVED]: 'bg-emerald-100/80 text-emerald-700 border-emerald-200',
    [DealStatus.LOST]: 'bg-red-100/80 text-red-700 border-red-200',
  };

  const icons = {
    [DealStatus.PENDING]: <Clock className="w-3.5 h-3.5 mr-1.5" />,
    [DealStatus.SENT]: <Send className="w-3.5 h-3.5 mr-1.5" />,
    [DealStatus.APPROVED]: <CheckCircle className="w-3.5 h-3.5 mr-1.5" />,
    [DealStatus.LOST]: <XCircle className="w-3.5 h-3.5 mr-1.5" />,
  };

  return (
    <span className={`inline-flex items-center ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'} rounded-full font-bold border backdrop-blur-md shadow-sm ${styles[status]}`}>
      {!compact && icons[status]}
      {status}
    </span>
  );
};

const Pipeline: React.FC = () => {
  const { deals, updateDealStatus, addDeal, currentUser, users } = useSales();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = currentUser.role === UserRole.ADMIN;

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    value: '',
    status: DealStatus.PENDING,
    isInactive: false,
    isRescue: false
  });

  // Filter Logic
  const filteredDeals = deals.filter(deal => {
    // 1. Permission Filter: Admin sees all, User sees only theirs
    const hasPermission = isAdmin ? true : deal.userId === currentUser.id;
    if (!hasPermission) return false;

    // 2. Status Filter
    const matchesStatus = filterStatus === 'ALL' || deal.status === filterStatus;
    
    // 3. Search Filter
    const matchesSearch = deal.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getUserName = (id: string) => {
    const u = users.find(user => user.id === id);
    return u ? u.name : 'Desconhecido';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.value) return;

    addDeal({
      clientId: 'temp-id',
      clientName: formData.clientName,
      userId: currentUser.id,
      status: formData.status,
      value: parseFloat(formData.value),
      isRescue: formData.isRescue,
      createdAt: new Date(formData.date).toISOString() // Use selected date
    });
    
    setIsModalOpen(false);
    setFormData({ 
      date: new Date().toISOString().split('T')[0],
      clientName: '', 
      value: '', 
      status: DealStatus.PENDING,
      isInactive: false, 
      isRescue: false 
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Orçamentos</h1>
          <p className="text-slate-500 font-medium mt-1">
            {isAdmin ? 'Visão Geral (Todos os vendedores)' : 'Gerencie seus orçamentos'}
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/20 transition-all hover:scale-105 active:scale-95 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Novo Orçamento
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-2 rounded-[1.5rem] flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-1 overflow-x-auto p-1 w-full sm:w-auto scrollbar-hide">
          <button 
            onClick={() => setFilterStatus('ALL')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${filterStatus === 'ALL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:bg-white/40'}`}
          >
            Todos
          </button>
          {Object.values(DealStatus).map(status => (
            <button 
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${filterStatus === status ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:bg-white/40'}`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72 mr-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar Cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-sm font-medium focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 
          MOBILE/TABLET VIEW: CARDS (Up to LG)
          (Hidden on desktop, replaces table to avoid horizontal scroll on iPhone/iPad)
      */}
      <div className="lg:hidden space-y-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <div key={deal.id} className="glass-panel rounded-2xl p-5 border border-white/60 shadow-sm relative overflow-hidden">
               {/* Status Line */}
               <div className="flex justify-between items-start mb-3">
                  <StatusBadge status={deal.status} compact />
                  <span className="text-xs font-mono text-slate-400">#{deal.id}</span>
               </div>
               
               {/* Main Content */}
               <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{deal.clientName}</h3>
                  <div className="text-2xl font-extrabold text-slate-700 tracking-tight">
                    R$ {deal.value.toLocaleString('pt-BR')}
                  </div>
               </div>

               {/* Meta Data Grid */}
               <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mb-4">
                  {isAdmin && (
                    <div className="col-span-2 flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                       <UserIcon className="w-3.5 h-3.5 text-cyan-600" />
                       <span className="font-bold">{getUserName(deal.userId)}</span>
                    </div>
                  )}
                  {deal.isRescue && (
                    <div className="col-span-2 flex items-center gap-1.5 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span className="font-bold">Cliente Resgatado</span>
                    </div>
                  )}
               </div>

               {/* Actions */}
               <div className="relative mt-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Alterar Status</label>
                  <div className="relative">
                    <select 
                      value={deal.status}
                      onChange={(e) => updateDealStatus(deal.id, e.target.value as DealStatus)}
                      className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold py-3 pl-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-sm"
                    >
                      {Object.values(DealStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <MoreHorizontal className="w-4 h-4" />
                    </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
           <div className="text-center py-10 text-slate-500 font-medium bg-white/30 rounded-2xl">
              Nenhum orçamento encontrado.
           </div>
        )}
      </div>

      {/* 
          DESKTOP VIEW: TABLE (LG and up)
          (Hidden on mobile/tablet)
      */}
      <div className="hidden lg:block glass-panel rounded-[2rem] overflow-hidden border border-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/40">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor (R$)</th>
                {isAdmin && <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendedor</th>}
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status orçamento</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Inativo resgatado?</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Mover Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-800 text-base">{deal.clientName}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">ID: #{deal.id}</div>
                    </td>
                    <td className="px-8 py-5 text-slate-700 font-bold font-mono">
                      R$ {deal.value.toLocaleString('pt-BR')}
                    </td>
                    {isAdmin && (
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold">
                              {getUserName(deal.userId).charAt(0)}
                           </div>
                           <span className="text-sm font-medium text-slate-700">{getUserName(deal.userId)}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-8 py-5">
                      <StatusBadge status={deal.status} />
                    </td>
                    <td className="px-8 py-5">
                      {deal.isRescue ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-red-700 font-bold bg-red-100/80 px-2.5 py-1 rounded-lg border border-red-200/50">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Sim
                        </span>
                      ) : (
                         <span className="text-xs text-slate-400 font-medium">Não</span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="relative inline-block">
                        <select 
                          value={deal.status}
                          onChange={(e) => updateDealStatus(deal.id, e.target.value as DealStatus)}
                          className="appearance-none bg-white/50 border border-white/60 text-slate-700 text-sm font-semibold py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30 hover:bg-white/80 transition-all"
                        >
                          {Object.values(DealStatus).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                           <MoreHorizontal className="w-4 h-4" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-8 py-16 text-center text-slate-500 font-medium">
                    Nenhum orçamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Liquid Modal - Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md p-8 rounded-[2rem] shadow-2xl shadow-cyan-900/10 animate-in zoom-in-95 duration-300 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Background Blob decoration for modal */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Novo Orçamento</h2>
                <p className="text-sm text-slate-500">Formulário de lançamento</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white/50 p-2 rounded-full hover:bg-white transition-all">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              
              {/* Row 1: Data & Vendedor */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Data</label>
                  <input 
                    type="date" 
                    required
                    className="w-full glass-input px-3 py-2.5 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-cyan-500/50"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1"><UserIcon className="w-3 h-3"/> Vendedor</label>
                  <input 
                    type="text" 
                    readOnly
                    className="w-full bg-slate-100/50 border border-slate-200 px-3 py-2.5 rounded-xl font-bold text-slate-500 cursor-not-allowed"
                    value={currentUser.name}
                  />
                </div>
              </div>

              {/* Row 2: Cliente */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1"><UserIcon className="w-3 h-3"/> Cliente</label>
                <input 
                  type="text" 
                  required
                  className="w-full glass-input px-3 py-2.5 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/50"
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  placeholder="Ex: Condomínio Jardins"
                />
              </div>

              {/* Row 3: Status */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1"><Tag className="w-3 h-3"/> Status Orçamento</label>
                 <div className="relative">
                   <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as DealStatus})}
                    className="w-full glass-input px-3 py-2.5 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-cyan-500/50 appearance-none"
                   >
                     {Object.values(DealStatus).map(s => (
                       <option key={s} value={s}>{s}</option>
                     ))}
                   </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                     <MoreHorizontal className="w-4 h-4" />
                   </div>
                 </div>
              </div>
              
              {/* Row 4: Inativo Checks - ALWAYS VISIBLE */}
              <div className="bg-white/40 p-3 rounded-2xl border border-white/50 space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="isInactive"
                    checked={formData.isInactive}
                    onChange={e => setFormData({...formData, isInactive: e.target.checked})}
                    className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500 bg-white/50"
                  />
                  <label htmlFor="isInactive" className="ml-2 text-sm font-medium text-slate-700">Cliente inativo? (Sim/Não)</label>
                </div>

                <div className="flex items-center pl-6">
                    <input 
                      type="checkbox" 
                      id="isRescue"
                      checked={formData.isRescue}
                      onChange={e => setFormData({...formData, isRescue: e.target.checked})}
                      className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 bg-white/50"
                    />
                    <label htmlFor="isRescue" className="ml-2 text-sm font-bold text-red-700">Inativo resgatado? (Sim/Não)</label>
                </div>
              </div>

              {/* Row 5: Valor */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Valor (R$)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.01"
                  className="w-full glass-input px-3 py-2.5 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/50"
                  value={formData.value}
                  onChange={e => setFormData({...formData, value: e.target.value})}
                  placeholder="0,00"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/50 text-slate-600 font-bold rounded-xl hover:bg-white hover:text-slate-800 transition-colors border border-white/60"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  // Action: Cyan (Clean)
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-[1.02]"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pipeline;