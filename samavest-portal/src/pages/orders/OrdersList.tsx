import React, { useState, useEffect } from 'react';
import { ordersApi } from '../../api';
import type { Order } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';
import './OrdersList.css';

export const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await ordersApi.getAll();
            // Handle both { orders: [...] } and array [...]
            const ordersData = (response as any).orders || (Array.isArray(response) ? response : []);
            setOrders(ordersData);
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await ordersApi.getStats();
            // Map backend stats structure to frontend expectations if needed
            // Backend: { total, byStatus: { pending, processing, ... }, totalRevenue }
            setStats(response);
        } catch (err) {
            console.error('Failed to fetch order stats', err);
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await ordersApi.updateStatus(id, status);
            fetchOrders(); // Refresh list
            fetchStats();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="loading">Loading orders...</div>;

    return (
        <div className="orders-page">
            <div className="page-header">
                <h1>Orders Management</h1>
            </div>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{formatCurrency(stats.totalRevenue || 0)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                    <div className="stat-card warning">
                        <div className="stat-value">{stats.byStatus?.pending || 0}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                    <div className="stat-card success">
                        <div className="stat-value">{stats.byStatus?.completed || 0}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="orders-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Student</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.student?.user?.firstName} {order.student?.user?.lastName}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td>{formatCurrency(order.totalAmount)}</td>
                                <td>
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="PROCESSING">Processing</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
