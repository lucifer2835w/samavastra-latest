import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const departmentController = new DepartmentController();

router.post(
    '/',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    departmentController.createDepartment
);

router.get(
    '/',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    departmentController.getAllDepartments
);

router.get(
    '/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    departmentController.getDepartment
);

export default router;
