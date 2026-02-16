"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const paymentService = new payment_service_1.PaymentService();
class PaymentController {
    async createPayment(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async getPayment(req, res, next) {
        try {
            const id = req.params.id;
            const payment = await paymentService.getPaymentById(id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            res.json(payment);
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentsByOrder(req, res, next) {
        try {
            const orderId = req.params.orderId;
            const payments = await paymentService.getPaymentsByOrderId(orderId);
            res.json(payments);
        }
        catch (error) {
            next(error);
        }
    }
    async updatePaymentStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status, transactionReference } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }
            const payment = await paymentService.updatePaymentStatus(id, status, transactionReference);
            res.json(payment);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Payment not found' });
            }
            next(error);
        }
    }
    async processRefund(req, res, next) {
        try {
            const { orderId, amount, reason } = req.body;
            if (!orderId || !amount) {
                return res.status(400).json({
                    error: 'Missing required fields: orderId, amount',
                });
            }
            const refund = await paymentService.processRefund(orderId, parseFloat(amount), reason);
            res.status(201).json(refund);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllPayments(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const status = req.query.status;
            const orderId = req.query.orderId ? req.query.orderId : undefined;
            const result = await paymentService.getAllPayments(page, limit, status, orderId);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getPaymentStats(req, res, next) {
        try {
            const stats = await paymentService.getPaymentStats();
            res.json(stats);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map