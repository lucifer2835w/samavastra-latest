import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const paymentController = new PaymentController();

// All payment routes require authentication
router.use(authenticateJWT);

// Get payment statistics (admin/staff only)
router.get(
    '/stats',
    requireRoles('ADMIN', 'STAFF'),
    paymentController.getPaymentStats.bind(paymentController)
);

// Get all payments (admin/staff only)
router.get(
    '/',
    requireRoles('ADMIN', 'STAFF'),
    paymentController.getAllPayments.bind(paymentController)
);

// Get payments for an order
router.get(
    '/order/:orderId',
    paymentController.getPaymentsByOrder.bind(paymentController)
);

// Get specific payment
router.get(
    '/:id',
    paymentController.getPayment.bind(paymentController)
);

// Create payment
router.post(
    '/',
    requireRoles('STUDENT', 'PARENT', 'ADMIN', 'STAFF'),
    paymentController.createPayment.bind(paymentController)
);

// Update payment status (admin/staff only)
router.patch(
    '/:id/status',
    requireRoles('ADMIN', 'STAFF'),
    paymentController.updatePaymentStatus.bind(paymentController)
);

// Process refund (admin only)
router.post(
    '/refund',
    requireRoles('ADMIN'),
    paymentController.processRefund.bind(paymentController)
);

export default router;
