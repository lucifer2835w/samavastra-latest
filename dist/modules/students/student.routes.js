"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const studentController = new student_controller_1.StudentController();
// Public/Shared routes (e.g. for the student themselves)
router.get('/me', auth_1.authenticateJWT, (0, roles_1.requireRoles)('STUDENT'), studentController.getProfile);
// Admin/Teacher routes
router.get('/', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'TEACHER', 'SUPER_ADMIN'), studentController.getAllStudents);
router.post('/', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'TEACHER', 'SUPER_ADMIN'), studentController.createStudent);
router.get('/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'TEACHER', 'SUPER_ADMIN', 'PARENT'), studentController.getStudent);
router.put('/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), studentController.updateStudent);
exports.default = router;
//# sourceMappingURL=student.routes.js.map