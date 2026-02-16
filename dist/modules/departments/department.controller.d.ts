import { Request, Response, NextFunction } from 'express';
export declare class DepartmentController {
    createDepartment(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllDepartments(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDepartment(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=department.controller.d.ts.map