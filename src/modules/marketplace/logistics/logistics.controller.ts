import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth';
import { LogisticsService } from './logistics.service';

const logisticsService = new LogisticsService();

export class LogisticsController {
    async createTracking(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId, trackingNumber, status, estimatedDelivery } = req.body;

            if (!orderId || !trackingNumber || !status) {
                return res.status(400).json({
                    error: 'Missing required fields: orderId, trackingNumber, status',
                });
            }

            const trackData: any = {
                orderId,
                trackingNumber,
                status,
            };

            if (estimatedDelivery) {
                trackData.estimatedDelivery = new Date(estimatedDelivery);
            }

            const tracking = await logisticsService.createTracking(trackData);

            res.status(201).json(tracking);
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Tracking number already exists' });
            }
            next(error);
        }
    }

    async getTracking(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const tracking = await logisticsService.getTrackingById(id);

            if (!tracking) {
                return res.status(404).json({ error: 'Tracking not found' });
            }

            res.json(tracking);
        } catch (error) {
            next(error);
        }
    }

    async getTrackingByNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const trackingNumber = req.params.trackingNumber as string;
            const tracking = await logisticsService.getTrackingByNumber(trackingNumber);

            if (!tracking) {
                return res.status(404).json({ error: 'Tracking not found' });
            }

            res.json(tracking);
        } catch (error) {
            next(error);
        }
    }

    async getTrackingByOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.orderId as string);
            const tracking = await logisticsService.getTrackingByOrderId(orderId);
            res.json(tracking);
        } catch (error) {
            next(error);
        }
    }

    async updateTracking(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const { status, estimatedDelivery, actualDelivery } = req.body;

            const updateData: any = { status };

            if (estimatedDelivery) {
                updateData.estimatedDelivery = new Date(estimatedDelivery);
            }
            if (actualDelivery) {
                updateData.actualDelivery = new Date(actualDelivery);
            }

            const tracking = await logisticsService.updateTracking(id, updateData);

            res.json(tracking);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            next(error);
        }
    }

    async markAsDelivered(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const tracking = await logisticsService.markAsDelivered(id);
            res.json(tracking);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            next(error);
        }
    }

    async getAllTracking(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const status = req.query.status as string;

            const result = await logisticsService.getAllTracking(page, limit, status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getLogisticsStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await logisticsService.getLogisticsStats();
            res.json(stats);
        } catch (error) {
            next(error);
        }
    }
}
