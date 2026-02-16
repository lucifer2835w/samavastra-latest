"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const production_controller_1 = require("./production.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const productionController = new production_controller_1.ProductionController();
// All production routes require authentication and admin/staff role
router.use(auth_1.authenticateJWT);
router.use((0, roles_1.requireRoles)('ADMIN', 'STAFF'));
// Get production statistics
router.get('/stats', productionController.getStats.bind(productionController));
// Get all production logs
router.get('/', productionController.getAllLogs.bind(productionController));
// Create production log
router.post('/', productionController.createLog.bind(productionController));
exports.default = router;
//# sourceMappingURL=production.routes.js.map