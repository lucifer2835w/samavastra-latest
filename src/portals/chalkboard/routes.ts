import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth';
import { requireRoles } from '../../middleware/roles';
import productRoutes from '../../modules/marketplace/products/product.routes';
import orderRoutes from '../../modules/marketplace/orders/order.routes';
import logisticsRoutes from '../../modules/marketplace/logistics/logistics.routes';
import paymentRoutes from '../../modules/marketplace/payments/payment.routes';
import studentRoutes from '../../modules/students/student.routes';
import teacherRoutes from '../../modules/teachers/teacher.routes';
import academicsRoutes from '../../modules/academics/academics.routes';
import departmentRoutes from '../../modules/departments/department.routes';
import homeworkRoutes from '../../modules/homework/homework.routes';
import parentRoutes from '../../modules/parents/parent.routes';
import reportsRoutes from '../../modules/reports/report.routes';

const router = Router();

// Mount product/marketplace routes
router.use('/products', productRoutes);

// Mount order routes
router.use('/orders', orderRoutes);

// Mount logistics/tracking routes
router.use('/logistics', logisticsRoutes);

// Mount payment routes
router.use('/payments', paymentRoutes);

// --- CRM Modules ---

// Mount student management routes
router.use('/students', studentRoutes);

// Mount teacher management routes
router.use('/teachers', teacherRoutes);

// Mount academics (classes, subjects) routes
router.use('/academics', academicsRoutes);

// Mount department management routes
router.use('/departments', departmentRoutes);

// Mount homework routes
router.use('/homework', homeworkRoutes);

// Mount parent portal routes
router.use('/parents', parentRoutes);

// Mount reports routes
router.use('/reports', reportsRoutes);

// Placeholder route for student/parent profile
router.get(
  '/me/profile',
  authenticateJWT,
  requireRoles('STUDENT', 'PARENT'),
  (req, res) => {
    res.json({ message: 'Chalkboard profile endpoint (to be implemented)' });
  }
);

export default router;

