import { Request, Response, NextFunction } from 'express';
export declare class InventoryController {
    getAllInventory(req: Request, res: Response, next: NextFunction): Promise<void>;
    getInventoryByProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateInventory(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    adjustInventory(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getLowStockItems(req: Request, res: Response, next: NextFunction): Promise<void>;
    getInventoryStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=inventory.controller.d.ts.map