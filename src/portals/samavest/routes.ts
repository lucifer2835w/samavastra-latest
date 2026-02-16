import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';
import studentRoutes from '../../modules/students/student.routes';
import teacherRoutes from '../../modules/teachers/teacher.routes';
import academicsRoutes from '../../modules/academics/academics.routes';
import departmentRoutes from '../../modules/departments/department.routes';
import adminRoutes from '../../modules/admin/admin.routes';
import reportRoutes from '../../modules/reports/report.routes';
import productRoutes from '../../modules/marketplace/products/product.routes';
import orderRoutes from '../../modules/marketplace/orders/order.routes';
import inventoryRoutes from '../../modules/marketplace/inventory/inventory.routes';
import logisticsRoutes from '../../modules/marketplace/logistics/logistics.routes';
import productionRoutes from '../../modules/marketplace/production/production.routes';
import paymentRoutes from '../../modules/marketplace/payments/payment.routes';
import homeworkRoutes from '../../modules/homework/homework.routes';
import parentRoutes from '../../modules/parents/parent.routes';

const router = Router();

router.use(authenticateJWT);

// Mount student management routes
router.use('/students', studentRoutes);

// Mount teacher management routes
router.use('/teachers', teacherRoutes);

// Mount academics (classes, subjects) routes
router.use('/academics', academicsRoutes);

// Mount department management routes
router.use('/departments', departmentRoutes);

// Mount admin routes
router.use('/admin', adminRoutes);

// Mount report routes
router.use('/reports', reportRoutes);

// Mount product management routes
router.use('/products', productRoutes);

// Mount order management routes
router.use('/orders', orderRoutes);

// Mount inventory management routes
router.use('/inventory', inventoryRoutes);

// Mount logistics management routes
router.use('/logistics', logisticsRoutes);

// Mount production management routes
router.use('/production', productionRoutes);

// Mount payment management routes
router.use('/payments', paymentRoutes);

// Mount homework routes
router.use('/homework', homeworkRoutes);

// Mount parent routes
router.use('/parents', parentRoutes);

export default router;

