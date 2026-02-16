import { Router } from 'express';
import { AcademicsController } from './academics.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const academicsController = new AcademicsController();

// Classes
router.post(
    '/classes',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    academicsController.createClass
);

router.get(
    '/classes',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN', 'TEACHER'),
    academicsController.getAllClasses
);

router.get(
    '/classes/:id',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN', 'TEACHER'),
    academicsController.getClass
);

// Subjects
router.post(
    '/subjects',
    authenticateJWT,
    requireRoles('ADMIN', 'SUPER_ADMIN'),
    academicsController.createSubject
);

router.get(
    '/subjects',
    authenticateJWT,
    academicsController.getAllSubjects // Public to authenticated users? or restricted?
);

// Exams
router.post(
    '/exams',
    authenticateJWT,
    requireRoles('TEACHER', 'ADMIN'),
    academicsController.createExam
);

router.get(
    '/exams/subject/:subjectId',
    authenticateJWT,
    requireRoles('TEACHER', 'ADMIN'),
    academicsController.getExamsBySubject
);

router.post(
    '/exams/results',
    authenticateJWT,
    requireRoles('TEACHER', 'ADMIN'),
    academicsController.recordExamResult
);

// Attendance
router.post(
    '/attendance',
    authenticateJWT,
    requireRoles('TEACHER', 'ADMIN'),
    academicsController.recordAttendance
);

router.get(
    '/attendance/class/:classId',
    authenticateJWT,
    requireRoles('TEACHER', 'ADMIN'),
    academicsController.getAttendanceByClass
);

// Performance
router.get(
    '/performance',
    authenticateJWT,
    requireRoles('STUDENT'),
    academicsController.getStudentPerformance
);

router.get(
    '/performance/:studentId',
    authenticateJWT,
    requireRoles('ADMIN', 'TEACHER'),
    academicsController.getStudentPerformance
);

export default router;
