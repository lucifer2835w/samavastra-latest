"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionController = void 0;
const production_service_1 = require("./production.service");
class ProductionController {
    constructor() {
        this.productionService = new production_service_1.ProductionService();
    }
    async getAllLogs(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await this.productionService.getAllLogs(page, limit);
            res.json(result);
        }
        catch (error) {
            console.error('Error fetching production logs:', error);
            res.status(500).json({ error: 'Failed to fetch production logs' });
        }
    }
    async createLog(req, res) {
        try {
            const log = await this.productionService.createLog(req.body);
            res.status(201).json(log);
        }
        catch (error) {
            console.error('Error creating production log:', error);
            res.status(500).json({ error: 'Failed to create production log' });
        }
    }
    async getStats(req, res) {
        try {
            const stats = await this.productionService.getStats();
            res.json(stats);
        }
        catch (error) {
            console.error('Error fetching production stats:', error);
            res.status(500).json({ error: 'Failed to fetch production stats' });
        }
    }
}
exports.ProductionController = ProductionController;
//# sourceMappingURL=production.controller.js.map