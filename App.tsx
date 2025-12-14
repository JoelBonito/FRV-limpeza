import React, { useState } from 'react';
import { ToastContainer, DashboardLayout } from '@/design-system';
import { SalesProvider, useSales } from './context/SalesContext';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import DailyLog from './components/DailyLog';
import Reports from './components/Reports';
import Login from './components/Login';

import AppSidebar from './components/AppSidebar';

// --- Layout Component ---
const MainLayout: React.FC = () => {
  const { currentUser, isAuthenticated } = useSales();
  const [currentView, setCurrentView] = useState<'dashboard' | 'pipeline' | 'daily' | 'reports'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If not authenticated, show login
  if (!isAuthenticated || !currentUser) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'pipeline': return <Pipeline />;
      case 'daily': return <DailyLog />;
      case 'reports': return <Reports />;

      default: return <Dashboard />;
    }
  };

  return (
    <DashboardLayout
      isOpen={isMobileMenuOpen}
      onOpenChange={setIsMobileMenuOpen}
      sidebar={
        <AppSidebar
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setIsMobileMenuOpen(false);
          }}
        />
      }
    >
      {renderView()}
    </DashboardLayout>
  );
};

const App: React.FC = () => {
  return (
    <SalesProvider>
      <MainLayout />
      <ToastContainer />
    </SalesProvider>
  );
};

export default App;