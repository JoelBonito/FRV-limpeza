export enum UserRole {
  ADMIN = 'Admin',
  SALES = 'Vendedor',
}

export enum UserType {
  CLT = 'CLT',
  PJ = 'PJ',
}

export enum DealStatus {
  PENDING = 'Pendente',
  SENT = 'Enviado',
  APPROVED = 'Aprovado',
  LOST = 'Perdido',
}

export interface User {
  id: string;
  name: string;
  email: string; // Added email for login
  role: UserRole;
  type: UserType;
  monthlyGoal: number;
  avatar: string;
}

export interface Client {
  id: string;
  name: string;
  isInactive: boolean;
  lastContactDate?: string;
}

export interface Deal {
  id: string;
  clientId: string;
  clientName: string; // Denormalized for simpler UI
  userId: string; // The seller
  status: DealStatus;
  value: number;
  isRescue: boolean; // Was this an inactive client rescue?
  createdAt: string; // ISO Date
  updatedAt: string;
}

export interface DailyMetric {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  contactsMade: number;
  quotesRequested: number;
  quotesSent: number;
  salesCount: number;
  salesValue: number;
}