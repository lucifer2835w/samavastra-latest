import { Request, Response, NextFunction } from 'express';
export declare class OrderController {
    createOrder(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getOrder(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    cancelOrder(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getOrderStats(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyOrders(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=order.controller.d.ts.map