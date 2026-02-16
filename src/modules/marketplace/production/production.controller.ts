import { Request, Response } from 'express';
import { ProductionService } from './production.service';

export class ProductionController {
    private productionService: ProductionService;

    constructor() {
        this.productionService = new ProductionService();
    }

    async getAllLogs(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 20;
            const result = await this.productionService.getAllLogs(page, limit);
            res.json(result);
        } catch (error) {
            console.error('Error fetching production logs:', error);
            res.status(500).json({ error: 'Failed to fetch production logs' });
        }
    }

    async createLog(req: Request, res: Response) {
        try {
            const log = await this.productionService.createLog(req.body);
            res.status(201).json(log);
        } catch (error) {
            console.error('Error creating production log:', error);
            res.status(500).json({ error: 'Failed to create production log' });
        }
    }

    async getStats(req: Request, res: Response) {
        try {
            const stats = await this.productionService.getStats();
            res.json(stats);
        } catch (error) {
            console.error('Error fetching production stats:', error);
            res.status(500).json({ error: 'Failed to fetch production stats' });
        }
    }
}
