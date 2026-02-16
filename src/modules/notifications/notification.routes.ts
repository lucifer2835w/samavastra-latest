import { Router } from 'express';
import { createNotification, getMyNotifications } from './notification.controller';
import { requireRoles } from '../../middleware/roles';

const router = Router();

// Only Admin/Teachers can send notifications
router.post('/send', requireRoles('ADMIN', 'TEACHER'), createNotification);

// All authenticated users can view their notifications
router.get('/my', getMyNotifications);

export default router;
