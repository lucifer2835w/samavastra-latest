"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homework_controller_1 = require("./homework.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const homeworkController = new homework_controller_1.HomeworkController();
// All routes require authentication
router.use(auth_1.authenticateJWT);
// Teacher creates homework
router.post('/', (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), homeworkController.createHomework);
// Get all homework
router.get('/', (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), homeworkController.getAllHomework);
// Get homework by subject
router.get('/subject/:subjectId', homeworkController.getHomeworkBySubject);
// Get homework by ID
router.get('/:id', homeworkController.getHomeworkById);
// Student submits homework
router.post('/submit', (0, roles_1.requireRoles)('STUDENT'), homeworkController.submitHomework);
// Teacher grades homework
router.post('/submissions/:submissionId/grade', (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), homeworkController.gradeHomework);
// Get student's homework
router.get('/student/:studentId', homeworkController.getStudentHomework);
// Get submissions for homework
router.get('/:homeworkId/submissions', (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), homeworkController.getHomeworkSubmissions);
exports.default = router;
//# sourceMappingURL=homework.routes.js.map