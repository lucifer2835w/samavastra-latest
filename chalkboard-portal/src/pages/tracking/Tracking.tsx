import React, { useState } from 'react';
import { logisticsApi } from '../../api';
import type { LogisticsTracking } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const Tracking: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState<LogisticsTracking | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setLoading(true);
        setError(null);
        setTrackingInfo(null);

        try {
            const data = await logisticsApi.trackByNumber(trackingNumber);
            setTrackingInfo(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Tracking number not found');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'green';
            case 'SHIPPED': return 'blue';
            case 'OUT_FOR_DELIVERY': return 'orange';
            default: return 'gray';
        }
    };

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Track Your Shipment</h1>

            <Card className="tracking-search-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number (e.g., TRK-...)"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                        }}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Tracking...' : 'Track'}
                    </Button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </Card>

            {trackingInfo && (
                <div className="tracking-result">
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h2>{trackingInfo.trackingNumber}</h2>
                                <p style={{ color: '#666' }}>Order ID: #{trackingInfo.orderId}</p>
                            </div>
                            <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                backgroundColor: getStatusColor(trackingInfo.status),
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                {trackingInfo.status.replace(/_/g, ' ')}
                            </span>
                        </div>

                        <div className="tracking-timeline">
                            <div className="timeline-item" style={{ marginBottom: '1rem' }}>
                                <strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery ? new Date(trackingInfo.estimatedDelivery).toLocaleDateString() : 'Pending'}
                            </div>
                            <div className="timeline-item">
                                <strong>Tracking Started:</strong> {new Date(trackingInfo.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
