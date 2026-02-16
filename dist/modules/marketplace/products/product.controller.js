"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const activeOnly = req.query.activeOnly !== 'false';
            const result = await productService.getAllProducts(page, limit, activeOnly);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getProduct(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const { sku, name, description, price, isActive, initialInventory } = req.body;
            if (!sku || !name || price === undefined) {
                return res.status(400).json({
                    error: 'Missing required fields: sku, name, price',
                });
            }
            const product = await productService.createProduct({
                sku,
                name,
                description,
                price: parseFloat(price),
                isActive,
                initialInventory,
            });
            res.status(201).json(product);
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Product SKU already exists' });
            }
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description, price, isActive } = req.body;
            const updateData = {
                name,
                description,
                isActive,
            };
            if (price !== undefined) {
                updateData.price = parseFloat(price);
            }
            const product = await productService.updateProduct(id, updateData);
            res.json(product);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Product not found' });
            }
            next(error);
        }
    }
    async searchProducts(req, res, next) {
        try {
            const query = req.query.q;
            if (!query) {
                return res.status(400).json({ error: 'Search query is required' });
            }
            const products = await productService.searchProducts(query);
            res.json(products);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map