"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticsController = void 0;
const logistics_service_1 = require("./logistics.service");
const logisticsService = new logistics_service_1.LogisticsService();
class LogisticsController {
    async createTracking(req, res, next) {
        try {
            const { orderId, trackingNumber, status, estimatedDelivery } = req.body;
            if (!orderId || !trackingNumber || !status) {
                return res.status(400).json({
                    error: 'Missing required fields: orderId, trackingNumber, status',
                });
            }
            const trackData = {
                orderId,
                trackingNumber,
                status,
            };
            if (estimatedDelivery) {
                trackData.estimatedDelivery = new Date(estimatedDelivery);
            }
            const tracking = await logisticsService.createTracking(trackData);
            res.status(201).json(tracking);
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Tracking number already exists' });
            }
            next(error);
        }
    }
    async getTracking(req, res, next) {
        try {
            const id = req.params.id;
            const tracking = await logisticsService.getTrackingById(id);
            if (!tracking) {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            res.json(tracking);
        }
        catch (error) {
            next(error);
        }
    }
    async getTrackingByNumber(req, res, next) {
        try {
            const trackingNumber = req.params.trackingNumber;
            const tracking = await logisticsService.getTrackingByNumber(trackingNumber);
            if (!tracking) {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            res.json(tracking);
        }
        catch (error) {
            next(error);
        }
    }
    async getTrackingByOrder(req, res, next) {
        try {
            const orderId = req.params.orderId;
            const tracking = await logisticsService.getTrackingByOrderId(orderId);
            res.json(tracking);
        }
        catch (error) {
            next(error);
        }
    }
    async updateTracking(req, res, next) {
        try {
            const id = req.params.id;
            const { status, estimatedDelivery, actualDelivery } = req.body;
            const updateData = { status };
            if (estimatedDelivery) {
                updateData.estimatedDelivery = new Date(estimatedDelivery);
            }
            if (actualDelivery) {
                updateData.actualDelivery = new Date(actualDelivery);
            }
            const tracking = await logisticsService.updateTracking(id, updateData);
            res.json(tracking);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            next(error);
        }
    }
    async markAsDelivered(req, res, next) {
        try {
            const id = req.params.id;
            const tracking = await logisticsService.markAsDelivered(id);
            res.json(tracking);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Tracking not found' });
            }
            next(error);
        }
    }
    async getAllTracking(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const status = req.query.status;
            const result = await logisticsService.getAllTracking(page, limit, status);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getLogisticsStats(req, res, next) {
        try {
            const stats = await logisticsService.getLogisticsStats();
            res.json(stats);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LogisticsController = LogisticsController;
//# sourceMappingURL=logistics.controller.js.map