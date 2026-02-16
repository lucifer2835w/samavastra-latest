import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Welcome back, {user?.firstName}! 👋</h1>
                    <p>Ready to explore the marketplace?</p>
                </div>

                <div className="dashboard-grid">
                    {/* Student Widgets */}
                    {user?.roles.some(r => r.name === 'STUDENT') && (
                        <>
                            <Card className="stat-card" hover>
                                <div className="stat-icon">🎓</div>
                                <h3>Academics</h3>
                                <p>View performance & attendance</p>
                                <Button onClick={() => navigate('/academics/performance')}>
                                    View Report
                                </Button>
                            </Card>
                            <Card className="stat-card" hover>
                                <div className="stat-icon">💳</div>
                                <h3>Fees</h3>
                                <p>Check dues & payments</p>
                                <Button variant="secondary" onClick={() => navigate('/fees')}>
                                    View Fees
                                </Button>
                            </Card>
                        </>
                    )}

                    {/* Teacher Widgets */}
                    {user?.roles.some(r => r.name === 'TEACHER') && (
                        <>
                            <Card className="stat-card" hover>
                                <div className="stat-icon">👨‍🏫</div>
                                <h3>My Classes</h3>
                                <p>Manage classes & students</p>
                                <Button onClick={() => navigate('/academics')}>
                                    Manage
                                </Button>
                            </Card>
                            <Card className="stat-card" hover>
                                <div className="stat-icon">📝</div>
                                <h3>Updates</h3>
                                <p>Post marks & attendance</p>
                                <Button variant="secondary" onClick={() => navigate('/students')}>
                                    Update
                                </Button>
                            </Card>
                        </>
                    )}

                    <Card className="stat-card" hover>
                        <div className="stat-icon">🛍️</div>
                        <h3>Marketplace</h3>
                        <p>Browse and shop for products</p>
                        <Button onClick={() => navigate('/marketplace')}>
                            Browse Products
                        </Button>
                    </Card>

                    <Card className="stat-card" hover>
                        <div className="stat-icon">📦</div>
                        <h3>My Orders</h3>
                        <p>View your order history</p>
                        <Button variant="secondary" onClick={() => navigate('/orders')}>
                            View Orders
                        </Button>
                    </Card>

                    <Card className="stat-card" hover>
                        <div className="stat-icon">🚚</div>
                        <h3>Track Delivery</h3>
                        <p>Track your shipments</p>
                        <Button variant="ghost" onClick={() => navigate('/tracking')}>
                            Track Package
                        </Button>
                    </Card>
                </div>

                <Card className="welcome-card">
                    <h2>Getting Started</h2>
                    <div className="welcome-steps">
                        <div className="step">
                            <span className="step-number">1</span>
                            <div>
                                <h4>Browse Products</h4>
                                <p>Explore our marketplace and find what you need</p>
                            </div>
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <div>
                                <h4>Add to Cart</h4>
                                <p>Select products and add them to your shopping cart</p>
                            </div>
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            <div>
                                <h4>Checkout</h4>
                                <p>Complete your order and make payment</p>
                            </div>
                        </div>
                        <div className="step">
                            <span className="step-number">4</span>
                            <div>
                                <h4>Track Delivery</h4>
                                <p>Monitor your order status and delivery</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
