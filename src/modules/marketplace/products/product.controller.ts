import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth';
import { ProductService } from './product.service';

const productService = new ProductService();

export class ProductController {
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const activeOnly = req.query.activeOnly !== 'false';

            const result = await productService.getAllProducts(page, limit, activeOnly);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const product = await productService.getProductById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
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
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Product SKU already exists' });
            }
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const { name, description, price, isActive } = req.body;

            const updateData: any = {
                name,
                description,
                isActive,
            };

            if (price !== undefined) {
                updateData.price = parseFloat(price as string);
            }

            const product = await productService.updateProduct(id, updateData);

            res.json(product);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Product not found' });
            }
            next(error);
        }
    }

    async searchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query.q as string;

            if (!query) {
                return res.status(400).json({ error: 'Search query is required' });
            }

            const products = await productService.searchProducts(query);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
}
