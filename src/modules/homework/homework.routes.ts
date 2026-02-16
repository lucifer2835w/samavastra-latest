import { Router } from 'express';
import { HomeworkController } from './homework.controller';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';

const router = Router();
const homeworkController = new HomeworkController();

// All routes require authentication
router.use(authenticateJWT);

// Teacher creates homework
router.post(
    '/',
    requireRoles('TEACHER', 'ADMIN'),
    homeworkController.createHomework
);

// Get all homework
router.get(
    '/',
    requireRoles('TEACHER', 'ADMIN'),
    homeworkController.getAllHomework
);

// Get homework by subject
router.get(
    '/subject/:subjectId',
    homeworkController.getHomeworkBySubject
);

// Get homework by ID
router.get(
    '/:id',
    homeworkController.getHomeworkById
);

// Student submits homework
router.post(
    '/submit',
    requireRoles('STUDENT'),
    homeworkController.submitHomework
);

// Teacher grades homework
router.post(
    '/submissions/:submissionId/grade',
    requireRoles('TEACHER', 'ADMIN'),
    homeworkController.gradeHomework
);

// Get student's homework
router.get(
    '/student/:studentId',
    homeworkController.getStudentHomework
);

// Get submissions for homework
router.get(
    '/:homeworkId/submissions',
    requireRoles('TEACHER', 'ADMIN'),
    homeworkController.getHomeworkSubmissions
);

export default router;
