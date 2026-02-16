import { Router } from 'express';
import { LogisticsController } from './logistics.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const logisticsController = new LogisticsController();

// All logistics routes require authentication
router.use(authenticateJWT);

// Get logistics statistics (admin/staff only)
router.get(
    '/stats',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.getLogisticsStats.bind(logisticsController)
);

// Get all tracking records (admin/staff only)
router.get(
    '/',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.getAllTracking.bind(logisticsController)
);

// Track by tracking number (public for customers)
router.get(
    '/track/:trackingNumber',
    logisticsController.getTrackingByNumber.bind(logisticsController)
);

// Get tracking by order ID
router.get(
    '/order/:orderId',
    logisticsController.getTrackingByOrder.bind(logisticsController)
);

// Get specific tracking record
router.get(
    '/:id',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.getTracking.bind(logisticsController)
);

// Create tracking (admin/staff only)
router.post(
    '/',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.createTracking.bind(logisticsController)
);

// Update tracking (admin/staff only)
router.put(
    '/:id',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.updateTracking.bind(logisticsController)
);

// Mark as delivered (admin/staff only)
router.post(
    '/:id/deliver',
    requireRoles('ADMIN', 'STAFF'),
    logisticsController.markAsDelivered.bind(logisticsController)
);

export default router;
