import { Router } from 'express';
import { OrderController } from './order.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const orderController = new OrderController();

// All order routes require authentication
router.use(authenticateJWT);

// Get order statistics (admin/staff only)
router.get(
    '/stats',
    requireRoles('ADMIN', 'STAFF'),
    orderController.getOrderStats.bind(orderController)
);

// Get all orders (admin/staff only)
router.get(
    '/',
    requireRoles('ADMIN', 'STAFF'),
    orderController.getAllOrders.bind(orderController)
);

// Get specific order
router.get(
    '/:id',
    orderController.getOrder.bind(orderController)
);

// Create new order (students can create their own orders)
// Create new order (students can create their own orders)
router.post(
    '/',
    requireRoles('STUDENT', 'PARENT', 'ADMIN', 'STAFF'),
    orderController.createOrder.bind(orderController)
);

// Get my orders
router.get(
    '/my-orders',
    requireRoles('STUDENT', 'PARENT'),
    orderController.getMyOrders.bind(orderController)
);

// Update order status (admin/staff only)
router.patch(
    '/:id/status',
    requireRoles('ADMIN', 'STAFF'),
    orderController.updateOrderStatus.bind(orderController)
);

// Cancel order
router.post(
    '/:id/cancel',
    orderController.cancelOrder.bind(orderController)
);

export default router;
