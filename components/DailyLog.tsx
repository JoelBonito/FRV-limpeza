import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { Calendar, Phone, FileText, Send, DollarSign, ShoppingBag, Mail } from 'lucide-react';
import { Card, Button, Input, useToast } from '@/design-system';

const DailyLog: React.FC = () => {
  const { addMetric, currentUser } = useSales();
  const toast = useToast();

  // Early return if user is not authenticated
  if (!currentUser) {
    return null;
  }

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
    toast.success('Diário salvo com sucesso!');
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
    <div className="max-w-2xl mx-auto animate-in fade-in duration-700 pb-24 pt-6 md:pt-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Diário (Input)</h1>
        <p className="text-[var(--text-secondary)] font-medium mt-1">Alimente a planilha 'Diário'</p>
      </div>

      <Card elevated className="overflow-hidden bg-[var(--surface-elevated)] border-[var(--border)]">
        {/* Header Section */}
        <div className="pb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full border-4 border-[var(--surface)] shadow-sm object-cover"
            />
            <div>
              <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-0.5">Vendedor</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{currentUser.name}</h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-6 space-y-6">
          {/* Date Row */}
          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            leftIcon={<Calendar className="w-5 h-5 text-blue-500" />}
            required
          />

          {/* Contacts & Quotes Requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Contatos feitos"
              type="number"
              value={formData.contactsMade}
              onChange={e => setFormData({ ...formData, contactsMade: parseInt(e.target.value) || 0 })}
              onFocus={handleFocus}
              leftIcon={<Phone className="w-5 h-5 text-blue-500" />}
              required
            />
            <Input
              label="Orçamentos solicitados"
              type="number"
              value={formData.quotesRequested}
              onChange={e => setFormData({ ...formData, quotesRequested: parseInt(e.target.value) || 0 })}
              onFocus={handleFocus}
              leftIcon={<FileText className="w-5 h-5 text-amber-500" />}
              required
            />
          </div>

          {/* Quotes Sent & Sales Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Orçamentos enviados"
              type="number"
              value={formData.quotesSent}
              onChange={e => setFormData({ ...formData, quotesSent: parseInt(e.target.value) || 0 })}
              onFocus={handleFocus}
              leftIcon={<Mail className="w-5 h-5 text-purple-500" />}
              required
            />
            <Input
              label="Qtde de vendas"
              type="number"
              value={formData.salesCount}
              onChange={e => setFormData({ ...formData, salesCount: parseInt(e.target.value) || 0 })}
              onFocus={handleFocus}
              leftIcon={<ShoppingBag className="w-5 h-5 text-emerald-500" />}
              required
            />
          </div>

          {/* Sales Value */}
          <Input
            label="Valor vendido (R$)"
            type="number"
            value={formData.salesValue}
            onChange={e => setFormData({ ...formData, salesValue: parseFloat(e.target.value) || 0 })}
            onFocus={handleFocus}
            leftIcon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Send className="w-5 h-5" />}
            className="w-full"
          >
            Salvar no Diário
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DailyLog;