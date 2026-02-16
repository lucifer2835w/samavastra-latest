import React, { useState, useEffect } from 'react';
import { productsApi } from '../../api';
import { useCart } from '../../context/CartContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import type { Product } from '../../types';
import './Marketplace.css';

export const Marketplace: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { addItem } = useCart();

    useEffect(() => {
        console.log('Products state updated:', products);
    }, [products]);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching products...');
            const data = await productsApi.getAll();
            console.log('Products API REsponse:', data);

            if (data && data.products) {
                console.log('Setting products:', data.products);
                setProducts(data.products);
            } else {
                console.warn('Unexpected API response structure:', data);
                setError('Received invalid data from server');
            }
        } catch (error: any) {
            console.error('Failed to load products:', error);
            setError(error.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!search.trim()) {
            loadProducts();
            return;
        }
        try {
            const data = await productsApi.search(search);
            setProducts(data);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="marketplace-page">
            <div className="container">
                <div className="marketplace-header">
                    <h1>Marketplace</h1>
                    <p>Browse and shop for {products.length} products</p>
                </div>

                {error && (
                    <div className="error-message" style={{ color: 'red', padding: '1rem', border: '1px solid red', borderRadius: '4px', marginBottom: '1rem' }}>
                        <h3>Error Loading Products</h3>
                        <p>{error}</p>
                        <Button onClick={loadProducts}>Retry</Button>
                    </div>
                )}

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="search-input"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <Card key={product.id} className="product-card" hover>
                            <div className="product-image">
                                <div className="product-placeholder">
                                    {product.name.charAt(0)}
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-description">{product.description || 'No description available'}</p>
                                <div className="product-footer">
                                    <span className="product-price">
                                        ${(typeof product.price === 'string' ? parseFloat(product.price) : Number(product.price)).toFixed(2)}
                                    </span>
                                    <Button
                                        size="sm"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={!product.isActive}
                                    >
                                        {product.isActive ? 'Add to Cart' : 'Out of Stock'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {products.length === 0 && !loading && !error && (
                    <div className="empty-state">
                        <p>No products found (Count: {products.length})</p>
                    </div>
                )}
            </div>
        </div>
    );
};
