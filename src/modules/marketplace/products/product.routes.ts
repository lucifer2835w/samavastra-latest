import { Router } from 'express';
import { ProductController } from './product.controller';
import { authenticateJWT } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roles';

const router = Router();
const productController = new ProductController();

// Public routes (no auth required for viewing products in marketplace)
router.get('/search', productController.searchProducts.bind(productController));
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProduct.bind(productController));

// Protected routes (admin/staff only)
router.use(authenticateJWT);

router.post(
    '/',
    requireRoles('ADMIN', 'STAFF'),
    productController.createProduct.bind(productController)
);

router.put(
    '/:id',
    requireRoles('ADMIN', 'STAFF'),
    productController.updateProduct.bind(productController)
);

export default router;
