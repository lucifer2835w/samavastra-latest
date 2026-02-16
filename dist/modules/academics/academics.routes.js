"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academics_controller_1 = require("./academics.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const academicsController = new academics_controller_1.AcademicsController();
// Classes
router.post('/classes', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), academicsController.createClass);
router.get('/classes', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN', 'TEACHER'), academicsController.getAllClasses);
router.get('/classes/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN', 'TEACHER'), academicsController.getClass);
// Subjects
router.post('/subjects', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), academicsController.createSubject);
router.get('/subjects', auth_1.authenticateJWT, academicsController.getAllSubjects // Public to authenticated users? or restricted?
);
// Exams
router.post('/exams', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), academicsController.createExam);
router.get('/exams/subject/:subjectId', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), academicsController.getExamsBySubject);
router.post('/exams/results', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), academicsController.recordExamResult);
// Attendance
router.post('/attendance', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), academicsController.recordAttendance);
router.get('/attendance/class/:classId', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER', 'ADMIN'), academicsController.getAttendanceByClass);
// Performance
router.get('/performance', auth_1.authenticateJWT, (0, roles_1.requireRoles)('STUDENT'), academicsController.getStudentPerformance);
router.get('/performance/:studentId', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'TEACHER'), academicsController.getStudentPerformance);
exports.default = router;
//# sourceMappingURL=academics.routes.js.map