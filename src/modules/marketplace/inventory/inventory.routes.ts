import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const inventoryController = new InventoryController();

// All inventory routes require authentication and admin/staff role
router.use(authenticateJWT);
router.use(requireRoles('ADMIN', 'STAFF'));

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

export default router;
