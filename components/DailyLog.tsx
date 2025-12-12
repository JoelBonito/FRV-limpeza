import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { Calendar, Phone, FileText, Check, Send, DollarSign, ShoppingBag, Mail } from 'lucide-react';

const DailyLog: React.FC = () => {
  const { addMetric, currentUser } = useSales();
  const [success, setSuccess] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    date: today,
    contactsMade: 0,
    quotesRequested: 0,
    quotesSent: 0,
    salesCount: 0,
    salesValue: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMetric({
      userId: currentUser.id,
      date: formData.date,
      contactsMade: Number(formData.contactsMade),
      quotesRequested: Number(formData.quotesRequested),
      quotesSent: Number(formData.quotesSent),
      salesCount: Number(formData.salesCount),
      salesValue: Number(formData.salesValue)
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData(prev => ({ 
      ...prev, 
      contactsMade: 0, 
      quotesRequested: 0,
      quotesSent: 0,
      salesCount: 0,
      salesValue: 0
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center animate-in fade-in duration-700 pb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Diário (Input)</h1>
        <p className="text-slate-500 font-medium mt-1">Alimente a planilha 'Diário'</p>
      </div>

      <div className="glass-panel bg-white/80 rounded-[2rem] overflow-hidden shadow-2xl shadow-cyan-900/5 border border-white">
        
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-4">
             <img 
               src={currentUser.avatar} 
               alt={currentUser.name} 
               className="w-14 h-14 rounded-full border-4 border-white shadow-sm object-cover" 
             />
             <div>
                <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-0.5">Vendedor</p>
                <h2 className="text-2xl font-bold text-slate-800">{currentUser.name}</h2>
             </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 animate-in bounce-in mb-4">
              <Check className="w-5 h-5 stroke-[3px]" />
              <span className="font-bold text-sm">Salvo com sucesso!</span>
            </div>
          )}

          {/* Date Row */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Data</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Contacts & Quotes Requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Contatos feitos</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={formData.contactsMade}
                  onFocus={handleFocus}
                  onChange={e => setFormData({...formData, contactsMade: parseInt(e.target.value) || 0})}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-lg font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Orçamentos solicitados</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={formData.quotesRequested}
                  onFocus={handleFocus}
                  onChange={e => setFormData({...formData, quotesRequested: parseInt(e.target.value) || 0})}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-lg font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quotes Sent & Sales Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Orçamentos enviados</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-500" />
                </div>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={formData.quotesSent}
                  onFocus={handleFocus}
                  onChange={e => setFormData({...formData, quotesSent: parseInt(e.target.value) || 0})}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-lg font-bold text-slate-800 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Qtde de vendas</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ShoppingBag className="h-5 w-5 text-emerald-500" />
                </div>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={formData.salesCount}
                  onFocus={handleFocus}
                  onChange={e => setFormData({...formData, salesCount: parseInt(e.target.value) || 0})}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-lg font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sales Value */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Valor vendido (R$)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <input 
                type="number" 
                min="0"
                step="0.01"
                required
                value={formData.salesValue}
                onFocus={handleFocus}
                onChange={e => setFormData({...formData, salesValue: parseFloat(e.target.value) || 0})}
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xl font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base mt-2"
          >
            <Send className="w-5 h-5" />
            Salvar no Diário
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyLog;