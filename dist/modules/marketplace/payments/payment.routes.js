"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const paymentController = new payment_controller_1.PaymentController();
// All payment routes require authentication
router.use(auth_1.authenticateJWT);
// Get payment statistics (admin/staff only)
router.get('/stats', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), paymentController.getPaymentStats.bind(paymentController));
// Get all payments (admin/staff only)
router.get('/', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), paymentController.getAllPayments.bind(paymentController));
// Get payments for an order
router.get('/order/:orderId', paymentController.getPaymentsByOrder.bind(paymentController));
// Get specific payment
router.get('/:id', paymentController.getPayment.bind(paymentController));
// Create payment
router.post('/', (0, roles_1.requireRoles)('STUDENT', 'PARENT', 'ADMIN', 'STAFF'), paymentController.createPayment.bind(paymentController));
// Update payment status (admin/staff only)
router.patch('/:id/status', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), paymentController.updatePaymentStatus.bind(paymentController));
// Process refund (admin only)
router.post('/refund', (0, roles_1.requireRoles)('ADMIN'), paymentController.processRefund.bind(paymentController));
exports.default = router;
//# sourceMappingURL=payment.routes.js.map