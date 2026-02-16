import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';
import chalkboardRoutes from './portals/chalkboard/routes';
import samavestRoutes from './portals/samavest/routes';
import { errorHandler } from './middleware/errorHandler';
// Import marketplace routes
import productRoutes from './modules/marketplace/products/product.routes';
import orderRoutes from './modules/marketplace/orders/order.routes';
import logisticsRoutes from './modules/marketplace/logistics/logistics.routes';
import paymentRoutes from './modules/marketplace/payments/payment.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import feeRoutes from './modules/fees/fee.routes';
import inventoryRoutes from './modules/marketplace/inventory/inventory.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/chalkboard', chalkboardRoutes);
app.use('/api/samavest', samavestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/fees', feeRoutes);

// Mount Marketplace Modules under /api/marketplace
const marketplaceRouter = express.Router();
marketplaceRouter.use('/products', productRoutes);
marketplaceRouter.use('/orders', orderRoutes);
marketplaceRouter.use('/logistics', logisticsRoutes);
marketplaceRouter.use('/payments', paymentRoutes);
marketplaceRouter.use('/inventory', inventoryRoutes);

app.use('/api/marketplace', marketplaceRouter);

app.use(errorHandler);

export default app;

