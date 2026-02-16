import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth';
import { OrderService } from './order.service';
import { StudentService } from '../../students/student.service';

const orderService = new OrderService();
const studentService = new StudentService();

export class OrderController {
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentId, items } = req.body;

            if (!studentId || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    error: 'Missing required fields: studentId, items (array)',
                });
            }

            const order = await orderService.createOrder({ studentId, items });
            res.status(201).json(order);
        } catch (error: any) {
            if (error.message.includes('not found') || error.message.includes('not available')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }

    async getOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const order = await orderService.getOrderById(id);

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const status = req.query.status as string;
            const studentId = req.query.studentId ? (req.query.studentId as string) : undefined;

            const result = await orderService.getAllOrders(page, limit, status, studentId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }

            const order = await orderService.updateOrderStatus(id, status);
            res.json(order);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Order not found' });
            }
            next(error);
        }
    }

    async cancelOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const order = await orderService.cancelOrder(id);
            res.json(order);
        } catch (error: any) {
            if (error.message === 'Order not found') {
                return res.status(404).json({ error: 'Order not found' });
            }
            if (error.message.includes('Cannot cancel')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }

    async getOrderStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await orderService.getOrderStats();
            res.json(stats);
        } catch (error) {
            next(error);
        }
    }

    async getMyOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as AuthenticatedRequest).user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const student = await studentService.getStudentByUserId(userId);
            if (!student) {
                return res.status(404).json({ error: 'Student profile not found' });
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;

            const result = await orderService.getAllOrders(page, limit, undefined, student.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
