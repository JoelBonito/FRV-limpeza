import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { DealStatus, UserRole } from '../types';
import { Plus, Search, CheckCircle, Clock, XCircle, Send, Calendar, User as UserIcon, DollarSign } from 'lucide-react';
import { Card, Button, Input, Badge, Select, Modal } from '@/design-system';

// Status options for Select component
const statusOptions = Object.values(DealStatus).map(status => ({
  value: status,
  label: status
}));

const StatusBadge = ({ status, compact = false }: { status: DealStatus, compact?: boolean }) => {
  const colorMap: Record<DealStatus, 'warning' | 'info' | 'success' | 'error'> = {
    [DealStatus.PENDING]: 'warning',
    [DealStatus.SENT]: 'info',
    [DealStatus.APPROVED]: 'success',
    [DealStatus.LOST]: 'error',
  };

  const icons = {
    [DealStatus.PENDING]: <Clock className="w-3 h-3" />,
    [DealStatus.SENT]: <Send className="w-3 h-3" />,
    [DealStatus.APPROVED]: <CheckCircle className="w-3 h-3" />,
    [DealStatus.LOST]: <XCircle className="w-3 h-3" />,
  };

  return (
    <Badge
      color={colorMap[status]}
      size={compact ? 'sm' : 'md'}
      icon={!compact ? icons[status] : undefined}
    >
      {status}
    </Badge>
  );
};

const Pipeline: React.FC = () => {
  const { deals, updateDealStatus, addDeal, currentUser, users } = useSales();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Early return if user is not authenticated
  if (!currentUser) {
    return null;
  }

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
    const hasPermission = isAdmin ? true : deal.userId === currentUser.id;
    if (!hasPermission) return false;
    const matchesStatus = filterStatus === 'ALL' || deal.status === filterStatus;
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
      createdAt: new Date(formData.date).toISOString()
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">Orçamentos</h1>
          <p className="text-text-secondary font-medium mt-1">
            {isAdmin ? 'Visão Geral (Todos os vendedores)' : 'Gerencie seus orçamentos'}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-5 h-5" />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Orçamento
        </Button>
      </div>

      {/* Filter Bar */}
      <Card padding="sm" className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-surface-elevated border-border">
        <div className="flex gap-1 overflow-x-auto p-1 w-full sm:w-auto scrollbar-hide">
          <Button
            variant={filterStatus === 'ALL' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilterStatus('ALL')}
          >
            Todos
          </Button>
          {Object.values(DealStatus).map(status => (
            <Button
              key={status}
              variant={filterStatus === status ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
        <div className="w-full sm:w-72">
          <Input
            placeholder="Buscar Cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </Card>

      {/* MOBILE/TABLET VIEW: CARDS */}
      <div className="lg:hidden space-y-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <Card key={deal.id} className="relative bg-surface border-border">
              <div className="flex justify-between items-start mb-3">
                <StatusBadge status={deal.status} compact />
                <span className="text-xs font-mono text-text-secondary">#{deal.id}</span>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-text-primary leading-tight mb-1">{deal.clientName}</h3>
                <div className="text-2xl font-extrabold text-text-primary tracking-tight">
                  R$ {deal.value.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs mb-4">
                {isAdmin && (
                  <div className="col-span-2 flex items-center gap-1.5 text-text-secondary bg-surface-elevated p-2 rounded-lg">
                    <UserIcon className="w-3.5 h-3.5 text-info" />
                    <span className="font-bold">{getUserName(deal.userId)}</span>
                  </div>
                )}
                {deal.isRescue && (
                  <div className="col-span-2">
                    <Badge color="error" size="sm" withDot>Cliente Resgatado</Badge>
                  </div>
                )}
              </div>

              <div className="mt-2">
                <Select
                  label="Alterar Status"
                  options={statusOptions}
                  value={deal.status}
                  onChange={(val) => updateDealStatus(deal.id, val as DealStatus)}
                  size="sm"
                />
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-10 text-text-secondary font-medium bg-surface-elevated border-border">
            Nenhum orçamento encontrado.
          </Card>
        )}
      </div>

      {/* DESKTOP VIEW: TABLE */}
      <div className="hidden lg:block">
        <Card padding="none" className="overflow-hidden bg-surface-elevated border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Valor (R$)</th>
                  {isAdmin && <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Vendedor</th>}
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Resgatado?</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-surface transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-text-primary text-base">{deal.clientName}</div>
                        <div className="text-xs text-text-secondary font-medium mt-0.5 group-hover:text-text-primary transition-colors">ID: #{deal.id}</div>
                      </td>
                      <td className="px-6 py-4 text-text-primary font-bold font-mono">
                        R$ {deal.value.toLocaleString('pt-BR')}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-info/20 text-info flex items-center justify-center text-xs font-bold border border-info/30">
                              {getUserName(deal.userId).charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-text-secondary">{getUserName(deal.userId)}</span>
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <StatusBadge status={deal.status} />
                      </td>
                      <td className="px-6 py-4">
                        {deal.isRescue ? (
                          <Badge color="error" size="sm" withDot>Sim</Badge>
                        ) : (
                          <Badge color="neutral" size="sm">Não</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="w-32 ml-auto">
                          <Select
                            options={statusOptions}
                            value={deal.status}
                            onChange={(val) => updateDealStatus(deal.id, val as DealStatus)}
                            size="sm"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="px-6 py-16 text-center text-text-secondary font-medium">
                      Nenhum orçamento encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal - Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Orçamento"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              leftIcon={<Calendar className="w-4 h-4" />}
              required
            />
            <Input
              label="Vendedor"
              value={currentUser.name}
              isDisabled
              leftIcon={<UserIcon className="w-4 h-4" />}
            />
          </div>

          <Input
            label="Cliente"
            placeholder="Ex: Condomínio Jardins"
            value={formData.clientName}
            onChange={e => setFormData({ ...formData, clientName: e.target.value })}
            leftIcon={<UserIcon className="w-4 h-4" />}
            required
          />

          <Select
            label="Status Orçamento"
            options={statusOptions}
            value={formData.status}
            onChange={val => setFormData({ ...formData, status: val as DealStatus })}
          />

          <Card padding="sm" className="space-y-3 bg-surface-elevated border-border">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isInactive"
                checked={formData.isInactive}
                onChange={e => setFormData({ ...formData, isInactive: e.target.checked })}
                className="w-4 h-4 text-info rounded border-border focus:ring-info bg-surface"
              />
              <label htmlFor="isInactive" className="ml-2 text-sm font-medium text-text-primary">
                Cliente inativo? (Sim/Não)
              </label>
            </div>

            <div className="flex items-center pl-6">
              <input
                type="checkbox"
                id="isRescue"
                checked={formData.isRescue}
                onChange={e => setFormData({ ...formData, isRescue: e.target.checked })}
                className="w-4 h-4 text-error rounded border-border focus:ring-error bg-surface"
              />
              <label htmlFor="isRescue" className="ml-2 text-sm font-bold text-error">
                Inativo resgatado? (Sim/Não)
              </label>
            </div>
          </Card>

          <Input
            label="Valor (R$)"
            type="number"
            placeholder="0,00"
            value={formData.value}
            onChange={e => setFormData({ ...formData, value: e.target.value })}
            leftIcon={<DollarSign className="w-4 h-4" />}
            required
          />

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Pipeline;