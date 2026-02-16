"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../../middleware/auth");
const roles_1 = require("../../../middleware/roles");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
// Public routes (no auth required for viewing products in marketplace)
router.get('/search', productController.searchProducts.bind(productController));
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProduct.bind(productController));
// Protected routes (admin/staff only)
router.use(auth_1.authenticateJWT);
router.post('/', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), productController.createProduct.bind(productController));
router.put('/:id', (0, roles_1.requireRoles)('ADMIN', 'STAFF'), productController.updateProduct.bind(productController));
exports.default = router;
//# sourceMappingURL=product.routes.js.map