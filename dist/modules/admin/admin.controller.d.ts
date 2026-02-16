import { Request, Response, NextFunction } from 'express';
export declare class AdminController {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    createUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    assignRoles(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    deactivateUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getSystemAnalytics(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRoles(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=admin.controller.d.ts.map