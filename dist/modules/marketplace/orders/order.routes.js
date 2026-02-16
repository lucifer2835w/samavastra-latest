"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const orderController = new order_controller_1.OrderController();
// All order routes require authentication
router.use(auth_1.authenticateJWT);
// Get order statistics (admin/staff only)
router.get('/stats', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), orderController.getOrderStats.bind(orderController));
// Get all orders (admin/staff only)
router.get('/', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), orderController.getAllOrders.bind(orderController));
// Get specific order
router.get('/:id', orderController.getOrder.bind(orderController));
// Create new order (students can create their own orders)
// Create new order (students can create their own orders)
router.post('/', (0, roles_1.requireRoles)('STUDENT', 'PARENT', 'ADMIN', 'STAFF'), orderController.createOrder.bind(orderController));
// Get my orders
router.get('/my-orders', (0, roles_1.requireRoles)('STUDENT', 'PARENT'), orderController.getMyOrders.bind(orderController));
// Update order status (admin/staff only)
router.patch('/:id/status', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), orderController.updateOrderStatus.bind(orderController));
// Cancel order
router.post('/:id/cancel', orderController.cancelOrder.bind(orderController));
exports.default = router;
//# sourceMappingURL=order.routes.js.map