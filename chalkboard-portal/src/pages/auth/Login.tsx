import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import './Login.css';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1 className="gradient-text">Chalkboard</h1>
                    <p>School & Marketplace Portal</p>
                </div>

                <Card className="login-card">
                    <h2>Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>

                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="user@chalkboard.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />

                        {error && <div className="error-message">{error}</div>}

                        <Button type="submit" fullWidth loading={loading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="login-demo">
                        <p><strong>Demo Credentials:</strong></p>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <small>Teacher:</small><br />
                            <code>jane.smith@school.com / teacher123</code>
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <small>School Admin:</small><br />
                            <code>admin@school.com / admin123</code>
                        </div>
                        <div>
                            <small>Student:</small><br />
                            <code>john.doe@chalkboard.com / student123</code>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
