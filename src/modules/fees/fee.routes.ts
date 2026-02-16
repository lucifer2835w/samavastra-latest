import { Router } from 'express';
import { createFee, getStudentFees, payFee } from './fee.controller';
import { requireRoles } from '../../middleware/roles';

const router = Router();

// Admin can create fees
router.post('/', requireRoles('ADMIN'), createFee);

// Students can view their own fees (logic inside controller handles role check)
// Teachers/Admins can view by student ID
router.get('/student/:studentId', requireRoles('ADMIN', 'TEACHER', 'STUDENT'), getStudentFees);

// Pay fee
router.post('/pay', requireRoles('ADMIN', 'STUDENT'), payFee);

export default router;
