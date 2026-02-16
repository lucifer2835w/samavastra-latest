"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const student_routes_1 = __importDefault(require("../../modules/students/student.routes"));
const teacher_routes_1 = __importDefault(require("../../modules/teachers/teacher.routes"));
const academics_routes_1 = __importDefault(require("../../modules/academics/academics.routes"));
const department_routes_1 = __importDefault(require("../../modules/departments/department.routes"));
const admin_routes_1 = __importDefault(require("../../modules/admin/admin.routes"));
const report_routes_1 = __importDefault(require("../../modules/reports/report.routes"));
const product_routes_1 = __importDefault(require("../../modules/marketplace/products/product.routes"));
const order_routes_1 = __importDefault(require("../../modules/marketplace/orders/order.routes"));
const inventory_routes_1 = __importDefault(require("../../modules/marketplace/inventory/inventory.routes"));
const logistics_routes_1 = __importDefault(require("../../modules/marketplace/logistics/logistics.routes"));
const production_routes_1 = __importDefault(require("../../modules/marketplace/production/production.routes"));
const payment_routes_1 = __importDefault(require("../../modules/marketplace/payments/payment.routes"));
const homework_routes_1 = __importDefault(require("../../modules/homework/homework.routes"));
const parent_routes_1 = __importDefault(require("../../modules/parents/parent.routes"));
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJWT);
// Mount student management routes
router.use('/students', student_routes_1.default);
// Mount teacher management routes
router.use('/teachers', teacher_routes_1.default);
// Mount academics (classes, subjects) routes
router.use('/academics', academics_routes_1.default);
// Mount department management routes
router.use('/departments', department_routes_1.default);
// Mount admin routes
router.use('/admin', admin_routes_1.default);
// Mount report routes
router.use('/reports', report_routes_1.default);
// Mount product management routes
router.use('/products', product_routes_1.default);
// Mount order management routes
router.use('/orders', order_routes_1.default);
// Mount inventory management routes
router.use('/inventory', inventory_routes_1.default);
// Mount logistics management routes
router.use('/logistics', logistics_routes_1.default);
// Mount production management routes
router.use('/production', production_routes_1.default);
// Mount payment management routes
router.use('/payments', payment_routes_1.default);
// Mount homework routes
router.use('/homework', homework_routes_1.default);
// Mount parent routes
router.use('/parents', parent_routes_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map