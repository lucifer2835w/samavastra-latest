import { Router } from 'express';
import { TeacherController } from './teacher.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const teacherController = new TeacherController();

// Shared routes
router.get('/me', authenticateJWT, requireRoles('TEACHER'), teacherController.getProfile);

// Admin routes
router.get(
    '/',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    teacherController.getAllTeachers
);

router.get(
    '/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN', 'STUDENT', 'PARENT'), // Students/Parents might need to see teacher info
    teacherController.getTeacher
);

router.put(
    '/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    teacherController.updateTeacher
);

export default router;
