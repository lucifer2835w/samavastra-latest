"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("./report.controller");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const router = (0, express_1.Router)();
const reportController = new report_controller_1.ReportController();
// All routes require authentication and admin/teacher roles
router.use(auth_1.authenticateJWT);
router.use((0, roles_1.requireRoles)('ADMIN', 'TEACHER'));
// Student report card
router.get('/student/:studentId', reportController.generateStudentReportCard);
// Class performance report
router.get('/class/:classId', reportController.generateClassPerformanceReport);
// Attendance report
router.get('/attendance', reportController.generateAttendanceReport);
// Fee collection report
router.get('/fees', reportController.generateFeeCollectionReport);
// Teacher workload report
router.get('/teacher-workload', reportController.generateTeacherWorkloadReport);
exports.default = router;
//# sourceMappingURL=report.routes.js.map