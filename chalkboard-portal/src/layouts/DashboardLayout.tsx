import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { NotificationCenter } from '../components/crm/NotificationCenter';
import './DashboardLayout.css';

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname.startsWith(path) ? 'nav-item active' : 'nav-item';
    const isAdmin = user?.roles.some(r => r.name === 'ADMIN');
    const isTeacher = user?.roles.some(r => r.name === 'TEACHER');
    const isStudent = user?.roles.some(r => r.name === 'STUDENT');

    return (
        <div className="dashboard-layout">
            <header className="top-bar glass-panel">
                <div className="brand-section">
                    <h2 className="brand-logo gradient-text">CHALKBOARD</h2>
                </div>

                <nav className="top-nav">
                    <Link to="/dashboard" className={isActive('/dashboard')}>
                        <span>📊</span> Dashboard
                    </Link>

                    {(isAdmin || isTeacher) && (
                        <>
                            <Link to="/students" className={isActive('/students')}>
                                <span>👨‍🎓</span> Students
                            </Link>
                            <Link to="/academics" className={isActive('/academics')}>
                                <span>📚</span> Academics
                            </Link>
                            <Link to="/homework" className={isActive('/homework')}>
                                <span>📝</span> Homework
                            </Link>
                        </>
                    )}

                    {isStudent && (
                        <Link to="/academics" className={isActive('/academics')}>
                            <span>📚</span> My Classes
                        </Link>
                    )}

                    <div className="nav-divider"></div>

                    <Link to="/marketplace" className={isActive('/marketplace')}>
                        <span>🛍️</span> Shop
                    </Link>
                    <Link to="/orders" className={isActive('/orders')}>
                        <span>📦</span> Orders
                    </Link>
                </nav>

                <div className="user-section">
                    <NotificationCenter />

                    <Link to="/cart" className="cart-btn-wrapper">
                        <div className={`btn-icon ${isActive('/cart') ? 'active' : ''}`}>
                            🛒
                        </div>
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </Link>

                    <div className="user-info">
                        <div className="avatar">{user?.firstName?.charAt(0)}</div>
                        <span className="user-name">{user?.firstName}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-icon logout" title="Logout">
                        🚪
                    </button>
                </div>
            </header>

            <main className="main-content">
                <div className="page-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
