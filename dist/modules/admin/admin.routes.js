"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const adminController = new admin_controller_1.AdminController();
// All admin routes require ADMIN or SUPER_ADMIN role
const adminOnly = [auth_1.authenticateJWT, (0, roles_1.requireRoles)('ADMIN', 'SUPER_ADMIN')];
// User Management
router.get('/users', ...adminOnly, adminController.getAllUsers);
router.get('/users/:id', ...adminOnly, adminController.getUserById);
router.post('/users', ...adminOnly, adminController.createUser);
router.put('/users/:id', ...adminOnly, adminController.updateUser);
router.post('/users/:id/roles', ...adminOnly, adminController.assignRoles);
router.post('/users/:id/deactivate', ...adminOnly, adminController.deactivateUser);
router.post('/users/:id/reset-password', ...adminOnly, adminController.resetPassword);
// System Analytics
router.get('/analytics', ...adminOnly, adminController.getSystemAnalytics);
router.get('/roles', ...adminOnly, adminController.getRoles);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map