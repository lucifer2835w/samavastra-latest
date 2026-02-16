import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ordersApi } from '../../api';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        zip: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Your Cart is Empty</h1>
                <Button onClick={() => navigate('/marketplace')}>Go to Marketplace</Button>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        if (!user?.student?.id) {
            setError('Student profile not found. Please contact support.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const orderData = {
                studentId: user.student.id,
                items: items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            await ordersApi.create(orderData);
            clearCart();
            // Optional: Create payment record here if backend supports it immediately
            navigate('/orders');
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.error || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="checkout-form">
                    <Card>
                        <h3 style={{ marginTop: 0 }}>Shipping Address</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <input
                                placeholder="Street Address"
                                value={shippingAddress.street}
                                onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                                style={{ padding: '0.5rem' }}
                            />
                            <input
                                placeholder="City"
                                value={shippingAddress.city}
                                onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                style={{ padding: '0.5rem' }}
                            />
                            <input
                                placeholder="ZIP Code"
                                value={shippingAddress.zip}
                                onChange={e => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                                style={{ padding: '0.5rem' }}
                            />
                        </div>
                    </Card>

                    <Card style={{ marginTop: '1rem' }}>
                        <h3 style={{ marginTop: 0 }}>Payment Method</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="CREDIT_CARD"
                                    checked={paymentMethod === 'CREDIT_CARD'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                /> Credit Card
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="CASH"
                                    checked={paymentMethod === 'CASH'}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                /> Cash on Delivery
                            </label>
                        </div>
                    </Card>
                </div>

                <div className="order-summary">
                    <Card>
                        <h3 style={{ marginTop: 0 }}>Order Summary</h3>
                        {items.map(item => (
                            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr style={{ margin: '1rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

                        <Button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
