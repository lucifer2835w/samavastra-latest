import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname.startsWith(path) ? 'nav-item active' : 'nav-item';

    return (
        <div className="dashboard-layout">
            <header className="top-bar glass-panel">
                <div className="brand-section">
                    <h2 className="brand-logo gradient-text-gold">SAMAVASTRA</h2>
                </div>

                <nav className="top-nav">
                    <Link to="/dashboard" className={isActive('/dashboard')}>
                        <span>📊</span> Dashboard
                    </Link>
                    <Link to="/students" className={isActive('/students')}>
                        <span>👥</span> Students
                    </Link>
                    <Link to="/products" className={isActive('/products')}>
                        <span>📦</span> Products
                    </Link>
                    <Link to="/inventory" className={isActive('/inventory')}>
                        <span>📋</span> Inventory
                    </Link>
                    <Link to="/orders" className={isActive('/orders')}>
                        <span>🛒</span> Orders
                    </Link>
                    <Link to="/logistics" className={isActive('/logistics')}>
                        <span>🚚</span> Logistics
                    </Link>
                    <Link to="/production" className={isActive('/production')}>
                        <span>🏭</span> Production
                    </Link>
                    <Link to="/admin/analytics" className={isActive('/admin')}>
                        <span>📈</span> Admin
                    </Link>
                </nav>

                <div className="user-section">
                    <div className="user-info">
                        <div className="avatar">{user?.firstName?.charAt(0)}</div>
                        <span className="user-name">{user?.firstName}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-icon" title="Logout">
                        🚪
                    </button>
                </div>
            </header>

            <main className="main-content">
                <div className="page-container">
                    {children}
                </div>
            </main>
        </div>
    );
};
