import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth';
import { InventoryService } from './inventory.service';

const inventoryService = new InventoryService();

export class InventoryController {
    async getAllInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const lowStock = req.query.lowStock === 'true';

            const result = await inventoryService.getAllInventory(page, limit, lowStock);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getInventoryByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string;
            const inventory = await inventoryService.getInventoryByProductId(productId);

            if (!inventory) {
                return res.status(404).json({ error: 'Inventory not found for this product' });
            }

            res.json(inventory);
        } catch (error) {
            next(error);
        }
    }

    async updateInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string;
            const { quantityOnHand, reorderLevel, location } = req.body;

            const inventory = await inventoryService.updateInventory(productId, {
                quantityOnHand,
                reorderLevel,
                location,
            });

            res.json(inventory);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Inventory not found' });
            }
            next(error);
        }
    }

    async adjustInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId as string;
            const { adjustment, notes } = req.body;

            if (adjustment === undefined || adjustment === null) {
                return res.status(400).json({ error: 'Adjustment amount is required' });
            }

            const inventory = await inventoryService.adjustInventory(
                productId,
                parseInt(adjustment),
                notes
            );

            res.json(inventory);
        } catch (error: any) {
            if (error.message.includes('not found') || error.message.includes('Insufficient')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }

    async getLowStockItems(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await inventoryService.getLowStockItems();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    async getInventoryStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await inventoryService.getInventoryStats();
            res.json(stats);
        } catch (error) {
            next(error);
        }
    }
}
