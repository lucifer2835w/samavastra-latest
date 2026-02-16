import React, { type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/auth/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { StudentsList } from './pages/students/StudentsList';
import { StudentForm } from './pages/students/StudentForm';
import { ProductsList } from './pages/products/ProductsList';
import { ProductForm } from './pages/products/ProductForm';
import { OrdersList } from './pages/orders/OrdersList';
import { InventoryDashboard } from './pages/inventory/InventoryDashboard';
import { LogisticsDashboard } from './pages/logistics/LogisticsDashboard';
import { ProductionDashboard } from './pages/production/ProductionDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { SystemAnalytics } from './pages/admin/SystemAnalytics';
const queryClient = new QueryClient();

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Placeholder routes until pages are implemented */}
            <Route path="/students" element={
              <ProtectedRoute>
                <StudentsList />
              </ProtectedRoute>
            } />
            <Route path="/students/new" element={
              <ProtectedRoute>
                <StudentForm />
              </ProtectedRoute>
            } />
            <Route path="/students/:id/edit" element={
              <ProtectedRoute>
                <StudentForm />
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            } />
            <Route path="/products/new" element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            } />
            <Route path="/products/:id/edit" element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute>
                <InventoryDashboard />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersList />
              </ProtectedRoute>
            } />
            <Route path="/logistics" element={
              <ProtectedRoute>
                <LogisticsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/production" element={
              <ProtectedRoute>
                <ProductionDashboard />
              </ProtectedRoute>
            } />

            {/* Academic Routes */}


            {/* Admin Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <SystemAnalytics />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
