import { Request, Response, NextFunction } from 'express';
export declare class ParentController {
    getParentChildren(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getChildPerformance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getChildGrades(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getChildAttendance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getChildFees(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getChildHomework(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    updateAccess(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=parent.controller.d.ts.map