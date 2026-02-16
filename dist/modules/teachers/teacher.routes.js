"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_controller_1 = require("./teacher.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const teacherController = new teacher_controller_1.TeacherController();
// Shared routes
router.get('/me', auth_1.authenticateJWT, (0, roles_1.requireRoles)('TEACHER'), teacherController.getProfile);
// Admin routes
router.get('/', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), teacherController.getAllTeachers);
router.get('/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN', 'STUDENT', 'PARENT'), // Students/Parents might need to see teacher info
teacherController.getTeacher);
router.put('/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), teacherController.updateTeacher);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map