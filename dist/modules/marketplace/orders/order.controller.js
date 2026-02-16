"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const student_service_1 = require("../../students/student.service");
const orderService = new order_service_1.OrderService();
const studentService = new student_service_1.StudentService();
class OrderController {
    async createOrder(req, res, next) {
        try {
            const { studentId, items } = req.body;
            if (!studentId || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    error: 'Missing required fields: studentId, items (array)',
                });
            }
            const order = await orderService.createOrder({ studentId, items });
            res.status(201).json(order);
        }
        catch (error) {
            if (error.message.includes('not found') || error.message.includes('not available')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }
    async getOrder(req, res, next) {
        try {
            const id = req.params.id;
            const order = await orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(order);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllOrders(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const status = req.query.status;
            const studentId = req.query.studentId ? req.query.studentId : undefined;
            const result = await orderService.getAllOrders(page, limit, status, studentId);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateOrderStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }
            const order = await orderService.updateOrderStatus(id, status);
            res.json(order);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Order not found' });
            }
            next(error);
        }
    }
    async cancelOrder(req, res, next) {
        try {
            const id = req.params.id;
            const order = await orderService.cancelOrder(id);
            res.json(order);
        }
        catch (error) {
            if (error.message === 'Order not found') {
                return res.status(404).json({ error: 'Order not found' });
            }
            if (error.message.includes('Cannot cancel')) {
                return res.status(400).json({ error: error.message });
            }
            next(error);
        }
    }
    async getOrderStats(req, res, next) {
        try {
            const stats = await orderService.getOrderStats();
            res.json(stats);
        }
        catch (error) {
            next(error);
        }
    }
    async getMyOrders(req, res, next) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const student = await studentService.getStudentByUserId(userId);
            if (!student) {
                return res.status(404).json({ error: 'Student profile not found' });
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await orderService.getAllOrders(page, limit, undefined, student.id);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map