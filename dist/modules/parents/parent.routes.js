"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parent_controller_1 = require("./parent.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const parentController = new parent_controller_1.ParentController();
// All routes require authentication
router.use(auth_1.authenticateJWT);
// Get parent's children
router.get('/:parentId/children', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getParentChildren);
// Get child's overall performance
router.get('/:parentId/children/:studentId/performance', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getChildPerformance);
// Get child's grades
router.get('/:parentId/children/:studentId/grades', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getChildGrades);
// Get child's attendance
router.get('/:parentId/children/:studentId/attendance', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getChildAttendance);
// Get child's fees
router.get('/:parentId/children/:studentId/fees', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getChildFees);
// Get child's homework
router.get('/:parentId/children/:studentId/homework', (0, roles_1.requireRoles)('PARENT', 'ADMIN'), parentController.getChildHomework);
// Update parent access permissions (admin only)
router.put('/:parentId/children/:studentId/access', (0, roles_1.requireRoles)('ADMIN'), parentController.updateAccess);
exports.default = router;
//# sourceMappingURL=parent.routes.js.map