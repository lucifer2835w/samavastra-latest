import { Request, Response, NextFunction } from 'express';
export declare class ProductController {
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    createProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    searchProducts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=product.controller.d.ts.map