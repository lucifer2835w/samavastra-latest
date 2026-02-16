import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Dashboard Overview</h2>
                <div className="date-display">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card" onClick={() => navigate('/students')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ background: '#DBEAFE', color: '#1E40AF' }}>👥</div>
                    <div className="stat-info">
                        <h3>Students</h3>
                        <p className="stat-value">Manage</p>
                        <span className="stat-trend">View All</span>
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate('/inventory')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ background: '#D1FAE5', color: '#065F46' }}>📦</div>
                    <div className="stat-info">
                        <h3>Inventory</h3>
                        <p className="stat-value">Check Stock</p>
                        <span className="stat-trend negative">Low Stock Alerts</span>
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ background: '#FEF3C7', color: '#92400E' }}>🛒</div>
                    <div className="stat-info">
                        <h3>Orders</h3>
                        <p className="stat-value">Process</p>
                        <span className="stat-trend positive">New Orders</span>
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate('/production')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon" style={{ background: '#E0E7FF', color: '#3730A3' }}>🏭</div>
                    <div className="stat-info">
                        <h3>Production</h3>
                        <p className="stat-value">Log Batch</p>
                        <span className="stat-trend">Track Mfg</span>
                    </div>
                </div>
            </div>

            <div className="recent-activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-time">10:30 AM</div>
                        <div className="activity-content">
                            <strong>New Order #1234</strong> received from Student John Doe
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-time">09:45 AM</div>
                        <div className="activity-content">
                            <strong>Stock Alert:</strong> Blue Pen quantity low (15 remaining)
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-time">09:15 AM</div>
                        <div className="activity-content">
                            <strong>Shipment #TRK-998</strong> delivered to Department IT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
