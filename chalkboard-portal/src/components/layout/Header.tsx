import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { NotificationCenter } from '../crm/NotificationCenter';
import './Header.css';

export const Header: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/dashboard" className="logo">
                    <h1 className="gradient-text">Chalkboard</h1>
                </Link>

                <nav className="nav">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/marketplace" className="nav-link">Marketplace</Link>
                    <Link to="/orders" className="nav-link">Orders</Link>
                    <Link to="/tracking" className="nav-link">Tracking</Link>
                </nav>

                <div className="header-actions">
                    <NotificationCenter />
                    <Link to="/cart" className="cart-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </Link>

                    <div className="user-menu">
                        <span className="user-name">{user?.firstName}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
};
