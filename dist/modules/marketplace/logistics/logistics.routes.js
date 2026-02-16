"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logistics_controller_1 = require("./logistics.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const logisticsController = new logistics_controller_1.LogisticsController();
// All logistics routes require authentication
router.use(auth_1.authenticateJWT);
// Get logistics statistics (admin/staff only)
router.get('/stats', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.getLogisticsStats.bind(logisticsController));
// Get all tracking records (admin/staff only)
router.get('/', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.getAllTracking.bind(logisticsController));
// Track by tracking number (public for customers)
router.get('/track/:trackingNumber', logisticsController.getTrackingByNumber.bind(logisticsController));
// Get tracking by order ID
router.get('/order/:orderId', logisticsController.getTrackingByOrder.bind(logisticsController));
// Get specific tracking record
router.get('/:id', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.getTracking.bind(logisticsController));
// Create tracking (admin/staff only)
router.post('/', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.createTracking.bind(logisticsController));
// Update tracking (admin/staff only)
router.put('/:id', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.updateTracking.bind(logisticsController));
// Mark as delivered (admin/staff only)
router.post('/:id/deliver', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), logisticsController.markAsDelivered.bind(logisticsController));
exports.default = router;
//# sourceMappingURL=logistics.routes.js.map