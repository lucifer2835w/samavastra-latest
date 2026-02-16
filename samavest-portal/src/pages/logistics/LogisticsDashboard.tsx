import React, { useState, useEffect } from 'react';
import { logisticsApi } from '../../api';
import type { LogisticsTracking } from '../../types';
import { formatDate } from '../../utils/format';
import './LogisticsDashboard.css';

export const LogisticsDashboard: React.FC = () => {
    const [tracking, setTracking] = useState<LogisticsTracking[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [trackingRes, statsRes] = await Promise.all([
                logisticsApi.getAll(),
                logisticsApi.getStats()
            ]);
            // Handle paginated response and array response
            const resData = trackingRes as any;
            const trackingData = (resData && Array.isArray(resData)) ? resData : (resData?.tracking || []);
            setTracking(trackingData);

            // Map backend stats to frontend display
            // Backend: { total, byStatus: { pending, inTransit, delivered } }
            setStats({
                activeShipments: statsRes.byStatus?.inTransit || 0,
                deliveredToday: statsRes.byStatus?.delivered || 0, // Backend doesn't give "today", just total delivered for now.
                pendingDispatch: statsRes.byStatus?.pending || 0
            });
        } catch (error) {
            console.error('Failed to fetch logistics data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading logistics...</div>;

    return (
        <div className="logistics-dashboard">
            <h1>Logistics & Delivery</h1>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">{stats.activeShipments}</div>
                        <div className="stat-label">Active Shipments</div>
                    </div>
                    <div className="stat-card success">
                        <div className="stat-value">{stats.deliveredToday}</div>
                        <div className="stat-label">Delivered Today</div>
                    </div>
                    <div className="stat-card warning">
                        <div className="stat-value">{stats.pendingDispatch}</div>
                        <div className="stat-label">Pending Dispatch</div>
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2>Shipment Tracking</h2>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tracking #</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Est. Delivery</th>
                                <th>Last Update</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tracking.map(item => (
                                <tr key={item.id}>
                                    <td>{item.trackingNumber}</td>
                                    <td>#{item.orderId}</td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase().replace('_', '-')}`}>
                                            {item.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>{formatDate(item.estimatedDelivery || '')}</td>
                                    <td>{formatDate(item.updatedAt || new Date())}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
