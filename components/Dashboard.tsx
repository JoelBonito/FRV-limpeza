import React, { useMemo } from 'react';
import { useSales } from '../context/SalesContext';
import { DealStatus, UserType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { DollarSign, Target, TrendingUp, Users, ArrowUpRight, ShieldCheck } from 'lucide-react';

const KPICard = ({ title, value, subtext, icon: Icon, colorFrom, colorTo, trend, iconColor }: any) => (
  <div className="glass-card p-6 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 border-white/60">
    {/* Soft glow behind */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${colorFrom} ${colorTo} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
    
    <div className="flex justify-between items-start z-10">
      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${colorFrom} ${colorTo} text-white shadow-lg shadow-gray-200/50`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100/60 px-2 py-1 rounded-full border border-emerald-200/50 backdrop-blur-sm">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
        </div>
      )}
    </div>
    
    <div className="mt-6 z-10">
      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
      <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { deals, users, metrics } = useSales();

  // --- Calculations ---
  const totalSales = useMemo(() => 
    deals.filter(d => d.status === DealStatus.APPROVED).reduce((acc, d) => acc + d.value, 0),
  [deals]);

  const globalGoal = useMemo(() => users.reduce((acc, u) => acc + u.monthlyGoal, 0), [users]);
  const percentAchieved = Math.round((totalSales / globalGoal) * 100);

  const totalContacts = useMemo(() => metrics.reduce((acc, m) => acc + m.contactsMade, 0), [metrics]);
  const totalQuotesRequested = useMemo(() => metrics.reduce((acc, m) => acc + m.quotesRequested, 0), [metrics]);
  const totalQuotesSent = useMemo(() => deals.filter(d => d.status !== DealStatus.PENDING).length, [deals]);
  const totalClosed = useMemo(() => deals.filter(d => d.status === DealStatus.APPROVED).length, [deals]);

  const salesByPersonData = useMemo(() => {
    return users.map(user => {
      const userSales = deals
        .filter(d => d.userId === user.id && d.status === DealStatus.APPROVED)
        .reduce((acc, d) => acc + d.value, 0);
      return {
        name: user.name,
        sales: userSales,
        goal: user.monthlyGoal,
        amt: userSales
      };
    });
  }, [users, deals]);

  // "Taxa de Conversão" is not in spreadsheet headers explicitly but implied by pipeline movement
  const conversionRate = totalQuotesSent > 0 ? Math.round((totalClosed / totalQuotesSent) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Resumo (Meta)</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Visão consolidada da Planilha Resumo
          </p>
        </div>
        
        <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-3 bg-white/60">
           <div className="flex flex-col items-end">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">% da meta</span>
               <span className="text-lg font-bold text-cyan-600">{percentAchieved}%</span>
           </div>
           <div className="w-12 h-12 relative">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                {/* Cyan Stroke for Progress (Water/Clean) */}
                <circle cx="24" cy="24" r="20" stroke="#06b6d4" strokeWidth="4" fill="transparent" strokeDasharray={125} strokeDashoffset={125 - (125 * percentAchieved) / 100} className="transition-all duration-1000 ease-out" />
             </svg>
           </div>
        </div>
      </div>

      {/* KPI Grid - Terms matched with Resumo.csv */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total vendido (R$)" 
          value={`R$ ${totalSales.toLocaleString('pt-BR', { notation: 'compact' })}`} 
          subtext={`Meta mensal: R$ ${globalGoal.toLocaleString('pt-BR', { notation: 'compact' })}`}
          icon={DollarSign}
          // Green: Kitchens/Preparation (Health/Money/Growth)
          colorFrom="from-emerald-400"
          colorTo="to-emerald-600"
          trend="+12%"
        />
        <KPICard 
          title="Falta p/ meta (R$)" 
          value={`R$ ${(globalGoal - totalSales).toLocaleString('pt-BR', { notation: 'compact' })}`} 
          subtext="Necessário acelerar"
          icon={Target}
          // Blue: General Areas/Low Risk (Trust)
          colorFrom="from-blue-400"
          colorTo="to-blue-600"
        />
        <KPICard 
          title="Contatos (mês)" 
          value={totalContacts} 
          subtext="Volume total"
          icon={Users}
          // Yellow: Work Areas/Intense Cleaning (Warning/Action Needed)
          colorFrom="from-amber-400"
          colorTo="to-amber-500"
        />
         <KPICard 
          title="Taxa de Conversão" 
          value={`${conversionRate}%`} 
          subtext="Enviados > Vendidos"
          icon={TrendingUp}
          // Turquoise: Modern/Clean
          colorFrom="from-cyan-400"
          colorTo="to-teal-500"
          trend="+5%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Chart */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[2rem]">
          <h3 className="font-bold text-xl text-slate-800 mb-6">Performance por Vendedor (R$)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByPersonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    {/* Cyan to Blue Gradient (Water flow) */}
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(6, 182, 212, 0.1)', radius: 8}}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Total vendido (R$)']}
                />
                <Bar dataKey="sales" name="Total vendido (R$)" radius={[8, 8, 8, 8]} barSize={40} fill="url(#colorSales)">
                </Bar>
                <Bar dataKey="goal" name="Meta mensal (R$)" fill="#e2e8f0" radius={[8, 8, 8, 8]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel - Terms matched with Resumo.csv columns */}
        <div className="glass-panel p-8 rounded-[2rem] flex flex-col h-full">
          <h3 className="font-bold text-xl text-slate-800 mb-8">Funil de Vendas</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6 relative">
            
            {/* Connecting line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-200 to-emerald-200 rounded-full"></div>

            {[
                // Blue: General Area
                { label: 'Contatos (mês)', val: totalContacts, color: 'bg-blue-500' },
                // Cyan: Fresh Interest
                { label: 'Orç. solicitados', val: totalQuotesRequested, color: 'bg-cyan-500' },
                // Amber: Work/Process (Sent)
                { label: 'Orç. enviados', val: totalQuotesSent, color: 'bg-amber-400' },
                // Emerald/Green: Success/Hygiene (Closed)
                { label: 'Qtde vendas (mês)', val: totalClosed, color: 'bg-emerald-500' }
            ].map((item, idx) => (
                <div key={idx} className="relative flex items-center gap-5 group">
                    <div className={`w-10 h-10 rounded-full ${item.color} shadow-lg shadow-gray-300 z-10 flex items-center justify-center text-white font-bold text-sm ring-4 ring-white/60 backdrop-blur-sm transition-transform group-hover:scale-110`}>
                        {idx + 1}
                    </div>
                    <div className="flex-1 bg-white/50 p-3 rounded-xl border border-white/60 backdrop-blur-sm transition-colors group-hover:bg-white/80">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</p>
                        <p className="text-xl font-bold text-slate-800">{item.val}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;