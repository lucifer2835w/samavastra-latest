"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = require("./inventory.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const inventoryController = new inventory_controller_1.InventoryController();
// All inventory routes require authentication and admin/staff role
router.use(auth_1.authenticateJWT);
router.use((0, roles_1.requireRoles)('ADMIN', 'STAFF'));
// Get inventory statistics
router.get('/stats', inventoryController.getInventoryStats.bind(inventoryController));
// Get low stock items
router.get('/low-stock', inventoryController.getLowStockItems.bind(inventoryController));
// Get all inventory
router.get('/', inventoryController.getAllInventory.bind(inventoryController));
// Get inventory for specific product
router.get('/product/:productId', inventoryController.getInventoryByProduct.bind(inventoryController));
// Update inventory
router.put('/product/:productId', inventoryController.updateInventory.bind(inventoryController));
// Adjust inventory (add/remove stock)
router.post('/product/:productId/adjust', inventoryController.adjustInventory.bind(inventoryController));
exports.default = router;
//# sourceMappingURL=inventory.routes.js.map