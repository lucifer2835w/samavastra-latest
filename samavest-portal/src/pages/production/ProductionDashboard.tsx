import React, { useState, useEffect } from 'react';
import { productionApi, productsApi } from '../../api';
import type { ProductionLog, Product } from '../../types';
import { formatDate } from '../../utils/format';
import './ProductionDashboard.css';

export const ProductionDashboard: React.FC = () => {
    const [logs, setLogs] = useState<ProductionLog[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Form state
    const [formData, setFormData] = useState({
        productId: '',
        batchNumber: '',
        quantityProduced: '',
        notes: ''
    });

    useEffect(() => {
        fetchData();
        fetchProducts();
    }, []);

    const fetchData = async () => {
        try {
            const [logsRes, statsRes] = await Promise.all([
                productionApi.getAllLogs(),
                productionApi.getStats()
            ]);
            const logsData = (logsRes as any).logs || (Array.isArray(logsRes) ? logsRes : []);
            setLogs(logsData);
            setStats(statsRes);
        } catch (error) {
            console.error('Failed to fetch production data', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await productsApi.getAll(1, 100);
            setProducts(res.products);
        } catch (err) {
            console.error('Failed to fetch products');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await productionApi.createLog({
                productId: Number(formData.productId),
                batchNumber: formData.batchNumber,
                quantityProduced: Number(formData.quantityProduced),
                notes: formData.notes
            });
            setShowModal(false);
            setFormData({ productId: '', batchNumber: '', quantityProduced: '', notes: '' });
            fetchData();
        } catch (err) {
            alert('Failed to log production');
        }
    };

    if (loading) return <div className="loading">Loading production data...</div>;

    return (
        <div className="production-dashboard">
            <div className="page-header">
                <h1>Production Management</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Log Production
                </button>
            </div>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">{stats.totalLogs}</div>
                        <div className="stat-label">Total Batches</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.totalQuantity}</div>
                        <div className="stat-label">Units Produced</div>
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2>Production Logs</h2>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Batch #</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.batchNumber}</td>
                                    <td>{log.product?.name}</td>
                                    <td>{log.quantityProduced}</td>
                                    <td>{formatDate(log.createdAt || new Date().toISOString())}</td>
                                    <td>{log.notes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Log Production Batch</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product</label>
                                <select
                                    value={formData.productId}
                                    onChange={e => setFormData({ ...formData, productId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Product</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Batch Number</label>
                                <input
                                    type="text"
                                    value={formData.batchNumber}
                                    onChange={e => setFormData({ ...formData, batchNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantity Produced</label>
                                <input
                                    type="number"
                                    value={formData.quantityProduced}
                                    onChange={e => setFormData({ ...formData, quantityProduced: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
