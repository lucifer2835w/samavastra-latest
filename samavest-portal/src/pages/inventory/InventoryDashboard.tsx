import React, { useState, useEffect } from 'react';
import { inventoryApi } from '../../api';
import type { Inventory } from '../../types';
import './InventoryDashboard.css';

export const InventoryDashboard: React.FC = () => {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [lowStock, setLowStock] = useState<Inventory[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [invRes, lowStockRes, statsRes] = await Promise.all([
                inventoryApi.getAll(),
                inventoryApi.getLowStock(),
                inventoryApi.getStats()
            ]);
            // invRes is now { inventory: Inventory[], pagination: ... }
            // But inventoryApi.getAll definition in index.ts says Promise<Inventory[]> which is WRONG if it returns paginated.
            // Wait, I should verify what index.ts actually returns.
            // index.ts: const response = await apiClient.get('/samavest/inventory'); return response.data;
            // inventory.service.ts returns { inventory, pagination }.
            // So response.data is { inventory, pagination }.
            // So casting needed or update type in index.ts.
            // For now, I will treat it as any or fix index.ts return type.
            // Let's assume index.ts returns user friendly data if I fix it, OR I handle it here.
            // I'll handle it here by checking property.
            setInventory((invRes as any).inventory || invRes);
            setLowStock(lowStockRes);
            setStats(statsRes);
        } catch (error) {
            console.error('Failed to fetch inventory data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading inventory...</div>;

    return (
        <div className="inventory-dashboard">
            <h1>Inventory Management</h1>

            {stats && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">{stats.totalProducts}</div>
                        <div className="stat-label">Total SKUs</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.outOfStock}</div>
                        <div className="stat-label">Out of Stock</div>
                    </div>
                    <div className="stat-card warning">
                        <div className="stat-value">{stats.lowStockCount}</div>
                        <div className="stat-label">Low Stock Items</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.totalValue?.toLocaleString()}</div>
                        <div className="stat-label">Total Value</div>
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2>Current Stock Levels</h2>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Location</th>
                                <th>On Hand</th>
                                <th>Reorder Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product?.name}</td>
                                    <td>{item.product?.sku}</td>
                                    <td>{item.location}</td>
                                    <td>{item.quantityOnHand}</td>
                                    <td>{item.reorderLevel}</td>
                                    <td>
                                        <span className={`status-badge ${item.quantityOnHand <= item.reorderLevel ? 'warning' : 'success'}`}>
                                            {item.quantityOnHand <= item.reorderLevel ? 'Low Stock' : 'Good'}
                                        </span>
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
