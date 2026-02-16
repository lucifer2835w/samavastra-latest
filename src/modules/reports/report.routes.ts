import { Router } from 'express';
import { ReportController } from './report.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const reportController = new ReportController();

// All routes require authentication and admin/teacher roles
router.use(authenticateJWT);
router.use(requireRoles('ADMIN', 'TEACHER'));

// Student report card
router.get(
    '/student/:studentId',
    reportController.generateStudentReportCard
);

// Class performance report
router.get(
    '/class/:classId',
    reportController.generateClassPerformanceReport
);

// Attendance report
router.get(
    '/attendance',
    reportController.generateAttendanceReport
);

// Fee collection report
router.get(
    '/fees',
    reportController.generateFeeCollectionReport
);

// Teacher workload report
router.get(
    '/teacher-workload',
    reportController.generateTeacherWorkloadReport
);

export default router;
