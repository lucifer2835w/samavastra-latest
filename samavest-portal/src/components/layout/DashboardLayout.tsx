import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Samavest ERP</h2>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item">
                        <span>📊</span> Dashboard
                    </Link>
                    <Link to="/students" className="nav-item">
                        <span>👥</span> Students
                    </Link>
                    <Link to="/products" className="nav-item">
                        <span>📦</span> Products
                    </Link>
                    <Link to="/inventory" className="nav-item">
                        <span>📋</span> Inventory
                    </Link>
                    <Link to="/orders" className="nav-item">
                        <span>🛒</span> Orders
                    </Link>
                    <Link to="/logistics" className="nav-item">
                        <span>🚚</span> Logistics
                    </Link>
                    <Link to="/production" className="nav-item">
                        <span>🏭</span> Production
                    </Link>

                    <div className="nav-divider"></div>
                    <div className="nav-section-title">Admin</div>
                    <Link to="/admin/users" className="nav-item">
                        <span>👤</span> User Management
                    </Link>
                    <Link to="/admin/analytics" className="nav-item">
                        <span>📈</span> Analytics
                    </Link>
                </nav>
            </aside>

            <div className="main-content">
                <header className="top-header">
                    <div className="header-left">
                        <h1>Management Portal</h1>
                    </div>
                    <div className="header-right">
                        <span className="user-name">{user?.firstName} {user?.lastName}</span>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
};
