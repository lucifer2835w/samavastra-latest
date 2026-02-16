import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Marketplace } from './pages/marketplace/Marketplace';
import { Cart } from './pages/cart/Cart';
import { Students } from './pages/students/Students';
import { StudentForm } from './pages/students/StudentForm';
import { OrderHistory } from './pages/orders/OrderHistory';
import { Checkout } from './pages/checkout/Checkout';
import { Tracking } from './pages/tracking/Tracking';
import { Teachers } from './pages/teachers/Teachers';
import { Academics } from './pages/academics/Academics';
import { Departments } from './pages/departments/Departments';
import { StudentFees } from './pages/fees/StudentFees';
import { StudentPerformance } from './pages/academics/StudentPerformance';
import { TeacherGrading } from './pages/academics/TeacherGrading';
import { TeacherAttendance } from './pages/academics/TeacherAttendance';
import { HomeworkList } from './pages/homework/HomeworkList';
import { HomeworkForm } from './pages/homework/HomeworkForm';
import { ParentDashboard } from './pages/parents/ParentDashboard';
import { ReportsDashboard } from './pages/reports/ReportsDashboard';
import { DashboardLayout } from './layouts/DashboardLayout';
import './index.css';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Routes wrapped in DashboardLayout */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/fees" element={<StudentFees />} />
          <Route path="/academics/performance" element={<StudentPerformance />} />
          <Route path="/academics/grading" element={<TeacherGrading />} />
          <Route path="/academics/grading" element={<TeacherGrading />} />
          <Route path="/academics/attendance" element={<TeacherAttendance />} />

          {/* CRM & Reports Routes */}
          <Route path="/homework" element={<HomeworkList />} />
          <Route path="/homework/new" element={<HomeworkForm />} />
          <Route path="/parents" element={<ParentDashboard />} />
          <Route path="/reports" element={<ReportsDashboard />} />

          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/tracking" element={<Tracking />} />

          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
