"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_service_1 = require("./inventory.service");
const inventoryService = new inventory_service_1.InventoryService();
class InventoryController {
    async getAllInventory(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const lowStock = req.query.lowStock === 'true';
            const result = await inventoryService.getAllInventory(page, limit, lowStock);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getInventoryByProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const inventory = await inventoryService.getInventoryByProductId(productId);
            if (!inventory) {
                return res.status(404).json({ error: 'Inventory not found for this product' });
            }
            res.json(inventory);
        }
        catch (error) {
            next(error);
        }
    }
    async updateInventory(req, res, next) {
        try {
            const productId = req.params.productId;
            const { quantityOnHand, reorderLevel, location } = req.body;
            const inventory = await inventoryService.updateInventory(productId, {
                quantityOnHand,
                reorderLevel,
                location,
            });
            res.json(inventory);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Inventory not found' });
            }
            next(error);
        }
    }
    async adjustInventory(req, res, next) {
        try {
            const productId = req.params.productId;
            const { adjustment, notes } = req.body;
            if (adjustment === undefined || adjustment === null) {
                return res.status(400).json({ error: 'Adjustment amount is required' });
            }
            const inventory = await inventoryService.adjustInventory(productId, parseInt(adjustment), notes);
            res.json(inventory);
        }
        catch (error) {
            if (error.message.includes('not found') || error.message.includes('Insufficient')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }
    async getLowStockItems(req, res, next) {
        try {
            const items = await inventoryService.getLowStockItems();
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    }
    async getInventoryStats(req, res, next) {
        try {
            const stats = await inventoryService.getInventoryStats();
            res.json(stats);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map