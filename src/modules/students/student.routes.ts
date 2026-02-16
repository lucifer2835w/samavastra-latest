import { Router } from 'express';
import { StudentController } from './student.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const studentController = new StudentController();

// Public/Shared routes (e.g. for the student themselves)
router.get('/me', authenticateJWT, requireRoles('STUDENT'), studentController.getProfile);

// Admin/Teacher routes
router.get(
    '/',
    authenticateJWT,
    requireRoles('ADMIN', 'TEACHER', 'SUPER_ADMIN'),
    studentController.getAllStudents
);

router.post(
    '/',
    authenticateJWT,
    requireRoles('ADMIN', 'TEACHER', 'SUPER_ADMIN'),
    studentController.createStudent
);

router.get(
    '/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'TEACHER', 'SUPER_ADMIN', 'PARENT'),
    studentController.getStudent
);

router.put(
    '/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    studentController.updateStudent
);

export default router;
