"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const roles_1 = require("../../middleware/roles");
const product_routes_1 = __importDefault(require("../../modules/marketplace/products/product.routes"));
const order_routes_1 = __importDefault(require("../../modules/marketplace/orders/order.routes"));
const logistics_routes_1 = __importDefault(require("../../modules/marketplace/logistics/logistics.routes"));
const payment_routes_1 = __importDefault(require("../../modules/marketplace/payments/payment.routes"));
const student_routes_1 = __importDefault(require("../../modules/students/student.routes"));
const teacher_routes_1 = __importDefault(require("../../modules/teachers/teacher.routes"));
const academics_routes_1 = __importDefault(require("../../modules/academics/academics.routes"));
const department_routes_1 = __importDefault(require("../../modules/departments/department.routes"));
const homework_routes_1 = __importDefault(require("../../modules/homework/homework.routes"));
const parent_routes_1 = __importDefault(require("../../modules/parents/parent.routes"));
const report_routes_1 = __importDefault(require("../../modules/reports/report.routes"));
const router = (0, express_1.Router)();
// Mount product/marketplace routes
router.use('/products', product_routes_1.default);
// Mount order routes
router.use('/orders', order_routes_1.default);
// Mount logistics/tracking routes
router.use('/logistics', logistics_routes_1.default);
// Mount payment routes
router.use('/payments', payment_routes_1.default);
// --- CRM Modules ---
// Mount student management routes
router.use('/students', student_routes_1.default);
// Mount teacher management routes
router.use('/teachers', teacher_routes_1.default);
// Mount academics (classes, subjects) routes
router.use('/academics', academics_routes_1.default);
// Mount department management routes
router.use('/departments', department_routes_1.default);
// Mount homework routes
router.use('/homework', homework_routes_1.default);
// Mount parent portal routes
router.use('/parents', parent_routes_1.default);
// Mount reports routes
router.use('/reports', report_routes_1.default);
// Placeholder route for student/parent profile
router.get('/me/profile', auth_1.authenticateJWT, (0, roles_1.requireRoles)('STUDENT', 'PARENT'), (req, res) => {
    res.json({ message: 'Chalkboard profile endpoint (to be implemented)' });
});
exports.default = router;
//# sourceMappingURL=routes.js.map