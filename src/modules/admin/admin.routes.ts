import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const adminController = new AdminController();

// All admin routes require ADMIN or SUPER_ADMIN role
const adminOnly = [authenticateJWT, requireRoles('ADMIN', 'SUPER_ADMIN')];

// User Management
router.get('/users', ...adminOnly, adminController.getAllUsers);
router.get('/users/:id', ...adminOnly, adminController.getUserById);
router.post('/users', ...adminOnly, adminController.createUser);
router.put('/users/:id', ...adminOnly, adminController.updateUser);
router.post('/users/:id/roles', ...adminOnly, adminController.assignRoles);
router.post('/users/:id/deactivate', ...adminOnly, adminController.deactivateUser);
router.post('/users/:id/reset-password', ...adminOnly, adminController.resetPassword);

// System Analytics
router.get('/analytics', ...adminOnly, adminController.getSystemAnalytics);
router.get('/roles', ...adminOnly, adminController.getRoles);

export default router;
