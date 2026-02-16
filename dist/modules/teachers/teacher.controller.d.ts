import { Request, Response, NextFunction } from 'express';
export declare class TeacherController {
    getProfile(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getTeacher(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getAllTeachers(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTeacher(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=teacher.controller.d.ts.map