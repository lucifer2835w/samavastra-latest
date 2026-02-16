"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fee_controller_1 = require("./fee.controller");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
// Admin can create fees
router.post('/', (0, roles_1.requireRoles)('ADMIN'), fee_controller_1.createFee);
// Students can view their own fees (logic inside controller handles role check)
// Teachers/Admins can view by student ID
router.get('/student/:studentId', (0, roles_1.requireRoles)('ADMIN', 'TEACHER', 'STUDENT'), fee_controller_1.getStudentFees);
// Pay fee
router.post('/pay', (0, roles_1.requireRoles)('ADMIN', 'STUDENT'), fee_controller_1.payFee);
exports.default = router;
//# sourceMappingURL=fee.routes.js.map