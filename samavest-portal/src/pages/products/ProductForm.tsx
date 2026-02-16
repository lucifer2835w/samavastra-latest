/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../../api';
import './ProductForm.css';

export const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        price: '',
        isActive: true,
        // Initial inventory for new products
        initialStock: '0',
        reorderLevel: '10'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const product = await productsApi.getById(Number(id));
            setFormData({
                sku: product.sku,
                name: product.name,
                description: product.description || '',
                price: product.price.toString(),
                isActive: product.isActive,
                initialStock: product.inventory?.quantityOnHand.toString() || '0',
                reorderLevel: product.inventory?.reorderLevel.toString() || '10'
            });
        } catch (err) {
            setError('Failed to fetch product details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const price = parseFloat(formData.price);
        const stock = parseInt(formData.initialStock);
        const reorder = parseInt(formData.reorderLevel);

        if (isNaN(price) || price < 0) {
            setError('Please enter a valid price');
            setLoading(false);
            return;
        }

        if (isNaN(stock) || stock < 0) {
            setError('Please enter a valid initial stock amount');
            setLoading(false);
            return;
        }

        if (isNaN(reorder) || reorder < 0) {
            setError('Please enter a valid reorder level');
            setLoading(false);
            return;
        }

        const payload = {
            sku: formData.sku,
            name: formData.name,
            description: formData.description,
            price: price,
            isActive: formData.isActive,
            // Only send inventory data for creation or if API supports it
            initialInventory: {
                quantityOnHand: stock,
                reorderLevel: reorder
            }
        };

        console.log('Submitting payload:', payload);

        try {
            if (isEditMode) {
                await productsApi.update(Number(id), payload);
            } else {
                await productsApi.create(payload);
            }
            navigate('/products');
        } catch (err: any) {
            console.error('Submission error:', err);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to save product';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    // ... rest of the component
    if (loading && isEditMode && !formData.sku) {
        return <div className="loading-state">Loading product details...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                    Cancel
                </button>
            </div>

            <div className="card form-container">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Basic Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="sku">SKU</label>
                                <input
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                Product is Active (Visible in Marketplace)
                            </label>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Inventory Settings</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="initialStock">{isEditMode ? 'Current Stock' : 'Initial Stock'}</label>
                                <input
                                    type="number"
                                    id="initialStock"
                                    name="initialStock"
                                    value={formData.initialStock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    disabled={isEditMode}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reorderLevel">Reorder Level (Low Stock Alert)</label>
                                <input
                                    type="number"
                                    id="reorderLevel"
                                    name="reorderLevel"
                                    value={formData.reorderLevel}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
