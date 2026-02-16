import { Router } from 'express';
import { ParentController } from './parent.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const parentController = new ParentController();

// All routes require authentication
router.use(authenticateJWT);

// Get parent's children
router.get(
    '/:parentId/children',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getParentChildren
);

// Get child's overall performance
router.get(
    '/:parentId/children/:studentId/performance',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getChildPerformance
);

// Get child's grades
router.get(
    '/:parentId/children/:studentId/grades',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getChildGrades
);

// Get child's attendance
router.get(
    '/:parentId/children/:studentId/attendance',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getChildAttendance
);

// Get child's fees
router.get(
    '/:parentId/children/:studentId/fees',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getChildFees
);

// Get child's homework
router.get(
    '/:parentId/children/:studentId/homework',
    requireRoles('PARENT', 'ADMIN'),
    parentController.getChildHomework
);

// Update parent access permissions (admin only)
router.put(
    '/:parentId/children/:studentId/access',
    requireRoles('ADMIN'),
    parentController.updateAccess
);

export default router;
