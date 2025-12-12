import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Deal, DailyMetric, DealStatus } from '../types';
import { MOCK_USERS, MOCK_DEALS, MOCK_METRICS } from '../services/mockData';

interface SalesContextType {
  currentUser: User | null;
  users: User[];
  deals: Deal[];
  metrics: DailyMetric[];
  isAuthenticated: boolean;
  addDeal: (deal: Omit<Deal, 'id' | 'updatedAt'>) => void;
  updateDealStatus: (dealId: string, status: DealStatus) => void;
  addMetric: (metric: Omit<DailyMetric, 'id'>) => void;
  switchUser: (userId: string) => void;
  login: (email: string) => boolean;
  logout: () => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [metrics, setMetrics] = useState<DailyMetric[]>(MOCK_METRICS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const switchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) setCurrentUser(user);
  };

  const addDeal = (newDealData: Omit<Deal, 'id' | 'updatedAt'>) => {
    const newDeal: Deal = {
      ...newDealData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: newDealData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDeals(prev => [newDeal, ...prev]);
  };

  const updateDealStatus = (dealId: string, status: DealStatus) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId ? { ...deal, status, updatedAt: new Date().toISOString() } : deal
    ));
  };

  const addMetric = (newMetricData: Omit<DailyMetric, 'id'>) => {
    // Check if metric exists for this user/date, if so update it
    const existingIndex = metrics.findIndex(m => m.userId === newMetricData.userId && m.date === newMetricData.date);
    
    if (existingIndex >= 0) {
      setMetrics(prev => {
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          contactsMade: current.contactsMade + newMetricData.contactsMade,
          quotesRequested: current.quotesRequested + newMetricData.quotesRequested,
          quotesSent: current.quotesSent + newMetricData.quotesSent,
          salesCount: current.salesCount + newMetricData.salesCount,
          salesValue: current.salesValue + newMetricData.salesValue,
        };
        return updated;
      });
    } else {
      const newMetric: DailyMetric = {
        ...newMetricData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setMetrics(prev => [...prev, newMetric]);
    }
  };

  return (
    <SalesContext.Provider value={{ currentUser, users, deals, metrics, addDeal, updateDealStatus, addMetric, switchUser, login, logout, isAuthenticated }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) throw new Error('useSales must be used within a SalesProvider');
  return context;
};