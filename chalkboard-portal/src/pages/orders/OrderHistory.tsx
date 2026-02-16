import React, { useState, useEffect } from 'react';
import { ordersApi } from '../../api';
import type { Order } from '../../types';
import { Card } from '../../components/common/Card';

export const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await ordersApi.getMyOrders();
            setOrders(data.orders);
        } catch (err) {
            setError('Failed to load orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'green';
            case 'PROCESSING': return 'blue';
            case 'CANCELLED': return 'red';
            default: return 'orange';
        }
    };

    if (loading) return <div className="p-4">Loading orders...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1>My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {orders.map(order => (
                        <Card key={order.id} className="order-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3>Order #{order.id}</h3>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Total: <strong>${order.totalAmount}</strong></p>
                                <div>
                                    {order.items?.map((item: any) => (
                                        <span key={item.id} style={{ marginRight: '1rem', fontSize: '0.9em', color: '#666' }}>
                                            {item.product?.name} x {item.quantity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    backgroundColor: getStatusColor(order.status),
                                    color: 'white',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {order.status}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
