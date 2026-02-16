import { Request, Response, NextFunction } from 'express';
export declare class PaymentController {
    createPayment(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getPayment(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getPaymentsByOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePaymentStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    processRefund(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllPayments(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPaymentStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=payment.controller.d.ts.map