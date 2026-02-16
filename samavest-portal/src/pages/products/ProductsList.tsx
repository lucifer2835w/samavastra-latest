import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../../api';
import type { Product } from '../../types';
import './Products.css';

export const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const output = await productsApi.getAll();
            const productData = (output && Array.isArray(output)) ? output : (output?.products || []);
            setProducts(productData);
        } catch (err) {
            setError('Failed to fetch products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchProducts();
            return;
        }

        try {
            setLoading(true);
            const results = await productsApi.search(searchTerm);
            setProducts(results || []);
        } catch (err) {
            setError('Search failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productsApi.delete(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            alert('Failed to delete product');
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Product Management</h1>
                <button className="btn btn-primary" onClick={() => navigate('/products/new')}>
                    + Add New Product
                </button>
            </div>

            <div className="filters-section">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by SKU, name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn btn-secondary">Search</button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card table-container">
                {loading ? (
                    <div className="loading-state">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="empty-state">No products found.</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.sku}</td>
                                    <td>
                                        <div className="product-name">{product.name}</div>
                                        <div className="product-desc">{product.description}</div>
                                    </td>
                                    <td>${Number(product.price).toFixed(2)}</td>
                                    <td>
                                        {product.inventory?.quantityOnHand ?? 0}
                                        {product.inventory && product.inventory.quantityOnHand <= (product.inventory.reorderLevel || 10) && (
                                            <span className="low-stock-indicator" title="Low Stock">⚠️</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge ${product.isActive ? 'badge-success' : 'badge-danger'}`}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon" onClick={() => navigate(`/products/${product.id}/edit`)} title="Edit">✏️</button>
                                            <button className="btn-icon delete-btn" onClick={() => handleDelete(product.id)} title="Delete">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
