import { Router } from 'express';
import { ProductionController } from './production.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const productionController = new ProductionController();

// All production routes require authentication and admin/staff role
router.use(authenticateJWT);
router.use(requireRoles('ADMIN', 'STAFF'));

// Get production statistics
router.get('/stats', productionController.getStats.bind(productionController));

// Get all production logs
router.get('/', productionController.getAllLogs.bind(productionController));

// Create production log
router.post('/', productionController.createLog.bind(productionController));

export default router;
