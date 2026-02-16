import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import './Cart.css';

export const Cart: React.FC = () => {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <h1>Shopping Cart</h1>
                    <Card className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <Button onClick={() => navigate('/marketplace')}>
                            Browse Marketplace
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <Button variant="danger" size="sm" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {items.map((item) => (
                            <Card key={item.product.id} className="cart-item">
                                <div className="cart-item-image">
                                    <div className="cart-item-placeholder">
                                        {item.product.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="cart-item-info">
                                    <h3>{item.product.name}</h3>
                                    <p className="cart-item-price">${Number(item.product.price).toFixed(2)}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="quantity-btn"
                                        >
                                            −
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeItem(item.product.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <div className="cart-item-total">
                                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button fullWidth onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
