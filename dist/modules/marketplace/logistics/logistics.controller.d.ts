import { Request, Response, NextFunction } from 'express';
export declare class LogisticsController {
    createTracking(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getTracking(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getTrackingByNumber(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getTrackingByOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTracking(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    markAsDelivered(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllTracking(req: Request, res: Response, next: NextFunction): Promise<void>;
    getLogisticsStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=logistics.controller.d.ts.map