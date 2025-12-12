import { User, UserRole, UserType, Deal, DealStatus, DailyMetric } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Gabriel', email: 'gabriel@toplimp.com', role: UserRole.SALES, type: UserType.CLT, monthlyGoal: 65000, avatar: 'https://picsum.photos/id/1005/100/100' },
  { id: 'u2', name: 'Mateus', email: 'mateus@toplimp.com', role: UserRole.SALES, type: UserType.CLT, monthlyGoal: 65000, avatar: 'https://picsum.photos/id/1012/100/100' },
  { id: 'u3', name: 'Thalia', email: 'thalia@toplimp.com', role: UserRole.SALES, type: UserType.PJ, monthlyGoal: 100000, avatar: 'https://picsum.photos/id/1027/100/100' },
  // Admin User
  { id: 'admin', name: 'Gestor', email: 'admin@toplimp.com', role: UserRole.ADMIN, type: UserType.CLT, monthlyGoal: 0, avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' },
];

export const MOCK_DEALS: Deal[] = [
  { id: 'd1', clientId: 'c1', clientName: 'Condomínio Solar', userId: 'u1', status: DealStatus.APPROVED, value: 5000, isRescue: false, createdAt: '2023-10-01T10:00:00Z', updatedAt: '2023-10-02T10:00:00Z' },
  { id: 'd2', clientId: 'c2', clientName: 'Empresa ABC', userId: 'u1', status: DealStatus.SENT, value: 12000, isRescue: true, createdAt: '2023-10-03T09:00:00Z', updatedAt: '2023-10-03T09:00:00Z' },
  { id: 'd3', clientId: 'c3', clientName: 'Escola Pequeno Príncipe', userId: 'u2', status: DealStatus.PENDING, value: 3500, isRescue: false, createdAt: '2023-10-04T14:00:00Z', updatedAt: '2023-10-04T14:00:00Z' },
  { id: 'd4', clientId: 'c4', clientName: 'Indústria Metal', userId: 'u3', status: DealStatus.APPROVED, value: 45000, isRescue: false, createdAt: '2023-10-05T11:00:00Z', updatedAt: '2023-10-06T11:00:00Z' },
  { id: 'd5', clientId: 'c5', clientName: 'Restaurante Sabor', userId: 'u3', status: DealStatus.LOST, value: 2000, isRescue: false, createdAt: '2023-10-05T16:00:00Z', updatedAt: '2023-10-07T16:00:00Z' },
  { id: 'd6', clientId: 'c6', clientName: 'Hotel Central', userId: 'u2', status: DealStatus.APPROVED, value: 8000, isRescue: true, createdAt: '2023-10-08T09:30:00Z', updatedAt: '2023-10-09T10:00:00Z' },
];

export const MOCK_METRICS: DailyMetric[] = [
  { id: 'm1', userId: 'u1', date: '2023-10-01', contactsMade: 15, quotesRequested: 2, quotesSent: 1, salesCount: 1, salesValue: 5000 },
  { id: 'm2', userId: 'u1', date: '2023-10-02', contactsMade: 20, quotesRequested: 5, quotesSent: 3, salesCount: 0, salesValue: 0 },
  { id: 'm3', userId: 'u2', date: '2023-10-01', contactsMade: 12, quotesRequested: 1, quotesSent: 1, salesCount: 0, salesValue: 0 },
  { id: 'm4', userId: 'u3', date: '2023-10-01', contactsMade: 30, quotesRequested: 8, quotesSent: 5, salesCount: 2, salesValue: 45000 },
];