import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth';
import { PaymentService } from './payment.service';

const paymentService = new PaymentService();

export class PaymentController {
    async createPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId, amount, paymentMethod, transactionReference } = req.body;

            if (!orderId || !amount || !paymentMethod) {
                return res.status(400).json({
                    error: 'Missing required fields: orderId, amount, paymentMethod',
                });
            }

            const payment = await paymentService.createPayment({
                orderId,
                amount: parseFloat(amount),
                paymentMethod,
                transactionReference,
            });

            res.status(201).json(payment);
        } catch (error) {
            next(error);
        }
    }

    async getPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const payment = await paymentService.getPaymentById(id);

            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }

            res.json(payment);
        } catch (error) {
            next(error);
        }
    }

    async getPaymentsByOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.orderId as string);
            const payments = await paymentService.getPaymentsByOrderId(orderId);
            res.json(payments);
        } catch (error) {
            next(error);
        }
    }

    async updatePaymentStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const { status, transactionReference } = req.body;

            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }

            const payment = await paymentService.updatePaymentStatus(
                id,
                status,
                transactionReference
            );

            res.json(payment);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Payment not found' });
            }
            next(error);
        }
    }

    async processRefund(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId, amount, reason } = req.body;

            if (!orderId || !amount) {
                return res.status(400).json({
                    error: 'Missing required fields: orderId, amount',
                });
            }

            const refund = await paymentService.processRefund(
                orderId,
                parseFloat(amount),
                reason
            );

            res.status(201).json(refund);
        } catch (error) {
            next(error);
        }
    }

    async getAllPayments(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const status = req.query.status as string;
            const orderId = req.query.orderId ? parseInt(req.query.orderId as string) : undefined;

            const result = await paymentService.getAllPayments(page, limit, status, orderId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getPaymentStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await paymentService.getPaymentStats();
            res.json(stats);
        } catch (error) {
            next(error);
        }
    }
}
