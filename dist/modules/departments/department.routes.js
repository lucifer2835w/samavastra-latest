"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("./department.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const departmentController = new department_controller_1.DepartmentController();
router.post('/', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), departmentController.createDepartment);
router.get('/', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), departmentController.getAllDepartments);
router.get('/:id', auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN'), departmentController.getDepartment);
exports.default = router;
//# sourceMappingURL=department.routes.js.map